import typing
from fastapi import FastAPI, HTTPException, Request
from app.core import db, schemas
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime

app = FastAPI()
origins = [
    "http://localhost:3000",
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
            # User authentication failed, return None or raise an exception
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
