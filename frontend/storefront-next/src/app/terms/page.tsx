'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useState, useEffect, useRef } from 'react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'products', title: '2. Products & Descriptions' },
  { id: 'orders', title: '3. Orders & Cancellations' },
  { id: 'payment', title: '4. Payment & Pricing' },
  { id: 'returns', title: '5. Returns & Refunds' },
  { id: 'liability', title: '6. Limitation of Liability' },
  { id: 'governing', title: '7. Governing Law' },
];

export default function TermsPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('acceptance');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
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
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(99,102,241,0.08) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 24px 40px', textAlign: 'center' };
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
          <span style={{ color: 'var(--text-1)' }}>Terms of Service</span>
        </div>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Legal Document
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>Terms of Service</h1>
        <p style={{ fontSize: '15px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto 16px' }}>
          Please read these terms carefully before using Zenith Store. By using our services, you agree to be bound by these terms.
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>Last updated: June 1, 2025 · Effective: June 1, 2025</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 0', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '40px', alignItems: 'start' }}>
        {/* TOC Sidebar */}
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
                    background: activeSection === sec.id ? 'rgba(245,158,11,0.1)' : 'transparent',
                    color: activeSection === sec.id ? '#f59e0b' : 'var(--text-2)',
                    fontSize: '13px', fontWeight: activeSection === sec.id ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.2s', marginBottom: '2px',
                    borderLeft: activeSection === sec.id ? '2px solid #f59e0b' : '2px solid transparent',
                  }}
                >
                  {sec.title}
                </button>
              ))}
            </nav>
          </div>
          <div style={{ ...card, marginTop: '16px', background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: '0 0 10px', lineHeight: 1.6 }}>
              <strong style={{ color: '#f59e0b' }}>Have questions?</strong> Our legal team is here to help.
            </p>
            <Link href="/contact" style={{ display: 'inline-block', padding: '8px 14px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '8px', color: '#f59e0b', textDecoration: 'none', fontSize: '12px', fontWeight: 600 }}>
              Contact Legal Team →
            </Link>
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Summary Banner */}
          <div style={{ ...card, marginBottom: '32px', background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', margin: 0, lineHeight: 1.75 }}>
              <strong style={{ color: '#f59e0b' }}>Agreement Overview:</strong> These Terms of Service govern your use of Zenith Store&apos;s website, mobile applications, and services. By creating an account or placing an order, you accept these terms in full. If you disagree with any part of these terms, please discontinue use of our services.
            </p>
          </div>

          <section id="acceptance" style={secStyle}>
            <h2 style={h2Style}>1. Acceptance of Terms</h2>
            <p style={pStyle}>By accessing or using Zenith Store&apos;s website, mobile application, or any related services (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;), our Privacy Policy, and all other policies referenced herein.</p>
            <p style={pStyle}>If you do not agree to all of these Terms, you may not access or use our Services. These Terms apply to all visitors, users, customers, and others who access or use our Services, regardless of how they access it.</p>
            <p style={pStyle}>We reserve the right to modify these Terms at any time at our sole discretion. We will notify you of significant material changes by email to the address associated with your account or by posting a prominent notice on our website. Your continued use of our Services after the effective date of changes constitutes your acceptance of the revised Terms.</p>
            <p style={pStyle}>To use our Services, you must be at least 18 years of age, or the age of majority in your jurisdiction, whichever is greater. By using our Services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding contract.</p>
            <p style={pStyle}>If you are accessing our Services on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms, and references to &quot;you&quot; will include both you individually and that entity.</p>
          </section>

          <section id="products" style={secStyle}>
            <h2 style={h2Style}>2. Products & Descriptions</h2>
            <p style={pStyle}>We strive to describe and represent our products as accurately as reasonably possible. However, we do not warrant that product descriptions, images, specifications, pricing, or other content on our site is accurate, complete, reliable, current, or error-free.</p>
            <p style={pStyle}>Product images are provided for illustrative purposes only. Actual products may vary slightly from images displayed on our website due to photography lighting, screen color calibration, manufacturing variations, or product updates. Color, size, and material specifications are provided to the best of our knowledge and based on information provided by our suppliers.</p>
            <p style={pStyle}>We expressly reserve the right to:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Limit the quantities of any products or services we offer without prior notice',
                'Discontinue any product or product line at any time without notice',
                'Refuse service to any person for any legitimate business reason',
                'Correct typographical errors, inaccuracies, or omissions in product descriptions or pricing',
                'Change product specifications or substitute comparable products when necessary',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>In the event a product is listed with an incorrect price due to a typographical or database error, we reserve the right to refuse or cancel any orders placed at the incorrect price. If your order has already been charged and then cancelled due to a pricing error, we will issue a full refund to your original payment method.</p>
          </section>

          <section id="orders" style={secStyle}>
            <h2 style={h2Style}>3. Orders & Cancellations</h2>
            <p style={pStyle}>When you place an order through our platform, you are making an offer to purchase the selected products at the prices and terms listed. We reserve the right to accept or decline your order for any legitimate reason, including but not limited to: product unavailability, pricing errors, suspected fraudulent activity, or failure to meet our eligibility requirements.</p>
            <p style={pStyle}>Your order is officially confirmed when you receive an order confirmation email from us. This confirmation email constitutes our acceptance of your purchase offer and creates a legally binding contract between you and Zenith Store LLC.</p>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Cancellation Policy:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Orders may be cancelled within 1 hour of placement for a full, no-questions-asked refund',
                'After the 1-hour window, cancellation eligibility depends on the current fulfillment status',
                'Orders that have already been picked, packed, or shipped cannot be cancelled — please initiate a return instead',
                'Custom, personalized, or made-to-order products cannot be cancelled once production has commenced',
                'Cancellation requests must be submitted through your account dashboard or by contacting support',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>In cases of pricing errors, product unavailability, suspected fraud, or other exceptional circumstances, we may cancel orders at our discretion even after confirmation. In such cases, you will receive a full refund and a detailed explanation within 2 business days.</p>
          </section>

          <section id="payment" style={secStyle}>
            <h2 style={h2Style}>4. Payment & Pricing</h2>
            <p style={pStyle}>All prices displayed on our website are in US Dollars (USD) unless otherwise explicitly noted. Prices are subject to change without prior notice. The price charged for a product will be the price displayed at the time the order is placed, except in cases of obvious pricing errors.</p>
            <p style={pStyle}>We accept the following payment methods: Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay, Shop Pay, and Zenith Store Gift Cards. Payment is due in full at the time of order placement.</p>
            <p style={pStyle}>By providing payment information, you represent and warrant that: (a) you are legally authorized to use the payment method provided; (b) you authorize us to charge the total order amount, including applicable taxes, shipping fees, and any other applicable charges; and (c) the payment information you provide is accurate and complete.</p>
            <p style={pStyle}>Sales tax is calculated based on the shipping destination address and applicable state, county, and local tax rates at the time of purchase. Tax rates may vary and are determined by third-party tax calculation software. International orders may be subject to customs duties, import taxes, and value-added taxes (VAT), which are the sole responsibility of the recipient.</p>
            <p style={pStyle}>In the event of a payment dispute or chargeback, we reserve the right to suspend your account pending resolution of the dispute. Fraudulent chargebacks may result in permanent account termination and referral to appropriate legal authorities.</p>
          </section>

          <section id="returns" style={secStyle}>
            <h2 style={h2Style}>5. Returns & Refunds</h2>
            <p style={pStyle}>We want you to be completely satisfied with every purchase from Zenith Store. If for any reason you are not satisfied, we offer a straightforward 30-day return policy for eligible items.</p>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Return Eligibility Conditions:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Items must be in their original, unused, unaltered condition with all original tags attached',
                'Items must be in original packaging, undamaged and suitable for resale',
                'Return requests must be initiated within 30 calendar days of the confirmed delivery date',
                'A return merchandise authorization (RMA) number must be obtained through your account before shipping',
                'Items showing signs of use, damage, alteration, or missing parts may be subject to a restocking fee',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={{ ...pStyle, fontWeight: 600, color: 'var(--text-1)', marginBottom: '10px' }}>Non-Returnable Items (All Sales Final):</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Perishable goods, fresh food, and consumable products',
                'Digital downloads, software licenses, and subscription services',
                'Gift cards, store credit, and prepaid vouchers',
                'Intimate apparel, swimwear, and personal hygiene products',
                'Custom, personalized, or monogrammed products made to order',
                'Hazardous materials and flammable items',
                'Products explicitly marked as final sale at time of purchase',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>Approved refunds are processed within 5–10 business days of our receipt and inspection of the returned item. The refund will be credited to your original payment method. Please allow an additional 3–5 business days for the credit to appear on your statement depending on your financial institution.</p>
            <p style={pStyle}>For items that arrive damaged, defective, or incorrectly shipped, please contact our support team within 48 hours of delivery with photographic evidence. We will arrange a prepaid return label and process a replacement or full refund at no additional cost to you.</p>
          </section>

          <section id="liability" style={secStyle}>
            <h2 style={h2Style}>6. Limitation of Liability</h2>
            <p style={pStyle}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ZENITH STORE LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES OF ANY KIND.</p>
            <p style={pStyle}>This limitation applies regardless of the cause of action, whether in contract, tort (including negligence), strict liability, or otherwise, even if Zenith Store has been advised of the possibility of such damages. This includes, without limitation, damages for:</p>
            <ul style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
              {[
                'Loss of profits, revenue, data, goodwill, or business opportunities',
                'Cost of procurement of substitute goods or services',
                'Unauthorized access to or use of our servers and any personal information stored therein',
                'Interruption or cessation of transmission to or from our Services',
                'Bugs, viruses, trojan horses, or similar harmful code transmitted through our Services by third parties',
                'Errors or omissions in content, or any loss or damage incurred from the use of posted content',
              ].map((item) => <li key={item} style={liStyle}>{item}</li>)}
            </ul>
            <p style={pStyle}>IN NO EVENT SHALL OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATED TO THESE TERMS OR YOUR USE OF OUR SERVICES EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT YOU PAID TO ZENITH STORE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100.00).</p>
            <p style={pStyle}>Some jurisdictions do not allow the exclusion or limitation of certain warranties or liability. If these laws apply to you, some or all of the above limitations may not apply, and you may have additional rights.</p>
          </section>

          <section id="governing" style={secStyle}>
            <h2 style={h2Style}>7. Governing Law</h2>
            <p style={pStyle}>These Terms of Service and any disputes arising out of or related to them or your use of our Services shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law principles or provisions.</p>
            <p style={pStyle}>Any dispute, controversy, or claim arising out of or relating to these Terms or your use of our Services that cannot be resolved informally shall be submitted to binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, as modified by these Terms.</p>
            <p style={pStyle}>The arbitration shall be conducted in New York County, New York, unless you and Zenith Store mutually agree otherwise. The arbitrator shall have exclusive authority to resolve any dispute relating to the interpretation, applicability, enforceability, or formation of these Terms, including any claim that all or any part of these Terms is void or voidable.</p>
            <p style={pStyle}>CLASS ACTION WAIVER: TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND ZENITH STORE AGREE THAT ALL CLAIMS AND DISPUTES WILL BE RESOLVED INDIVIDUALLY. YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION. All claims must be brought in your individual capacity, not as a plaintiff or class member in any purported class, collective, coordinated, consolidated, or representative proceeding.</p>
            <p style={pStyle}>Notwithstanding the arbitration agreement, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of a party&apos;s intellectual property rights, trade secrets, or confidential information.</p>
            <div style={{ ...card, background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)', marginTop: '24px' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', margin: 0, lineHeight: 1.7 }}>
                <strong style={{ color: '#f59e0b' }}>Legal Contact:</strong> Zenith Store LLC — Legal Department · 42 Commerce Blvd, New York, NY 10001 · legal@zenithstore.com · Registered Agent: CT Corporation
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
