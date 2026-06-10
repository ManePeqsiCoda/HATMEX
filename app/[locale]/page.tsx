import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import WeEvolve from '@/components/sections/WeEvolve';
import Values from '@/components/sections/Values';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ProcessVideoGrid from '@/components/sections/ProcessVideoGrid';
import Customers from '@/components/sections/Customers';
import Team from '@/components/sections/Team';
import FAQSection from '@/components/sections/FAQSection';
import GEOSection from '@/components/sections/GEOSection';
import { OrganizationSchema, FAQSchema } from '@/components/sections/StructuredData';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Hatmex | Sombreros Artesanales de Calidad — Wrangler 2026' : 'Hatmex | Premium Handmade Hats — Wrangler 2026 Collection',
    description: isEs
      ? 'Descubre la colección oficial de sombreros Wrangler 2026. Lana, bangora, jap y rabbit/beaver felt. Fabricación artesanal mexicana con envío a México y Estados Unidos.'
      : 'Shop the official Wrangler 2026 hat collection. Wool, bangora, jap and rabbit/beaver felt. Mexican artisan manufacturing with shipping to the US and Mexico.',
    openGraph: {
      title: isEs ? 'Hatmex | Sombreros Artesanales de Calidad — Wrangler 2026' : 'Hatmex | Premium Handmade Hats — Wrangler 2026 Collection',
      description: isEs
        ? 'Descubre la colección oficial de sombreros Wrangler 2026. Lana, bangora, jap y rabbit/beaver felt. Fabricación artesanal mexicana con envío a México y Estados Unidos.'
        : 'Shop the official Wrangler 2026 hat collection. Wool, bangora, jap and rabbit/beaver felt. Mexican artisan manufacturing with shipping to the US and Mexico.',
      url: `https://hatmex.com.mx/${locale}/`,
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'HATMEX' }],
    },
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));

  return (
    <>
      <OrganizationSchema />
      <FAQSchema questions={faqItems} />
      <main className="flex flex-col w-full min-h-screen">
        <Hero />
        <WeEvolve />
        <Values />
        <ProcessSteps />
        <ProcessVideoGrid />
        <Customers />
        <Team />
        <GEOSection />
        <FAQSection />
      </main>
    </>
  );
}
