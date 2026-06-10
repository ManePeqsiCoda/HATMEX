import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CatalogClient from '@/components/pages/CatalogClient';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Catálogo de Sombreros Wrangler 2026 | Hatmex' : 'Wrangler Hats 2026 Catalog | Hatmex',
    description: isEs
      ? 'Explora los 90 modelos de sombreros Wrangler 2026. Encuentra tu estilo: lana, bangora, jap, chino y más. Sombreros para adultos y niños.'
      : 'Browse 90+ Wrangler hat styles for 2026. Wool, bangora, jap, chino and more. Adult and kids western hats.',
    openGraph: {
      title: isEs ? 'Catálogo de Sombreros Wrangler 2026 | Hatmex' : 'Wrangler Hats 2026 Catalog | Hatmex',
      description: isEs
        ? 'Explora los 90 modelos de sombreros Wrangler 2026. Encuentra tu estilo: lana, bangora, jap, chino y más. Sombreros para adultos y niños.'
        : 'Browse 90+ Wrangler hat styles for 2026. Wool, bangora, jap, chino and more. Adult and kids western hats.',
      url: `https://hatmex.com.mx/${locale}/catalog/`,
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'HATMEX Catalog' }],
    },
  };
}

export default function CatalogPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <CatalogClient />;
}
