'use client';

import React, { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default function ContactForm() {
  const t = useTranslations('contact');
  const tVal = useTranslations('validation');
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (formData: FormData) => {
    const newErrors: FormErrors = {};
    const name = formData.get('from_name') as string;
    const email = formData.get('from_email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || name.length < 2) newErrors.name = tVal('name');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = tVal('email');
    if (!phone || phone.replace(/\D/g, '').length < 7) newErrors.phone = tVal('phone');
    if (!message || message.length < 10) newErrors.message = tVal('message');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    const formData = new FormData(formRef.current!);
    if (!validate(formData)) return;

    setStatus('loading');

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_hatmex',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_hatmex',
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key'
      );
      setStatus('success');
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    formRef.current?.reset();
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="w-20 h-20 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display font-black text-3xl mb-2 tracking-widest uppercase text-[var(--text-primary)]">
          {t('success_title')}
        </h3>
        <p className="font-body text-[var(--text-secondary)] mb-8">
          {t('success')}
        </p>
        <button
          onClick={handleReset}
          className="font-display font-bold text-xs tracking-[.2em] uppercase border border-[var(--border)] px-8 py-4 hover:bg-[var(--accent)] hover:text-[var(--text-primary)] transition-all"
        >
          {t('success_reset')}
        </button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="font-display text-[10px] font-bold tracking-[.14em] text-[var(--text-secondary)] uppercase">
              {t('name')}
            </label>
            <input
              name="from_name"
              type="text"
              className={`bg-[var(--input-bg)] border ${errors.name ? 'border-[#B83232]' : 'border-[var(--border)]'} p-4 text-[var(--text-primary)] font-body focus:border-[var(--accent)] outline-none transition-colors rounded-[2px] placeholder:text-[var(--text-muted)]`}
              placeholder="John Doe"
            />
            {errors.name && <span className="text-[10px] text-[#B83232] uppercase tracking-[.14em] font-bold mt-1">{errors.name}</span>}
          </div>
          
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-display text-[10px] font-bold tracking-[.14em] text-[var(--text-secondary)] uppercase">
              {t('email')}
            </label>
            <input
              name="from_email"
              type="email"
              className={`bg-[var(--input-bg)] border ${errors.email ? 'border-[#B83232]' : 'border-[var(--border)]'} p-4 text-[var(--text-primary)] font-body focus:border-[var(--accent)] outline-none transition-colors rounded-[2px] placeholder:text-[var(--text-muted)]`}
              placeholder="john@example.com"
            />
            {errors.email && <span className="text-[10px] text-[#B83232] uppercase tracking-[.14em] font-bold mt-1">{errors.email}</span>}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-display text-[10px] font-bold tracking-[.14em] text-[var(--text-secondary)] uppercase">
            {t('phone')}
          </label>
          <input
            name="phone"
            type="tel"
            className={`bg-[var(--input-bg)] border ${errors.phone ? 'border-[#B83232]' : 'border-[var(--border)]'} p-4 text-[var(--text-primary)] font-body focus:border-[var(--accent)] outline-none transition-colors rounded-[2px] placeholder:text-[var(--text-muted)]`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <span className="text-[10px] text-[#B83232] uppercase tracking-[.14em] font-bold mt-1">{errors.phone}</span>}
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label className="font-display text-[10px] font-bold tracking-[.14em] text-[var(--text-secondary)] uppercase">
            {t('subject')}
          </label>
          <input
            name="subject"
            type="text"
            className="bg-[var(--input-bg)] border border-[var(--border)] p-4 text-[var(--text-primary)] font-body focus:border-[var(--accent)] outline-none transition-colors rounded-[2px] placeholder:text-[var(--text-muted)]"
            placeholder="Wholesale Inquiry"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="font-display text-[10px] font-bold tracking-[.14em] text-[var(--text-secondary)] uppercase">
            {t('message')}
          </label>
          <textarea
            name="message"
            className={`bg-[var(--input-bg)] border ${errors.message ? 'border-[#B83232]' : 'border-[var(--border)]'} p-4 text-[var(--text-primary)] font-body focus:border-[var(--accent)] outline-none transition-colors min-h-[180px] resize-y rounded-[2px] placeholder:text-[var(--text-muted)]`}
            placeholder={`${t('message')}...`}
          />
          {errors.message && <span className="text-[10px] text-[#B83232] uppercase tracking-[.14em] font-bold mt-1">{errors.message}</span>}
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-4 mt-4">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full py-5 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('sending')}
              </>
            ) : t('send')}
          </button>
          
          {status === 'error' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-[#B83232] text-center font-bold tracking-[.14em] uppercase"
            >
              {t('error')}
            </motion.p>
          )}
        </div>
      </form>
    </div>
  );
}
