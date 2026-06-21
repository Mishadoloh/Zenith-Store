'use client';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useToast } from '@/components/ToastProvider';
import { useTranslation } from '@/context/LanguageContext';
import { useCallback } from 'react';
import styles from './ProductCard.module.css';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.starsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          width="12" height="12"
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke={i <= Math.round(rating) ? '#f59e0b' : '#3f3f46'}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

function calcDiscount(price: number, original: number) {
  return Math.round((1 - price / original) * 100);
}

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

function getBadgeClass(badge: string) {
  switch (badge) {
    case 'bestseller': return styles.badgeBestseller;
    case 'sale':       return styles.badgeSale;
    case 'new':        return styles.badgeNew;
    case 'featured':   return styles.badgeFeatured;
    default:           return styles.badgeNew;
  }
}

export default function ProductCard({ product: rawProduct }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { add: addToCompare, has: isInCompare, remove: removeFromCompare } = useCompare();
  const { addToast } = useToast();
  const { tProduct, t } = useTranslation();

  const product = tProduct(rawProduct);
  const inCart   = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);
  const compared = isInCompare(product.id);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addItem(rawProduct);
    addToast(`"${product.title.slice(0, 24)}..." ${t('added_to_cart').toLowerCase()}`);
  }, [product, rawProduct, addItem, addToast, t]);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist(rawProduct);
    addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  }, [rawProduct, toggleWishlist, wishlisted, addToast]);

  const handleCompare = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (compared) {
      removeFromCompare(product.id);
      addToast('Removed from compare');
    } else {
      addToCompare(rawProduct);
      addToast('Added to compare');
    }
  }, [rawProduct, product.id, compared, addToCompare, removeFromCompare, addToast]);

  return (
    <Link href={`/products/${product.id}`} className={styles.card} id={`product-card-${product.id}`}>
      <div className={styles.imgWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.title} className={styles.img} loading="lazy" />

        {product.badge && (
          <span className={`${styles.badge} ${getBadgeClass(product.badge)}`}>
            {product.badge === 'bestseller' ? 'Best Seller'
              : product.badge === 'sale' ? `−${calcDiscount(product.price, product.originalPrice!)}%`
              : product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}
          </span>
        )}

        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${compared ? styles.active : ''}`}
            title={compared ? 'Remove from compare' : 'Compare'}
            onClick={handleCompare}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M16 3h5v18h-5zM3 3h5v18H3zM9.5 3h5v18h-5z"/>
            </svg>
          </button>
          <button
            className={`${styles.actionBtn} ${wishlisted ? styles.active : ''}`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={handleWishlist}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{product.subcategory}</div>
        <h3 className={styles.name}>{product.title}</h3>

        <div className={styles.starsWrap}>
          <StarRating rating={product.rating} />
          <span className={styles.ratingVal}>{product.rating}</span>
          <span className={styles.ratingCnt}>({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className={`${styles.addBtn} ${inCart ? styles.addBtnInCart : ''}`}
            onClick={handleAdd}
            aria-label={inCart ? 'In cart' : 'Add to cart'}
          >
            {inCart ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t('added_to_cart')}
              </>
            ) : (
              <><PlusIcon /> {t('add_to_cart')}</>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
