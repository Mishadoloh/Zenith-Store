from pydantic import BaseModel
from typing import List, Optional

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    title: str
    description: str
    price: float
    image_url: str
    inventory_count: int
    category_id: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    category: Optional[Category] = None

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ContactInquiryCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactInquiry(ContactInquiryCreate):
    id: int
    status: str

class FAQArticle(BaseModel):
    category: str
    question: str
    answer: str

class JobOpening(BaseModel):
    id: int
    title: str
    department: str
    location: str
    type: str
    description: str

class TrackingStep(BaseModel):
    status: str
    location: str
    timestamp: str
    details: str

class OrderTracking(BaseModel):
    order_id: str
    status: str
    estimated_delivery: str
    steps: List[TrackingStep]


