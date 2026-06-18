/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:     'var(--bg-primary)',
        secondary:   'var(--bg-secondary)',
        surface:     'var(--bg-surface)',
        card:        'var(--bg-card)',
        'text-main': 'var(--text-primary)',
        'text-muted':'var(--text-secondary)',
        accent:      'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'brand-brown': 'var(--brand-brown)',
        border:      'var(--border)',
        'border-light': 'var(--border-light)',
        'nav-bg':    'var(--nav-bg)',
        'input-bg':  'var(--input-bg)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Barlow Condensed', 'sans-serif'],
        body:    ['var(--font-body)', 'Barlow', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra:  '0.35em',
      },
    },
  },
  plugins: [],
};

module.exports = config;
