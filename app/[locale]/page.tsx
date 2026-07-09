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
    title: 'Hatmex | Crafting Private Label Headwear',
    description: isEs
      ? 'Fabricamos gorras y sombreros private label con identidad de marca. Diseño, desarrollo y producción de headwear artesanal para empresas, marcas y colecciones propias.'
      : 'We craft private label caps and hats with brand identity. Design, development and artisan production of headwear for companies, brands and own collections.',
    openGraph: {
      title: 'Hatmex | Crafting Private Label Headwear',
      description: isEs
        ? 'Fabricamos gorras y sombreros private label con identidad de marca. Diseño, desarrollo y producción de headwear artesanal para empresas, marcas y colecciones propias.'
        : 'We craft private label caps and hats with brand identity. Design, development and artisan production of headwear for companies, brands and own collections.',
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
