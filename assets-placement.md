# HATMEX Assets Placement Map

> Fecha: 2026-04-27  
> Marca: Wrangler 2026 (Catálogo de Sombreros)  
> Total assets ubicados: 21 analizados, 14 implementados, 7 en reserva

---

## HOME

| Asset | Tipo | Sección | Detalle de implementación |
|-------|------|---------|---------------------------|
| `hero-home.png` | Imagen existente | Hero principal | Se conserva. No hay video horizontal de suficiente calidad para reemplazarlo. |
| `1.jpeg` | Imagen | WeEvolve | Reemplaza placeholder `history.png`. Foto B&W 534×682px, aspect ratio 4/5 exacto al contenedor. Alt: "Pareja con sombrero vaquero HATMEX — tradición y legado familiar". |
| `7.mp4` | Video | ProcessVideoGrid (destacado) | Grid posición 1, span 2 cols en desktop. Duración ~15s, 2.4MB. Máquina de vapor dando forma a sombrero blanco. Poster: primer frame del video (extracto automático). |
| `4.mp4` | Video | ProcessVideoGrid | Grid posición 2. Cepillado manual sombrero negro. ~6s, 1MB. |
| `12.mp4` | Video | ProcessVideoGrid | Grid posición 3. Máquina de vapor sombrero rojo. ~6s, 1.1MB. |
| `6.mp4` | Video | ProcessVideoGrid | Grid posición 4. Ajuste de banda en sombrero marrón. ~4s, 693KB. |
| `10.mp4` | Video | ProcessVideoGrid | Grid posición 5. Ensamblaje de hebilla metálica. ~3s, 562KB. |
| `3.mp4` | Video | ProcessVideoGrid | Grid posición 6. Lifestyle: mano sosteniendo sombrero marrón. ~3s, 517KB. |
| `14.jpeg` | Imagen | Team / Design | 1536×1024px. Mujer cosiendo con máquina, mandil HATMEX. Reemplaza `team-01.png` placeholder. |
| `18.jpeg` | Imagen | Team / PPCP | 1024×1536px. Joven formando sombrero. Reemplaza `team-02.png` placeholder. |
| `20.jpeg` | Imagen | Team / Engineering | 723×1087px. Máquina industrial con llamas. Reemplaza `team-03.png` placeholder. |

## ABOUT

| Asset | Tipo | Sección | Detalle |
|-------|------|---------|---------|
| `hero-about.png` | Imagen existente | SubpageHero | Se conserva. |
| `mission.png` | Imagen existente | MissionVision (Mission) | Se conserva. |
| `vision.png` | Imagen existente | MissionVision (Vision) | Se conserva. |

## PROCESSES

| Asset | Tipo | Sección | Detalle |
|-------|------|---------|---------|
| `13.jpeg` | Imagen | Departments / Design | 1024×1024px. Artesano con vapor, mandil HATMEX. Reemplaza placeholder `dept-02.jpg`. |
| `16.jpeg` | Imagen | Departments / Engineering | 1536×1024px. Trabajador con camiseta roja HATMEX. Reemplaza placeholder `dept-05.jpg`. |
| `21.jpeg` | Imagen | Departments / Quality | 1087×723px. Colocación de banda negra en sombrero blanco. Reemplaza placeholder `dept-06.jpg`. |
| `process-01.png` … `process-12.png` | Imágenes existentes | Processes Carousel | Se conservan los 12 pasos existentes. |

## CATALOG

| Asset | Tipo | Sección | Detalle |
|-------|------|---------|---------|
| `hero-catalog.png` | Imagen existente | SubpageHero | Se conserva. |
| `19.jpeg` | Imagen | CTA Banner (bottom) | 723×1087px. Pared de sombreros negros. Background con overlay `#1A2E1C`/80%. |
| `productos.json` | JSON | Product Grid | 63 productos Wrangler 2026. Grid dinámico con filtros por categoría (BANGORA, JAP, LANA, CHINO, SISOL, TELAR, CASHMERE, PALMA). Placeholder visual cuando no hay imagen de producto. |

## CONTACT

| Asset | Tipo | Sección | Detalle |
|-------|------|---------|---------|
| Sin imagen | — | Header | Color sólido `#1A2E1C`. Oportunidad para usar `2.jpeg` en futura iteración. |

---

## Videos: Configuración Técnica

Todos los videos implementados usan esta configuración:

```html
<video
  autoplay muted loop playsinline
  preload="metadata"
  poster="[primer-frame-generado]"
  class="object-cover w-full h-full"
>
```

- **Autoplay** habilitado solo si `prefers-reduced-motion: no-preference`
- **Muted** obligatorio para autoplay en mobile
- **Loop** para experiencia continua
- **Preload="metadata"** para no bloquear carga inicial
- **Posters** extraídos del primer frame de cada video (ver `/public/images/client/posters/`)

### Pesos de video (ninguno requiere compresión):
| Video | Tamaño | Estado |
|-------|--------|--------|
| 3.mp4 | 517 KB | ✅ OK |
| 4.mp4 | 1.0 MB | ✅ OK |
| 6.mp4 | 693 KB | ✅ OK |
| 7.mp4 | 2.4 MB | ✅ OK |
| 10.mp4 | 562 KB | ✅ OK |
| 12.mp4 | 1.1 MB | ✅ OK |

---

## Assets en Reserva (unused)

| Asset | Razón de reserva | Uso futuro sugerido |
|-------|------------------|---------------------|
| `2.jpeg` | Resolución baja (729×412), no encaja en layout actual | Sección Heritage/Testimonios |
| `5.mp4` | Demasiado corto (~2s), no aporta narrativa | Edición para redes sociales |
| `8.mp4` | Similar a 9.mp4, redundante en grid | TikTok/Reels de colores |
| `9.mp4` | Similar a 8.mp4, redundante en grid | TikTok/Reels de colores |
| `11.mp4` | Duplicado funcional de 10.mp4 | Backup de contenido |
| `15.jpeg` | Inventario masivo, no encaja en card de producto | Landing Wholesale/B2B |
| `17.jpeg` | Private label muy específico, no hay landing dedicada | Página Custom Branding |

---

## Brechas Críticas (Missing Assets)

1. **Imágenes de producto SKU**: `public/catalogo/{sku}.webp` — 63 imágenes faltantes. El catálogo renderiza con placeholder visual.
2. **Fotos de 3 departamentos**: Office, Sales, Service en `/processes` — mantienen placeholder.
3. **Video de hero horizontal**: Ningún video del cliente es widescreen. El hero conserva imagen estática.
