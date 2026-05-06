# Cambios aplicados — 2026-05-05

## 1. Contenido eliminado
- **Video de "vaporeo" con sombrero amarillo eliminado** de la sección *Craft in Motion* / *Behind the Scenes* (ProcessVideoGrid).
- Archivo removido del grid: `/images/client/3.mp4` (poster: `posters/3.jpg`), etiqueta `lifestyle_hold`.
- **Razón:** Baja calidad visual, demerita la marca.
- **Ajuste de grid:** De 6 videos se pasó a 5. Layout adaptado a 2 filas: 3 videos arriba, 2 videos abajo centrados (`max-w-3xl mx-auto`).
- **Corrección:** En primera instancia se eliminó por error `12.mp4` (steam_color); ya fue restaurado y eliminado el correcto (`3.mp4`).

## 2. Our Process actualizado
- Se creó el componente `components/sections/ProcessSteps.tsx` con los **5 pasos oficiales del brochure institucional**.
- Se actualizó `app/[locale]/page.tsx` para usar `ProcessSteps` en lugar del carrusel de 12 pasos de manufactura (`Processes`).
- El carrusel de 12 pasos (`Processes.tsx`) se mantiene intacto para la página `/processes`.

### Los 5 pasos implementados:
| # | Título EN | Título ES | Descripción EN | Descripción ES | Icono |
|---|-----------|-----------|----------------|----------------|-------|
| 01 | Discovery & Design | Descubrimiento y Diseño | Your vision, our guidance. | Tu visión, nuestra guía. | Search |
| 02 | Sampling | Muestreo | Prototype creation to match your specs. | Creación de prototipos según tus especificaciones. | Box |
| 03 | Production | Producción | Vetted, high-quality manufacturing. | Manufactura verificada y de alta calidad. | Factory |
| 04 | Branding & Packaging | Branding y Empaque | Fully customized solutions. | Soluciones totalmente personalizadas. | Package |
| 05 | Delivery | Entrega | Reliable fulfillment from our U.S. warehouse. | Cumplimiento confiable desde nuestro almacén en EE.UU. | Truck |

### Diseño:
- **Desktop:** Timeline horizontal con línea conectora, 5 pasos en fila con números en círculos dorados, iconos Lucide, título y descripción centrados.
- **Mobile:** Timeline vertical con línea conectora lateral, contenido alineado a la izquierda.
- Animaciones de entrada con `framer-motion` (stagger delay por paso).

## 3. Footer actualizado
- **Email:** `hatmexco@gmail.com`
  - Con icono `Mail` de Lucide React.
  - Link `mailto:hatmexco@gmail.com` funcional.
- **Teléfono:** Placeholder `+1 (___) ___-____`
  - Con icono `Phone` de Lucide React.
  - Texto en tono atenuado (placeholder visual).
  - Comentario `TODO` en el código para fácil actualización futura:
    ```tsx
    // TODO: Actualizar con número real cuando esté disponible
    // const PHONE_NUMBER = "+1 (555) 123-4567";
    ```
- **Navegación:** Home (link al logo), About, Processes, Catalog, Contact.
- **Redes sociales:** YouTube, Facebook, Instagram (placeholders con `#`).

## 4. Ajustes de traducción (i18n)
- `messages/en.json` y `messages/es.json`:
  - Agregadas claves `processsteps_eyebrow`, `process_step_1_title` … `process_step_5_desc`.
  - Actualizado `footer.email` a `hatmexco@gmail.com`.
  - Actualizado `footer.copyright` a `hatmexco@gmail.com`.
  - Actualizado mensaje de error de contacto (`contact.error`) al nuevo email.

## 5. Configuración
- `lib/config.ts`: `CONTACT_EMAIL` ahora defaultea a `hatmexco@gmail.com`.
- Instalada dependencia `lucide-react` para iconos oficiales.

## Pendientes
- [ ] Número de teléfono real (lada +1)
- [ ] Links reales de redes sociales (YouTube, Facebook, Instagram)
- [ ] Revisar si se necesita más contenido de contacto (dirección física, horarios)
- [ ] Catálogo — se montará de a pocos (sin cambios por ahora)
