'use client';

import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/context/LanguageContext';

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#f59e0b' : 'none'} stroke={i <= Math.round(rating) ? '#f59e0b' : '#3f3f46'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ComparePage() {
  const { items, remove, clear } = useCompare();
  const { addItem, isInCart } = useCart();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const handleAddToCart = (product: any) => {
    addItem(product);
    addToast(`"${product.title.slice(0, 24)}..." added to cart`);
  };

  return (
    <div className="page-catalog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div className="catalog-header" style={{ marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <nav className="breadcrumb">
          <Link href="/">{t('home')}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{t('compare')}</span>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 className="catalog-title" style={{ margin: 0, fontSize: '32px', fontWeight: 800 }}>{t('compare_products')}</h1>
          {items.length > 0 && (
            <button className="btn btn-ghost" onClick={clear} style={{ fontSize: '13px', padding: '8px 16px', height: '36px' }}>
              {t('clear_all')}
            </button>
          )}
        </div>
        <div className="catalog-count" style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-2)' }}>
          {items.length} {t('items_selected')}
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg-raised)', borderRadius: '16px', border: '1px solid var(--border)', maxWidth: '600px', margin: '40px auto 0' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 20px', display: 'block' }}>
            <path d="M16 3h5v18h-5zM3 3h5v18H3zM9.5 3h5v18h-5z"/>
          </svg>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>{t('no_compare')}</div>
          <div style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '28px', lineHeight: '1.5' }}>{t('no_compare_sub')}</div>
          <Link href="/catalog" className="btn btn-primary" style={{ height: '40px', padding: '0 24px' }}>
            {t('explore_shop')}
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'var(--bg-raised)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                <th style={{ padding: '24px 20px', width: '20%', color: 'var(--text-3)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  {t('features')}
                </th>
                {items.map(p => (
                  <th key={p.id} style={{ padding: '24px 20px', width: `${80 / items.length}%`, verticalAlign: 'top', borderLeft: '1px solid var(--border)' }}>
                    <div style={{ position: 'relative', textAlign: 'center', padding: '8px 0' }}>
                      <button
                        onClick={() => remove(p.id)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: 'var(--bg-muted)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-1)',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.15s'
                        }}
                        title={t('remove')}
                        onMouseOver={e => e.currentTarget.style.background = 'var(--red)'}
                        onMouseOut={e => e.currentTarget.style.background = 'var(--bg-muted)'}
                      >
                        ×
                      </button>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px', display: 'block', marginLeft: 'auto', marginRight: 'auto', border: '1px solid var(--border)' }}
                      />
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-1)', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px', lineHeight: '20px', padding: '0 8px' }}>
                        {p.title}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-2)', fontSize: '13px' }}>{t('price')}</td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '20px', borderLeft: '1px solid var(--border)', textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, color: 'var(--accent-light)', fontSize: '18px' }}>${p.price.toFixed(2)}</span>
                    {p.originalPrice && (
                      <span style={{ color: 'var(--text-3)', textDecoration: 'line-through', fontSize: '13px', marginLeft: '8px' }}>
                        ${p.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-2)', fontSize: '13px' }}>{t('category')}</td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '20px', borderLeft: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-1)', fontSize: '13px', fontWeight: 500 }}>
                    {p.category} <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>({p.subcategory})</span>
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-2)', fontSize: '13px' }}>{t('rating')}</td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '20px', borderLeft: '1px solid var(--border)', textAlign: 'center' }}>
                    <StarRating rating={p.rating} />
                    <div style={{ fontSize: '12px', color: 'var(--text-2)', marginTop: '6px', fontWeight: 500 }}>
                      {p.rating} / 5 <span style={{ color: 'var(--text-3)' }}>({p.reviewCount} reviews)</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-2)', fontSize: '13px' }}>{t('status')}</td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '20px', borderLeft: '1px solid var(--border)', textAlign: 'center', fontSize: '13px' }}>
                    {p.inventory > 0 ? (
                      <span style={{ color: 'var(--green)', fontWeight: 600, background: 'rgba(34,197,94,0.06)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(34,197,94,0.15)' }}>
                        {t('in_stock')} ({p.inventory})
                      </span>
                    ) : (
                      <span style={{ color: 'var(--red)', fontWeight: 600, background: 'rgba(239,68,68,0.06)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.15)' }}>
                        {t('out_of_stock')}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-2)', fontSize: '13px' }}>{t('description')}</td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '20px', borderLeft: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-2)', verticalAlign: 'top', lineHeight: '1.6' }}>
                    {p.description}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '20px' }}></td>
                {items.map(p => (
                  <td key={p.id} style={{ padding: '24px 20px', borderLeft: '1px solid var(--border)', textAlign: 'center' }}>
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '10px 16px', fontSize: '13px', justifyContent: 'center', height: '38px' }}
                      disabled={p.inventory === 0}
                      onClick={() => handleAddToCart(p)}
                    >
                      {isInCart(p.id) ? t('added_to_cart') : t('add_to_cart')}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
