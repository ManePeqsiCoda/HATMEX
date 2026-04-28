# HATMEX — Premium Private-Label Headwear Website

> A dark, cinematic editorial landing page built with Next.js 14 and next-intl.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript (strict) | Type safety |
| Tailwind CSS v3 | Styling |
| next-intl | EN/ES i18n routing |
| Framer Motion | Animations |
| EmailJS | Contact form (client-side email) |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|----------|------------|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the deployed site (e.g. `https://hatmex.com`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email shown on the site |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Your EmailJS Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key |

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
Hatmex-Web/
├── app/
│   ├── layout.tsx               # Root layout (delegates to locale)
│   ├── globals.css              # CSS variables + Tailwind layers
│   └── [locale]/
│       ├── layout.tsx           # Locale layout (fonts, theme, nav)
│       ├── page.tsx             # Home (/)
│       ├── about/page.tsx       # About Us
│       ├── processes/page.tsx   # Processes
│       ├── gallery/page.tsx     # Gallery
│       └── contact/page.tsx     # Contact
├── components/
│   ├── ui/                      # Shared UI components (Navbar, Footer…)
│   └── sections/                # Page-level sections
├── lib/
│   ├── config.ts                # Site config + EmailJS constants
│   └── utils.ts                 # Helper utilities
├── messages/
│   ├── en.json                  # English translations
│   └── es.json                  # Spanish translations
├── public/
│   └── images/
│       ├── hero/                # Full-bleed B&W hero photography
│       ├── gallery/             # Product gallery images
│       ├── processes/           # Process carousel images
│       └── logos/               # Customer brand logos
├── i18n.ts                      # next-intl server config
├── middleware.ts                 # Locale routing middleware
├── next.config.mjs              # Next.js config with next-intl plugin
├── tailwind.config.js           # Tailwind config with CSS variable colors
└── tsconfig.json                # TypeScript strict config
```

---

## Themes

The website uses a single, fixed theme: **Hatmex** — a warm light lifestyle theme inspired by Tecovas Cowboy Boots using the Siraitia Verde-Dorado color palette.

The theme variables are defined in `app/globals.css` and applied globally via the `:root` selector.

---

## Internationalization

Routes are structured as `/[locale]/path` using `next-intl`:

- **English** (default): `/`, `/about`, `/processes`, `/gallery`, `/contact`
- **Spanish**: `/es`, `/es/about`, `/es/procesos`, `/es/galeria`, `/es/contacto`

Translation keys live in `messages/en.json` and `messages/es.json`.

---

## Deployment (Vercel)

1. Push to GitHub and connect the repo to Vercel.
2. Set all environment variables (see table above) in the Vercel dashboard.
3. Deploy — no special server configuration required.

---

## Scripts

```bash
npm run dev      # Start development server on port 3000
npm run build    # Production build (must pass with 0 errors)
npm run start    # Start production server
npm run lint     # Run ESLint
```
