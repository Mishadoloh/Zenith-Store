'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useTranslation } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { state, clearWishlist } = useWishlist();
  const { t } = useTranslation();
  const { items } = state;

  return (
    <div className="page-catalog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div className="catalog-header" style={{ marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
        <nav className="breadcrumb">
          <Link href="/">{t('home')}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{t('wishlist')}</span>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 className="catalog-title" style={{ margin: 0, fontSize: '32px', fontWeight: 800 }}>{t('my_wishlist')}</h1>
          {items.length > 0 && (
            <button className="btn btn-ghost" onClick={clearWishlist} style={{ fontSize: '13px', padding: '8px 16px', height: '36px' }}>
              {t('clear_wishlist')}
            </button>
          )}
        </div>
        <div className="catalog-count" style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-2)' }}>
          {items.length} {t('items_saved')}
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--bg-raised)', borderRadius: '16px', border: '1px solid var(--border)', maxWidth: '600px', margin: '40px auto 0' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 20px', display: 'block' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>{t('wishlist_empty')}</div>
          <div style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '28px', lineHeight: '1.5' }}>{t('wishlist_empty_sub')}</div>
          <Link href="/catalog" className="btn btn-primary" style={{ height: '40px', padding: '0 24px' }}>
            {t('explore_shop')}
          </Link>
        </div>
      ) : (
        <div className="product-grid anim-children" style={{ marginTop: '20px' }}>
          {items.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
