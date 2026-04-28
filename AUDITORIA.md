# Auditoría de Imágenes — HATMEX Web

> Fecha: 2026-04-27

---

## Resumen Ejecutivo

Se revisaron todas las páginas y componentes del sitio. La mayoría de las secciones tienen assets completos. Se identificaron **3 departamentos en Processes** con placeholders visibles que fueron eliminados.

---

## Home (`app/[locale]/page.tsx`)

| Sección | Imagen | Estado |
|---------|--------|--------|
| Hero | `/images/hero/hero-home.png` | ✅ Existe |
| WeEvolve | `/images/client/1.jpeg` | ✅ Existe |
| Values | Sin imagen (íconos SVG) | ✅ Diseño intencional |
| Processes (carousel) | `/images/processes/process-01.png` … `process-12.png` | ✅ 12/12 existen |
| ProcessVideoGrid | 6 videos + posters | ✅ Todo existe |
| Customers | Sin imagen (marquee texto) | ✅ Diseño intencional |
| Team | `/images/client/14.jpeg`, `18.jpeg`, `20.jpeg` | ✅ Existen |

## About Us (`app/[locale]/about/page.tsx`)

| Sección | Imagen | Estado |
|---------|--------|--------|
| SubpageHero | `/images/hero/hero-about.png` | ✅ Existe |
| BrandStory | Sin imagen (layout tipográfico) | ✅ Diseño intencional |
| MissionVision (Misión) | `/images/hero/mission.png` | ✅ Existe |
| MissionVision (Visión) | `/images/hero/vision.png` | ✅ Existe |
| AboutValues | Sin imagen (íconos SVG) | ✅ Diseño intencional |
| Customers | Reutilizado de Home | ✅ |

## Processes (`app/[locale]/processes/page.tsx`)

| Sección | Imagen | Estado |
|---------|--------|--------|
| SubpageHero | `/images/hero/hero-about.png` | ✅ Existe |
| Standards | Sin imagen (íconos texto) | ✅ Diseño intencional |
| **Team of Experts** | 6 departamentos | ⚠️ 3 con placeholder |

### Detalle Team of Experts (Processes)

| Departamento | Imagen | Estado | Acción |
|--------------|--------|--------|--------|
| Office | `/images/processes/dept-01.jpg` | ❌ No existe | **Eliminado** |
| Design | `/images/client/13.jpeg` | ✅ Existe | Conservado |
| Sales | `/images/processes/dept-03.jpg` | ❌ No existe | **Eliminado** |
| Service | `/images/processes/dept-04.jpg` | ❌ No existe | **Eliminado** |
| Engineering | `/images/client/16.jpeg` | ✅ Existe | Conservado |
| Quality | `/images/client/21.jpeg` | ✅ Existe | Conservado |

## Catalog (`app/[locale]/catalog/page.tsx`)

| Sección | Estado |
|---------|--------|
| Grid de productos | ✅ Lee de `public/Catalogo/productos.json` (63 SKUs) |
| Imágenes de producto | ⚠️ Esperando `public/catalogo/{sku}.webp` |
| Placeholder visual | ✅ Implementado (inicial del SKU) |

> **Nota:** El catálogo está funcional sin imágenes de producto. Se documenta en `missing-assets.md`.

## Contact (`app/[locale]/contact/page.tsx`)

| Sección | Imagen | Estado |
|---------|--------|--------|
| Header | Color sólido `#1A2E1C` | ✅ Diseño intencional |
| Formulario | Sin imagen | ✅ Diseño intencional |
| ContactInfo | Sin imagen | ✅ Diseño intencional |

---

## Imágenes en `public/` no referenciadas

| Archivo | Ubicación | Acción |
|---------|-----------|--------|
| `hero-processes.png` | `public/images/hero/` | No se usa actualmente |
| `history.png` | `public/images/hero/` | No se usa actualmente |
| `team-01.png` | `public/images/hero/` | No se usa actualmente |
| `team-02.png` | `public/images/hero/` | No se usa actualmente |
| `team-03.png` | `public/images/hero/` | No se usa actualmente |
