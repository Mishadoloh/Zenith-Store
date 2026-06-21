'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTranslation } from '@/context/LanguageContext';

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

export default function CartPage() {
  const { state, removeItem, updateQuantity, totalPrice } = useCart();
  const { t, tProduct } = useTranslation();
  const items = state.items;

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  return (
    <div className="page-catalog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div className="catalog-header" style={{ marginBottom: '32px' }}>
        <nav className="breadcrumb">
          <Link href="/">{t('home')}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{t('cart')}</span>
        </nav>
        <h1 className="catalog-title" style={{ margin: '12px 0 4px' }}>{t('your_cart')}</h1>
        <div className="catalog-count">{items.length} {t('items_in_cart')}</div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-3)' }}>
          <div style={{ marginBottom: '16px', color: 'var(--text-2)' }}><CartEmptyIcon /></div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-1)', marginBottom: '8px' }}>{t('cart_empty')}</div>
          <div style={{ fontSize: '14px', marginBottom: '24px' }}>{t('cart_empty_sub')}</div>
          <Link href="/catalog" className="btn btn-primary">
            {t('continue_shopping')}
          </Link>
        </div>
      ) : (
        <div className="checkout-grid" style={{ gap: '32px', alignItems: 'start' }}>
          {/* List of items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(item => {
              const product = tProduct(item.product);
              return (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '20px',
                    position: 'relative'
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-1)', marginBottom: '4px' }}>
                      {product.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '12px' }}>
                      {product.subcategory}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px' }}>
                        <button
                          style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}
                          onClick={() => updateQuantity(product.id, item.quantity - 1)}
                        >
                          <MinusIcon />
                        </button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600, fontSize: '13px' }}>
                          {item.quantity}
                        </span>
                        <button
                          style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}
                          onClick={() => updateQuantity(product.id, item.quantity + 1)}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-1)' }}>
                        ${(product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <button
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      color: 'var(--text-3)',
                      cursor: 'pointer'
                    }}
                    onClick={() => removeItem(product.id)}
                    aria-label="Remove"
                  >
                    <CloseIcon />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div
            style={{
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '24px'
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.2px' }}>{t('order_summary')}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-2)' }}>
                <span>{t('subtotal')}</span>
                <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>${totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-2)' }}>
                <span>{t('shipping')}</span>
                <span style={{ color: shipping === 0 ? 'var(--green)' : 'var(--text-1)', fontWeight: 500 }}>
                  {shipping === 0 ? t('free') : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-2)' }}>
                <span>{t('tax')}</span>
                <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700 }}>
                <span>{t('total')}</span>
                <span style={{ color: 'var(--accent-light)', fontSize: '18px' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {totalPrice < 100 && (
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-2)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}
              >
                {t('free_shipping_hint', { price: (100 - totalPrice).toFixed(2) })}
              </div>
            )}

            <Link href="/checkout" style={{ display: 'block' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', height: '44px', justifyContent: 'center', fontWeight: 700 }}
              >
                {t('proceed_checkout')}
              </button>
            </Link>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link href="/catalog" style={{ fontSize: '13px', color: 'var(--text-3)', fontWeight: 500 }}>
                {t('continue_shopping')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
