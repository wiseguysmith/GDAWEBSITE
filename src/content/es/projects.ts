import type { ContentBlock, Cta, Meta } from "../types";

export const projects = {
  meta: {
    title: "Proyectos",
    description:
      "GDA trabaja con titulares, patrocinadores y desarrolladores de proyectos legítimos del mundo real: bienes raíces, activos ambientales y naturales, infraestructura, agricultura, energía y empresa privada.",
  } satisfies Meta,

  hero: {
    eyebrow: "Proyectos",
    heading: "Diseñado para proyectos con valor real.",
    sub: "GDA trabaja con titulares, patrocinadores y desarrolladores de proyectos legítimos del mundo real que quieren saber, antes de comprometer tiempo o capital, si la infraestructura de activos digitales puede ser apropiada y qué se necesitaría para estar preparados.",
    cta: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
  },

  whoFor: {
    heading: "Con quién trabaja GDA",
    paragraphs: [
      "Titulares de proyectos y activos. Propietarios mayoritarios y partes con control. Desarrolladores y patrocinadores. Representantes autorizados. Gobiernos y entidades del sector público. Asesores que actúan en nombre de cualquiera de los anteriores.",
      "El hilo común es un activo o una empresa real, una parte con autoridad para actuar en su nombre y la disposición a recorrer un proceso disciplinado antes de que intervenga cualquier tecnología.",
    ],
  } satisfies ContentBlock,

  whoNotFor: {
    heading: "Para quién no es GDA",
    paragraphs: [
      "Proyectos que buscan eludir la preparación legal, de cumplimiento o económica. Conceptos sin un activo, una empresa o una parte con control identificables. Cualquiera que busque una garantía de que un proyecto avanzará o atraerá capital. GDA no la ofrece.",
    ],
  } satisfies ContentBlock,

  categories: {
    eyebrow: "Categorías de proyecto",
    heading: "Seis categorías. Una sola Evaluación de Idoneidad.",
    body: "Estas son las áreas que la infraestructura de GDA puede apoyar. No son listados de inversión, y aquí no se lista ningún proyecto.",
  },

  readiness: {
    eyebrow: "Panorama de preparación",
    heading: "Qué examina una evaluación de preparación.",
    body: "Según el proyecto, la evaluación puede cubrir algunas o todas las siguientes áreas. No todas las áreas aplican a todos los proyectos, y no todas requieren un profesional externo.",
  },

  prepare: {
    eyebrow: "Antes de una Evaluación de Idoneidad",
    heading: "Qué deberían preparar los titulares de proyectos.",
    body: "La Evaluación de Idoneidad no requiere documentos. Si el proyecto avanza a una evaluación de preparación, será útil tener lo siguiente disponible o en curso.",
    items: [
      "Evidencia de la titularidad o el control del activo, la empresa o el proyecto, y de la autoridad de la persona que actúa en su nombre.",
      "Documentos corporativos y de la entidad titular o del proyecto, incluido el lugar donde está constituida.",
      "Permisos, licencias, títulos, concesiones o registros existentes aplicables al activo.",
      "Información financiera: desempeño histórico si está en operación, proyecciones si está en desarrollo, y cualquier financiamiento o acuerdo con inversionistas existente.",
      "Valuaciones, evaluaciones ambientales, estudios técnicos o informes de diligencia existentes.",
      "Una declaración clara del objetivo: qué busca lograr el proyecto y para quién.",
    ],
  },

  cta: {
    heading: "Descubra si encaja.",
    body: "Siete preguntas, unos tres minutos, sin compromiso.",
    primary: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Cómo funciona el proceso", href: "/how-it-works" } satisfies Cta,
  },
};
