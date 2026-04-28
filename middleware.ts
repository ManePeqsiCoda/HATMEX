import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // No prefix for default (en), explicit for others (es)
});

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - api routes
    // - _next/static, _next/image
    // - favicon.ico
    // - public folder files with extensions
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|mp4|webm|mov)).*)',
  ],
};
