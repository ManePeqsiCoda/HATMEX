# Missing Assets — HATMEX Web

Assets críticos referenciados en el código pero **no entregados por el cliente** o **no existentes** en el repositorio.

---

## 🔴 Crítico — Imágenes de Producto (Catálogo Wrangler)

### `/public/catalogo/{sku}.webp`
- **Cantidad:** 63 imágenes (una por SKU en `public/Catalogo/productos.json`)
- **Referencia:** `components/pages/CatalogClient.tsx`
- **Uso:** Grid de catálogo con 63 SKUs reales de Wrangler. Cada card intenta cargar `/catalogo/{sku}.webp`.
- **Impacto:** El componente maneja el error de imagen faltante mediante un placeholder visual (inicial del SKU + código) sobre fondo de superficie, por lo que **no hay imágenes rotas visibles**. Sin embargo, la experiencia de producto se ve limitada sin fotografía real.
- **Especificación ideal:**
  - Formato: WebP (o PNG con fondo transparente)
  - Resolución: mínimo 800×1000px (aspect-ratio 4:5)
  - Nombrado: debe coincidir exactamente con el campo `sku` del JSON (ej. `W8E01-10.webp`)
  - Iluminación: uniforme, misma dirección de luz para todas las imágenes
  - Angulación: 3/4 frontal o perfil consistente
  - Estilo: producto aislado (e-commerce standard) o lifestyle ligero

---

## 🟡 Importante — Departamentos (Processes)

### `/public/images/processes/dept-01.jpg`, `dept-03.jpg`, `dept-04.jpg`
- **Cantidad:** 3 imágenes
- **Referencia:** `components/pages/ProcessesClient.tsx`
- **Uso:** Grid de departamentos en la página Processes (office, sales, service).
- **Impacto:** 3 cards aún muestran banner "PHOTO PENDING — Department / Workspace". Se mitigó parcialmente usando assets del cliente para los otros 3 departamentos (design, engineering, quality).
- **Especificación ideal:**
  - Formato: JPG o WebP
  - Resolución: mínimo 800×800px (aspect-ratio 1:1)
  - Contenido: fotos reales de cada área de trabajo en las instalaciones de HATMEX
  - Estilo: documental/auténtico, no stock photography

---

## 🟢 Menor — Hero de Contacto

### La página `/contact` no usa imagen de hero
- **Observación:** El contact page usa un header de color sólido `#1A2E1C` sin imagen de fondo.
- **Oportunidad:** Si se desea, `2.jpeg` (B&W generacional) podría usarse como background sutil con overlay oscuro para humanizar la página de contacto.

---

## Resumen de brechas

| Brecha | Cantidad | Impacto UX | Mitigación aplicada |
|--------|----------|------------|---------------------|
| Imágenes de catálogo (`catalogo/*.webp`) | 63 | 🔴 Alto | Placeholder visual con SKU; catálogo funcional con datos reales |
| Fotos de departamentos (3 pendientes) | 3 | 🟡 Medio | 3 reemplazadas con assets reales; 3 pendientes |
| Hero de contacto | 0 | 🟢 Bajo | Oportunidad de mejora futura |

---

> **Acción recomendada:** Solicitar al cliente la sesión fotográfica de producto (63 sombreros aislados, nombrados por SKU) para activar las imágenes del catálogo. Es el blocker visual más importante restante.
