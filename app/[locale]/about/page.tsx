import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import SubpageHero from '@/components/ui/SubpageHero';
import BrandStory from '@/components/sections/BrandStory';
import MissionVision from '@/components/sections/MissionVision';
import AboutValues from '@/components/sections/AboutValues';
import Customers from '@/components/sections/Customers';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Sobre Nosotros | 10 Años de Experiencia | Hatmex' : 'About Us | 10 Years of Experience | Hatmex',
    description: isEs
      ? 'Conozca nuestros 10 años de experiencia en la manufactura de sombreros artesanales premium. Distribuidores oficiales Wrangler 2026.'
      : 'Learn about our 10 years of experience in premium handmade hat manufacturing. Official Wrangler 2026 distributors.',
    openGraph: {
      title: isEs ? 'Sobre Nosotros | 10 Años de Experiencia | Hatmex' : 'About Us | 10 Years of Experience | Hatmex',
      description: isEs
        ? 'Conozca nuestros 10 años de experiencia en la manufactura de sombreros artesanales premium. Distribuidores oficiales Wrangler 2026.'
        : 'Learn about our 10 years of experience in premium handmade hat manufacturing. Official Wrangler 2026 distributors.',
      url: `https://hatmex.com.mx/${locale}/about/`,
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'HATMEX About' }],
    },
  };
}

export default function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('about');

  return (
    <main className="flex flex-col w-full min-h-screen">
      <SubpageHero 
        title={t('hero_title')} 
        image="/images/hero/hero-about.png" 
      />
      
      <BrandStory />
      
      <MissionVision 
        title={t('mission_title')}
        body={t('mission_body')}
        image="/images/our-story-fedora.webp"
        className="bg-[var(--bg-secondary)]"
      />
      
      <MissionVision 
        title={t('vision_title')}
        body={t('vision_body')}
        image="/images/our-story-vaquero.webp"
        reverse
        tilt={2.5}
        className="bg-[var(--bg-primary)]"
      />
      
      <AboutValues />
      
      <Customers />
    </main>
  );
}
