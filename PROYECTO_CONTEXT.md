# HATMEX Web — Documentación del Proyecto

> Fecha de documentación: 2026-05-05
> Proyecto: hatmex-web (Next.js 14, App Router)
> Ruta: `C:\Users\Usuario\Documents\Manuel Mesa Diseño\HATMEX\Hatmex-Web`

---

## 1. Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 14.2.3 | Framework principal (App Router) |
| React | 18 | UI Library |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 3.4.1 | Estilos utilitarios |
| next-intl | 3.12.0 | Internacionalización (i18n) |
| framer-motion | 11.0.28 | Animaciones |
| @emailjs/browser | 4.3.3 | Envío de correos desde cliente |
| lucide-react | * | Iconos (instalado por este proyecto) |

**Fuentes:** Barlow Condensed (display), Barlow (body) via Google Fonts.

**Build output:** `standalone` (para despliegues autónomos).

---

## 2. Estructura de Archivos

```
app/
├── layout.tsx              # Layout raíz (delega a [locale]/layout.tsx)
├── globals.css             # Variables CSS, utilidades, componentes base
├── [locale]/
│   ├── layout.tsx          # Layout por idioma (carga fuentes, Navbar, Footer)
│   ├── page.tsx            # Home (Hero, WeEvolve, Values, Processes, ProcessVideoGrid, Customers, Team)
│   ├── about/page.tsx      # About Us (SubpageHero, BrandStory, MissionVision×2, AboutValues, Customers)
│   ├── catalog/page.tsx    # Catálogo (server → CatalogClient)
│   ├── contact/page.tsx    # Contacto (header, ContactInfo, ContactForm)
│   └── processes/page.tsx  # Procesos (server → ProcessesClient)

components/
├── pages/
│   ├── CatalogClient.tsx   # Catálogo interactivo con filtros y grid
│   └── ProcessesClient.tsx # Página de departamentos y procesos
├── sections/
│   ├── AboutValues.tsx     # 6 valores de la empresa (grid)
│   ├── BrandStory.tsx      # Sección "Our Story" (2 columnas)
│   ├── ContactForm.tsx     # Formulario de contacto vía EmailJS
│   ├── ContactInfo.tsx     # Info lateral de contacto (email, direcciones, redes)
│   ├── Customers.tsx       # Carrusel infinito de logos clientes
│   ├── Hero.tsx            # Hero fullscreen de la home
│   ├── MissionVision.tsx   # Componente reutilizable Misión/Visión
│   ├── ProcessSteps.tsx    # [NUEVO] 5 pasos oficiales del brochure
│   ├── ProcessVideoGrid.tsx# Grid de 6 (ahora 5) videos de procesos
│   ├── Processes.tsx       # Carrusel de 12 pasos de manufactura
│   ├── Standards.tsx       # 7 estándares de trabajo (grid)
│   ├── Team.tsx            # Equipo de expertos (3 departamentos)
│   ├── Values.tsx          # 3 valores destacados en home
│   └── WeEvolve.tsx        # Sección "We Evolve With Every Step Forward"
└── ui/
    ├── Footer.tsx          # Pie de página (3 columnas + newsletter)
    ├── Navbar.tsx          # Navegación fija con blur, indicador activo, switch idioma
    ├── SubpageHero.tsx     # Hero reutilizable para subpáginas
    └── VideoInteractive.tsx# Video con lazy-load, hover, modal fullscreen

lib/
├── config.ts               # Constantes: SITE_NAME, CONTACT_EMAIL, EmailJS creds, locales
├── navigation.ts           # Link, redirect, usePathname, useRouter (next-intl)
└── utils.ts                # cn(), capitalize()

messages/
├── en.json                 # Traducciones en inglés
└── es.json                 # Traducciones en español

public/
├── images/
│   ├── client/             # Fotos y videos de procesos (3.mp4, 4.mp4, 6.mp4, 7.mp4, 10.mp4, 12.mp4)
│   ├── client/posters/     # Posters de los videos (.jpg)
│   ├── hero/               # Imágenes de hero
│   └── processes/          # process-01.png … process-12.png
├── Catalogo/               # productos.json + imágenes de catálogo
└── sitemap.xml
```

---

## 3. Rutas de Navegación

| Ruta | Página | Componentes principales |
|---|---|---|
| `/` | Home | Hero, WeEvolve, Values, **ProcessSteps**, **ProcessVideoGrid**, Customers, Team |
| `/about` | About Us | SubpageHero, BrandStory, MissionVision, AboutValues, Customers |
| `/processes` | Processes | SubpageHero, Standards, Team grid, ProcessesCarousel (12 pasos) |
| `/catalog` | Catalog | Hero catálogo, filtros, grid productos, CTA |
| `/contact` | Contact | Header, ContactInfo, ContactForm |

**Navbar links:** Home, About Us, Processes, Catalog, Contact + CTA "Get a Quote"
**Switch de idioma:** EN / ES (cookie `NEXT_LOCALE`)

