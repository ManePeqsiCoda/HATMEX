import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import WeEvolve from '@/components/sections/WeEvolve';
import Values from '@/components/sections/Values';
import Processes from '@/components/sections/Processes';
import ProcessVideoGrid from '@/components/sections/ProcessVideoGrid';
import Customers from '@/components/sections/Customers';
import Team from '@/components/sections/Team';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'HATMEX | Manufactura de Headwear de Marca Privada' : 'HATMEX | Private Label Headwear Manufacturing',
    description: locale === 'es' ? 'Fabricante experto de headwear premium de marca privada con sede en México. Ventaja USMCA y manufactura nearshore.' : 'Expert manufacturer of premium private-label headwear based in Mexico. USMCA advantage and nearshore manufacturing.',
  };
}

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <WeEvolve />
      <Values />
      <Processes />
      <ProcessVideoGrid />
      <Customers />
      <Team />
    </main>
  );
}
