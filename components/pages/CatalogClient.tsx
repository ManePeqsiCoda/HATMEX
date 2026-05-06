'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/lib/navigation';
import productos from '@/public/Catalogo/productos.json';

type Variante = {
  sku: string;
  label: string;
  imagen: string;
};

type Producto = {
  sku: string;
  nombre: string;
  material: string;
  horma: string;
  falda: string;
  imagen?: string;
  variantes?: Variante[];
};

function getCategoria(nombre: string): string {
  const upper = nombre.toUpperCase();
  if (upper.includes('BANGORA')) return 'BANGORA';
  if (upper.includes('CHINO')) return 'CHINO';
  if (upper.includes('JAP')) return 'JAP';
  if (upper.includes('TELAR')) return 'TELAR';
  if (upper.includes('SISOL')) return 'SISOL';
  if (upper.includes('LANA')) return 'LANA';
  if (upper.includes('CASHMERE')) return 'CASHMERE';
  if (upper.includes('PALMA')) return 'PALMA';
  return 'OTROS';
}

function ProductCard({ product }: { product: Producto }) {
  const t = useTranslations('catalog');
  const [imgError, setImgError] = useState(false);
  const [activeImagen, setActiveImagen] = useState(product.imagen || `/catalogo/${product.sku}.webp`);
  const categoria = getCategoria(product.nombre);

  const hasVariants = product.variantes && product.variantes.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="catalog-card group bg-[var(--bg-card)] border border-[var(--border)] rounded-[3px] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(26,46,28,0.10)] hover:border-[var(--accent)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg-surface)]">
        {!imgError && (
          <Image
            src={activeImagen}
            alt={`${product.nombre} — ${product.sku}`}
            fill
            loading="lazy"
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
          />
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

      {/* Variant thumbnails */}
      {hasVariants && (
        <div className="px-5 pt-3 pb-0 flex gap-2">
          {product.variantes?.map((v) => (
            <button
              key={v.sku}
              onClick={() => { setActiveImagen(v.imagen); setImgError(false); }}
              className={`relative w-10 h-10 border overflow-hidden rounded-[2px] transition-all ${
                activeImagen === v.imagen
                  ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]'
                  : 'border-[var(--border)] opacity-70 hover:opacity-100'
              }`}
              title={v.label}
            >
              <Image
                src={v.imagen}
                alt={v.label}
                fill
                className="object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <div className={`p-5 md:p-8 ${hasVariants ? 'pt-3' : ''}`}>
        <span className="block font-display font-bold text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)] mb-1.5">
          {categoria}
        </span>
        <h3 className="font-display font-bold text-lg tracking-[0.06em] text-[var(--text-primary)] mb-2 uppercase leading-tight">
          {product.nombre}
        </h3>
        <div className="flex flex-col gap-1 mb-6">
          <p className="font-body text-[12px] text-[var(--text-secondary)]">
            {product.material}
          </p>
          <p className="font-body text-[12px] text-[var(--text-secondary)]">
            {product.horma}
          </p>
          <p className="font-body text-[12px] text-[var(--text-secondary)]">
            {product.falda}
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
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categorias = useMemo(() => {
    const cats = new Set<string>();
    (productos as Producto[]).forEach((p) => cats.add(getCategoria(p.nombre)));
    return ['all', ...Array.from(cats).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return productos as Producto[];
    return (productos as Producto[]).filter(
      (p) => getCategoria(p.nombre) === activeCategory
    );
  }, [activeCategory]);

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

      {/* SECTION 2: INTRO + FILTER BAR */}
      <section className="py-20 bg-[var(--bg-primary)] px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.p
            className="text-center text-[var(--text-secondary)] font-body text-[15px] leading-[1.8] max-w-[560px] mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('intro')}
          </motion.p>

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
              {filteredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
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
