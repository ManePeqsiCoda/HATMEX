# HATMEX Assets Inventory

> Fecha: 2026-04-27  
> Total assets analizados: 21 (11 imágenes + 10 videos)  
> Ubicación origen: `/public/assets web/`  

---

## IMÁGENES

| Archivo | Tipo | Resolución | Tamaño | Contenido | Asignación |
|---------|------|------------|--------|-----------|------------|
| `1.jpeg` | Imagen | 534×682px | 111KB | Pareja abrazándose, sombrero vaquero B&W. Lifestyle emotivo, tradición familiar. | **Home → WeEvolve** (reemplaza placeholder histórico) |
| `2.jpeg` | Imagen | 729×412px | 64KB | Dos hombres con sombreros vaqueros B&W. Estilo generacional/tradición. | *Unused* |
| `13.jpeg` | Imagen | 1024×1024px | 128KB | Artesano con mandil HATMEX trabajando sombrero con vapor. Fuerza de marca. | **Processes → Design Dept** |
| `14.jpeg` | Imagen | 1536×1024px | 142KB | Mujer cosiendo sombrero con máquina industrial, mandil HATMEX. Precisión. | **Home → Team / Design** |
| `15.jpeg` | Imagen | 1024×1536px | 143KB | Estantería con sombreros negros apilados, logo HATMEX visible. Inventario. | *Unused* |
| `16.jpeg` | Imagen | 1536×1024px | 150KB | Trabajador camiseta roja HATMEX usando máquina de vapor. Proceso técnico. | **Processes → Engineering Dept** |
| `17.jpeg` | Imagen | 1536×1024px | 140KB | Primer plano costura banda de cuero "Put your brand by HATMEX". Private label. | *Unused* |
| `18.jpeg` | Imagen | 1024×1536px | 143KB | Joven formando sombrero con herramientas. Técnica artesanal. | **Home → Team / PPCP** |
| `19.jpeg` | Imagen | 723×1087px | 108KB | Pared de sombreros negros colgados en rack. Producto terminado. | **Catalog → CTA Banner background** |
| `20.jpeg` | Imagen | 723×1087px | 101KB | Máquina industrial con llamas abiertas. Proceso dramático. | **Home → Team / Engineering** |
| `21.jpeg` | Imagen | 1087×723px | 69KB | Colocación de banda negra en sombrero blanco. Detalle de acabado. | **Processes → Quality Dept** |

## VIDEOS

| Archivo | Tipo | Duración est. | Tamaño | Contenido | Asignación |
|---------|------|---------------|--------|-----------|------------|
| `3.mp4` | Video | ~3s | 517KB | Mano sosteniendo sombrero marrón contra ladrillo. Lifestyle. | **Home → ProcessVideoGrid** |
| `4.mp4` | Video | ~6s | 1017KB | Cepillado manual de sombrero negro. Acabado premium. | **Home → ProcessVideoGrid** |
| `5.mp4` | Video | ~2s | 294KB | Interior de sombrero con tela/papel. Detalle muy corto. | *Unused* |
| `6.mp4` | Video | ~4s | 693KB | Ajuste de banda en sombrero marrón. Custom fitting. | **Home → ProcessVideoGrid** |
| `7.mp4` | Video | ~15s | 2454KB | Máquina de vapor dando forma a sombrero blanco. **Mejor video.** | **Home → ProcessVideoGrid** (destacado) |
| `8.mp4` | Video | ~5s | 860KB | Panorama pilas de sombreros colores (camel, rojo, crema). | *Unused* |
| `9.mp4` | Video | ~5s | 888KB | Panorama pilas de sombreros colores (camel, rojo, burdeos). | *Unused* |
| `10.mp4` | Video | ~3s | 562KB | Manos ensamblando hebilla metálica en banda de cuero. | **Home → ProcessVideoGrid** |
| `11.mp4` | Video | ~3s | 637KB | Manos ajustando hebilla en banda. Variante de 10.mp4. | *Unused* |
| `12.mp4` | Video | ~6s | 1112KB | Máquina de vapor sombrero rojo/burdeos. Proceso técnico. | **Home → ProcessVideoGrid** |

