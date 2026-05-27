/* =============================================================================
 *  CONTENIDO DEL PORTAFOLIO  —  edita SOLO este archivo para personalizar todo.
 * =============================================================================
 *  Los textos que dependen del idioma usan el formato { en: "...", es: "..." }.
 *  Reemplaza los valores marcados con  // TODO  por tus datos reales.
 *  Nota de estilo: evita los guiones largos ("—") en los textos.
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
  // Dominio final (se usa en metadata / Open Graph / sitemap).
  url: "https://jeancarrasco.com",

  name: "Jean Carrasco",
  initials: "JC",

  role: {
    en: "AI Automation Engineer · Industrial Engineer",
    es: "Ingeniero de Automatización con IA · Ingeniero Industrial",
  } as Localized,

  location: {
    en: "Salt Lake City, Utah · Open to remote",
    es: "Salt Lake City, Utah · Abierto a remoto",
  } as Localized,

  // Correo público que se muestra en la sección de contacto.
  email: "jean@querybay.com",

  // CV en PDF. Coloca el archivo en /public/ y pon aquí el nombre (ej:
  // "/jean-carrasco-cv.pdf"). Mientras no exista, déjalo en null.
  resume: null as string | null, // TODO: añade tu CV en public/ y pon la ruta.

  // true = muestra el badge "disponible para nuevas oportunidades".
  available: true,
};

/* --------------------------------------------------------------------------- */
/*  Redes sociales (deja la url vacía "" para ocultar el ícono)                */
/* --------------------------------------------------------------------------- */
export const socials = {
  github: "https://github.com/jeancarrascodv",
  linkedin: "https://www.linkedin.com/in/jean-carrasco/",
  x: "", // opcional (Twitter/X)
  email: `mailto:${siteConfig.email}`,
};

/* --------------------------------------------------------------------------- */
/*  Métricas del bloque "Sobre mí"                                             */
/* --------------------------------------------------------------------------- */
export const stats: { value: string; label: Localized }[] = [
  {
    value: "7+",
    label: {
      en: "Years across engineering and operations",
      es: "Años entre ingeniería y operaciones",
    },
  },
  {
    value: "20+",
    label: {
      en: "AI automations and systems shipped",
      es: "Automatizaciones y sistemas con IA entregados",
    },
  },
  {
    value: "60+",
    label: {
      en: "People led across teams",
      es: "Personas lideradas en equipos",
    },
  },
];

/* --------------------------------------------------------------------------- */
/*  Skills — agrupadas por categoría                                           */
/* --------------------------------------------------------------------------- */
export type SkillGroup = {
  category: Localized;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: { en: "AI & Automation", es: "IA y Automatización" },
    items: [
      "AI Agents",
      "AI Clones",
      "LLMs (OpenAI, Anthropic, Ollama)",
      "RAG",
      "Prompt Engineering",
      "Workflow Automation",
      "n8n / Make",
    ],
  },
  {
    category: { en: "Outreach & Growth", es: "Prospección y Crecimiento" },
    items: [
      "Lead Generation",
      "Pipeline Optimization",
      "Cold Email Infrastructure",
      "Data Enrichment",
      "Clay",
      "Instantly",
      "CRM Automation",
    ],
  },
  {
    category: { en: "Software", es: "Software" },
    items: ["TypeScript", "JavaScript", "Python", "Java", "React", "Next.js", "Node.js", "SQL"],
  },
  {
    category: { en: "Operations & Engineering", es: "Operaciones e Ingeniería" },
    items: [
      "Lean Manufacturing",
      "Process Optimization",
      "Supply Chain",
      "Inventory Management",
      "Project Engineering",
    ],
  },
  {
    category: { en: "Infra & DevOps", es: "Infra y DevOps" },
    items: ["Docker", "Linux / VPS", "Nginx", "pm2", "Tailscale", "Vercel"],
  },
  {
    category: { en: "Leadership & Business", es: "Liderazgo y Negocio" },
    items: ["General Management", "International Business", "Consulting", "Team Leadership", "MBA"],
  },
];

