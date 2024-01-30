import typing
from fastapi import FastAPI, HTTPException, Request
from app.core import db, schemas
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime

app = FastAPI()
origins = [
    "http://172.233.153.32:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_user_id_from_login(username: str, password: str):
    with db.Database() as conn:
        # Perform user authentication here, e.g., by querying the database
        select_user_query = (
            "SELECT user_id FROM users WHERE username = %s AND password = %s"
        )
        conn.execute(select_user_query, (username, password))
        user = conn.fetchone()

        if user:
            return user["user_id"]
        else:
            return None


@app.get("/products")
@app.get("/products/{prod_id}")
def get_product(prod_id: int = None) -> schemas.Product | typing.List[schemas.Product]:
    with db.Database() as conn:
        if prod_id:
            select_query = "SELECT * FROM products WHERE prod_id = %s"
            conn.execute(select_query, (prod_id,))

            product = conn.fetchone()
            if product:
                p = schemas.Product(**product)
            return product
        else:
            select_query = "SELECT * FROM products"
            conn.execute(select_query)
            result = conn.fetchall()

            return result


@app.post("/products")
def create_product(data: schemas.Product):
    with db.Database() as conn:
        insert_query = "INSERT INTO products (prod_name, prod_category, prod_quantity, prod_buyprice, prod_saleprice) VALUES (%s, %s, %s, %s, %s)"
        params = (
            data.prod_name,
            data.prod_category,
            data.prod_quantity,
            data.prod_buyprice,
            data.prod_saleprice,
        )
        result = conn.execute(insert_query, params)

        return result


@app.get("/sales")
def get_sales():
    try:
        with db.Database() as conn:
            select_query = "SELECT * FROM sales"
            conn.execute(select_query)
            sales = conn.fetchall()

            return sales
    except Exception as e:
        print("Error:", e)
        return {"error": "An error occurred while fetching sales data."}


@app.post("/sales")
def create_sales(sales: List[schemas.Sale]):
    total_sale_prices = []

    with db.Database() as conn:
        for sale in sales:
            # Perform a lookup to get the prod_saleprice and prod_name based on prod_id
            select_prod_info_query = (
                "SELECT prod_saleprice, prod_name FROM products WHERE prod_id = %s"
            )
            conn.execute(select_prod_info_query, (sale.prod_id,))
            result = conn.fetchone()

            if result:
                prod_saleprice = result["prod_saleprice"]
                prod_name = result["prod_name"]
                total_sale_price = prod_saleprice * sale.prod_quantity

                # Insert the sale record into the database
                insert_query = "INSERT INTO sales (prod_id, prod_name, prod_quantity, prod_saleprice) VALUES (%s, %s, %s, %s)"
                params = (
                    sale.prod_id,
                    prod_name,
                    sale.prod_quantity,
                    total_sale_price,
                )
                conn.execute(insert_query, params)

                # Append the total_sale_price to the list
                total_sale_prices.append(total_sale_price)
            else:
                # Handle the case where the prod_id provided by the client is not found
                raise HTTPException(
                    status_code=404, detail=f"Product not found by ID: {sale.prod_id}"
                )

    # Return the list of total_sale_prices in the response
    return {"total_sale_prices": total_sale_prices}


@app.get("/users")
@app.get("/users/{user_id}")
def get_user(user_id: int = None) -> schemas.User | typing.List[schemas.User]:
    with db.Database() as conn:
        if user_id:
            select_query = "SELECT * FROM users WHERE user_id = %s"
            conn.execute(select_query, (user_id,))

            user = conn.fetchone()
            if user:
                p = schemas.User(**user)
            return user
        else:
            select_query = "SELECT * FROM users"
            conn.execute(select_query)
            return conn.fetchall()


@app.post("/users")
def create_user_profile(data: schemas.User):
    with db.Database() as conn:
        insert_query = (
            "INSERT INTO users (user_id, password,role,email) VALUES (%s, %s, %s, %s)"
        )
        params = (
            data.password,
            data.role,
            data.email,
        )

    return {"message": "User profile created successfully"}


@app.post("/register")
def register_user(user: schemas.User):
    with db.Database() as conn:
        # Check if the user with the provided email already exists
        check_user_query = "SELECT user_id FROM users WHERE email = %s"
        conn.execute(check_user_query, (user.email,))
        existing_user = conn.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=400, detail="User with this email already exists"
            )

        # Insert the new user into the database
        insert_user_query = (
            "INSERT INTO users (password, role, email) VALUES (%s, %s, %s)"
        )
        params = (
            user.password,
            user.role,
            user.email,
        )
        conn.execute(insert_user_query, params)

        return {"message": "User registered successfully"}


def get_user_id_from_login(email: str, password: str, role: str):
    with db.Database() as conn:
        select_user_query = (
            "SELECT user_id FROM users WHERE email = %s AND password = %s AND role = %s"
        )
        conn.execute(select_user_query, (email, password, role))
        user = conn.fetchone()

        if user:
            return user["user_id"]
        else:
            return None


@app.post("/login")
def login_user(user: schemas.User):
    user_id = get_user_id_from_login(user.email, user.password, user.role)
    if user_id:
        return {"authenticated": True}
    else:
        return {"authenticated": False}


@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    with db.Database() as conn:
        # Check if the user with the provided user_id exists
        check_user_query = "SELECT user_id FROM users WHERE user_id = %s"
        conn.execute(check_user_query, (user_id,))
        existing_user = conn.fetchone()

        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")

        # Delete the user from the database
        delete_user_query = "DELETE FROM users WHERE user_id = %s"
        conn.execute(delete_user_query, (user_id,))

        return {"message": f"User with ID {user_id} deleted successfully"}
