/**
 * lib/config.ts
 * Central configuration constants for the HATMEX website.
 */

export const SITE_NAME = 'HATMEX';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hatmex.com';

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hatmexco@gmail.com';

/** Phone numbers — centralized to keep display and click-to-call consistent */
export const PHONE_MEXICO_DISPLAY = '+52 (477) 109 6896';
export const PHONE_MEXICO_RAW = '+52477109689';
export const PHONE_USA_DISPLAY = '+1 (830) 415 9920';
export const PHONE_USA_RAW = '+18304159920';

/** EmailJS credentials — set via environment variables */
export const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? '';
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
export const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? '';

export const LOCALES = ['en', 'es'] as const;
export const DEFAULT_LOCALE = 'en';
