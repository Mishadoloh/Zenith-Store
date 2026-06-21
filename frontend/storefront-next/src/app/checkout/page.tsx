'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; city: string; country: string; zip: string;
  cardNumber: string; cardName: string; expiry: string; cvv: string;
}
type Errors = Partial<Record<keyof FormData, string>>;

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', country: '', zip: '',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const upd = (f: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  const validate = () => {
    const e: Errors = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address) e.address = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.zip) e.zip = 'Required';
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length !== 16) e.cardNumber = 'Enter a valid 16-digit card';
    if (!form.cardName) e.cardName = 'Required';
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY format required';
    if (!form.cvv || !/^\d{3,4}$/.test(form.cvv)) e.cvv = '3 or 4 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    setStep('success');
    setLoading(false);
  };

  if (step === 'success') {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-check"><CheckCircleIcon /></div>
          <h1 className="success-title">Order Confirmed</h1>
          <p className="success-text">
            Thank you, <strong>{form.firstName}</strong>. Your order has been placed successfully.<br />
            A confirmation has been sent to <strong>{form.email}</strong>.<br />
            Estimated delivery: <strong>3–5 business days</strong>.
          </p>
          <Link href="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-checkout">
      <div className="checkout-inner">
        <nav className="breadcrumb" style={{ marginBottom: '16px' }}>
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/catalog">Shop</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Checkout</span>
        </nav>
        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="checkout-grid">
            <div>
              {/* SHIPPING */}
              <div className="checkout-block">
                <div className="checkout-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  Shipping Information
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input className={`form-field ${errors.firstName ? 'err' : ''}`} value={form.firstName} onChange={upd('firstName')} />
                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input className={`form-field ${errors.lastName ? 'err' : ''}`} value={form.lastName} onChange={upd('lastName')} />
                    {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" className={`form-field ${errors.email ? 'err' : ''}`} value={form.email} onChange={upd('email')} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-field" value={form.phone} onChange={upd('phone')} />
                  </div>
                  <div className="form-group form-col-2">
                    <label className="form-label">Street Address *</label>
                    <input className={`form-field ${errors.address ? 'err' : ''}`} value={form.address} onChange={upd('address')} placeholder="123 Main Street" />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input className={`form-field ${errors.city ? 'err' : ''}`} value={form.city} onChange={upd('city')} />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP / Postal Code *</label>
                    <input className={`form-field ${errors.zip ? 'err' : ''}`} value={form.zip} onChange={upd('zip')} />
                    {errors.zip && <span className="form-error">{errors.zip}</span>}
                  </div>
                </div>
              </div>

              {/* PAYMENT */}
              <div className="checkout-block">
                <div className="checkout-block-title">
                  <LockIcon />
                  Payment Details
                </div>
                <div className="test-notice">
                  <LockIcon />
                  Test mode — use card 4242 4242 4242 4242, any future date, any CVV
                </div>
                <div className="form-grid">
                  <div className="form-group form-col-2">
                    <label className="form-label">Card Number *</label>
                    <input
                      className={`form-field ${errors.cardNumber ? 'err' : ''}`}
                      value={form.cardNumber}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setForm(p => ({ ...p, cardNumber: v.replace(/(.{4})/g, '$1 ').trim() }));
                      }}
                    />
                    {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                  </div>
                  <div className="form-group form-col-2">
                    <label className="form-label">Cardholder Name *</label>
                    <input className={`form-field ${errors.cardName ? 'err' : ''}`} value={form.cardName} onChange={upd('cardName')} placeholder="Name on card" />
                    {errors.cardName && <span className="form-error">{errors.cardName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expiry Date *</label>
                    <input
                      className={`form-field ${errors.expiry ? 'err' : ''}`}
                      value={form.expiry}
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={e => {
                        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                        setForm(p => ({ ...p, expiry: v }));
                      }}
                    />
                    {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV *</label>
                    <input
                      className={`form-field ${errors.cvv ? 'err' : ''}`}
                      value={form.cvv}
                      placeholder="123"
                      maxLength={4}
                      onChange={e => setForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    />
                    {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || state.items.length === 0}
                className="btn-place-order"
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    Processing...
                  </span>
                ) : (
                  <><LockIcon /> Place Order — ${total.toFixed(2)}</>
                )}
              </button>
            </div>

            {/* ORDER SUMMARY */}
            <div className="order-aside">
              <div className="order-aside-title">Order Summary</div>
              {state.items.length === 0 ? (
                <div style={{ color: 'var(--text-3)', textAlign: 'center', padding: '32px 0', fontSize: '13px' }}>
                  Your cart is empty. <Link href="/catalog" style={{ color: 'var(--accent-light)' }}>Shop now</Link>
                </div>
              ) : (
                <>
                  <div className="order-items">
                    {state.items.map(item => (
                      <div key={item.product.id} className="order-item">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.product.image} alt={item.product.title} className="order-item-img" />
                        <div className="order-item-name">
                          {item.product.title}
                          <div style={{ color: 'var(--text-3)', marginTop: '2px' }}>Qty: {item.quantity}</div>
                        </div>
                        <div className="order-item-price">${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <hr className="order-divider" />
                  <div className="order-rows">
                    <div className="order-row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                    <div className="order-row">
                      <span>Shipping</span>
                      <span style={{ color: shipping === 0 ? 'var(--green)' : undefined }}>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="order-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                    <div className="order-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
