'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/ui/SubpageHero';
import ProcessesCarousel from '@/components/sections/Processes';
import Standards from '@/components/sections/Standards';

const PROCESS_CARDS = [
  { key: 'discovery', image: '/images/processes/process-01.png', stepNum: '01', stepIdx: 1 },
  { key: 'sampling', image: '/images/processes/process-10.png', stepNum: '02', stepIdx: 2 },
  { key: 'production', image: '/images/client/13.jpeg', stepNum: '03', stepIdx: 3 },
  { key: 'branding', image: '/images/processes/process-06.png', stepNum: '04', stepIdx: 4 },
  { key: 'delivery', image: '/images/processes/process-12.png', stepNum: '05', stepIdx: 5 },
] as const;

export default function ProcessesClient() {
  const t = useTranslations('processes');
  const tHome = useTranslations('home');

  return (
    <main className="flex flex-col w-full min-h-screen">
      <SubpageHero 
        title={t('hero_title')} 
        image="/images/hero/hero-about.png" 
      />

      <Standards />

      {/* Section 2: Our Process Steps */}
      <section className="py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <motion.h2 
              className="font-display font-black text-4xl md:text-5xl leading-tight tracking-[0.14em] uppercase text-[var(--text-primary)] mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('processes_heading')}
            </motion.h2>
            <motion.p 
              className="font-body text-[var(--text-secondary)] text-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('team_intro')}
            </motion.p>
          </div>

          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_CARDS.slice(0, 3).map((card, idx) => (
              <motion.div
                key={card.key}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="group relative aspect-square w-full border border-dashed border-[var(--border)] p-2 grayscale hover:grayscale-0 transition-all duration-700 hover:border-solid hover:border-[var(--accent)]">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={`HATMEX — ${tHome(`process_step_${card.stepIdx}_title`)}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display font-black text-xs tracking-[0.2em] text-[var(--accent)]">
                    {card.stepNum}
                  </span>
                  <h3 className="font-display font-bold text-sm tracking-[0.16em] uppercase text-[var(--text-secondary)]">
                    {tHome(`process_step_${card.stepIdx}_title`)}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-8">
            {PROCESS_CARDS.slice(3).map((card, idx) => (
              <motion.div
                key={card.key}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx + 3) * 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="group relative aspect-square w-full border border-dashed border-[var(--border)] p-2 grayscale hover:grayscale-0 transition-all duration-700 hover:border-solid hover:border-[var(--accent)]">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={`HATMEX — ${tHome(`process_step_${card.stepIdx}_title`)}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display font-black text-xs tracking-[0.2em] text-[var(--accent)]">
                    {card.stepNum}
                  </span>
                  <h3 className="font-display font-bold text-sm tracking-[0.16em] uppercase text-[var(--text-secondary)]">
                    {tHome(`process_step_${card.stepIdx}_title`)}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our Processes Carousel */}
      <ProcessesCarousel />
    </main>
  );
}
