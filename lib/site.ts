/* =============================================================================
 *  CONTENIDO DEL PORTAFOLIO  —  edita SOLO este archivo para personalizar todo.
 * =============================================================================
 *  Los textos que dependen del idioma usan el formato { en: "...", es: "..." }.
 *  Reemplaza los valores marcados con  // TODO  por tus datos reales.
 * ========================================================================== */

import type { Locale } from "@/i18n/config";

/** Texto que cambia según el idioma. */
export type Localized = Record<Locale, string>;

/** Helper para leer el texto del idioma activo. */
export const t = (value: Localized, locale: Locale): string => value[locale];

/* --------------------------------------------------------------------------- */
/*  Datos principales                                                          */
/* --------------------------------------------------------------------------- */
export const siteConfig = {
  // Dominio final (úsalo en metadata / Open Graph). // TODO: pon tu dominio.
  url: "https://jeancarrasco.dev",

  name: "Jean Carrasco",
  initials: "JC",

  role: {
    en: "Full-Stack Engineer · AI & Automation",
    es: "Ingeniero Full-Stack · IA y Automatización",
  } as Localized,

  location: {
    en: "Lima, Peru · Remote worldwide",
    es: "Lima, Perú · Remoto en cualquier parte",
  } as Localized,

  // Correo público que se muestra en la sección de contacto.
  email: "ja.gpt.service@gmail.com", // TODO: confirma el correo que quieras mostrar.

  // CV en PDF. Coloca el archivo en /public/ y deja el nombre aquí (o null para ocultar).
  resume: "/jean-carrasco-cv.pdf", // TODO: añade tu CV en public/ o pon null.

  // true = muestra el badge "disponible para nuevas oportunidades".
  available: true,
};

/* --------------------------------------------------------------------------- */
/*  Redes sociales (deja la url vacía "" para ocultar el ícono)                */
/* --------------------------------------------------------------------------- */
export const socials = {
  github: "https://github.com/jeancarrasco", // TODO
  linkedin: "https://www.linkedin.com/in/jeancarrasco", // TODO
  x: "", // TODO opcional (Twitter/X)
  email: `mailto:${siteConfig.email}`,
};

/* --------------------------------------------------------------------------- */
/*  Métricas del hero / about (ajusta a tu realidad)                           */
/* --------------------------------------------------------------------------- */
export const stats = {
  yearsExperience: "4+", // TODO
  projectsShipped: "15+", // TODO
  coreStack: "TypeScript",
};

/* --------------------------------------------------------------------------- */
/*  Skills — agrupadas por categoría                                           */
/* --------------------------------------------------------------------------- */
export type SkillGroup = {
  category: Localized;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: { en: "Languages", es: "Lenguajes" },
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Bash"],
  },
  {
    category: { en: "Frontend", es: "Frontend" },
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "React Three Fiber"],
  },
  {
    category: { en: "Backend", es: "Backend" },
    items: ["Node.js", "Express", "REST APIs", "WebSockets", "PostgreSQL", "Redis"],
  },
  {
    category: { en: "AI / LLMs", es: "IA / LLMs" },
    items: ["Ollama", "OpenAI API", "Anthropic API", "RAG", "Prompt engineering"],
  },
  {
    category: { en: "Infra / DevOps", es: "Infra / DevOps" },
    items: ["Docker", "Linux / VPS", "Nginx", "pm2", "Tailscale", "Vercel"],
  },
  {
    category: { en: "Tools", es: "Herramientas" },
    items: ["Git", "GitHub Actions", "Postman", "Figma"],
  },
];

