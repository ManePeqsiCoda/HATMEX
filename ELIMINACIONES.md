# Secciones Eliminadas — HATMEX Web

> Fecha: 2026-04-27

---

## Processes — Team of Experts (3 departamentos)

**Archivo:** `components/pages/ProcessesClient.tsx`

**Eliminados:**
- `office` — Oficina Central
- `sales` — Departamento de Ventas
- `service` — Servicio al Cliente

**Razón:** No existen imágenes para estos departamentos (`dept-01.jpg`, `dept-03.jpg`, `dept-04.jpg`). Mostraban banner "PHOTO PENDING — Department / Workspace" que generaba sensación de sitio incompleto.

**Decisión:** Eliminados del array `DEPARTMENTS`. Se conservaron los 3 departamentos que sí tienen fotos reales del cliente:
- Design (`/images/client/13.jpeg`)
- Engineering (`/images/client/16.jpeg`)
- Quality (`/images/client/21.jpeg`)

**Grid resultante:** 3 cards en lugar de 6 (1 fila de 3 columnas en desktop).

---

## Nota sobre imágenes no referenciadas

Los siguientes archivos existen en `public/` pero no se usan actualmente. Se conservan para posible uso futuro:
- `public/images/hero/hero-processes.png`
- `public/images/hero/history.png`
- `public/images/hero/team-01.png`
- `public/images/hero/team-02.png`
- `public/images/hero/team-03.png`
