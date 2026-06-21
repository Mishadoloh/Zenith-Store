'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

function StarRating({ rating, large }: { rating: number; large?: boolean }) {
  const size = large ? 16 : 12;
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke={i <= Math.round(rating) ? '#f59e0b' : '#3f3f46'}
          strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

const mockReviews = [
  { id: 1, author: 'Alex M.',  rating: 5, comment: 'Absolutely blown away by the quality. Worth every penny.', date: '2026-05-12', verified: true },
  { id: 2, author: 'Sarah K.', rating: 5, comment: "Best purchase I've made this year. Build quality is exceptional.", date: '2026-04-28', verified: true },
  { id: 3, author: 'James T.', rating: 4, comment: 'Great product, fast shipping. Highly recommend.', date: '2026-04-15', verified: false },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const rawProduct = getProductById(Number(id));
  if (!rawProduct) notFound();

  const { t, tProduct } = useTranslation();
  const product = tProduct(rawProduct);

  const related = getRelatedProducts(rawProduct, 4);
  const { addItem } = useCart();
  const { addToast } = useToast();

  const [selImg, setSelImg]     = useState(0);
  const [qty, setQty]           = useState(1);
  const [added, setAdded]       = useState(false);
  const [tab, setTab]           = useState<'description' | 'specs' | 'reviews'>('description');

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleAdd = () => {
    addItem(rawProduct, qty);
    setAdded(true);
    addToast(`"${product.title.slice(0, 28)}..." ${t('added_to_cart').toLowerCase()}`);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="page-detail" style={{ paddingBottom: '80px' }}>
      <div className="detail-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* BREADCRUMB */}
        <nav className="breadcrumb" style={{ marginBottom: '24px' }}>
          <Link href="/">{t('home')}</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/catalog">{t('shop')}</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href={`/catalog?cat=${rawProduct.category}`}>{product.category}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          {/* GALLERY */}
          <div className="gallery" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="gallery-main" style={{ background: 'var(--bg-raised)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[selImg]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {product.images.length > 1 && (
              <div className="gallery-thumbs" style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((img: string, i: number) => (
                  <div
                    key={i}
                    className={`gallery-thumb ${selImg === i ? 'active' : ''}`}
                    onClick={() => setSelImg(i)}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selImg === i ? '2px solid var(--accent-light)' : '1px solid var(--border)',
                      cursor: 'pointer'
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="detail-info" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="detail-cat" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.subcategory}
            </div>
            <h1 className="detail-title" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-1)', lineHeight: '1.2', letterSpacing: '-0.5px' }}>
              {product.title}
            </h1>

            <div className="detail-rating" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <StarRating rating={product.rating} large />
              <span className="detail-rating-num" style={{ fontWeight: 600, color: 'var(--text-1)' }}>{product.rating}</span>
              <span className="detail-rating-cnt" style={{ color: 'var(--text-3)' }}>({product.reviewCount.toLocaleString()})</span>
            </div>

            {/* PRICE */}
            <div className="detail-price-row" style={{ display: 'flex', alignItems: 'baseline', gap: '12px', padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <span className="detail-price" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-1)' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="detail-original" style={{ fontSize: '16px', color: 'var(--text-3)', textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                  <span className="detail-save" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green)', background: 'rgba(34,197,94,0.1)', padding: '3px 8px', borderRadius: '6px' }}>
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* STOCK */}
            <div className="stock-indicator" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className={`stock-dot ${product.inventory > 10 ? 'in' : product.inventory > 0 ? 'low' : 'out'}`} style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.inventory > 10 ? 'var(--green)' : product.inventory > 0 ? 'var(--amber)' : 'var(--red)' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>
                {product.inventory > 10
                  ? `${t('in_stock')} (${product.inventory})`
                  : product.inventory > 0
                  ? `Only ${product.inventory} left`
                  : t('out_of_stock')}
              </span>
            </div>

            {/* QTY */}
            <div className="qty-row" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="qty-label" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)' }}>Quantity</span>
              <div className="qty-ctrl" style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px' }}>
                <button className="qty-btn" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }} onClick={() => setQty(q => Math.max(1, q - 1))}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <span className="qty-val" style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>{qty}</span>
                <button className="qty-btn" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }} onClick={() => setQty(q => Math.min(product.inventory, q + 1))}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
            </div>

            <div className="detail-actions" style={{ display: 'flex', gap: '12px' }}>
              <button
                className={`btn btn-primary`}
                onClick={handleAdd}
                disabled={product.inventory === 0}
                style={{ flex: 1, height: '46px', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}
              >
                {added ? t('added_to_cart') : t('add_to_cart')}
              </button>
            </div>

            {/* TABS */}
            <div style={{ marginTop: '24px' }}>
              <div className="tabs" style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
                {(['description', 'specs', 'reviews'] as const).map(tName => (
                  <button
                    key={tName}
                    className={`tab-btn ${tab === tName ? 'active' : ''}`}
                    onClick={() => setTab(tName)}
                    style={{
                      paddingBottom: '12px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: tab === tName ? 'var(--text-1)' : 'var(--text-3)',
                      borderBottom: tab === tName ? '2px solid var(--accent-light)' : '2px solid transparent'
                    }}
                  >
                    {tName === 'description' ? t('description') : tName === 'specs' ? 'Specs' : `Reviews (${mockReviews.length})`}
                  </button>
                ))}
              </div>

              {tab === 'description' && (
                <p style={{ fontSize: '14.5px', color: 'var(--text-2)', lineHeight: '1.8' }}>{product.longDescription}</p>
              )}

              {tab === 'specs' && product.specs && (
                <table className="spec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px 0', fontSize: '13px', color: 'var(--text-2)', width: '35%', fontWeight: 500 }}>{k}</td>
                        <td style={{ padding: '12px 0', fontSize: '13px', color: 'var(--text-1)', fontWeight: 600 }}>{v as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === 'reviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {mockReviews.map(r => (
                    <div key={r.id} className="review-card" style={{ padding: '16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                      <div className="review-head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                        <div>
                          <span className="review-author" style={{ fontWeight: 600, color: 'var(--text-1)', marginRight: '8px' }}>{r.author}</span>
                          {r.verified && <span className="review-verified" style={{ color: 'var(--green)', fontWeight: 500 }}>Verified Purchase</span>}
                        </div>
                        <span className="review-date" style={{ color: 'var(--text-3)' }}>{r.date}</span>
                      </div>
                      <StarRating rating={r.rating} />
                      <p className="review-text" style={{ marginTop: '8px', fontSize: '13.5px', color: 'var(--text-2)', lineHeight: '1.5' }}>{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div style={{ marginTop: '80px', borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '28px', letterSpacing: '-0.3px', color: 'var(--text-1)' }}>You May Also Like</h2>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
