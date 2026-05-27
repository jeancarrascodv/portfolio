# jeancarrascodv

Portafolio personal de **Jean Carrasco** — ingeniero full-stack (IA & automatización).
Bilingüe (🇬🇧 inglés / 🇪🇸 español), con un hero 3D interactivo en WebGL.

> Personal portfolio of Jean Carrasco. Bilingual (EN/ES) with an interactive WebGL hero.

---

## ⚙️ Stack

| Área         | Tecnología                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI           | React 19 · TypeScript                                  |
| Estilos      | Tailwind CSS v4                                         |
| Animación    | Framer Motion                                          |
| 3D / WebGL   | three.js · React Three Fiber · drei                    |
| i18n         | Nativo de Next (rutas `app/[locale]` + diccionarios)   |
| Deploy       | [Vercel](https://vercel.com)                           |

---

## 🚀 Desarrollo

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo -> http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
```

La raíz `/` redirige automáticamente a `/en` o `/es` según el idioma del navegador
(ver `proxy.ts`).

---

## ✏️ Cómo personalizar (lo único que necesitas tocar)

### 1. Tus datos y contenido → [`lib/site.ts`](lib/site.ts)

Es el archivo central. Ahí editas, **buscando los comentarios `// TODO`**:

- **`siteConfig`** — nombre, rol, ubicación, correo, dominio (`url`), CV, disponibilidad.
- **`socials`** — enlaces a GitHub, LinkedIn, X (deja `""` para ocultar un ícono).
- **`stats`** — métricas del bloque "Sobre mí".
- **`skills`** — tus habilidades agrupadas por categoría.
- **`projects`** — tus proyectos (título, resumen, descripción, tags, año, enlaces).
- **`experience`** — tu historial laboral real. ⚠️ _Reemplaza los datos de ejemplo; no presentes datos inventados a reclutadores._

Los textos bilingües usan el formato `{ en: "...", es: "..." }`.

### 2. Textos de la interfaz (botones, títulos de sección, etc.)

- Inglés → [`i18n/dictionaries/en.json`](i18n/dictionaries/en.json)
- Español → [`i18n/dictionaries/es.json`](i18n/dictionaries/es.json)

> Ambos archivos deben tener **exactamente la misma estructura de claves**.

### 3. Tu CV en PDF

Coloca el archivo en `public/` (por ejemplo `public/jean-carrasco-cv.pdf`) y deja ese
nombre en `siteConfig.resume`. Si no quieres mostrar el botón, pon `resume: null`.

### 4. Favicon / íconos

Reemplaza `app/favicon.ico` por el tuyo (puedes añadir también `app/icon.png` y
`app/apple-icon.png`; Next los detecta automáticamente).

### 5. Imagen para compartir (Open Graph)

Se genera automáticamente en `app/[locale]/opengraph-image.tsx` con tu nombre y rol.
Puedes ajustar colores/textos ahí.

---

## 🌐 Añadir o cambiar idiomas

1. Agrega el código en `locales` y `localeNames` dentro de [`i18n/config.ts`](i18n/config.ts).
2. Crea `i18n/dictionaries/<código>.json` copiando la estructura de `en.json`.
3. Añade el `import` correspondiente en [`i18n/dictionaries.ts`](i18n/dictionaries.ts).
4. Agrega el campo `<código>` en los textos `{ en, es }` de `lib/site.ts`.

---

## ☁️ Despliegue en Vercel + dominio propio

1. Sube el repo a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio (Vercel detecta
   Next.js solo; no necesitas configurar nada).
3. En **Settings → Domains** agrega tu dominio y sigue las instrucciones de DNS.
4. Actualiza `siteConfig.url` en `lib/site.ts` con tu dominio final para que el
   sitemap, los canónicos y el Open Graph apunten correctamente.

---

## 📐 Notas de Next.js 16

- El "middleware" ahora se llama **`proxy.ts`** (runtime Node, sin edge).
- `params` es **asíncrono**: siempre `const { locale } = await params`.
- Turbopack es el bundler por defecto en `dev` y `build`.

---

## 📁 Estructura

```
app/
  [locale]/
    layout.tsx              # html/body, fuentes, metadata, Nav + Footer
    page.tsx                # ensambla las secciones
    opengraph-image.tsx     # imagen social dinámica
  globals.css               # design tokens + Tailwind
  sitemap.ts · robots.ts
components/
  nav.tsx · footer.tsx · reveal.tsx · section-heading.tsx · icons.tsx
  language-switcher.tsx
  scene/                    # hero 3D (React Three Fiber)
  sections/                 # hero · about · skills · projects · experience · contact
i18n/                       # config, diccionarios y tipos
lib/site.ts                 # 👈 TODO TU CONTENIDO
proxy.ts                    # detección/redirección de idioma
```
