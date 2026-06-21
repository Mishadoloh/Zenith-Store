'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { categories, getFeaturedProducts, products } from '@/lib/products';
import { useTranslation } from '@/context/LanguageContext';

const CatIcons: Record<string, React.ReactNode> = {
  All: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Electronics: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Clothing: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>,
  Home: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Sports: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
  Beauty: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

export default function HomePage() {
  const { t, tProduct } = useTranslation();

  const featured = getFeaturedProducts(8);
  const newArrivals = products.filter(p => p.badge === 'new').slice(0, 4);
  const bestSellers = products.filter(p => p.badge === 'bestseller');

  // Find product 1 dynamically to use as hero card, translate it
  const rawHeroProduct = products.find(p => p.id === 1) || products[0];
  const heroProduct = tProduct(rawHeroProduct);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg-lines" />
        <div className="hero-bg-glow" />
        <div className="hero-inner">
          <div>
            <div className="hero-tag">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              {t('new_collection_2026')}
            </div>
            <h1 className="hero-title">
              {t('hero_title_premium')}<br />
              <em>{t('hero_title_curated')}</em>
            </h1>
            <p className="hero-sub">
              {t('hero_sub')}
            </p>
            <div className="hero-btns">
              <Link href="/catalog" className="btn btn-primary">
                {t('shop_now')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/catalog?cat=Electronics" className="btn btn-ghost">
                {t('category_electronics')}
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">25+</div>
                <div className="hero-stat-label">{t('hero_stat_products_label')}</div>
              </div>
              <div>
                <div className="hero-stat-num">4.8</div>
                <div className="hero-stat-label">{t('hero_stat_rating_label')}</div>
              </div>
              <div>
                <div className="hero-stat-num">$100+</div>
                <div className="hero-stat-label">{t('hero_stat_shipping_label')}</div>
              </div>
            </div>
          </div>

          <div className="hero-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroProduct.image}
              alt={heroProduct.title}
              className="hero-card-img"
            />
            <div className="hero-card-body">
              <div>
                <div className="hero-card-name">{heroProduct.title}</div>
                <div className="hero-card-rating">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  {heroProduct.rating} ({heroProduct.reviewCount.toLocaleString()} {t('reviews').toLowerCase()})
                </div>
              </div>
              <div className="hero-card-price">${heroProduct.price.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="section" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        <div className="section-inner">
          <div className="cat-tabs">
            {categories.map(cat => {
              const translatedCatName = cat.name === 'All' 
                ? t('category_all') 
                : t(`category_${cat.name.toLowerCase()}`);
              return (
                <Link key={cat.name} href={cat.name === 'All' ? '/catalog' : `/catalog?cat=${cat.name}`}>
                  <div className="cat-tab">
                    {CatIcons[cat.name]}
                    {translatedCatName}
                    <span className="cat-tab-count">{cat.count}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2 className="section-title">{t('featured_products')}</h2>
              <div className="section-sub">{t('featured_sub')}</div>
            </div>
            <Link href="/catalog" className="section-link">
              {t('view_all')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="product-grid lg anim-children">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
              title: t('trust_shipping_title'), desc: t('trust_shipping_desc')
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.08-5.56"/></svg>,
              title: t('trust_returns_title'), desc: t('trust_returns_desc')
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              title: t('trust_payment_title'), desc: t('trust_payment_desc')
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title: t('trust_quality_title'), desc: t('trust_quality_desc')
            },
          ].map(tItem => (
            <div key={tItem.title} className="trust-item">
              <div className="trust-icon">{tItem.icon}</div>
              <div>
                <div className="trust-name">{tItem.title}</div>
                <div className="trust-desc">{tItem.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── PROMO BANNER ─── */}
      <div className="promo-banner" style={{ marginTop: '64px' }}>
        <div className="promo-inner">
          <div>
            <div className="promo-label">{t('promo_label')}</div>
            <div className="promo-title">{t('promo_title')}</div>
            <div className="promo-desc">{t('promo_desc')}</div>
            <div className="promo-code">ZENITH2026</div>
          </div>
          <Link href="/catalog" className="btn btn-primary">{t('shop_now')}</Link>
        </div>
      </div>

      {/* ─── NEW ARRIVALS ─── */}
      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2 className="section-title">{t('new_arrivals')}</h2>
              <div className="section-sub">{t('new_arrivals_sub')}</div>
            </div>
            <Link href="/catalog?badge=new" className="section-link">
              {t('see_all')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="product-grid anim-children">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─── */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2 className="section-title">{t('best_sellers')}</h2>
              <div className="section-sub">{t('best_sellers_sub')}</div>
            </div>
          </div>
          <div className="product-grid anim-children">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
