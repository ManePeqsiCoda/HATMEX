'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/navigation';
import productos from '@/public/Catalogo/productos.json';

type Producto = {
  sku: string;
  nombre: { es: string; en: string };
  material: { es: string; en: string };
  variante: { es: string; en: string };
  horma: { es: string; en: string };
  falda: { es: string; en: string };
  categoria: { es: string; en: string };
  imagen?: string;
};

function getCategoryLabel(product: Producto, locale: string): string {
  if (product.material.es.toUpperCase() === 'LANA') {
    return locale === 'es' ? 'LANA' : 'WOOL';
  }
  return product.categoria[locale as 'es' | 'en'] || product.categoria.es;
}

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full bg-[var(--bg-surface)] relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

function ProductCard({ product, priority, categoryLabel, locale }: { product: Producto; priority?: boolean; categoryLabel: string; locale: string }) {
  const t = useTranslations('catalog');
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imagen = product.imagen || `/Catalogo/${product.sku}.webp`;
  const nombre = product.nombre[locale as 'es' | 'en'] || product.nombre.es;
  const material = product.material[locale as 'es' | 'en'] || product.material.es;
  const variante = product.variante[locale as 'es' | 'en'] || product.variante.es;
  const horma = product.horma[locale as 'es' | 'en'] || product.horma.es;
  const falda = product.falda[locale as 'es' | 'en'] || product.falda.es;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="catalog-card group bg-[var(--bg-card)] border border-[var(--border)] rounded-[3px] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(26,46,28,0.10)] hover:border-[var(--accent)]"
      style={{ contentVisibility: 'auto', containIntrinsicHeight: '520px' }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg-surface)]">
        {!imgError && (
          <>
            {!loaded && <ImageSkeleton />}
            <Image
              src={imagen}
              alt={`${nombre} — ${product.sku}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              loading={priority ? 'eager' : 'lazy'}
              priority={priority}
              decoding="async"
              className={`object-cover transition-transform duration-500 group-hover:scale-[1.04] ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transition: 'opacity 0.3s ease, transform 0.5s ease' }}
              onLoad={() => setLoaded(true)}
              onError={() => { setImgError(true); setLoaded(true); }}
            />
          </>
        )}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-surface)] z-0">
            <span className="font-display font-black text-5xl text-[var(--text-muted)] opacity-15 tracking-widest">
              {product.sku.charAt(0)}
            </span>
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mt-2">
              {product.sku}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[var(--accent)] text-[var(--text-primary)] font-display font-bold text-[9px] tracking-[0.14em] uppercase py-1 px-2.5 rounded-[2px] z-10 shadow-sm">
          {t('badge')}
        </div>
      </div>

      <div className="p-5 md:p-8">
        <span className="block font-display font-bold text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)] mb-1.5">
          {categoryLabel}
        </span>
        <h3 className="font-display font-bold text-lg tracking-[0.06em] text-[var(--text-primary)] mb-2 uppercase leading-tight">
          {nombre}
        </h3>
        <div className="flex flex-col gap-1 mb-6">
          <p className="font-body text-[12px] text-[var(--text-secondary)]">
            {material} — {variante}
          </p>
          <p className="font-body text-[12px] text-[var(--text-secondary)]">
            {horma}
          </p>
          <p className="font-body text-[12px] text-[var(--text-secondary)]">
            {falda}
          </p>
          <p className="font-body text-[10px] tracking-[0.08em] text-[var(--text-muted)] uppercase mt-1">
            SKU: {product.sku}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center font-display font-bold text-[12px] tracking-[0.12em] uppercase text-[var(--accent)] hover:text-[var(--accent-hover)] group/link"
        >
          {t('card_cta')}
          <span className="ml-1 transition-transform group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function CatalogClient() {
  const t = useTranslations('catalog');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categorias = useMemo(() => {
    const cats = new Set<string>();
    (productos as Producto[]).forEach((p) => cats.add(getCategoryLabel(p, locale)));
    const sorted = Array.from(cats).sort((a, b) => {
      if (a === 'LANA' || a === 'WOOL') return 1;
      if (b === 'LANA' || b === 'WOOL') return -1;
      const numA = parseFloat(a.replace('CM', ''));
      const numB = parseFloat(b.replace('CM', ''));
      return numA - numB;
    });
    return ['all', ...sorted];
  }, [locale]);

  const filteredProducts = useMemo(() => {
    let result = productos as Producto[];

    if (activeCategory !== 'all') {
      result = result.filter((p) => getCategoryLabel(p, locale) === activeCategory);
    }

    const q = searchQuery.trim().toUpperCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.sku.toUpperCase().includes(q) ||
          p.nombre.es.toUpperCase().includes(q) ||
          p.nombre.en.toUpperCase().includes(q) ||
          p.material.es.toUpperCase().includes(q) ||
          p.material.en.toUpperCase().includes(q) ||
          p.variante.es.toUpperCase().includes(q) ||
          p.variante.en.toUpperCase().includes(q) ||
          p.horma.es.toUpperCase().includes(q) ||
          p.horma.en.toUpperCase().includes(q) ||
          p.falda.es.toUpperCase().includes(q) ||
          p.falda.en.toUpperCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <main className="flex flex-col w-full min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/hero-catalog.png"
          alt="Our Catalog"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(26,46,28,0.45)]" />

        <div className="relative z-10 text-center px-6">
          <motion.span
            className="block eyebrow text-white/90 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {t('hero_eyebrow')}
          </motion.span>
          <motion.h1
            className="hero-title text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {t('hero_title')}
          </motion.h1>
        </div>
      </section>

      {/* SECTION 2: INTRO + SEARCH + FILTER BAR */}
      <section className="py-20 bg-[var(--bg-primary)] px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.p
            className="text-center text-[var(--text-secondary)] font-body text-[15px] leading-[1.8] max-w-[560px] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('intro')}
          </motion.p>

          {/* Search Bar */}
          <div className="w-full max-w-xl mb-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-[3px] py-3 pl-11 pr-4 font-body text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-center font-body text-[11px] text-[var(--text-muted)] mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? t('result_singular') : t('result_plural')}
            </p>
          </div>

          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-8 md:gap-12 border-b border-[var(--border)] w-full max-w-4xl overflow-x-auto no-scrollbar md:overflow-visible pb-px">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-4 px-2 font-display text-[12px] font-bold tracking-[0.14em] uppercase transition-all relative whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {cat === 'all' ? t('filter_all') : cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT GRID */}
      <section className="py-24 bg-[var(--bg-secondary)] px-6 md:px-[8%]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.sku}
                  product={product}
                  priority={index < 8}
                  categoryLabel={getCategoryLabel(product, locale)}
                  locale={locale}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="font-body text-[var(--text-muted)] text-lg">
                {t('no_results')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: BOTTOM CTA BANNER */}
      <section className="relative py-24 px-6 overflow-hidden">
        <Image
          src="/images/client/19.jpeg"
          alt="Pared de sombreros HATMEX en producción"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#1A2E1C]/80" />
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow text-[var(--accent)] mb-4">
            {t('cta_eyebrow')}
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl tracking-[0.12em] uppercase text-[#F2EAE1] mb-6">
            {t('cta_heading')}
          </h2>
          <p className="text-[#F2EAE1]/70 mb-10 max-w-lg font-body text-base leading-relaxed">
            {t('cta_body')}
          </p>
          <Link href="/contact" className="btn-primary">
            {t('cta_button')}
          </Link>
        </div>
      </section>
    </main>
  );
}
