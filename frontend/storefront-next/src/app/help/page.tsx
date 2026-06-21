'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';

interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export default function HelpCenter() {
  const { t, language } = useTranslation();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8002/api/support/faqs?lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        }
      } catch (err) {
        console.error('Failed to load FAQs', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFaqs();
  }, [language]);

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-help" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-1)' }}>
      <nav className="breadcrumb" style={{ marginBottom: '24px' }}>
        <Link href="/">{t('home')}</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{t('footer_help_center')}</span>
      </nav>

      <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.5px' }}>
        {t('footer_help_center')}
      </h1>
      <p style={{ color: 'var(--text-3)', marginBottom: '32px' }}>
        Find answers to frequently asked questions about shipping, returns, payment security, and account settings.
      </p>

      <input
        type="text"
        placeholder="Search questions or categories..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 20px',
          background: 'var(--bg-raised)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          fontSize: '15px',
          color: 'var(--text-1)',
          marginBottom: '32px',
          outline: 'none',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}
      />

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-3)' }}>Loading FAQs...</div>
      ) : filteredFaqs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-3)' }}>No matches found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredFaqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text-1)',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                <span>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-light)', marginRight: '12px', letterSpacing: '1px' }}>
                    {faq.category}
                  </span>
                  {faq.question}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 20px 20px', fontSize: '14.5px', color: 'var(--text-2)', lineHeight: '1.6' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