---

## MAPEO ESTRATÉGICO POR SECCIÓN

### Home
| Sección | Asset | Lógica |
|---------|-------|--------|
| Hero | `hero-home.png` (existente) | Ningún video del cliente es horizontal/widescreen. Se conserva el asset existente. |
| WeEvolve | `1.jpeg` | Aspect ratio 4/5 casi exacto al contenedor. Contenido B&W emotivo encaja con placeholder "Factory / Historical". |
| Values | Sin imagen | Sección diseñada con íconos vectoriales. |
| Processes (Carousel) | `process-01.png`…`process-12.png` (existentes) | 12 pasos de producción ya ilustrados. Se conservan. |
| **ProcessVideoGrid (NUEVA)** | `7.mp4`, `4.mp4`, `12.mp4`, `6.mp4`, `10.mp4`, `3.mp4` | Grid de videos de proceso debajo del carousel. 7.mp4 como card destacada (span 2 cols). Autoplay muted loop. |
| Customers | Sin cambio | Marquee de texto. |
| Team | `14.jpeg`, `18.jpeg`, `20.jpeg` | Reemplazan 3 placeholders "PHOTO PENDING". Cada una muestra una faceta real del equipo. |

### About
| Sección | Asset | Lógica |
|---------|-------|--------|
| SubpageHero | `hero-about.png` (existente) | Se conserva. |
| BrandStory | Sin imagen | Layout tipográfico puro; forzar imagen rompería el equilibrio de dos columnas. |
| Mission | `mission.png` (existente) | Se conserva. |
| Vision | `vision.png` (existente) | Se conserva. |
| AboutValues | Sin imagen | Grid de tarjetas con íconos. |
| Customers | Sin cambio | Reutilizado desde home. |

### Catalog
| Sección | Asset | Lógica |
|---------|-------|--------|
| SubpageHero | `hero-catalog.png` (existente) | Se conserva. |
| Product Grid | `productos.json` (63 SKUs Wrangler) | Datos reales importados desde `public/Catalogo/productos.json`. Cada card intenta cargar `/catalogo/{sku}.webp`; si no existe, muestra placeholder visual con inicial del SKU. |
| CTA Banner | `19.jpeg` | Background con overlay oscuro `#1A2E1C`/80%. Muestra inventario real. |

### Processes
| Sección | Asset | Lógica |
|---------|-------|--------|
| SubpageHero | `hero-about.png` (existente) | Se conserva (la page reutiliza hero-about). |
| Standards | Sin imagen | Grid de íconos/texto. |
| Team of Experts | `13.jpeg`, `16.jpeg`, `21.jpeg` | Reemplazan placeholders en Design, Engineering y Quality. |
| Processes Carousel | `process-01.png`…`process-12.png` | Se conservan. |

---

## DECISIONES CLAVE

1. **No se tocó el Hero principal** porque todos los videos entregados son verticales (formato TikTok/Reels). Usarlos como fondo de hero ancho implicaría recortes extremos o bandas negras, degradando la UX.
2. **Se creó una nueva sección `ProcessVideoGrid`** en Home para aprovechar los videos verticales sin deformarlos. Se usa un grid CSS que respeta su aspect-ratio nativo 9:16.
3. **Se priorizó quitar los placeholders visibles** (banners beige con texto "PHOTO PENDING") porque generan sensación de sitio incompleto.
4. **Los videos se configuran** con `autoplay muted loop playsinline` y `preload="metadata"` para balancear engagement y performance.
5. **Las imágenes de producto aislado en fondo neutro no fueron entregadas**, por lo que no se pudieron poblar las cards del catálogo. Se documenta en `missing-assets.md`.
