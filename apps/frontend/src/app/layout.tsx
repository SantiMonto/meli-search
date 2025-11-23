import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout';
import { QueryProvider } from '@/infrastructure/providers/query-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mercado Libre - Busca productos',
  description: 'Encuentra los mejores productos en Mercado Libre',
  keywords: ['mercado libre', 'productos', 'compras', 'ecommerce'],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FFE600',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-gray-100 font-sans antialiased">
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
