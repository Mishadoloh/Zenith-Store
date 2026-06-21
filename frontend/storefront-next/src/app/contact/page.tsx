'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useState } from 'react';

const contactCards = [
  {
    label: 'Email Us',
    value: 'support@zenithstore.com',
    sub: 'We reply within 24 hours',
    color: 'var(--accent-light)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+1 (800) 555-0192',
    sub: 'Mon–Fri, 9am–6pm EST',
    color: 'var(--green)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.22 1C.22.55.56.1 1.1.1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L5.18 7.38a16 16 0 006.56 6.56l1.65-1.16a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Live Chat',
    value: 'Chat Now',
    sub: 'Average wait: 3 minutes',
    color: '#a78bfa',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: 'Visit Us',
    value: '42 Commerce Blvd, NY 10001',
    sub: 'Mon–Fri, 10am–4pm',
    color: '#f59e0b',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const subjects = [
  'General Inquiry',
  'Order Issue',
  'Return / Refund',
  'Shipping Question',
  'Product Information',
  'Partnership',
  'Press / Media',
  'Other',
];

type FormState = { name: string; email: string; subject: string; message: string };
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:8002/api/support/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const cs: React.CSSProperties = { minHeight: '100vh', background: 'var(--bg-surface)', color: 'var(--text-1)', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '80px' };
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.06) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 24px 48px', textAlign: 'center' };
  const mw: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' };
  const bc: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', justifyContent: 'center' };
  const card: React.CSSProperties = { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 24px', backdropFilter: 'blur(12px)' };
  const inputCss: React.CSSProperties = { width: '100%', padding: '13px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-1)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'Inter, system-ui, sans-serif' };
  const labelCss: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '8px' };
  const btnCss: React.CSSProperties = { padding: '14px 36px', background: 'var(--accent-light)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'opacity 0.2s' };

  const onFocus = (e: React.FocusEvent<any>) => { e.target.style.borderColor = 'var(--accent-light)'; };
  const onBlur = (e: React.FocusEvent<any>) => { e.target.style.borderColor = 'var(--border)'; };

  return (
    <div style={cs}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={hero}>
        <div style={bc}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>Contact</span>
        </div>
        <h1 style={{ fontSize: '44px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Get In Touch</h1>
        <p style={{ fontSize: '17px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto' }}>
          Have a question, concern, or just want to say hello? We&apos;re here to help.
        </p>
      </div>

      <div style={{ ...mw, marginTop: '60px' }}>
        {/* Contact Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {contactCards.map((c) => (
            <div
              key={c.label}
              style={{ ...card, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 32px ${c.color}22`; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: `${c.color}18`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, marginBottom: '16px' }}>
                {c.icon}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{c.label}</p>
              <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '4px' }}>{c.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: 0 }}>{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Form + Sidebar Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '32px', alignItems: 'start' }}>
          {/* Contact Form */}
          <div style={card}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Send a Message</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', marginBottom: '28px' }}>Fill in the form below and we&apos;ll get back to you as soon as possible.</p>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', animation: 'fadeIn 0.4s ease' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '14px', marginBottom: '24px' }}>Thank you for reaching out. Our team will respond within 24 hours.</p>
                <button onClick={() => setStatus('idle')} style={{ ...btnCss, background: 'var(--bg-surface)', color: 'var(--text-1)', border: '1px solid var(--border)' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={labelCss}>Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={labelCss}>Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" style={inputCss} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelCss}>Subject *</label>
                  <select name="subject" required value={form.subject} onChange={handleChange} style={{ ...inputCss, appearance: 'none' }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="">Select a subject...</option>
                    {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={labelCss}>Message *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    style={{ ...inputCss, resize: 'vertical', minHeight: '140px' }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(239,68,68,0.08)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)', fontSize: '13px', color: 'var(--red)' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button type="submit" style={btnCss} disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12c0-4.97-4.03-9-9-9" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={card}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Business Hours</h3>
              {[
                ['Monday – Friday', '9:00 AM – 6:00 PM EST'],
                ['Saturday', '10:00 AM – 4:00 PM EST'],
                ['Sunday', 'Closed'],
              ].map(([day, hours]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-2)' }}>{day}</span>
                  <span style={{ color: hours === 'Closed' ? 'var(--red)' : 'var(--text-1)', fontWeight: 600 }}>{hours}</span>
                </div>
              ))}
            </div>

            <div style={card}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { label: 'Track Your Order', href: '/track-order' },
                  { label: 'Shipping & Returns', href: '/shipping-returns' },
                  { label: 'My Account', href: '/account' },
                  { label: 'Privacy Policy', href: '/privacy' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', color: 'var(--text-2)', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-light)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ ...card, background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(16,185,129,0.06) 100%)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>Average Response Times</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '16px', lineHeight: 1.6 }}>We aim to respond to all inquiries promptly during business hours.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--bg-raised)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-light)', margin: '0 0 4px' }}>&lt;1h</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>Live Chat</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--bg-raised)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--green)', margin: '0 0 4px' }}>24h</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>Email</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--bg-raised)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '20px', fontWeight: 800, color: '#a78bfa', margin: '0 0 4px' }}>4h</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', margin: 0 }}>Phone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
