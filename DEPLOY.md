# Despliegue HATMEX Web

> Fecha: 2026-04-27

---

## Estado del Build

- **Next.js:** 14.2.3
- **Build:** ✅ Exitoso (13 rutas generadas estáticamente)
- **TypeScript:** ✅ Sin errores
- **ESLint:** ✅ Sin errores críticos

---

## Secciones Activas

### Home
- Hero con imagen de fondo
- WeEvolve (imagen real del cliente)
- Values (íconos SVG)
- Processes Carousel (12 imágenes de proceso)
- ProcessVideoGrid (6 videos con hover + modal)
- Customers (marquee de texto)
- Team (3 departamentos con fotos reales)

### About Us
- SubpageHero
- BrandStory (texto)
- Mission & Vision (2 imágenes)
- Values (6 íconos SVG)
- Customers

### Processes
- SubpageHero
- Standards (7 estándares, texto + íconos)
- Team of Experts (3 departamentos con fotos reales)
- Processes Carousel

### Catalog
- Grid dinámico con 63 SKUs Wrangler
- Filtros por categoría
- Placeholder visual cuando falta imagen
- CTA Banner con fondo real

### Contact
- Header sólido
- Formulario funcional (EmailJS)
- Info de contacto

---

## Configuración para Vercel

### `next.config.mjs`
- `output: 'standalone'`
- Imágenes: `avif`, `webp`
- Headers de seguridad: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`
- Cache de assets: `max-age=31536000`

### `middleware.ts`
- Excluye videos (`mp4`, `webm`, `mov`) del middleware de i18n
- Evita 404 en archivos estáticos de video

---

## Variables de Entorno Requeridas

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

> Configurar en el dashboard de Vercel antes del primer deploy.

---

## Deploy

```bash
# 1. Build local (verificar)
npm run build

# 2. Commit y push
git add .
git commit -m "Deploy: optimizaciones y limpieza"
git push origin main

# 3. Vercel detecta automáticamente el push y hace deploy
```

---

## URLs esperadas tras deploy

| Ruta | Descripción |
|------|-------------|
| `/` | Home (en inglés por defecto) |
| `/es` | Home en español |
| `/about` | About Us |
| `/es/about` | Sobre Nosotros |
| `/processes` | Processes |
| `/es/processes` | Procesos |
| `/catalog` | Catalog |
| `/es/catalog` | Catálogo |
| `/contact` | Contact |
| `/es/contact` | Contacto |
