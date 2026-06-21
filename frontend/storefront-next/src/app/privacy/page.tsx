'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useState, useEffect, useRef } from 'react';

const sections = [
  { id: 'data-collection', title: '1. Data We Collect' },
  { id: 'data-usage', title: '2. How We Use Your Data' },
  { id: 'cookies', title: '3. Cookies & Tracking' },
  { id: 'third-parties', title: '4. Third-Party Services' },
  { id: 'security', title: '5. Data Security' },
  { id: 'your-rights', title: '6. Your Rights' },
  { id: 'contact-dpo', title: '7. Contact Us' },
];

export default function PrivacyPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('data-collection');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cs: React.CSSProperties = { minHeight: '100vh', background: 'var(--bg-surface)', color: 'var(--text-1)', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '80px' };
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(16,185,129,0.06) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 24px 40px', textAlign: 'center' };
  const bc: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-3)', marginBottom: '20px', justifyContent: 'center' };
  const card: React.CSSProperties = { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 24px', backdropFilter: 'blur(12px)' };
  const secStyle: React.CSSProperties = { marginBottom: '52px', scrollMarginTop: '100px' };
  const h2Style: React.CSSProperties = { fontSize: '22px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-1)', paddingBottom: '12px', borderBottom: '1px solid var(--border)' };
  const pStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.85, marginBottom: '16px' };
  const liStyle: React.CSSProperties = { fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '10px', paddingLeft: '4px' };

  return (
    <div style={cs}>
      {/* Hero */}
      <div style={hero}>
        <div style={bc}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>Privacy Policy</span>
        </div>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Legal Document
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 16px' }}>
          We are committed to protecting your personal information and your right to privacy.
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Last updated: June 1, 2025 · Effective: June 1, 2025</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 0', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Sticky TOC */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={card}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Table of Contents</p>
            <nav>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px',
                    borderRadius: '8px', border: 'none',
                    background: activeSection === sec.id ? 'rgba(99,102,241,0.12)' : 'transparent',
                    color: activeSection === sec.id ? 'var(--accent-light)' : 'var(--text-2)',
                    fontSize: '13px', fontWeight: activeSection === sec.id ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.2s', marginBottom: '2px',
                    borderLeft: activeSection === sec.id ? '2px solid var(--accent-light)' : '2px solid transparent',
                  }}
                >
                  {sec.title}
                </button>
              ))}
            </nav>
          </div>
          <div style={{ ...card, marginTop: '16px', background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--green)' }}>We never sell your data.</strong> Your privacy is a right, not a privilege we offer conditionally.
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Summary Banner */}
          <div style={{ ...card, marginBottom: '32px', background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.2)' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', margin: 0, lineHeight: 1.75 }}>
              <strong style={{ color: 'var(--accent-light)' }}>Summary:</strong> Zenith Store collects only the data necessary to provide our services. We never sell your personal information. You have full control over your data and can request deletion at any time by contacting our DPO.
            </p>
          </div>

          <section id="data-collection" style={secStyle}>
            <h2 style={h2Style}>1. Data We Collect</h2>
            <p style={pStyle}>We collect information you provide directly to us, information we collect automatically when you use our services, and information we receive from trusted third parties.</p>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Information you provide directly:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 20px' }}>
              {[
                'Full name and contact details (email address, phone number, shipping address)',
                'Payment information (processed securely — we never store full card numbers or CVV codes)',
                'Account credentials (username and bcrypt-encrypted password)',
                'Communications with our customer support team and chat history',
                'Product reviews, ratings, and feedback you voluntarily submit',
                'Wish lists, saved searches, and product preferences',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Information collected automatically:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Device and browser information (type, version, operating system)',
                'IP address and approximate geographic location (city/country level)',
                'Pages viewed, time spent on each page, and links clicked',
                'Referring websites, search terms, and navigation paths',
                'Purchase history, cart activity, and browsing behavior on our platform',
                'Session identifiers and authentication tokens (stored securely, not accessible by third parties)',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
          </section>

          <section id="data-usage" style={secStyle}>
            <h2 style={h2Style}>2. How We Use Your Data</h2>
            <p style={pStyle}>We use the information we collect to provide, improve, and personalize our services to you. We process your data only when we have a lawful basis for doing so—typically contract performance, legitimate interest, or your explicit consent.</p>
            <p style={pStyle}>Specifically, we use your data to:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Process and fulfill your orders, including payment processing and shipment coordination',
                'Send transactional emails (order confirmations, shipping updates, invoices, and receipts)',
                'Respond to your inquiries and provide timely, accurate customer support',
                'Personalize product recommendations based on your browsing and purchase history',
                'Improve our website performance, fix bugs, and analyze aggregate usage patterns',
                'Detect, investigate, and prevent fraud, abuse, chargebacks, and security incidents',
                'Comply with legal obligations and enforce our Terms of Service where required',
                'Send marketing emails and promotional communications (only with your explicit consent)',
                'Conduct surveys and user research to improve our products and services',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={{ ...pStyle, fontWeight: 500, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', padding: '14px 16px', color: 'var(--text-1)' }}>
              We will <strong>never</strong> sell, rent, or lease your personal information to any third party for their own marketing or business purposes.
            </p>
          </section>

          <section id="cookies" style={secStyle}>
            <h2 style={h2Style}>3. Cookies & Tracking</h2>
            <p style={pStyle}>We use cookies and similar tracking technologies (web beacons, pixel tags) to enhance your experience on our platform. Cookies are small text files stored on your device when you visit our website.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {[
                { type: 'Essential', desc: 'Required for the site to function correctly. These cannot be disabled and do not track personal data.', color: 'var(--red)' },
                { type: 'Analytics', desc: 'Help us understand how users navigate and interact with our site so we can improve it continuously.', color: 'var(--accent-light)' },
                { type: 'Functional', desc: 'Enable personalized features such as saved shopping carts, language preferences, and recently viewed products.', color: '#a78bfa' },
                { type: 'Marketing', desc: 'Used to serve relevant advertisements on third-party platforms. These require your explicit consent to be activated.', color: '#f59e0b' },
              ].map((c) => (
                <div key={c.type} style={{ padding: '16px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', borderTop: `3px solid ${c.color}` }}>
                  <p style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: c.color }}>{c.type} Cookies</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              ))}
            </div>
            <p style={pStyle}>You can control and manage cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of our website. We also honor browser-level "Do Not Track" signals and Global Privacy Control (GPC) headers.</p>
            <p style={pStyle}>Our cookies have a maximum retention period of 12 months, after which they are automatically deleted or require renewal of consent.</p>
          </section>

          <section id="third-parties" style={secStyle}>
            <h2 style={h2Style}>4. Third-Party Services</h2>
            <p style={pStyle}>We work with trusted third-party service providers to operate our business efficiently. These providers have access to your data only as necessary to perform their contracted services and are bound by strict data processing agreements and confidentiality obligations.</p>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Our key service providers include:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Stripe — Payment processing and fraud prevention (PCI-DSS Level 1 Service Provider)',
                'Amazon Web Services (AWS) — Cloud infrastructure, data storage, and content delivery',
                'Google Analytics 4 — Website analytics and user behavior measurement (anonymized)',
                'Mailchimp / Klaviyo — Email marketing platform (only activated with your consent)',
                'UPS, FedEx, USPS, DHL — Shipping, fulfillment, and last-mile delivery services',
                'Cloudflare — Content delivery network, DDoS protection, and security scanning',
                'Zendesk — Customer support ticketing system for managing support requests',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>All third-party providers are contractually prohibited from using your data for any purpose other than providing services to Zenith Store. We conduct regular vendor privacy assessments and only work with providers who meet our strict security and privacy standards.</p>
            <p style={pStyle}>We do not share your personal data with third parties for their own advertising, marketing, or business purposes without your explicit, informed consent.</p>
          </section>

          <section id="security" style={secStyle}>
            <h2 style={h2Style}>5. Data Security</h2>
            <p style={pStyle}>We take the security of your personal information very seriously and implement multiple layers of industry-standard security controls to protect your data at all times.</p>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Our security measures include:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'All data in transit is encrypted using TLS 1.3 with perfect forward secrecy',
                'Sensitive data at rest is encrypted using AES-256 encryption',
                'Payment card data is handled exclusively by PCI-DSS compliant processors — we never store it directly',
                'Annual third-party security audits and quarterly penetration testing by certified firms',
                'Multi-factor authentication (MFA) available and strongly encouraged for all user accounts',
                'Automated threat detection, intrusion prevention systems, and 24/7 security monitoring',
                'Principle of least privilege — employees access only the data necessary for their specific role',
                'Data breach response plan with mandatory 72-hour notification to affected users and regulators',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>While we implement robust security measures, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security. We encourage you to use a strong, unique password for your account and enable multi-factor authentication.</p>
            <p style={pStyle}>If you discover a security vulnerability, please report it responsibly to our security team at <strong style={{ color: 'var(--accent-light)' }}>security@zenithstore.com</strong>. We operate a responsible disclosure program and will respond within 48 hours.</p>
          </section>

          <section id="your-rights" style={secStyle}>
            <h2 style={h2Style}>6. Your Rights</h2>
            <p style={pStyle}>Depending on your location and applicable privacy laws (including GDPR, CCPA, PIPEDA, and others), you may have the following rights regarding your personal data. We honor all applicable rights regardless of your jurisdiction.</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 20px' }}>
              {[
                'Right to Access — Request a complete copy of the personal data we hold about you, free of charge',
                'Right to Rectification — Correct any inaccurate, incomplete, or outdated personal data',
                'Right to Erasure — Request deletion of your personal data ("right to be forgotten") subject to legal retention obligations',
                'Right to Data Portability — Receive your data in a structured, machine-readable format (JSON or CSV)',
                'Right to Object — Object to processing based on legitimate interests or direct marketing at any time',
                'Right to Restrict Processing — Limit how we use your data in certain legally defined circumstances',
                'Right to Withdraw Consent — Withdraw any previously given consent for data processing at any time',
                'Right to Non-Discrimination — Exercise your rights without receiving discriminatory treatment or degraded service',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>To exercise any of these rights, please contact our Data Protection Officer at <strong style={{ color: 'var(--accent-light)' }}>privacy@zenithstore.com</strong>. We will respond to verified requests within 30 days (or 45 days for complex requests with written notice of extension).</p>
            <p style={pStyle}>You also have the right to lodge a complaint with your local data protection supervisory authority (e.g., the ICO in the UK, CNIL in France, or your state Attorney General in the US) if you believe your rights have not been adequately respected.</p>
          </section>

          <section id="contact-dpo" style={secStyle}>
            <h2 style={h2Style}>7. Contact Us</h2>
            <p style={pStyle}>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to reach out to our dedicated Data Privacy Team:</p>
            <div style={{ ...card, background: 'var(--bg-surface)', marginBottom: '20px' }}>
              <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '16px' }}>Zenith Store — Data Privacy Team</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>📧 <strong>Email:</strong> privacy@zenithstore.com</p>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>📍 <strong>Address:</strong> 42 Commerce Blvd, New York, NY 10001, United States</p>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>🕐 <strong>Response time:</strong> Within 30 calendar days of receiving your request</p>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>🔒 <strong>DPO:</strong> data.protection@zenithstore.com (for EU/UK GDPR inquiries)</p>
              </div>
            </div>
            <p style={pStyle}>We review and update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, and other factors. When we make material changes, we will notify you by email or by posting a prominent notice on our website at least 30 days before the changes take effect.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