/* --------------------------------------------------------------------------- */
/*  Proyectos                                                                  */
/* --------------------------------------------------------------------------- */
export type Project = {
  slug: string;
  title: string;
  summary: Localized;
  description: Localized;
  tags: string[];
  year: string;
  links: { live: string; code: string };
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "querybay",
    title: "QueryBay",
    summary: {
      en: "AI automation platform for outreach and customer support",
      es: "Plataforma de automatización con IA para prospección y soporte",
    },
    description: {
      en: "QueryBay is the company I founded to turn AI agents into a product. It connects messaging channels like WhatsApp to language models, automates customer conversations, qualifies leads and books meetings, all running on infrastructure I designed and operate.",
      es: "QueryBay es la empresa que fundé para convertir a los agentes de IA en un producto. Conecta canales de mensajería como WhatsApp con modelos de lenguaje, automatiza conversaciones, califica leads y agenda reuniones, todo sobre infraestructura que diseñé y opero.",
    },
    tags: ["Next.js", "Node.js", "LLMs", "WhatsApp API", "Docker"],
    year: "2025",
    links: { live: "https://querybay.com", code: "" },
    featured: true,
  },
  {
    slug: "outreach-engine",
    title: "Outreach Automation Engine",
    summary: {
      en: "Lead generation and pipeline automation at scale",
      es: "Generación de leads y automatización de pipeline a escala",
    },
    description: {
      en: "The system behind high volume outreach: data enrichment, cold email infrastructure, lead scoring and pipeline automation that consistently fills the sales calendar without adding headcount.",
      es: "El sistema detrás de la prospección a gran volumen: enriquecimiento de datos, infraestructura de cold email, scoring de leads y automatización de pipeline que llena el calendario comercial de forma constante sin aumentar la plantilla.",
    },
    tags: ["Python", "Clay", "Instantly", "Data Enrichment", "APIs"],
    year: "2023",
    links: { live: "", code: "" },
    featured: true,
  },
  {
    slug: "ai-clones",
    title: "AI Clones",
    summary: {
      en: "Personalized AI agents that talk like you",
      es: "Agentes de IA personalizados que hablan como tú",
    },
    description: {
      en: "A framework for AI clones: agents trained on a person's voice, writing and knowledge so they can hold conversations, answer questions and qualify prospects exactly as the founder would, around the clock.",
      es: "Un framework de AI clones: agentes entrenados con la voz, la escritura y el conocimiento de una persona para sostener conversaciones, responder preguntas y calificar prospectos tal como lo haría el fundador, las 24 horas.",
    },
    tags: ["LLMs", "RAG", "Prompt Engineering", "Voice", "TypeScript"],
    year: "2025",
    links: { live: "", code: "" },
    featured: false,
  },
  {
    slug: "industrial-ops",
    title: "Industrial Ops Automation",
    summary: {
      en: "Automating warehouses, inventory and maintenance",
      es: "Automatización de almacenes, inventario y mantenimiento",
    },
    description: {
      en: "Built on years running melamine and construction material operations, this suite ties inventory, sales and machinery maintenance into one live dashboard, replacing manual counts and spreadsheets with real time data and alerts across five warehouses.",
      es: "Apoyada en años dirigiendo operaciones de melamina y materiales de construcción, esta suite integra inventario, ventas y mantenimiento de maquinaria en un panel en vivo, reemplazando conteos manuales y hojas de cálculo por datos y alertas en tiempo real en cinco almacenes.",
    },
    tags: ["Python", "SQL", "Dashboards", "Process Optimization"],
    year: "2023",
    links: { live: "", code: "" },
    featured: false,
  },
];

/* --------------------------------------------------------------------------- */
/*  Experiencia laboral                                                        */
/* --------------------------------------------------------------------------- */
export type Job = {
  company: string;
  role: Localized;
  period: Localized;
  location: string;
  description: Localized;
  tags: string[];
};

