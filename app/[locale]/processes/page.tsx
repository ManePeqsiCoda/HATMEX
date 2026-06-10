import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProcessesClient from '@/components/pages/ProcessesClient';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Procesos de Fabricación | Hatmex' : 'Manufacturing Processes | Hatmex',
    description: isEs
      ? 'Descubre cómo fabricamos sombreros artesanales Wrangler 2026. Procesos de calidad desde el diseño hasta la entrega.'
      : 'Discover how we manufacture Wrangler 2026 handmade hats. Quality processes from design to delivery.',
    openGraph: {
      title: isEs ? 'Procesos de Fabricación | Hatmex' : 'Manufacturing Processes | Hatmex',
      description: isEs
        ? 'Descubre cómo fabricamos sombreros artesanales Wrangler 2026. Procesos de calidad desde el diseño hasta la entrega.'
        : 'Discover how we manufacture Wrangler 2026 handmade hats. Quality processes from design to delivery.',
      url: `https://hatmex.com.mx/${locale}/processes/`,
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'HATMEX Processes' }],
    },
  };
}

export default function ProcessesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <ProcessesClient />
  );
}
