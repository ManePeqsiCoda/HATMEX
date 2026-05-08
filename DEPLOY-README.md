# DEPLOY-README — Hatmex Web (Hostinger Shared Hosting)

## 1. Stack Detectado

| Campo | Valor |
|-------|-------|
| Framework | Next.js 14.2.3 |
| Router | App Router (`app/`) |
| i18n | next-intl (locales: `en`, `es`) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Contact | EmailJS (client-side) |

## 2. Configuracion de Build (Static Export)

Archivo: `next.config.mjs`

```js
output: 'export'
distDir: 'dist'
trailingSlash: true
images: { unoptimized: true }
```

**Notas:**
- `output: 'standalone'` fue reemplazado por `output: 'export'`.
- Los `headers` de seguridad definidos en `next.config.mjs` **no se aplican** en export estatico; Hostinger debe configurarlos manualmente si es necesario.
- El middleware (`middleware.ts`) se ignora en export estatico. El routing de i18n se resuelve via `.htaccess`.

## 3. Rutas Dinamicas Pre-renderizadas

El unico segmento dinamico es `[locale]`. Todas las paginas estaticas se generaron para ambos idiomas:

| Ruta | `/en` | `/es` |
|------|-------|-------|
| `/` (Home) | ✅ `en/index.html` | ✅ `es/index.html` |
| `/about/` | ✅ `en/about/index.html` | ✅ `es/about/index.html` |
| `/catalog/` | ✅ `en/catalog/index.html` | ✅ `es/catalog/index.html` |
| `/contact/` | ✅ `en/contact/index.html` | ✅ `es/contact/index.html` |
| `/processes/` | ✅ `en/processes/index.html` | ✅ `es/processes/index.html` |

**Excepciones / No aplican:**
- No hay rutas dinamicas de producto (`[sku]`, `[id]`, etc.). El catalogo es una unica pagina con filtrado client-side.
- No hay API routes (`app/api/` no existe).
- No hay autenticacion server-side (NextAuth, cookies, etc.).

## 4. Assets Verificados

- **Imagenes del catalogo**: 90 archivos `.webp` en `public/Catalogo/` → copiados a `dist/Catalogo/`.
- **Imagenes publicas**: `public/images/` → copiadas a `dist/images/`.
- **Data**: `public/Catalogo/productos.json` → `dist/Catalogo/productos.json` (90 productos).
- **Fuentes**: Google Fonts cargadas via `next/font` (inlining en CSS).

## 5. Comando de Build

```bash
npm run build
```

**Pre-requisitos:**
```bash
npm install
```

**Advertencias esperadas (no criticas):**
- `headers are not applied when exporting` — normal en static export.
- `Statically exporting a Next.js application via next export disables API routes and middleware` — normal, no hay APIs.
- `The locale parameter in getRequestConfig is deprecated` — advertencia de next-intl; no afecta el build.

## 6. Estructura de `dist/` Confirmada

```
dist/
├── .htaccess              <-- Reglas de rewrite para i18n + SPA routing
├── 404.html               <-- Pagina 404 estatica
├── sitemap.xml            <-- Sitemap (si existe)
├── _next/                 <-- Assets de Next.js (JS, CSS, chunks)
├── Catalogo/              <-- 90 imagenes .webp + productos.json
├── images/                <-- Imagenes del sitio (hero, clientes, etc.)
├── assets web/            <-- Assets adicionales
├── en/                    <-- Locale por defecto
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   ├── catalog/
│   │   └── index.html
│   ├── contact/
│   │   └── index.html
│   └── processes/
│       └── index.html
└── es/                    <-- Locale espanol
    ├── index.html
    ├── about/
    │   └── index.html
    ├── catalog/
    │   └── index.html
    ├── contact/
    │   └── index.html
    └── processes/
        └── index.html
```

## 7. Instrucciones de Subida a Hostinger

### Opcion A: File Manager (recomendado para pocos archivos)
1. Accede al **Hostinger Panel** → **Websites** → tu dominio → **File Manager**.
2. Navega a la carpeta raiz del dominio (usualmente `public_html/`).
3. **Elimina** el contenido anterior si es necesario.
4. Sube **todo el contenido de la carpeta `dist/`** (NO la carpeta `dist` en si, sino su contenido) a `public_html/`.
5. Verifica que `.htaccess` este presente en la raiz.

### Opcion B: FTP (recomendado para muchos archivos)
1. Abre tu cliente FTP (FileZilla, Cyberduck) y conectate con las credenciales de Hostinger.
2. Navega a `public_html/`.
3. Elimina el contenido anterior si es necesario.
4. Sube **todo el contenido de `dist/`** a `public_html/`.
5. Verifica que `.htaccess` se haya subido correctamente.

### Verificacion Post-Deploy
1. Visita `https://tudominio.com/` → debe cargar el sitio en **ingles** (default locale).
2. Visita `https://tudominio.com/es/` → debe cargar el sitio en **espanol**.
3. Visita `https://tudominio.com/catalog/` → catalogo en ingles.
4. Visita `https://tudominio.com/es/catalog/` → catalogo en espanol.
5. Recarga cualquier pagina interna (ej: `/catalog/`) → no debe dar **404**.
6. Abre el catalogo y verifica que las imagenes de los sombreros carguen.

### SSL/HTTPS
1. En Hostinger Panel → **Websites** → tu dominio → **SSL**.
2. Activa **SSL gratuito** (Let's Encrypt) si no esta activo.
3. Activa **Force HTTPS** para redirigir todo el trafico a HTTPS.

## 8. Notas Importantes

- **Middleware ignorado**: `middleware.ts` no se ejecuta en Hostinger Shared. El comportamiento de i18n se emula via `.htaccess`.
- **No Node.js en servidor**: Todo el sitio es HTML/CSS/JS estatico. El catalogo se filtra via JavaScript en el navegador.
- **Contacto**: El formulario de contacto usa EmailJS (client-side). No requiere backend.
- **Imagenes optimizadas**: Las 90 imagenes del catalogo fueron redimensionadas a 800x1000px y comprimidas en WebP.

---

**Fecha de preparacion:** 2026-05-06
**Commit:** `1e8af5c`
