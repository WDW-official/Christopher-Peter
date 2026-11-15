import { Suspense } from 'react';
import { SupportModalProvider } from '@/components/SupportModal';
import { SupportQuery } from '@/components/SupportQuery';
import type { Metadata } from 'next';
import './globals.css';
import { ScrollAnimations } from '@/components/ScrollAnimations';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { siteDescription, siteName } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: {
    default: 'Christopher Peter Jen Initiative | Skills and Empowerment',
    template: '%s | Christopher Peter Jen Initiative',
  },
  description: siteDescription,
  openGraph: { title: siteName, description: siteDescription, type: 'website' },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SupportModalProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ScrollAnimations />
          <Suspense fallback={null}>
            <SupportQuery />
          </Suspense>
        </SupportModalProvider>
      </body>
    </html>
  );
}
