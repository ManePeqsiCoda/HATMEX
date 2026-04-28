# HATMEX — Image Map Documentation

Este documento detalla todas las imágenes necesarias para el sitio web de HATMEX, organizadas por sección, con sus nombres exactos, carpetas de destino y especificaciones técnicas. **IMPORTANTE: Todas las imágenes deben ser en formato .png.**

## Resumen de Estructura de Carpetas
Todas las imágenes deben ubicarse dentro de `/public/images/`.

| Carpeta | Propósito |
| :--- | :--- |
| `/hero/` | Imágenes principales de fondo para los banners de cada página. |
| `/processes/` | Imágenes detalladas de los procesos de fabricación. |
| `/gallery/` | Fotografías de productos terminados (gorras y sombreros). |
| `/logos/` | Logotipos de clientes y marcas propias. |

---

## Tabla de Especificaciones de Imágenes

| Sección / Componente | Nombre del Archivo | Carpeta | Aspect Ratio | Orientación | Notas / Uso |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Home Hero** | `hero-home.png` | `/hero/` | 16:9 o 21:9 | Horizontal | Imagen de impacto. Grayscale por código. |
| **About Hero** | `hero-about.png` | `/hero/` | 16:9 | Horizontal | Banner de "Sobre Nosotros" (60vh). |
| **Gallery Hero** | `hero-gallery.png` | `/hero/` | 16:9 | Horizontal | Banner de Galería (50vh). |
| **Processes Hero** | `hero-processes.png` | `/hero/` | 16:9 | Horizontal | Banner de Procesos. |
| **Nuestra Historia** | `history.png` | `/home/` | 4:5 | Vertical | Sección "We Evolve". |
| **Misión** | `mission.png` | `/hero/` | 4:5 | Vertical | Formato Polaroid. |
| **Visión** | `vision.png` | `/hero/` | 4:5 | Vertical | Formato Polaroid. |
| **Equipo (Diseño)** | `team-01.png` | `/hero/` | 1:1 | Cuadrada | Foto departamento Diseño. |
| **Equipo (PPCP)** | `team-02.png` | `/hero/` | 1:1 | Cuadrada | Foto departamento PPCP. |
| **Equipo (Engineering)** | `team-03.png` | `/hero/` | 1:1 | Cuadrada | Foto departamento Ingeniería. |
| **Procesos 01-12** | `process-01.png` ... `process-12.png` | `/processes/` | 24:10 | Ultra-Horizontal | Imágenes del carrusel industrial. |
| **Galería 01-18** | `hat-01.png` ... `hat-18.png` | `/gallery/` | 4:5 | Vertical | Grid de productos/gorras. |

---

## Recomendaciones Técnicas

1.  **Formato**: El formato obligatorio es **.png**. Se recomienda exportar con transparencia si es necesario, o fondo sólido si es para Hero.
2.  **Naming Convention**: Usar minúsculas y guiones medios (snake-case). **No usar espacios ni mayúsculas**.
3.  **Contraste**: Como muchas imágenes usan filtros `grayscale` por código, asegúrate de que los archivos originales tengan buen contraste y nitidez.
4.  **Optimización**: Aunque sea PNG, intenta optimizar el tamaño del archivo para asegurar tiempos de carga rápidos.

---
*Documento actualizado según requerimientos de formato PNG y visualización de tablas.*
