'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const DEPARTMENTS = [
  { key: 'design', image: '/images/client/14.jpeg' },
  { key: 'ppcp', image: '/images/client/18.jpeg' },
  { key: 'engineering', image: '/images/client/20.jpeg' },
];

export default function Team() {
  const t = useTranslations('home');
  const tProc = useTranslations('processes');

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <motion.h2 
            className="section-title mb-6 text-[var(--text-primary)]"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('team_heading')}
          </motion.h2>
          <motion.p 
            className="font-body text-[var(--text-secondary)] text-lg leading-relaxed max-w-[620px]"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('team_desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept, idx) => (
            <motion.div
              key={dept.key}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col gap-6 group"
            >
              <div className="relative aspect-square w-full border border-dashed border-[var(--border)] p-3 grayscale transition-all duration-500 group-hover:border-solid group-hover:border-[var(--accent)]">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={dept.image}
                    alt={`Equipo HATMEX — ${tProc(`departments.${dept.key}`)}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <h3 className="font-display font-bold text-sm tracking-[0.16em] uppercase text-[var(--text-secondary)]">
                {tProc(`departments.${dept.key}`)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
