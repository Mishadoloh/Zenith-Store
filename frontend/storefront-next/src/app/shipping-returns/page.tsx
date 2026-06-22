'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useState } from 'react';

const shippingTiers = [
  { name: 'Free Shipping', price: '$0.00', minOrder: '$75+', delivery: '5–8 business days', tracking: 'Basic tracking', color: 'var(--green)', badge: 'Popular' },
  { name: 'Standard', price: '$4.99', minOrder: 'Any order', delivery: '3–5 business days', tracking: 'Full tracking', color: 'var(--accent-light)', badge: null },
  { name: 'Express', price: '$12.99', minOrder: 'Any order', delivery: '1–2 business days', tracking: 'Full tracking', color: '#a78bfa', badge: 'Fast' },
  { name: 'Overnight', price: '$24.99', minOrder: 'Any order', delivery: 'Next business day', tracking: 'Priority tracking', color: '#f59e0b', badge: 'Fastest' },
];

const returnSteps = [
  {
    step: '01',
    title: 'Initiate Return',
    description: 'Log into your account, navigate to Orders, and select the item you wish to return. Fill in the reason and submit the return request online within 30 days of delivery.',
    color: 'var(--accent-light)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Ship It Back',
    description: 'Print the prepaid return label emailed to you. Drop the package at any UPS or FedEx location within 14 days of approval. Keep your receipt for tracking purposes.',
    color: '#a78bfa',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Get Refunded',
    description: 'Once we receive and inspect your return (1–3 business days), we process your refund. Expect the amount back in 3–5 business days to your original payment method.',
    color: 'var(--green)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const internationalZones = [
  { zone: 'Zone 1 – Canada & Mexico', delivery: '4–7 business days', price: '$9.99', duties: 'Recipient pays' },
  { zone: 'Zone 2 – Europe', delivery: '7–14 business days', price: '$19.99', duties: 'Recipient pays' },
  { zone: 'Zone 3 – Asia Pacific', delivery: '10–18 business days', price: '$24.99', duties: 'Recipient pays' },
  { zone: 'Zone 4 – Rest of World', delivery: '14–21 business days', price: '$34.99', duties: 'Recipient pays' },
];

const faqs = [
  { q: 'What items are not eligible for return?', a: 'Perishable goods, digital downloads, gift cards, intimate apparel, and hazardous materials cannot be returned. All sale items are final sale unless defective.' },
  { q: 'Can I exchange an item instead of returning it?', a: 'Yes! During the return initiation process, select "Exchange" instead of "Refund". Exchanges are subject to product availability and same-day processing.' },
  { q: 'What if my item arrives damaged?', a: 'Contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or full refund at no cost to you, including return shipping.' },
  { q: 'Do you offer free returns?', a: 'Free return shipping is available for orders over $75 within the contiguous US. Standard return shipping costs $4.99 for smaller orders.' },
  { q: 'How long do I have to return an item?', a: 'We accept returns within 30 days of the delivery date. Items must be in original condition, unworn, and in original packaging with all tags attached.' },
];

export default function ShippingReturnsPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cs: React.CSSProperties = { minHeight: '100vh', background: 'var(--bg-surface)', color: 'var(--text-1)', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '80px' };
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.08) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 24px 48px', textAlign: 'center' };
  const mw: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' };
  const bc: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', justifyContent: 'center' };
  const card: React.CSSProperties = { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 24px', backdropFilter: 'blur(12px)' };
  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '14px 16px', color: 'var(--text-3)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' };
  const tdStyle: React.CSSProperties = { padding: '16px', borderBottom: '1px solid var(--border)', color: 'var(--text-2)', verticalAlign: 'middle' };

  return (
    <div style={cs}>
      <div style={hero}>
        <div style={bc}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>{t('home')}</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>Shipping &amp; Returns</span>
        </div>
        <h1 style={{ fontSize: '44px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Shipping &amp; Returns</h1>
        <p style={{ fontSize: '17px', color: 'var(--text-2)', maxWidth: '560px', margin: '0 auto' }}>
          Fast, reliable delivery to your door—and a hassle-free return process if you need it.
        </p>
      </div>

      <div style={{ ...mw, marginTop: '60px' }}>
        {/* Shipping Tiers */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>Shipping Options</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', marginBottom: '36px' }}>Choose the speed that works for you. Free shipping on orders over $75.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {shippingTiers.map((tier) => (
              <div
                key={tier.name}
                style={{ ...card, borderTop: `3px solid ${tier.color}`, position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 40px ${tier.color}22`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                {tier.badge && (
                  <span style={{ position: 'absolute', top: '-1px', right: '20px', background: tier.color, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '0 0 8px 8px', letterSpacing: '0.04em' }}>
                    {tier.badge}
                  </span>
                )}
                <p style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Shipping Tier</p>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px', color: tier.color }}>{tier.name}</h3>
                <p style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-1)' }}>{tier.price}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[['Min. order', tier.minOrder], ['Delivery', tier.delivery], ['Tracking', tier.tracking]].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: 'var(--text-3)' }}>{label}</span>
                      <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div style={card}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px' }}>Full Comparison</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Feature</th>
                    <th style={{ ...thStyle, color: 'var(--green)' }}>Free</th>
                    <th style={{ ...thStyle, color: 'var(--accent-light)' }}>Standard</th>
                    <th style={{ ...thStyle, color: '#a78bfa' }}>Express</th>
                    <th style={{ ...thStyle, color: '#f59e0b' }}>Overnight</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Cost', '$0', '$4.99', '$12.99', '$24.99'],
                    ['Delivery Time', '5–8 days', '3–5 days', '1–2 days', 'Next day'],
                    ['Weekend Delivery', '✗', '✗', '✓', '✓'],
                    ['Tracking Updates', 'Basic', 'Full', 'Full', 'Priority'],
                    ['Insurance Coverage', '$100', '$200', '$500', '$1,000'],
                    ['Signature Required', '✗', '✗', 'Optional', 'Required'],
                  ].map(([feature, ...vals], i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, color: 'var(--text-1)', fontWeight: 600 }}>{feature}</td>
                      {vals.map((v, j) => <td key={j} style={tdStyle}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Returns Process */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>Returns Process</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', marginBottom: '36px' }}>Returning an item is simple. Follow these three steps and we&apos;ll handle the rest.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {returnSteps.map((step, idx) => (
              <div key={idx} style={{ ...card, position: 'relative', borderTop: `3px solid ${step.color}` }}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '56px', fontWeight: 900, color: `${step.color}18`, lineHeight: 1, userSelect: 'none' }}>{step.step}</div>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${step.color}18`, border: `2px solid ${step.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, marginBottom: '16px' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{step.description}</p>
              </div>
            ))}
          </div>

          <div style={{ ...card, marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" style={{ flexShrink: 0 }}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', margin: 0 }}>
              <strong style={{ color: 'var(--text-1)' }}>30-Day Return Window.</strong> All eligible items can be returned within 30 days of delivery. Items must be unused and in original packaging with all tags attached.
            </p>
          </div>
        </section>

        {/* International Shipping */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>International Shipping</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', marginBottom: '36px' }}>We ship to 50+ countries worldwide. Rates and delivery times vary by destination zone.</p>

          <div style={card}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr>
                    {['Region', 'Est. Delivery', 'Starting Rate', 'Duties & Taxes'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {internationalZones.map((zone, i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, color: 'var(--text-1)', fontWeight: 600 }}>{zone.zone}</td>
                      <td style={tdStyle}>{zone.delivery}</td>
                      <td style={{ ...tdStyle, color: 'var(--accent-light)', fontWeight: 600 }}>{zone.price}</td>
                      <td style={tdStyle}>
                        <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                          {zone.duties}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text-3)', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              ⚠️ International orders may be subject to customs delays. We are not responsible for duties, taxes, or import fees imposed by your country.
            </p>
          </div>

          {/* Countries visual */}
          <div style={{ ...card, marginTop: '24px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(16,185,129,0.04) 100%)', flexDirection: 'column', gap: '16px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <p style={{ color: 'var(--text-3)', fontSize: '14px', fontWeight: 600 }}>Shipping to 50+ countries across 6 continents</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['🇺🇸 USA', '🇨🇦 Canada', '🇬🇧 UK', '🇩🇪 Germany', '🇫🇷 France', '🇯🇵 Japan', '🇦🇺 Australia', '🇧🇷 Brazil'].map(c => (
                <span key={c} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: 'var(--text-2)' }}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', marginBottom: '36px' }}>Quick answers to common shipping and returns questions.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{ ...card, cursor: 'pointer', transition: 'border-color 0.2s', borderColor: openFaq === idx ? 'var(--accent-light)' : 'var(--border)' }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{faq.q}</h3>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2"
                    style={{ flexShrink: 0, marginLeft: '16px', transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                {openFaq === idx && (
                  <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 0 }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
