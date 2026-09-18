import type { Cta, Meta, Pathway } from "../types";

export const home = {
  meta: {
    title: "Global Digital Access — Valor real. Infraestructura digital. Acceso global.",
    description:
      "GDA coordina el proceso de preparación y estructuración para proyectos del mundo real que consideran infraestructura de activos digitales. Evaluar. Estructurar. Activar.",
  } satisfies Meta,

  hero: {
    lines: ["Valor real.", "Infraestructura digital.", "Acceso global."],
    sub: "GDA aporta el proceso y la infraestructura para llevar proyectos del mundo real desde la preparación hasta la activación.",
    primary: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Solicitar acceso para inversionistas", href: "/investors/access", event: "investor" } satisfies Cta,
    principles: ["Preparación antes de la activación", "Validación profesional", "Plataforma global · Ejecución local"],
    coordinate: "§ 00 / Inicio",
    system: {
      stages: "Etapas, un solo camino",
      areas: "Áreas de preparación",
      jurisdictions: "Jurisdicciones hoy",
      categories: "Categorías de socios",
    },
  },

  whatWeDo: {
    coordinate: "§ 01 / Qué hacemos",
    eyebrow: "Qué hacemos",
    heading: "Evaluar. Estructurar. Activar.",
  },

  howItWorks: {
    coordinate: "§ 02 / Cómo funciona",
    coordinateRight: "Idoneidad → Preparación → Validación → Estructuración → Activación",
    eyebrow: "Cómo funciona",
    heading: "Cinco etapas. Un camino claro.",
    sub: "Todo proyecto recorre la misma secuencia. Usted siempre sabe en qué punto está, qué viene después y quién es responsable de ello.",
    link: { label: "Ver el proceso completo", href: "/how-it-works" } satisfies Cta,
    /** Identificador fijo en la línea de proceso, p. ej. "Etapa 01 de 05". */
    stageLabel: "Etapa {current} de {total}",
  },

  applications: {
    coordinate: "§ 03 / Aplicaciones",
    eyebrow: "Dónde aplica la infraestructura",
    heading: "Aplicaciones en el mundo real.",
    link: { label: "Proyectos con los que trabaja GDA", href: "/projects" } satisfies Cta,
  },

  validation: {
    coordinate: "§ 04 / Validación",
    coordinateRight: "Coordinación · Revisión profesional · Implementación técnica",
    eyebrow: "Construido sobre la validación profesional",
    heading: "Nosotros coordinamos el proceso. Los especialistas atienden los asuntos dentro de su ámbito.",
    body: "GDA coordina el flujo de preparación desde la primera evaluación hasta la activación. Los asuntos legales, de cumplimiento, económicos, ambientales y técnicos aplicables son revisados por los profesionales calificados correspondientes cuando se requiere. GDA no los sustituye.",
  },

  pathwaysCoordinate: "§ 05 / Caminos",

  pathways: {
    project: {
      eyebrow: "Proyectos",
      title: "Tengo un proyecto.",
      body: "Comience con una breve Evaluación de Idoneidad. Siete preguntas, unos tres minutos, sin compromiso.",
      cta: { label: "Iniciar la Evaluación de Idoneidad", href: "/evaluate", event: "evaluate" },
    } satisfies Pathway,
    investor: {
      eyebrow: "Inversionistas",
      title: "Soy inversionista.",
      body: "Solicite acceso al canal para inversionistas que GDA está desarrollando. Las oportunidades se presentan a medida que los proyectos están disponibles y se satisfacen los requisitos aplicables.",
      cta: { label: "Solicitar acceso para inversionistas", href: "/investors/access", event: "investor" },
    } satisfies Pathway,
  },

  network: {
    coordinate: "§ 06 / Red",
    eyebrow: "Red profesional",
    heading: "Una red profesional seleccionada con criterio.",
    body: "Los socios independientes se convocan para cada proyecto según su jurisdicción, instrumento y requisitos, y siguen siendo responsables de los asuntos dentro de su propio ámbito profesional.",
    link: { label: "Cómo trabaja GDA con sus socios", href: "/partners" } satisfies Cta,
  },

  team: {
    coordinate: "§ 07 / Equipo",
    eyebrow: "Equipo",
    heading: "Las personas que coordinan el proceso.",
    link: { label: "Acerca de GDA", href: "/about" } satisfies Cta,
  },

  finalCta: {
    heading: "Comience con la estructura correcta.",
    body: "Una breve Evaluación de Idoneidad puede ayudar a determinar si esta infraestructura es apropiada antes de comprometer tiempo o recursos significativos.",
    primary: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Hable con GDA", href: "/contact", event: "contact" } satisfies Cta,
  },
};
