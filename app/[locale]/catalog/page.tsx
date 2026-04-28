import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CatalogClient from '@/components/pages/CatalogClient';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Catálogo | Sombreros y Gorras Personalizados | HATMEX' : 'Catalog | Custom Hats & Caps | HATMEX',
    description: locale === 'es' ? 'Vea nuestro catálogo de headwear de marca privada. Hecho en México con ventajas USMCA y manufactura nearshore.' : 'Browse our private label headwear catalog. Made in Mexico with USMCA advantages and nearshore manufacturing.',
  };
}

export default function CatalogPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <CatalogClient />;
}