/* --------------------------------------------------------------------------- */
/*  Proyectos                                                                  */
/* --------------------------------------------------------------------------- */
export type Project = {
  /** Identificador único (para keys). */
  slug: string;
  /** Nombre del producto (igual en ambos idiomas). */
  title: string;
  /** Frase corta bajo el título. */
  summary: Localized;
  /** Descripción más larga. */
  description: Localized;
  /** Stack/etiquetas. */
  tags: string[];
  /** Año o rango. */
  year: string;
  /** Enlaces (deja "" para ocultar el botón). */
  links: { live: string; code: string };
  /** true = proyecto destacado (ocupa más ancho). */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "querybay",
    title: "QueryBay",
    summary: {
      en: "AI customer-response platform for WhatsApp",
      es: "Plataforma de respuestas con IA para WhatsApp",
    },
    description: {
      en: "A SaaS platform that automates customer conversations on WhatsApp using LLMs. I built the messaging bridge, the LLM orchestration layer and the dashboard, and operate the self-hosted infrastructure behind it.",
      es: "Plataforma SaaS que automatiza conversaciones de atención al cliente en WhatsApp usando LLMs. Construí el puente de mensajería, la capa de orquestación de LLMs y el panel de control, y opero la infraestructura autoalojada detrás.",
    },
    tags: ["Next.js", "Node.js", "LLMs", "WhatsApp API", "Docker"],
    year: "2024 — " + "Present",
    links: { live: "", code: "" }, // TODO
    featured: true,
  },
  {
    slug: "queryrespond",
    title: "QueryRespond",
    summary: {
      en: "Self-hosted WhatsApp AI assistant bridge",
      es: "Puente autoalojado de asistente IA para WhatsApp",
    },
    description: {
      en: "A bridge that connects WhatsApp to local language models (Ollama) running on private infrastructure, with a tunnel for secure access. Designed for privacy-first, low-cost automation.",
      es: "Un puente que conecta WhatsApp con modelos de lenguaje locales (Ollama) corriendo en infraestructura privada, con un túnel para acceso seguro. Diseñado para automatización privada y de bajo costo.",
    },
    tags: ["Node.js", "Ollama", "OpenWA", "Tailscale", "pm2"],
    year: "2024",
    links: { live: "", code: "" }, // TODO
    featured: true,
  },
  {
    slug: "workforce",
    title: "Workforce",
    summary: {
      en: "Recruitment & job-application automation",
      es: "Automatización de reclutamiento y postulaciones",
    },
    description: {
      en: "Automation tooling that streamlines sourcing and applications across job boards, routing browser traffic through residential proxies for reliability at scale.",
      es: "Herramientas de automatización que agilizan la búsqueda y las postulaciones en portales de empleo, enrutando el tráfico del navegador a través de proxies residenciales para fiabilidad a escala.",
    },
    tags: ["TypeScript", "Playwright", "Docker", "Proxies"],
    year: "2025",
    links: { live: "", code: "" }, // TODO
    featured: false,
  },
  {
    slug: "homelab",
    title: "Self-hosted AI Infrastructure",
    summary: {
      en: "Private LLM homelab with Docker & Tailscale",
      es: "Homelab de LLMs privado con Docker y Tailscale",
    },
    description: {
      en: "A private, always-on environment running local LLMs and supporting services in Docker, networked securely with Tailscale and exposed through hardened tunnels.",
      es: "Un entorno privado y siempre activo que corre LLMs locales y servicios de apoyo en Docker, conectado de forma segura con Tailscale y expuesto a través de túneles endurecidos.",
    },
    tags: ["Docker", "Ollama", "Tailscale", "Nginx", "Linux"],
    year: "2024 — " + "Present",
    links: { live: "", code: "" }, // TODO
    featured: false,
  },
];

/* --------------------------------------------------------------------------- */
/*  Experiencia laboral                                                        */
/*  // TODO: reemplaza con tu historial real. No inventes datos para empleo.   */
/* --------------------------------------------------------------------------- */
export type Job = {
  company: string;
  role: Localized;
  /** Texto del periodo, ej: "2024 — Present" / "2024 — Actualidad". */
  period: Localized;
  description: Localized;
  tags: string[];
};

export const experience: Job[] = [
  {
    company: "QueryBay",
    role: {
      en: "Founder & Full-Stack Engineer",
      es: "Fundador e Ingeniero Full-Stack",
    },
    period: { en: "2024 — Present", es: "2024 — Actualidad" },
    description: {
      en: "Designed, built and operate an AI-powered WhatsApp automation platform end to end: product, backend, frontend and infrastructure.",
      es: "Diseñé, construí y opero una plataforma de automatización de WhatsApp con IA de extremo a extremo: producto, backend, frontend e infraestructura.",
    },
    tags: ["Next.js", "Node.js", "LLMs", "DevOps"],
  },
  {
    company: "Freelance",
    role: {
      en: "Full-Stack Developer",
      es: "Desarrollador Full-Stack",
    },
    period: { en: "2021 — 2024", es: "2021 — 2024" },
    description: {
      en: "Built web applications, automations and integrations for clients, from APIs and dashboards to deployment and maintenance.",
      es: "Construí aplicaciones web, automatizaciones e integraciones para clientes, desde APIs y paneles hasta despliegue y mantenimiento.",
    },
    tags: ["React", "Node.js", "PostgreSQL", "Docker"],
  },
];
