'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CONTACT_EMAIL, PHONE_MEXICO_DISPLAY, PHONE_MEXICO_RAW, PHONE_USA_DISPLAY, PHONE_USA_RAW } from '@/lib/config';

export default function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col h-full p-12 lg:p-16 border-r border-[var(--border-light)]"
    >
      <div className="mb-12">
        <p className="eyebrow mb-4 text-[var(--accent)]">
          {t('subheading')}
        </p>
        <h2 className="section-title mb-8 text-[var(--text-primary)]">
          {t('heading')}
        </h2>
        <p className="font-body text-[var(--text-secondary)] text-lg leading-relaxed">
          {t('body')}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.email_label')}
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-body text-xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3">
            <span className="text-[var(--accent)]">✉</span> {CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.address_label')}
          </span>
          <div className="flex flex-col gap-2">
            <p className="font-body text-xl text-[var(--text-primary)] inline-flex items-center gap-3">
              <span className="text-[var(--accent)]">📍</span> Eagle Pass, Texas. USA
            </p>
            <p className="font-body text-xl text-[var(--text-primary)] inline-flex items-center gap-3">
              <span className="text-[var(--accent)]">📍</span> León, Guanajuato. México
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.phone_label')}
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <a href={`tel:${PHONE_MEXICO_RAW}`} className="font-body text-xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3">
                <span className="text-[var(--accent)]">📞</span> {t('info.phone_mexico_label')}: {PHONE_MEXICO_DISPLAY}
              </a>
            </div>
            <div className="flex items-center justify-between gap-3">
              <a href={`tel:${PHONE_USA_RAW}`} className="font-body text-xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3">
                <span className="text-[var(--accent)]">📞</span> {t('info.phone_usa_label')}: {PHONE_USA_DISPLAY}
              </a>
              <a
                href="https://wa.me/18304159920"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3 py-1.5 rounded-full font-body text-sm font-semibold hover:bg-[#128C7E] transition-colors shrink-0"
                aria-label="WhatsApp USA"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.social_label')}
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://instagram.com/hatmex" target="_blank" className="font-body text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2">
              <span className="text-[var(--accent)] text-xs">📸</span> Instagram
            </a>
            <a href="https://facebook.com/hatmex" target="_blank" className="font-body text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2">
              <span className="text-[var(--accent)] text-xs">📘</span> Facebook
            </a>
            <a href="https://tiktok.com/@hatmex" target="_blank" className="font-body text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2">
              <span className="text-[var(--accent)] text-xs">🎵</span> TikTok
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
