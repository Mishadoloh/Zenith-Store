import { Suspense } from 'react';
import CatalogPage from './page';

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading...</div>}>{children}</Suspense>;
}
