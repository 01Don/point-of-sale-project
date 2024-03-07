from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class Product(BaseModel):
    prod_name: str
    prod_category: str
    prod_quantity: int
    prod_buyprice: float
    prod_saleprice: float
    created_at: Optional[str] = None  
    prod_id: Optional[int] = None


class Sale(BaseModel):
    prod_id: int
    prod_quantity: int


class SaleBatch(BaseModel):
    sales: List[Sale]


class User(BaseModel):
    password: str
    role: str
    email: str
