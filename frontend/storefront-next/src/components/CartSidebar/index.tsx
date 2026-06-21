'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './CartSidebar.module.css';

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CartEmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

export default function CartSidebar() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice } = useCart();
  if (!state.isOpen) return null;

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const tax      = totalPrice * 0.08;
  const total    = totalPrice + shipping + tax;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <aside className={styles.drawer} role="dialog" aria-label="Shopping cart">

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>
            Shopping Cart
            <span className={styles.titleCount}>({state.items.length})</span>
          </div>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {state.items.length === 0 ? (
          /* Empty state */
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><CartEmptyIcon /></div>
            <div className={styles.emptyTitle}>Your cart is empty</div>
            <div className={styles.emptySub}>Add products to get started</div>
            <Link href="/catalog" onClick={closeCart} className={styles.browseBtnLink}>
              <button className={styles.browseBtn}>Browse Products</button>
            </Link>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className={styles.itemsList}>
              {state.items.map(item => (
                <div key={item.product.id} className={styles.item}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className={styles.itemImg}
                  />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.product.title}</div>
                    <div className={styles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</div>
                    <div className={styles.qtyRow}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon />
                      </button>
                      <span className={styles.qtyNum}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.product.id)}
                    aria-label="Remove item"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer / totals */}
            <div className={styles.drawerFooter}>
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Shipping</span>
                  <span className={shipping === 0 ? styles.shippingFree : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className={styles.totalRow}>
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className={styles.totalRowMain}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 100 && (
                <div className={styles.freeShippingHint}>
                  Add ${(100 - totalPrice).toFixed(2)} more for free shipping
                </div>
              )}

              <Link href="/checkout" onClick={closeCart} className={styles.checkoutLink}>
                <button className={styles.checkoutBtn}>Proceed to Checkout</button>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
