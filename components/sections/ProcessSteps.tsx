'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Box, Factory, Package, Truck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    titleKey: 'process_step_1_title',
    descKey: 'process_step_1_desc',
    Icon: Search,
  },
  {
    number: '02',
    titleKey: 'process_step_2_title',
    descKey: 'process_step_2_desc',
    Icon: Box,
  },
  {
    number: '03',
    titleKey: 'process_step_3_title',
    descKey: 'process_step_3_desc',
    Icon: Factory,
  },
  {
    number: '04',
    titleKey: 'process_step_4_title',
    descKey: 'process_step_4_desc',
    Icon: Package,
  },
  {
    number: '05',
    titleKey: 'process_step_5_title',
    descKey: 'process_step_5_desc',
    Icon: Truck,
  },
];

export default function ProcessSteps() {
  const t = useTranslations('home');

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow text-[var(--accent)] mb-4 block">
            {t('processsteps_eyebrow')}
          </span>
          <h2 className="section-title text-[var(--text-primary)]">
            {t('processes_heading')}
          </h2>
        </motion.div>

        {/* Timeline / Cards */}
        <div className="relative">
          {/* Desktop horizontal connector line */}
          <div
            className="hidden md:block absolute top-[28px] left-0 right-0 h-[1px] bg-[var(--border)]"
            aria-hidden="true"
          />

          {/* Mobile vertical connector line */}
          <div
            className="md:hidden absolute top-0 bottom-0 left-[27px] w-[1px] bg-[var(--border)]"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.Icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-row md:flex-col items-start md:items-center gap-5 md:gap-6"
                >
                  {/* Number bubble */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent)] flex items-center justify-center">
                    <span className="font-display font-black text-sm tracking-widest text-[var(--accent)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-start md:items-center text-left md:text-center pt-1 md:pt-0">
                    <div className="w-10 h-10 flex items-center justify-center text-[var(--accent)] mb-3">
                      <Icon strokeWidth={1.5} className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-[0.12em] uppercase text-[var(--text-primary)] mb-2">
                      {t(step.titleKey)}
                    </h3>
                    <p className="font-body text-[13px] leading-relaxed text-[var(--text-secondary)] max-w-[220px]">
                      {t(step.descKey)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
