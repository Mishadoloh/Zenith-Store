'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function DealsPage() {
  const saleProducts = products.filter(p => p.badge === 'sale');

  return (
    <div className="page-catalog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div className="catalog-header" style={{ marginBottom: '32px' }}>
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Special Deals</span>
        </nav>
        <h1 className="catalog-title" style={{ margin: '12px 0 4px' }}>Special Deals & Offers</h1>
        <div className="catalog-count">{saleProducts.length} items currently discounted</div>
      </div>

      {saleProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-3)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 16px', display: 'block' }}>
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '8px' }}>No active deals</div>
          <div style={{ fontSize: '13px', marginBottom: '24px' }}>Check back later for discounts and seasonal clearance items.</div>
          <Link href="/catalog" className="btn btn-primary">
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="product-grid anim-children">
          {saleProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
