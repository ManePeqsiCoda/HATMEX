'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { locales } from '@/i18n';

const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/processes', key: 'processes' },
  { href: '/catalog', key: 'catalog' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleLocale = () => {
    const nextLocale = currentLocale === 'en' ? 'es' : 'en';
    
    // Store preference in cookie
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    
    // Switch locale
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12',
          isScrolled 
            ? 'bg-[var(--nav-bg)] border-b border-[var(--border)] backdrop-blur-[8px] py-4' 
            : 'bg-transparent border-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Branding */}
        <Link href="/" className="flex flex-col group gap-0">
          <span className={cn(
            "font-display font-black text-2xl tracking-[0.14em] uppercase transition-colors duration-500",
            isScrolled ? "text-[var(--text-primary)]" : "text-white"
          )}>
            HATMEX
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'font-display text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 relative py-1',
                    isScrolled 
                      ? (isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]')
                      : (isActive ? 'text-white' : 'text-white/75 hover:text-white')
                  )}
                >
                  {t(link.key)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--accent)]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Tools & CTA */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={toggleLocale}
            className={cn(
              "font-display text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
              isScrolled ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)]" : "text-white/75 hover:text-white"
            )}
          >
            {currentLocale === 'en' ? 'EN | ' : ''}
            <span className={cn(
              isScrolled 
                ? (currentLocale === 'es' ? 'text-[var(--text-primary)]' : '') 
                : (currentLocale === 'es' ? 'text-white' : '')
            )}>ES</span>
            {currentLocale === 'es' ? ' | EN' : ''}
          </button>

          <Link
            href="/contact"
            className={cn(
              "font-display text-[11px] font-bold tracking-[0.16em] uppercase px-6 py-2.5 transition-all duration-500 border-[1.5px]",
              isScrolled 
                ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-primary)]" 
                : "border-white text-white hover:bg-white hover:text-black"
            )}
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile: Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className={cn("w-6 h-[1px] transition-colors", isScrolled ? "bg-[var(--text-primary)]" : "bg-white")} />
          <span className={cn("w-6 h-[1px] transition-colors", isScrolled ? "bg-[var(--text-primary)]" : "bg-white")} />
          <span className={cn("w-6 h-[1px] transition-colors", isScrolled ? "bg-[var(--text-primary)]" : "bg-white")} />
        </button>
      </div>
      </nav>

      {/* Mobile Menu Overlay — fuera del <nav> para evitar stacking context del backdrop-blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[9999] h-[100dvh] w-screen bg-[var(--bg-primary)] isolate flex flex-col items-center justify-center p-8"
          >
            <button
              className="absolute top-8 right-8 p-4 text-[var(--text-primary)]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <ul className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-display text-xl font-bold tracking-widest uppercase transition-colors",
                        isActive ? "text-[var(--accent)]" : "text-[var(--text-primary)] hover:text-[var(--accent)]"
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => {
                toggleLocale();
                setMobileMenuOpen(false);
              }}
              className="mt-12 font-display text-sm tracking-widest uppercase text-[var(--accent)]"
            >
              {currentLocale === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
