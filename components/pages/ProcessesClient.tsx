'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SubpageHero from '@/components/ui/SubpageHero';
import ProcessesCarousel from '@/components/sections/Processes';
import Standards from '@/components/sections/Standards';

const DEPARTMENTS = [
  { key: 'design', image: '/images/client/13.jpeg' },
  { key: 'engineering', image: '/images/client/16.jpeg' },
  { key: 'quality', image: '/images/client/21.jpeg' },
] as const;

export default function ProcessesClient() {
  const t = useTranslations('processes');

  return (
    <main className="flex flex-col w-full min-h-screen">
      <SubpageHero 
        title={t('hero_title')} 
        image="/images/hero/hero-about.png" 
      />

      <Standards />

      {/* Section 2: Team of Experts */}
      <section className="py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <motion.h2 
              className="font-display font-black text-4xl md:text-5xl leading-tight tracking-[0.14em] uppercase text-[var(--text-primary)] mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('team_headline')}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept, idx) => (
              <motion.div
                key={dept.key}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="group relative aspect-square w-full border border-dashed border-[var(--border)] p-2 grayscale hover:grayscale-0 transition-all duration-700 hover:border-solid hover:border-[var(--accent)]">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={dept.image}
                      alt={`Departamento HATMEX — ${t(`departments.${dept.key}`)}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-display font-bold text-sm tracking-[0.16em] uppercase text-[var(--text-secondary)]">
                  {t(`departments.${dept.key}`)}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Our Processes */}
      <ProcessesCarousel />
    </main>
  );
}
