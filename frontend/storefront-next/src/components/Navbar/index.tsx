'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useTranslation, Language } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);
const HeartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const CompareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3h5v18h-5zM3 3h5v18H3zM9.5 3h5v18h-5z"/>
  </svg>
);

export default function Navbar() {
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { items: compareItems } = useCompare();
  const { t, language, setLanguage } = useTranslation();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/catalog?q=${encodeURIComponent(query.trim())}`);
  }, [query, router]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>ZEN<span>ITH</span></Link>

        <form className={styles.searchWrap} onSubmit={handleSearch}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            className={styles.searchInput}
            type="search"
            placeholder={t('search_placeholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search"
            id="navbar-search"
          />
        </form>

        <div className={styles.actions}>
          <Link href="/" className={styles.link}>{t('home')}</Link>
          <Link href="/catalog" className={styles.link}>{t('shop')}</Link>
          <Link href="/deals" className={styles.linkDeals}>{t('deals')}</Link>

          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            className={styles.langSelect}
            aria-label="Language selector"
          >
            <option value="en">EN</option>
            <option value="uk">UA</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
          </select>

          <Link href="/wishlist" className={styles.iconBtn} title="Wishlist">
            <HeartIcon />
            {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
          </Link>

          <Link href="/compare" className={styles.iconBtn} title="Compare">
            <CompareIcon />
            {compareItems.length > 0 && <span className={styles.badge}>{compareItems.length}</span>}
          </Link>

          <Link
            href="/cart"
            className={styles.cartBtn}
            aria-label={`Cart (${totalItems} items)`}
            id="navbar-cart-btn"
          >
            <CartIcon />
            {t('cart')}
            {totalItems > 0 && (
              <span className={styles.cartCount} key={totalItems}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {user && (
            <Link href="/profile" className={styles.iconBtn} title={t('profile')} style={{ border: '1px solid var(--border)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