export const experience: Job[] = [
  {
    company: "QueryBay",
    role: { en: "Founder & CEO", es: "Fundador y CEO" },
    period: { en: "Sep 2025 to Present", es: "Sep 2025 a la actualidad" },
    location: "Salt Lake City, Utah",
    description: {
      en: "Founded an AI automation company. I lead product, engineering and go to market, building AI agents that automate outreach and customer support for other businesses.",
      es: "Fundé una empresa de automatización con IA. Lidero producto, ingeniería y go to market, construyendo agentes de IA que automatizan la prospección y el soporte de otras empresas.",
    },
    tags: ["AI Agents", "Next.js", "Node.js", "DevOps"],
  },
  {
    company: "Janium",
    role: { en: "VP, Data Operations", es: "VP de Operaciones de Datos" },
    period: { en: "Dec 2023 to Present", es: "Dic 2023 a la actualidad" },
    location: "Denver, Colorado",
    description: {
      en: "Lead the data and automation function behind outreach at scale: lead generation, data enrichment, cold email infrastructure and pipeline optimization.",
      es: "Lidero el área de datos y automatización detrás de la prospección a escala: generación de leads, enriquecimiento de datos, infraestructura de cold email y optimización de pipeline.",
    },
    tags: ["Lead Generation", "Python", "Automation", "Data"],
  },
  {
    company: "Maderas América",
    role: { en: "Chief Operations Officer", es: "Director de Operaciones (COO)" },
    period: { en: "2023", es: "2023" },
    location: "Lima, Peru",
    description: {
      en: "Ran daily operations for a melamine and construction materials company: five warehouses, inventory aligned with sales, machinery maintenance and international imports.",
      es: "Dirigí las operaciones diarias de una empresa de melamina y materiales de construcción: cinco almacenes, inventario alineado con ventas, mantenimiento de maquinaria e importaciones internacionales.",
    },
    tags: ["Operations", "Supply Chain", "Inventory", "Imports"],
  },
  {
    company: "Hidroalemana S.A.C.",
    role: { en: "General Manager", es: "Gerente General" },
    period: { en: "2021 to 2023", es: "2021 a 2023" },
    location: "Lima, Peru",
    description: {
      en: "Led a hydraulic well and submersible pump company serving clients such as Alicorp and Nestlé, owning logistics, contracts, client relationships and financial oversight.",
      es: "Dirigí una empresa de pozos hidráulicos y bombas sumergibles con clientes como Alicorp y Nestlé, a cargo de logística, contratos, relaciones con clientes y supervisión financiera.",
    },
    tags: ["General Management", "Logistics", "B2B", "Finance"],
  },
  {
    company: "Representaciones Peruanas del Sur",
    role: { en: "Operations Coordinator", es: "Coordinador de Operaciones" },
    period: { en: "2018 to 2022", es: "2018 a 2022" },
    location: "Lima, Peru",
    description: {
      en: "Coordinated environmental public services for two municipal districts in Lima, leading a team of 60 and optimizing waste management and scheduling.",
      es: "Coordiné servicios públicos ambientales para dos distritos de Lima, liderando un equipo de 60 personas y optimizando la gestión de residuos y la programación.",
    },
    tags: ["Team Leadership", "Operations", "Scheduling"],
  },
];

/* --------------------------------------------------------------------------- */
/*  Educación                                                                  */
/* --------------------------------------------------------------------------- */
export type Education = {
  school: string;
  degree: Localized;
  period: Localized;
  location: string;
};

export const education: Education[] = [
  {
    school: "Ensign College",
    degree: {
      en: "B.S. in Software Engineering",
      es: "Lic. en Ingeniería de Software",
    },
    period: { en: "2024 to 2025", es: "2024 a 2025" },
    location: "Salt Lake City, Utah",
  },
  {
    school: "Universidad San Ignacio de Loyola",
    degree: {
      en: "B.Eng. in Manufacturing Engineering",
      es: "Ing. en Ingeniería de Manufactura",
    },
    period: { en: "2013 to 2018", es: "2013 a 2018" },
    location: "Lima, Peru",
  },
  // TODO: si quieres mostrar el MBA, completa la institución y descomenta:
  // {
  //   school: "Tu institución del MBA",
  //   degree: { en: "MBA, Business Administration", es: "MBA, Administración de Empresas" },
  //   period: { en: "", es: "" },
  //   location: "",
  // },
];

/* --------------------------------------------------------------------------- */
/*  Idiomas                                                                    */
/* --------------------------------------------------------------------------- */
export const languages: { name: Localized; level: Localized }[] = [
  {
    name: { en: "Spanish", es: "Español" },
    level: { en: "Native", es: "Nativo" },
  },
  {
    name: { en: "English", es: "Inglés" },
    level: { en: "Bilingual", es: "Bilingüe" },
  },
  {
    name: { en: "Portuguese", es: "Portugués" },
    level: { en: "Bilingual", es: "Bilingüe" },
  },
];
