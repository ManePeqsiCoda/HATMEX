# Despliegue en Hostinger — HATMEX Web

> Instrucciones para subir el sitio estático a Hostinger (cPanel / FTP / Administrador de Archivos).

---

## 1. Requisitos previos

- Tener acceso a cPanel o FTP de tu hosting Hostinger.
- Dominio apuntado al hosting (o usar el dominio temporal de Hostinger).
- **Variables de entorno configuradas** antes de hacer build (ver sección 4).

---

## 2. Generar el build de producción

En tu máquina local, dentro de la carpeta del proyecto:

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio completamente estático listo para subir.

> Si usas Windows y ves warnings de `webpack.cache.PackFileCacheStrategy`, ignóralos. El build sigue siendo válido.

---

## 3. Subir archivos a Hostinger

### Opción A: Administrador de Archivos (cPanel)

1. Entra a cPanel → **Administrador de Archivos**.
2. Navega a la carpeta pública de tu dominio (generalmente `public_html` o `domains/tudominio.com/public_html`).
3. **Elimina** el contenido anterior (o muévelo a una carpeta de backup).
4. Sube **todo el contenido de la carpeta `dist/`** (no la carpeta `dist` en sí, sino lo que está adentro).
5. Verifica que el archivo `.htaccess` esté en la raíz.

### Opción B: FTP (FileZilla / WinSCP)

1. Conecta con tus credenciales FTP de Hostinger.
2. Navega a `public_html`.
3. Sube todo el contenido de `dist/`.
4. Confirma que `.htaccess` se subió (a veces los clientes FTP ocultan archivos que empiezan con punto).

---

## 4. Variables de entorno (EmailJS)

El formulario de contacto usa **EmailJS**. Como es un sitio estático, las variables deben estar presentes **al momento de compilar** (`npm run build`).

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

> Si ya configuraste estas variables en otro archivo o sistema operativo, asegúrate de que estén disponibles antes de correr `npm run build`.

---

## 5. Verificación post-deploy

Abre tu dominio en el navegador y comprueba:

| URL | Resultado esperado |
|-----|-------------------|
| `https://tudominio.com/` | Redirige a `/en/` (Home en inglés) |
| `https://tudominio.com/en/` | Home en inglés |
| `https://tudominio.com/es/` | Home en español |
| `https://tudominio.com/en/about/` | About Us |
| `https://tudominio.com/es/about/` | Sobre Nosotros |
| `https://tudominio.com/en/catalog/` | Catálogo |
| `https://tudominio.com/en/contact/` | Contacto (formulario funcional) |

### Headers de seguridad (opcional, para verificar)

En las herramientas de desarrollo del navegador → **Red** → selecciona cualquier petición HTML y revisa que aparezcan:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 6. Solución de problemas comunes

### Página en blanco o error 500

- Revisa que `.htaccess` esté en la raíz de `public_html`.
- En cPanel, ve a **MultiPHP INI Editor** y asegúrate de que `mod_rewrite` esté habilitado.

### Error 404 al recargar una página (ej. `/en/about/`)

- Normalmente no debería pasar porque `trailingSlash: true` genera carpetas con `index.html`.
- Si ocurre, verifica que la carpeta `en/about/` exista en el servidor y contenga `index.html`.

### Las imágenes o videos no cargan

- Revisa que la carpeta `images/` y `Catalogo/` se hayan subido completamente.
- Verifica mayúsculas/minúsculas en los nombres de archivo (Linux es case-sensitive).

### Formulario de contacto no envía

- Verifica que las variables de EmailJS estén configuradas **antes** del build.
- Abre la consola del navegador (F12) y revisa si hay errores de EmailJS.

---

## 7. Estructura final en el servidor

```
public_html/
├── .htaccess
├── 404.html
├── index.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── favicon.svg
├── en/
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   ├── catalog/
│   │   └── index.html
│   ├── contact/
│   │   └── index.html
│   └── processes/
│       └── index.html
├── es/
│   ├── index.html
│   ├── about/
│   │   └── index.html
│   ├── catalog/
│   │   └── index.html
│   ├── contact/
│   │   └── index.html
│   └── processes/
│       └── index.html
├── _next/
├── images/
├── Catalogo/
└── assets web/
```

---

## 8. Notas técnicas

- **Tipo de deploy:** Estático (HTML/CSS/JS). No requiere Node.js en el servidor.
- **Locale por defecto:** `en` (inglés). El `.htaccess` redirige automáticamente las rutas sin locale a `/en/`.
- **Middleware de Next.js:** No se ejecuta en hosting estático. El comportamiento de i18n está simulado mediante el `.htaccess` y la estructura de carpetas generada por `output: 'export'`.
- **Tamaño aproximado:** ~70 MB (incluye imágenes, videos y catálogo).

---

Última actualización: 2026-06-08
