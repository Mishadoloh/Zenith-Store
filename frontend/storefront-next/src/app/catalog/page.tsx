'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/products';
import { SortOption } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';

const CatIcons: Record<string, React.ReactNode> = {
  All: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Electronics: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Clothing: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>,
  Home: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Sports: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  Beauty: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

export default function CatalogPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const initialQ   = searchParams.get('q')   || '';

  const [selectedCat, setSelectedCat]     = useState(initialCat);
  const [sortBy, setSortBy]               = useState<SortOption>('featured');
  const [query, setQuery]                 = useState(initialQ);
  const [minPrice, setMinPrice]           = useState('');
  const [maxPrice, setMaxPrice]           = useState('');
  const [minRating, setMinRating]         = useState(0);
  const [inStockOnly, setInStockOnly]     = useState(false);

  const filtered = useMemo(() => {
    let r = [...products];
    if (selectedCat !== 'All') r = r.filter(p => p.category === selectedCat);
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    if (minPrice) r = r.filter(p => p.price >= Number(minPrice));
    if (maxPrice) r = r.filter(p => p.price <= Number(maxPrice));
    if (minRating > 0) r = r.filter(p => p.rating >= minRating);
    if (inStockOnly) r = r.filter(p => p.inventory > 0);

    switch (sortBy) {
      case 'price-asc':  return r.sort((a, b) => a.price - b.price);
      case 'price-desc': return r.sort((a, b) => b.price - a.price);
      case 'rating':     return r.sort((a, b) => b.rating - a.rating);
      case 'newest':     return r.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
      default:           return r.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    }
  }, [selectedCat, sortBy, query, minPrice, maxPrice, minRating, inStockOnly]);

  const clearAll = () => {
    setSelectedCat('All'); setQuery(''); setMinPrice('');
    setMaxPrice(''); setMinRating(0); setInStockOnly(false);
  };

  const currentCategoryName = selectedCat === 'All' 
    ? t('category_all') 
    : t(`category_${selectedCat.toLowerCase()}`);

  return (
    <div className="page-catalog">
      <div className="catalog-header">
        <nav className="breadcrumb">
          <Link href="/">{t('home')}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">
            {currentCategoryName}
          </span>
        </nav>
        <h1 className="catalog-title">{currentCategoryName}</h1>
        <div className="catalog-count">{filtered.length} {t('products').toLowerCase()}</div>
      </div>

      <div className="catalog-body">
        {/* ─── FILTER PANEL ─── */}
        <aside className="filters">
          <div className="filters-head">
            <div className="filters-title">{t('filters')}</div>
            <span className="filters-clear" onClick={clearAll}>{t('clear_filters')}</span>
          </div>

          <div className="filter-group">
            <div className="filter-group-label">{t('search')}</div>
            <input
              className="filter-input"
              placeholder={`${t('search')}...`}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="filter-group-label">{t('category')}</div>
            {categories.map(cat => {
              const catLabel = cat.name === 'All' 
                ? t('category_all') 
                : t(`category_${cat.name.toLowerCase()}`);
              return (
                <label key={cat.name} className="filter-check">
                  <input
                    type="checkbox"
                    checked={selectedCat === cat.name}
                    onChange={() => setSelectedCat(cat.name)}
                  />
                  <span className="filter-check-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {CatIcons[cat.name]} {catLabel}
                  </span>
                  <span className="filter-check-count">{cat.count}</span>
                </label>
              );
            })}
          </div>

          <div className="filter-group">
            <div className="filter-group-label">{t('price_range')}</div>
            <div className="price-inputs">
              <input className="filter-input" type="number" placeholder="Min $" value={minPrice} onChange={e => setMinPrice(e.target.value)} min="0" />
              <div className="price-sep">—</div>
              <input className="filter-input" type="number" placeholder="Max $" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} min="0" />
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-label">{t('min_rating')}</div>
            {[4.5, 4, 3.5, 3].map(r => (
              <label key={r} className="filter-check">
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
                <span className="filter-check-label">
                  {Array.from({ length: Math.floor(r) }).map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" style={{ display: 'inline' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))} {r}+
                </span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <label className="filter-check">
              <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} />
              <span className="filter-check-label">{t('in_stock_only')}</span>
            </label>
          </div>
        </aside>

        {/* ─── PRODUCTS ─── */}
        <div>
          <div className="catalog-toolbar">
            <div className="toolbar-count">
              {t('showing')} <strong>{filtered.length}</strong> {t('of')} {products.length} {t('products')}
            </div>
            <div className="sort-wrap">
              <span className="sort-label">{t('sort_by')}:</span>
              <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                <option value="featured">{t('sort_featured')}</option>
                <option value="price-asc">{t('sort_price_asc')}</option>
                <option value="price-desc">{t('sort_price_desc')}</option>
                <option value="rating">{t('sort_rating')}</option>
                <option value="newest">{t('sort_newest')}</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-3)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 16px', display: 'block' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '8px' }}>{t('no_products')}</div>
              <div style={{ fontSize: '13px', marginBottom: '20px' }}>{t('no_products_sub')}</div>
              <button className="btn btn-ghost" onClick={clearAll}>{t('clear_filters')}</button>
            </div>
          ) : (
            <div className="product-grid anim-children">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
