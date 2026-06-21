'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div>
            <div className={styles.brandName}>ZEN<span>ITH</span></div>
            <p className={styles.brandDesc}>{t('footer_brand_desc')}</p>
          </div>

          {/* Shop */}
          <div>
            <div className={styles.colTitle}>{t('shop')}</div>
            <div className={styles.links}>
              <Link href="/catalog?cat=Electronics" className={styles.footerLink}>{t('category_electronics')}</Link>
              <Link href="/catalog?cat=Clothing" className={styles.footerLink}>{t('category_clothing')}</Link>
              <Link href="/catalog?cat=Home" className={styles.footerLink}>{t('category_home')}</Link>
              <Link href="/catalog?cat=Sports" className={styles.footerLink}>{t('category_sports')}</Link>
              <Link href="/catalog?cat=Beauty" className={styles.footerLink}>{t('category_beauty')}</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <div className={styles.colTitle}>{t('footer_support')}</div>
            <div className={styles.links}>
              <Link href="/help" className={styles.footerLink}>{t('footer_help_center')}</Link>
              <Link href="/shipping-returns" className={styles.footerLink}>{t('footer_shipping_returns')}</Link>
              <Link href="/track-order" className={styles.footerLink}>{t('footer_track_order')}</Link>
              <Link href="/contact" className={styles.footerLink}>{t('footer_contact_us')}</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className={styles.colTitle}>{t('footer_company')}</div>
            <div className={styles.links}>
              <Link href="/about" className={styles.footerLink}>{t('footer_about')}</Link>
              <Link href="/careers" className={styles.footerLink}>{t('footer_careers')}</Link>
              <Link href="/privacy" className={styles.footerLink}>{t('footer_privacy')}</Link>
              <Link href="/terms" className={styles.footerLink}>{t('footer_terms')}</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>© {year} Zenith Store. {t('footer_rights')}</div>
          <div className={styles.bottomBadges}>
            <span className={styles.badge}>{t('footer_ssl')}</span>
            <span className={styles.badge}>{t('footer_returns')}</span>
            <span className={styles.badge}>{t('footer_shipping')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
