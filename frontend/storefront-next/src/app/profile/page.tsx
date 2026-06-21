'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Detect and set local storage theme settings on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('zenith_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = 'dark';
    }
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('zenith_theme', nextTheme);
    document.body.className = nextTheme;
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
        <div>{t('processing')}</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', minHeight: '80vh' }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumb" style={{ marginBottom: '24px' }}>
        <Link href="/">{t('home')}</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{t('profile')}</span>
      </nav>

      <div style={{
        background: 'var(--bg-raised)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px', borderBottom: '1px solid var(--border)', paddingBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            background: 'var(--accent-gradient, linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 800,
            color: '#fff',
            textTransform: 'uppercase'
          }}>
            {user.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-1)', marginBottom: '4px' }}>{user.name}</h1>
            <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>{user.email}</p>
          </div>
          
          {/* Theme Switcher Button */}
          <button 
            onClick={toggleTheme} 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: 'var(--bg-surface)',
              color: 'var(--text-1)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <span style={{ fontSize: '16px' }}>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>

        {/* Profile details or statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }} className="form-grid">
          <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Account Status</h3>
            <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--green)' }}>Active Verified</p>
          </div>
          <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Zenith Points</h3>
            <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-1)' }}>150 pts</p>
          </div>
        </div>

        {/* User Preferences & Security Panel */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '16px' }}>Account Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-1)' }}>Newsletter Subscription</div>
                <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>Receive notifications on discount campaigns and sales</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-1)' }}>Two-Factor Authentication</div>
                <div style={{ fontSize: '12px', color: 'var(--text-2)' }}>Add an extra layer of security to your client account</div>
              </div>
              <button style={{ fontSize: '12px', color: 'var(--accent-light)', fontWeight: 600 }}>Enable</button>
            </div>
          </div>
        </div>

        {/* Actions Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/catalog" className="btn btn-primary" style={{ padding: '12px 24px' }}>
            {t('continue_shopping')}
          </Link>
          <button 
            onClick={logout} 
            className="btn" 
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--red)', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 600
            }}
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  );
}
