import type { Metadata } from 'next';
import { Barlow_Condensed, Barlow } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import '../globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'HATMEX — Premium Private-Label Headwear',
    template: '%s | HATMEX',
  },
  description:
    'HATMEX is a premium private-label headwear manufacturer based in Mexico, crafting world-class hats and caps for global brands.',
  keywords: ['headwear', 'caps', 'hats', 'private label', 'manufacturer', 'Mexico'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'HATMEX',
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body className="bg-primary text-[var(--text-primary)] font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
