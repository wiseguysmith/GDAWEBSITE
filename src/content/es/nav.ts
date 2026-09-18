import type { Cta, NavItem } from "../types";

export const nav = {
  primary: [
    { label: "Cómo funciona", href: "/how-it-works" },
    { label: "Proyectos", href: "/projects" },
    { label: "Inversionistas", href: "/investors" },
    { label: "Socios", href: "/partners" },
    { label: "Nosotros", href: "/about" },
  ] satisfies NavItem[],
  cta: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
  /** Short label used below the md breakpoint. */
  ctaShort: "Evaluar",
  secondary: [
    { label: "Solicitar acceso para inversionistas", href: "/investors/access", event: "investor" },
    { label: "Contacto", href: "/contact", event: "contact" },
  ] satisfies Cta[],
  menu: {
    open: "Abrir menú",
    close: "Cerrar menú",
    title: "Menú",
  },
  skipToContent: "Ir al contenido",
  exit: "Salir",
  language: {
    label: "Idioma",
    switchTo: "Cambiar a",
  },
};

export const footer = {
  groups: [
    {
      title: "Empresa",
      links: [
        { label: "Cómo funciona", href: "/how-it-works" },
        { label: "Proyectos", href: "/projects" },
        { label: "Inversionistas", href: "/investors" },
        { label: "Socios", href: "/partners" },
        { label: "Nosotros", href: "/about" },
      ],
    },
    {
      title: "Comenzar",
      links: [
        { label: "Evalúe su proyecto", href: "/evaluate" },
        { label: "Solicitar acceso para inversionistas", href: "/investors/access" },
        { label: "Contacto", href: "/contact" },
      ],
    },
    {
      title: "Confianza",
      links: [
        { label: "Seguridad", href: "/security" },
        { label: "Avisos importantes", href: "/disclosures" },
        { label: "Privacidad", href: "/privacy" },
        { label: "Términos", href: "/terms" },
        { label: "Accesibilidad", href: "/accessibility" },
      ],
    },
  ] satisfies { title: string; links: NavItem[] }[],
  languageLabel: "Idioma",
  copyright: (year: number) => `© ${year} Global Digital Access.`,
};
