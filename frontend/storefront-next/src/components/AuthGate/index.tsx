'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation, Language } from '@/context/LanguageContext';
import styles from './AuthGate.module.css';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, register, login, isLoading, error, clearError } = useAuth();
  const { t, language, setLanguage } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (isRegister) {
      await register(name, email, password);
    } else {
      await login(email, password);
    }
  };

  if (user) return <>{children}</>;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>

        {/* Language selector */}
        <div className={styles.langRow}>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
            className={styles.langSelect}
            aria-label="Language selector"
          >
            <option value="en">EN</option>
            <option value="uk">UA</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
          </select>
        </div>

        {/* Logo & heading */}
        <div className={styles.logoWrap}>
          <div className={styles.logo}>ZEN<span>ITH</span></div>
          <h2 className={styles.authTitle}>
            {isRegister ? t('create_account') : t('welcome_back')}
          </h2>
          <p className={styles.authSubtitle}>{t('auth_required')}</p>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorAlert}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister && (
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="auth-name">{t('full_name')}</label>
              <input
                id="auth-name"
                className={styles.input}
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="auth-email">{t('email_address')}</label>
            <input
              id="auth-email"
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="auth-pass">{t('password')}</label>
            <input
              id="auth-pass"
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? t('processing') : isRegister ? t('register') : t('sign_in')}
          </button>
        </form>

        {/* Toggle */}
        <div className={styles.toggleRow}>
          {isRegister ? t('already_have_acc') : t('dont_have_acc')}{' '}
          <button
            className={styles.toggleBtn}
            onClick={() => { setIsRegister(!isRegister); clearError(); }}
          >
            {isRegister ? t('sign_in_now') : t('register_now')}
          </button>
        </div>
      </div>
    </div>
  );
}
