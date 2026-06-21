from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List, Optional
import random
import hashlib
import hmac
import base64
import json
import time

from . import models, schemas, database
from .database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Zenith Store Catalog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "zenith_secret_key_change_me"

def create_access_token(data: dict):
    payload = data.copy()
    payload["exp"] = time.time() + 86400 * 7
    header = {"alg": "HS256", "typ": "JWT"}
    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
    signature = hmac.new(SECRET_KEY.encode(), f"{header_b64}.{payload_b64}".encode(), hashlib.sha256).digest()
    signature_b64 = base64.urlsafe_b64encode(signature).decode().rstrip("=")
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def verify_token(token: str):
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        header_b64, payload_b64, signature_b64 = parts
        expected_signature = hmac.new(SECRET_KEY.encode(), f"{header_b64}.{payload_b64}".encode(), hashlib.sha256).digest()
        expected_signature_b64 = base64.urlsafe_b64encode(expected_signature).decode().rstrip("=")
        if signature_b64 != expected_signature_b64:
            return None
        rem = len(payload_b64) % 4
        if rem > 0:
            payload_b64 += "=" * (4 - rem)
        payload_data = json.loads(base64.urlsafe_b64decode(payload_b64.encode()).decode())
        if payload_data.get("exp", 0) < time.time():
            return None
        return payload_data
    except Exception:
        return None

def hash_password(password: str) -> str:
    salt = "zenith_salt_"
    return hashlib.sha256((salt + password).encode()).hexdigest()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login", auto_error=False)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    email = payload.get("sub")
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@app.get("/api/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products

@app.get("/api/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(database.get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/api/products/{product_id}/recommendations", response_model=List[schemas.Product])
def get_recommendations(product_id: int, db: Session = Depends(database.get_db)):
    # Mock AI recommendations by picking random products
    products = db.query(models.Product).filter(models.Product.id != product_id).all()
    if not products:
        return []
    sample_size = min(4, len(products))
    return random.sample(products, sample_size)

@app.post("/api/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db)):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/api/categories", response_model=List[schemas.Category])
def read_categories(db: Session = Depends(database.get_db)):
    return db.query(models.Category).all()

@app.post("/api/auth/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(user.password)
    new_user = models.User(email=user.email, name=user.name, hashed_password=hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/auth/login")
def login(credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    hashed = hash_password(credentials.password)
    if user.hashed_password != hashed:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user.email, "name": user.name})
    return {"access_token": token, "token_type": "bearer", "user": {"email": user.email, "name": user.name}}

@app.get("/api/auth/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.get("/api/support/faqs", response_model=List[schemas.FAQArticle])
def get_faqs(lang: str = "en"):
    # FAQ database fully supporting en, uk, es, de
    faqs = {
        "en": [
            {"category": "Shipping", "question": "What are your shipping rates?", "answer": "Standard shipping is $9.99, but orders over $100 receive free shipping."},
            {"category": "Returns", "question": "How do I return an item?", "answer": "You can return any item within 30 days of purchase for a full refund."},
            {"category": "Security", "question": "Are my payments secure?", "answer": "Yes, we use 256-bit SSL encryption to process all transactions securely."}
        ],
        "uk": [
            {"category": "Доставка", "question": "Які у вас тарифи на доставку?", "answer": "Стандартна доставка коштує $9.99, але замовлення від $100 доставляються безкоштовно."},
            {"category": "Повернення", "question": "Як мені повернути товар?", "answer": "Ви можете повернути будь-який товар протягом 30 днів після покупки для повного відшкодування."},
            {"category": "Безпека", "question": "Чи безпечні мої платежі?", "answer": "Так, ми використовуємо 256-бітне SSL-шифрування для безпечної обробки всіх транзакцій."}
        ],
        "es": [
            {"category": "Envío", "question": "¿Cuáles son las tarifas de envío?", "answer": "El envío estándar cuesta $9.99, pero los pedidos superiores a $100 tienen envío gratuito."},
            {"category": "Devoluciones", "question": "¿Cómo devuelvo un artículo?", "answer": "Puede devolver cualquier artículo dentro de los 30 días posteriores a la compra para obtener un reembolso completo."},
            {"category": "Seguridad", "question": "¿Son seguros mis pagos?", "answer": "Sí, utilizamos cifrado SSL de 256 bits para procesar todas las transacciones de forma segura."}
        ],
        "de": [
            {"category": "Versand", "question": "Wie hoch sind die Versandkosten?", "answer": "Der Standardversand beträgt 9.99 $, aber Bestellungen ab 100 $ sind versandkostenfrei."},
            {"category": "Rückgabe", "question": "Wie kann ich einen Artikel zurückgeben?", "answer": "Sie können jeden Artikel innerhalb von 30 Tagen nach dem Kauf gegen eine volle Rückerstattung zurückgeben."},
            {"category": "Sicherheit", "question": "Sind meine Zahlungen sicher?", "answer": "Ja, wir verwenden eine 256-Bit-SSL-Verschlüsselung, um alle Transaktionen sicher zu verarbeiten."}
        ]
    }
    return faqs.get(lang, faqs["en"])

@app.post("/api/support/contact", response_model=schemas.ContactInquiry)
def create_contact_inquiry(inquiry: schemas.ContactInquiryCreate):
    # Simulated database save
    return schemas.ContactInquiry(
        id=random.randint(1000, 9999),
        name=inquiry.name,
        email=inquiry.email,
        subject=inquiry.subject,
        message=inquiry.message,
        status="Received"
    )

@app.get("/api/support/orders/track/{order_id}", response_model=schemas.OrderTracking)
def track_order(order_id: str):
    if len(order_id) < 4:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Custom statuses for tracking timeline
    return schemas.OrderTracking(
        order_id=order_id,
        status="In Transit",
        estimated_delivery="2026-06-25T18:00:00Z",
        steps=[
            {"status": "Delivered", "location": "Customer Location", "timestamp": "Estimated: 2026-06-25", "details": "Will be delivered soon"},
            {"status": "In Transit", "location": "Distribution Center", "timestamp": "2026-06-21 08:30", "details": "Departed sorting facility"},
            {"status": "Shipped", "location": "Main Warehouse", "timestamp": "2026-06-20 14:15", "details": "In Transit to destination"},
            {"status": "Processed", "location": "Zenith Hub", "timestamp": "2026-06-20 10:00", "details": "Order confirmed and processed"}
        ]
    )

@app.get("/api/careers/jobs", response_model=List[schemas.JobOpening])
def get_jobs():
    return [
        {"id": 1, "title": "Senior React Developer", "department": "Frontend", "location": "Remote / Kyiv", "type": "Full-Time", "description": "Responsible for building responsive client interfaces using Next.js & React."},
        {"id": 2, "title": "Backend Go Engineer", "department": "Infrastructure", "location": "Remote", "type": "Full-Time", "description": "Optimize order services and high concurrency processing pipelines."},
        {"id": 3, "title": "Python Machine Learning Engineer", "department": "Core AI", "location": "Hybrid / Berlin", "type": "Full-Time", "description": "Design recommendation engines and model architectures."}
    ]

@app.get("/health")
def health_check():
    return {"status": "ok"}


