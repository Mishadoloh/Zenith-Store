import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CompareProvider } from '@/context/CompareContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import CartSidebar from '@/components/CartSidebar';
import Footer from '@/components/Footer';
import ToastProvider from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: { template: '%s | Zenith Store', default: 'Zenith Store' },
  description: 'Online store with electronics, clothing, home goods, sports and beauty products.',
  keywords: ['zenith', 'store', 'ecommerce', 'electronics', 'clothing', 'home'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <AuthProvider>
                  <ToastProvider>
                    <Navbar />
                    <CartSidebar />
                    {children}
                    <Footer />
                  </ToastProvider>
                </AuthProvider>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
