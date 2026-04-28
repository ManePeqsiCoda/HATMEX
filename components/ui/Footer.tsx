'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import emailjs from '@emailjs/browser';
import { 
  EMAILJS_SERVICE_ID, 
  EMAILJS_TEMPLATE_ID, 
  EMAILJS_PUBLIC_KEY 
} from '@/lib/config';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !EMAILJS_SERVICE_ID) return;

    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { user_email: email },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="bg-[#1A2E1C] pt-20 pb-10 px-6 md:px-12 text-[#F5F0E8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Column 1: Info & Newsletter */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <Link href="/" className="flex flex-col group w-fit">
              <span className="font-display font-black text-3xl tracking-[0.14em] uppercase text-[#F5F0E8] group-hover:text-[var(--accent)] transition-colors">
                HATMEX
              </span>
            </Link>
            
            <p className="text-[#F5F0E8]/70 leading-relaxed max-w-md font-body text-sm">
              {t('tagline')}
            </p>

            <a 
              href={`mailto:${t('email')}`}
              className="text-[#F5F0E8]/80 hover:text-[var(--text-primary)] transition-colors font-display text-sm tracking-widest uppercase"
            >
              {t('email')}
            </a>

            <form onSubmit={handleNewsletter} className="flex flex-col gap-4 max-w-sm">
              <div className="flex bg-[#F5F0E8]/[0.08] border border-[#F5F0E8]/15 focus-within:border-[var(--accent)] transition-all">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-[#F5F0E8] px-4 py-3 w-full font-body text-sm placeholder:text-[#F5F0E8]/40"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[var(--accent)] text-[var(--text-primary)] px-6 py-3 hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center min-w-[60px]"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-[var(--text-primary)]/30 border-t-[var(--text-primary)] rounded-full animate-spin" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
              {status === 'success' && <p className="text-green-500 text-xs uppercase tracking-widest">{t('newsletter.success')}</p>}
              {status === 'error' && <p className="text-[var(--accent)] text-xs uppercase tracking-widest">{t('newsletter.error')}</p>}
            </form>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-8">
            <h4 className="font-display font-bold text-xs tracking-[0.2em] uppercase text-[var(--accent)]">
              {t('pages_label')}
            </h4>
            <ul className="flex flex-col gap-4 font-display text-sm tracking-widest uppercase">
              <li><Link href="/about" className="text-[#F5F0E8]/80 hover:text-[var(--accent)] transition-colors">{tNav('about')}</Link></li>
              <li><Link href="/processes" className="text-[#F5F0E8]/80 hover:text-[var(--accent)] transition-colors">{tNav('processes')}</Link></li>
              <li><Link href="/catalog" className="text-[#F5F0E8]/80 hover:text-[var(--accent)] transition-colors">{tNav('catalog')}</Link></li>
              <li><Link href="/contact" className="text-[#F5F0E8]/80 hover:text-[var(--accent)] transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Big Branding Logotype */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-start">
            <span className="font-display font-black text-4xl md:text-5xl lg:text-8xl tracking-[0.16em] uppercase text-[#F5F0E8] opacity-5 text-right leading-none pointer-events-none">
              HATMEX
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[#F5F0E8]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-[10px] tracking-widest uppercase text-[#F5F0E8]/40">
            {t('copyright')}
          </p>
          
          <div className="flex items-center gap-4">
            {[
              { name: 'YouTube', href: '#', path: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
              { name: 'Facebook', href: '#', path: 'M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.323v-21.35c0-.732-.593-1.325-1.325-1.325z' },
              { name: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center border border-[#F5F0E8]/15 hover:border-[var(--accent)] hover:bg-[var(--accent)] text-[#F5F0E8] hover:text-[var(--text-primary)] transition-all"
                aria-label={social.name}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
