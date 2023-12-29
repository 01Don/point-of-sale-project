import typing
from fastapi import FastAPI, HTTPException, Request
from app.core import db, schemas


app = FastAPI()



# @app.post("/products")
# def create_product(prod_id: int, prod_name: str, prod_category: str, prod_quantity: int, prod_buyprice: float, prod_saleprice: float):
#     connection = create_connection()
#     cursor = connection.cursor()

#     try:
#         insert_query = "INSERT INTO products (prod_id, prod_name, prod_category, prod_quantity, prod_buyprice, prod_saleprice) VALUES (%s, %s, %s, %s, %s, %s)"
#         data = (prod_id, prod_name, prod_category, prod_quantity, prod_buyprice, prod_saleprice)
#         cursor.execute(insert_query, data)
#         connection.commit()
#     except Exception as e:
#         connection.rollback()  # Roll back the transaction in case of error
#         return {"error": str(e)}
#     finally:
#         cursor.close()
#         connection.close()

#     return {"message": "Product created successfully"}



@app.get("/products")
@app.get("/products/{prod_id}")
def get_product(prod_id: int = None) -> schemas.Product | typing.List[schemas.Product]:
    with db.Database() as conn:
        if prod_id:
            select_query = "SELECT * FROM products WHERE prod_id = %s"
            conn.execute(select_query, (prod_id,))
            
            product = conn.fetchone()
            if product: 
                p= schemas.Product(**product) 
            return product
        else:
            select_query = "SELECT * FROM products"
            conn.execute(select_query)
            return conn.fetchall()

@app.post("/products")
def create_product(data:schemas.Product):
    with db.Database() as conn:
        insert_query = "INSERT INTO products (prod_id, prod_name, prod_category, prod_quantity, prod_buyprice, prod_saleprice) VALUES (%s, %s, %s, %s, %s, %s)"
        params = (data.prod_id, data.prod_name, data.prod_category, data.prod_quantity, data.prod_buyprice, data.prod_saleprice)
        result = conn.execute(insert_query, params)
        return result
        

# @app.post("/sales")
# async def create_sales(request: Request, sale_date: str, sale_id: int, user_id: int, prod_name: str, prod_saleprice: float):
#     connection = create_connection()
#     cursor = connection.cursor()

#     try:
#         insert_query = "INSERT INTO sales (sale_date, sale_id, user_id, prod_name, prod_saleprice) VALUES (%s, %s, %s, %s, %s)"
#         data = (sale_date, sale_id, user_id, prod_name, prod_saleprice)
#         cursor.execute(insert_query, data)
#         connection.commit()
#     except Exception as e:
#         connection.rollback()  # Roll back the transaction in case of error
#         return {"error": str(e)}
#     finally:
#         cursor.close()
#         connection.close()

#     return {"message": "Sale created successfully"}


# @app.get("/sales/{sales_id}")
# def get_product(sales_id: int):
#     connection = create_connection()
#     cursor = connection.cursor(dictionary=True)

#     try:
#         select_query = "SELECT * FROM sales WHERE sales_id = %s"
#         cursor.execute(select_query, (sales_id,))
#         sales = cursor.fetchone()
#     except Exception as e:
#         return {"error": str(e)}
#     finally:
#         cursor.close()
#         connection.close()

#     if sales:
#         return sales
#     else:
#         return {"message": "Sale not found"}

# # Define a list to store user data
# users = [
#     {"user_id": 1, "password": "hashed_password_1", "role": "admin", "email": "admin@example.com"},
#     {"user_id": 2, "password": "hashed_password_2", "role": "user", "email": "user@example.com"},
# ]

# @app.get("/users")
# async def get_users():
#     return users

# @app.get("/users/{user_id}")
# async def get_user(user_id: int):
#     if user_id < 0:
#         raise HTTPException(status_code=404, detail="User not found")
#     return users[user_id]



