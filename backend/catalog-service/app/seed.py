from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models

def seed_db():
    db = SessionLocal()
    
    if db.query(models.Category).first():
        print("Database already seeded!")
        db.close()
        return

    # Create Categories
    electronics = models.Category(name="Electronics", description="Gadgets and tech")
    clothing = models.Category(name="Clothing", description="Apparel and accessories")
    home = models.Category(name="Home", description="Home and kitchen goods")

    db.add_all([electronics, clothing, home])
    db.commit()

    # Create Products
    products = [
        models.Product(title="Zenith Quantum Laptop", description="High performance computing machine with a sleek design.", price=1299.99, image_url="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", category_id=electronics.id, inventory_count=50),
        models.Product(title="Aero Noise-Cancelling Headphones", description="Immersive audio experience with active noise cancellation.", price=249.99, image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", category_id=electronics.id, inventory_count=120),
        models.Product(title="Lunar Smartwatch", description="Track your health and stay connected on the go.", price=199.99, image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", category_id=electronics.id, inventory_count=80),
        models.Product(title="Echo Minimalist Jacket", description="A premium waterproof jacket for urban explorers.", price=129.99, image_url="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80", category_id=clothing.id, inventory_count=200),
        models.Product(title="Nova Sneakers", description="Comfortable and stylish sneakers for everyday wear.", price=89.99, image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", category_id=clothing.id, inventory_count=150),
        models.Product(title="Ceramic Coffee Mug", description="Artisan crafted ceramic mug.", price=24.99, image_url="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80", category_id=home.id, inventory_count=300),
        models.Product(title="Lumina Desk Lamp", description="Modern LED desk lamp with adjustable brightness.", price=49.99, image_url="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80", category_id=home.id, inventory_count=90),
    ]

    db.add_all(products)
    db.commit()
    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=engine)
    seed_db()
