'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';

const benefits = [
  {
    title: 'Remote-First Culture',
    description: 'Work from anywhere in the world. We believe great talent is not confined to one location. You choose where you do your best work.',
    color: 'var(--accent-light)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Health & Wellness',
    description: 'Comprehensive medical, dental, and vision coverage for you and your family. Plus a monthly $100 wellness stipend for gym, therapy, or whatever keeps you healthy.',
    color: 'var(--green)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Equity Package',
    description: 'Every team member is a true owner. We offer competitive stock options with a 4-year vesting schedule and 1-year cliff. We grow together.',
    color: '#a78bfa',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Learning Budget',
    description: '$2,000 per year for courses, conferences, books, certifications, or any learning that makes you better. No approval process needed for purchases under $500.',
    color: '#f59e0b',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Unlimited PTO',
    description: 'We trust you to manage your time. Take the days you need to rest, recharge, and show up at your best. Minimum 15 days encouraged each year.',
    color: '#34d399',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Annual Team Retreats',
    description: 'Two all-expenses-paid team retreats per year to connect in person. Past destinations: Lisbon, Bali, and Medellín. Next stop: Tokyo.',
    color: '#f472b6',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

const departmentColors: Record<string, string> = {
  Engineering: 'var(--accent-light)',
  Design: '#a78bfa',
  Marketing: '#f59e0b',
  Operations: 'var(--green)',
  Sales: '#f472b6',
  Data: '#34d399',
  'Customer Success': '#fb923c',
  Product: '#60a5fa',
};

type Job = {
  id: string | number;
  title: string;
  department: string;
  location: string;
  type: string;
  description?: string;
  salary?: string;
};

const fallbackJobs: Job[] = [
  { id: 1, title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '$130k–$160k', description: 'Build next-gen shopping experiences with React, Next.js, and TypeScript at scale.' },
  { id: 2, title: 'Product Designer', department: 'Design', location: 'Remote / NYC', type: 'Full-time', salary: '$100k–$130k', description: 'Craft beautiful, accessible interfaces that delight millions of users worldwide.' },
  { id: 3, title: 'Data Scientist', department: 'Data', location: 'Remote', type: 'Full-time', salary: '$120k–$155k', description: 'Turn shopping behavior data into insights that drive growth and personalization.' },
  { id: 4, title: 'Growth Marketing Manager', department: 'Marketing', location: 'NYC', type: 'Full-time', salary: '$95k–$120k', description: 'Own acquisition and retention strategies across all digital channels and markets.' },
  { id: 5, title: 'Supply Chain Analyst', department: 'Operations', location: 'Remote', type: 'Full-time', salary: '$80k–$105k', description: 'Optimize our global supply chain for speed, cost efficiency, and sustainability.' },
  { id: 6, title: 'Customer Success Lead', department: 'Customer Success', location: 'Remote', type: 'Full-time', salary: '$75k–$95k', description: 'Ensure every customer has a world-class experience from first click to delivery.' },
];

export default function CareersPage() {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyNote, setApplyNote] = useState('');
  const [applySubmitted, setApplySubmitted] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/careers/jobs`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : fallbackJobs);
      } catch {
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.department)))];
  const filtered = selectedDept === 'All' ? jobs : jobs.filter((j) => j.department === selectedDept);

  const cs: React.CSSProperties = { minHeight: '100vh', background: 'var(--bg-surface)', color: 'var(--text-1)', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '80px' };
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(167,139,250,0.1) 100%)', borderBottom: '1px solid var(--border)', padding: '72px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' };
  const mw: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' };
  const bc: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', justifyContent: 'center' };
  const card: React.CSSProperties = { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 24px', backdropFilter: 'blur(12px)' };
  const inputCss: React.CSSProperties = { width: '100%', padding: '12px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-1)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, system-ui, sans-serif', transition: 'border-color 0.2s' };

  return (
    <div style={cs}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      {/* Hero */}
      <div style={hero}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(167,139,250,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(99,102,241,0.06)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={bc}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>Careers</span>
        </div>
        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
          We&apos;re Hiring
        </div>
        <h1 style={{ fontSize: '52px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Build the Future<br />of Shopping
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--text-2)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.7 }}>
          Join a team of world-class builders, designers, and thinkers on a mission to make online shopping feel personal and effortless.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap' }}>
          {[['🌍', 'Remote-first'], ['👥', `${(jobs.length || fallbackJobs.length)} Open Roles`], ['⭐', '4.9 Glassdoor']].map(([icon, label]) => (
            <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-2)' }}>
              <span style={{ fontSize: '18px' }}>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...mw, marginTop: '60px' }}>
        {/* Benefits */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>Why Zenith?</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', textAlign: 'center', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            We take care of our team so you can focus on doing the best work of your life.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {benefits.map((b) => (
              <div
                key={b.title}
                style={{ ...card, borderLeft: `3px solid ${b.color}`, transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 12px 32px ${b.color}22`; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${b.color}18`, border: `1px solid ${b.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.color, marginBottom: '14px' }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>Open Positions</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', margin: 0 }}>{filtered.length} role{filtered.length !== 1 ? 's' : ''} available</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  style={{
                    padding: '7px 14px', borderRadius: '20px',
                    border: selectedDept === dept ? '1px solid var(--accent-light)' : '1px solid var(--border)',
                    background: selectedDept === dept ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: selectedDept === dept ? 'var(--accent-light)' : 'var(--text-2)',
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ ...card, height: '120px', background: 'linear-gradient(90deg, var(--bg-raised) 25%, rgba(255,255,255,0.03) 50%, var(--bg-raised) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filtered.map((job, idx) => {
                const deptColor = departmentColors[job.department] || 'var(--text-3)';
                return (
                  <div
                    key={job.id}
                    style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', transition: 'border-color 0.2s', animation: `fadeIn 0.3s ease ${idx * 0.05}s both` }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.4)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>{job.title}</h3>
                        <span style={{ padding: '3px 10px', borderRadius: '20px', background: `${deptColor}18`, border: `1px solid ${deptColor}30`, color: deptColor, fontSize: '11px', fontWeight: 700 }}>
                          {job.department}
                        </span>
                      </div>
                      {job.description && (
                        <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: '0 0 10px', lineHeight: 1.5 }}>{job.description}</p>
                      )}
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-3)' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {job.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-3)' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          {job.type}
                        </span>
                        {job.salary && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => { setApplyJob(job); setApplySubmitted(false); setApplyName(''); setApplyEmail(''); setApplyNote(''); }}
                      style={{ padding: '11px 22px', background: 'var(--accent-light)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
                    >
                      Apply Now
                    </button>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ ...card, textAlign: 'center', padding: '48px 24px' }}>
                  <p style={{ color: 'var(--text-3)', fontSize: '15px' }}>No open positions in this department right now.</p>
                  <p style={{ color: 'var(--text-3)', fontSize: '13px', marginTop: '8px' }}>Check back soon or <Link href="/contact" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>send a speculative application</Link>.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Apply Modal */}
      {applyJob && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setApplyJob(null); }}
        >
          <div style={{ ...card, width: '100%', maxWidth: '480px', animation: 'fadeIn 0.25s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px' }}>Apply: {applyJob.title}</h2>
                <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: 0 }}>{applyJob.department} · {applyJob.location}</p>
              </div>
              <button onClick={() => setApplyJob(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: '4px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {applySubmitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Application Submitted!</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '14px', lineHeight: 1.6 }}>Thank you for applying. We review every application carefully and will be in touch within 5 business days.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setApplySubmitted(true); }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '8px' }}>Full Name *</label>
                  <input required value={applyName} onChange={(e) => setApplyName(e.target.value)} placeholder="Jane Smith" style={inputCss} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-light)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '8px' }}>Email Address *</label>
                  <input type="email" required value={applyEmail} onChange={(e) => setApplyEmail(e.target.value)} placeholder="jane@example.com" style={inputCss} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-light)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', marginBottom: '8px' }}>Why Zenith? *</label>
                  <textarea required rows={4} value={applyNote} onChange={(e) => setApplyNote(e.target.value)} placeholder="Tell us about yourself and why you're excited about this role..." style={{ ...inputCss, resize: 'vertical' }} onFocus={(e) => { e.target.style.borderColor = 'var(--accent-light)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', background: 'var(--accent-light)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