---

## 4. Secciones por Página

### Home (`/`)
1. **Hero** — Imagen fullscreen, overlay oscuro, título animado, 2 CTAs
2. **WeEvolve** — Imagen + texto con enlace a About
3. **Values** — 3 tarjetas: Respect, Communication, Responsibility
4. **ProcessSteps** (antes Processes) — 5 pasos oficiales del brochure
5. **ProcessVideoGrid** — Grid de videos Behind the Scenes / Craft in Motion
6. **Customers** — Carrusel marquee de clientes
7. **Team** — Grid de 3 departamentos (design, ppcp, engineering)

### About (`/about`)
1. **SubpageHero** — Título "10 Years of Experience"
2. **BrandStory** — Texto dividido en 2 columnas
3. **MissionVision** — Misión
4. **MissionVision** — Visión (reverse)
5. **AboutValues** — 6 valores con iconos SVG
6. **Customers** — Carrusel de clientes

### Processes (`/processes`)
1. **SubpageHero** — Título "Departments and Processes"
2. **Standards** — 7 estándares de trabajo
3. **Team of Experts** — Grid de 3 departamentos (design, engineering, quality)
4. **ProcessesCarousel** — 12 pasos de manufactura con controles

### Catalog (`/catalog`)
1. Hero catálogo
2. Filtros por categoría (BANGORA, CHINO, JAP, TELAR, SISOL, LANA, CASHMERE, PALMA, OTROS)
3. Grid de productos con `ProductCard`
4. Banner CTA inferior

### Contact (`/contact`)
1. Header con título/subtítulo
2. **ContactInfo** (40%) — Email, direcciones, redes
3. **ContactForm** (60%) — Nombre, Email, Asunto, Mensaje vía EmailJS

---

## 5. Assets Disponibles

### Videos (procesos de manufactura)
| Archivo | Poster | Etiqueta i18n |
|---|---|---|
| `/images/client/7.mp4` | `posters/7.jpg` | Steam shaping |
| `/images/client/4.mp4` | `posters/4.jpg` | Brushing finish |
| ~~`/images/client/12.mp4`~~ | ~~`posters/12.jpg`~~ | ~~Steam color~~ *(eliminado por baja calidad)* |
| `/images/client/6.mp4` | `posters/6.jpg` | Band fitting |
| `/images/client/10.mp4` | `posters/10.jpg` | Buckle detail |
| `/images/client/3.mp4` | `posters/3.jpg` | Lifestyle hold |

### Imágenes de procesos (carrusel 12 pasos)
`/images/processes/process-01.png` … `process-12.png`

### Fotos de equipo
- `/images/client/13.jpeg` — Design
- `/images/client/14.jpeg` — PPCP
- `/images/client/16.jpeg` — Engineering
- `/images/client/18.jpeg` — PPCP (Team)
- `/images/client/20.jpeg` — Engineering (Team)
- `/images/client/21.jpeg` — Quality

---

## 6. Configuración

### `next.config.mjs`
- `output: 'standalone'`
- Headers de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`)
- Cache de larga duración para `/images/` y `/catalogo/`

### i18n (`i18n.ts` + `middleware.ts`)
- Locales: `['en', 'es']`
- Default: `'en'`
- `localePrefix: 'as-needed'` → `/es/procesos` pero `/` (sin `/en`)

### Temas / Colores (CSS Variables)
| Token | Valor | Uso |
|---|---|---|
| `--bg-primary` | `#F5F0E8` | Fondo principal (crema) |
| `--bg-secondary` | `#EDE8DF` | Fondo secundario |
| `--bg-card` | `#FAF8F4` | Tarjetas |
| `--text-primary` | `#1A2E1C` | Texto principal (verde bosque) |
| `--text-secondary` | `#5A6B5E` | Texto secundario |
| `--accent` | `#C9A84C` | Dorado cálido |
| `--accent-hover` | `#B8962F` | Dorado hover |
| `--border` | `#D6D0C4` | Bordes |

---

## 7. Dependencias Clave

```json
{
  "next": "14.2.3",
  "react": "^18",
  "next-intl": "^3.12.0",
  "framer-motion": "^11.0.28",
  "@emailjs/browser": "^4.3.3",
  "lucide-react": "^latest",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

---

## 8. Notas para Agentes

- **NO modificar el catálogo** — se montará de a pocos.
- **NO eliminar videos que NO sean el de baja calidad** — ya identificado como `12.mp4` (steam_color / sombrero amarillo).
- **Mantener consistencia visual** — usar mismos colores CSS variables, fuentes Barlow/Barlow Condensed, espaciados consistentes.
- **Iconos:** Lucide React está disponible; el resto del proyecto usa inline SVGs.
- **Responsive:** Verificar móvil y desktop en todos los cambios.
- **i18n:** Todo texto visible debe pasar por `useTranslations` y estar en `messages/en.json` + `messages/es.json`.
