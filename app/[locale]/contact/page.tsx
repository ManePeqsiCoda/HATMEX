import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import ContactInfo from '@/components/sections/ContactInfo';
import ContactForm from '@/components/sections/ContactForm';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Contacto | Obtener Cotización | HATMEX' : 'Contact | Get a Quote | HATMEX',
    description: locale === 'es' ? 'Póngase en contacto con el equipo de HATMEX para consultas sobre manufactura de headwear de marca privada. USMCA y manufactura nearshore.' : 'Get in touch with the HATMEX team for private label headwear manufacturing inquiries. USMCA and nearshore manufacturing.',
  };
}

export default function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = useTranslations('contact');

  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--bg-primary)]">
      {/* Header Section */}
      <section className="bg-[#1A2E1C] pt-[180px] pb-24 px-6 md:px-[10%] text-center">
        <p className="font-display font-bold text-[10px] tracking-[.14em] text-[var(--accent)] uppercase mb-4">
          {t('subheading')}
        </p>
        <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-none tracking-[.1em] uppercase text-[var(--bg-primary)] max-w-4xl mx-auto">
          {t('heading')}
        </h1>
      </section>

      {/* Grid Section */}
      <section className="flex-grow flex flex-col lg:flex-row">
        {/* Left Column (40%) */}
        <div className="lg:w-[40%] bg-[var(--bg-secondary)]">
          <ContactInfo />
        </div>

        {/* Right Column (60%) */}
        <div className="lg:w-[60%] bg-[var(--bg-primary)] p-12 lg:p-16">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
