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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: {
      default: 'HATMEX | Crafting Private Label Headwear',
      template: '%s | HATMEX',
    },
    description: isEs
      ? 'Fabricamos gorras y sombreros private label con identidad de marca. Diseño, desarrollo y producción de headwear artesanal para empresas, marcas y colecciones propias.'
      : 'We craft private label caps and hats with brand identity. Design, development and artisan production of headwear for companies, brands and own collections.',
    keywords: isEs
      ? ['private label headwear', 'sombreros private label', 'gorras personalizadas', 'headwear mexicano', 'manufactura de gorras', 'hatmex']
      : ['private label headwear', 'custom caps', 'custom hats', 'headwear manufacturing', 'private label hats', 'hatmex'],
    openGraph: {
      type: 'website',
      locale: isEs ? 'es_MX' : 'en_US',
      siteName: 'HATMEX',
      url: `https://hatmex.com.mx/${locale}/`,
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'HATMEX' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HATMEX | Crafting Private Label Headwear',
      description: isEs
        ? 'Fabricamos gorras y sombreros private label con identidad de marca.'
        : 'We craft private label caps and hats with brand identity.',
      images: ['/images/og-image.webp'],
    },
    alternates: {
      canonical: `https://hatmex.com.mx/${locale}/`,
      languages: {
        'es-MX': 'https://hatmex.com.mx/es/',
        'en-US': 'https://hatmex.com.mx/en/',
        'x-default': 'https://hatmex.com.mx/es/',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
