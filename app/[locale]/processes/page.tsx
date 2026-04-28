import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import ProcessesClient from '@/components/pages/ProcessesClient';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Departamentos y Procesos | HATMEX' : 'Departments & Processes | HATMEX',
    description: locale === 'es' ? 'Explore nuestros departamentos estratégicos y procesos de manufactura USMCA para headwear de marca privada.' : 'Explore our strategic departments and USMCA manufacturing processes for private label headwear.',
  };
}

export default function ProcessesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <ProcessesClient />
  );
}
