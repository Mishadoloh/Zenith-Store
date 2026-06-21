'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';

const stats = [
  { label: 'Founded', value: '2019' },
  { label: 'Products', value: '12,000+' },
  { label: 'Countries', value: '50+' },
  { label: 'Avg Rating', value: '4.9★' },
];

const values = [
  {
    title: 'Customer First',
    description: 'Every decision we make starts with one question: how does this serve our customer? From pricing to packaging, the customer is at the center of everything.',
    color: 'var(--accent-light)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Radical Transparency',
    description: 'We share our supply chain, pricing model, and environmental impact openly. We believe lasting trust is built through honesty, not marketing spin.',
    color: 'var(--green)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35M11 8v3M11 14h.01" />
      </svg>
    ),
  },
  {
    title: 'Sustainable Growth',
    description: 'We grow responsibly. From eco-friendly packaging to carbon-offset shipping, we take our impact on the planet seriously and act accordingly.',
    color: '#34d399',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Innovation Always',
    description: 'We invest 20% of revenue into R&D, product discovery, and technology—because yesterday\'s best is never good enough for tomorrow\'s customer.',
    color: '#a78bfa',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M12 2v2M12 20v2M4.93 4.93l1.41 1.41M18.66 18.66l1.41 1.41M2 12h2M20 12h2" />
      </svg>
    ),
  },
  {
    title: 'Inclusive Culture',
    description: 'Our team spans 18 countries. We celebrate diversity and create a workplace where every voice matters, every background is valued, and everyone belongs.',
    color: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Quality Obsession',
    description: 'Every product passes a 37-point quality check before earning a spot in our catalog. We would rather have fewer, better products than more mediocre ones.',
    color: '#f472b6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const team = [
  { name: 'Sofia Chen', role: 'CEO & Co-Founder', bio: 'Former VP at Amazon. 15+ years in e-commerce and retail innovation. Passionate about building products that genuinely delight.', initials: 'SC', color: 'var(--accent-light)' },
  { name: 'Marcus Reid', role: 'CTO & Co-Founder', bio: 'Ex-Google engineer. Built platforms serving 100M+ users worldwide. Architect of Zenith\'s scalable commerce infrastructure.', initials: 'MR', color: 'var(--green)' },
  { name: 'Aria Patel', role: 'Chief Design Officer', bio: 'Award-winning designer. Previously led design at Shopify and Stripe. Believes great design is the difference between good and unforgettable.', initials: 'AP', color: '#a78bfa' },
  { name: 'James Okafor', role: 'Head of Operations', bio: 'Supply chain expert. Managed logistics networks spanning 40+ countries. Ensures every package arrives perfectly, on time, every time.', initials: 'JO', color: '#f59e0b' },
];

const milestones = [
  { year: '2019', event: 'Zenith Store founded in a Brooklyn apartment with $50K seed funding and a clear mission.' },
  { year: '2020', event: 'Launched first product line. Reached $1M in revenue in just 8 months despite the pandemic.' },
  { year: '2021', event: 'Expanded to Europe and Canada. Grew team to 50 people across 10 countries remotely.' },
  { year: '2022', event: 'Series A: $12M raised. Launched mobile apps, loyalty program, and seller marketplace.' },
  { year: '2023', event: 'Hit $100M GMV milestone. Opened first physical showroom in New York City.' },
  { year: '2024', event: 'Expanded to Asia Pacific. Surpassed 1 million happy customers across 50+ countries.' },
];

export default function AboutPage() {
  const { t } = useTranslation();

  const cs: React.CSSProperties = { minHeight: '100vh', background: 'var(--bg-surface)', color: 'var(--text-1)', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '80px' };
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(16,185,129,0.08) 50%, rgba(167,139,250,0.1) 100%)', borderBottom: '1px solid var(--border)', padding: '80px 24px 72px', textAlign: 'center', position: 'relative', overflow: 'hidden' };
  const mw: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' };
  const bc: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', justifyContent: 'center' };
  const card: React.CSSProperties = { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 24px', backdropFilter: 'blur(12px)' };
  const sectionTitle: React.CSSProperties = { fontSize: '32px', fontWeight: 800, color: 'var(--text-1)', marginBottom: '8px', letterSpacing: '-0.02em', textAlign: 'center' };
  const sectionSub: React.CSSProperties = { fontSize: '16px', color: 'var(--text-2)', marginBottom: '44px', maxWidth: '540px', margin: '0 auto 44px', textAlign: 'center' };

  return (
    <div style={cs}>
      {/* Hero */}
      <div style={hero}>
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(99,102,241,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(16,185,129,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={bc}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>About</span>
        </div>

        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
          Our Story
        </div>

        <h1 style={{ fontSize: '52px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Built for the{' '}
          <span style={{ background: 'linear-gradient(135deg, var(--accent-light) 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Curious Shopper
          </span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          Zenith Store was born from a simple frustration: finding high-quality products online was too hard. We set out to curate the best, make it accessible, and deliver it beautifully.
        </p>

        {/* Stats Row */}
        <div style={{ display: 'inline-flex', gap: '0', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ padding: '20px 36px', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
              <p style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-1)', marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...mw, marginTop: '72px' }}>
        {/* Brand Story */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: 1.2 }}>From Garage to Global</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '16px' }}>
                In 2019, our founders Sofia and Marcus sat in a Brooklyn apartment, frustrated by endless scrolling through mediocre products on cluttered platforms. They believed there had to be a better way to shop online.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '16px' }}>
                They started with a simple idea: curate the best products from around the world, verify their quality, and deliver them with an experience that feels premium—without the premium markup.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '28px' }}>
                Five years later, Zenith Store serves over one million customers across 50+ countries, with a catalog of 12,000+ carefully vetted products and a team as passionate as that first day.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/careers" style={{ padding: '12px 24px', background: 'var(--accent-light)', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Join the Team</Link>
                <Link href="/contact" style={{ padding: '12px 24px', background: 'transparent', color: 'var(--text-1)', border: '1px solid var(--border)', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Contact Us</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-1)' }}>Our Timeline</h3>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, padding: '4px 12px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--accent-light)', whiteSpace: 'nowrap' }}>{m.year}</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0, lineHeight: 1.65, paddingTop: '2px' }}>{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={sectionTitle}>Our Core Values</h2>
          <p style={sectionSub}>These are not words on a wall—they are the principles that guide every product decision, every hire, and every customer interaction.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {values.map((val) => (
              <div
                key={val.title}
                style={{ ...card, borderTop: `3px solid ${val.color}`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 32px ${val.color}22`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: `${val.color}18`, border: `1px solid ${val.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: val.color, marginBottom: '16px' }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{val.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={sectionTitle}>Meet the Leadership Team</h2>
          <p style={sectionSub}>Brilliant minds united by a shared obsession: building the best shopping experience on the internet.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {team.map((member) => (
              <div
                key={member.name}
                style={{ ...card, transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 32px ${member.color}22`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}88 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
                  {member.initials}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ fontSize: '12px', color: member.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>{member.role}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div style={{ ...card, textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(167,139,250,0.08) 100%)', padding: '60px 24px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>Join Our Journey</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-2)', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Whether you&apos;re a customer, partner, or future team member—we&apos;d love to connect and build something great together.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/careers" style={{ padding: '14px 28px', background: 'var(--accent-light)', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>View Open Roles</Link>
              <Link href="/contact" style={{ padding: '14px 28px', background: 'transparent', color: 'var(--text-1)', border: '1px solid var(--border)', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
