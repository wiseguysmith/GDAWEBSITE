import type { ContentBlock, Cta, Meta } from "../types";

export const about = {
  meta: {
    title: "Nosotros",
    description:
      "Plataforma global. Ejecución local. La misión de GDA, sus principios operativos, su filosofía de red profesional, su modelo consciente de la jurisdicción y su presencia operativa actual.",
  } satisfies Meta,

  hero: {
    eyebrow: "Nosotros",
    lines: ["Plataforma global.", "Ejecución local."],
    sub: "GDA existe para dar a los proyectos serios del mundo real una ruta disciplinada hacia la infraestructura digital, y para decir con claridad cuándo esa ruta no es la correcta.",
  },

  mission: {
    heading: "Misión",
    paragraphs: [
      "Aportar el proceso y la infraestructura que llevan proyectos del mundo real desde la preparación hasta la activación, coordinando el trabajo profesional que debe preceder a la tecnología, en cada jurisdicción donde opera GDA.",
    ],
  } satisfies ContentBlock,

  why: {
    heading: "Por qué existe GDA",
    paragraphs: [
      "Los proyectos del mundo real suelen abordarse con la tecnología primero y la preparación después, si acaso. La estructura legal, la vía de cumplimiento, la economía, la diligencia y la gobernanza se tratan como obstáculos en lugar de como el trabajo en sí.",
      "GDA invierte ese orden. La Evaluación de Idoneidad decide si la infraestructura es apropiada en absoluto. El proceso de preparación, coordinado con profesionales independientes, hace el trabajo. La activación técnica es el último paso, y se da únicamente cuando se han satisfecho los requisitos aplicables.",
    ],
  } satisfies ContentBlock,

  principlesIntro: {
    eyebrow: "Principios operativos",
    heading: "Ocho compromisos.",
  },

  network: {
    heading: "Filosofía de la red profesional",
    paragraphs: [
      "GDA no emplea a los abogados, los proveedores de cumplimiento, los profesionales de valuación ni las firmas técnicas que un proyecto necesita. Los coordina. La independencia es el punto: las personas que revisan un asunto están calificadas para ello, son responsables de ello y están separadas de quienes conducen el proceso.",
    ],
  } satisfies ContentBlock,

  jurisdictionModel: {
    heading: "Modelo consciente de la jurisdicción",
    paragraphs: [
      "No hay dos jurisdicciones que traten de la misma manera el mismo activo, instrumento o inversionista. GDA no aplica un único marco a todas ellas. Cada mercado se aborda según sus requisitos legales, de cumplimiento, económicos y técnicos locales, con socios calificados para ese mercado.",
    ],
  } satisfies ContentBlock,

  footprint: {
    eyebrow: "Presencia operativa actual",
    heading: "Seis jurisdicciones hoy.",
    body: "GDA apoya actualmente proyectos en Estados Unidos, El Salvador, Costa Rica, Panamá, Colombia y Brasil. Cada mercado se aborda según sus requisitos legales, de cumplimiento, económicos y técnicos locales.",
    caveat:
      "Mencionar una jurisdicción no significa que GDA tenga licencias regulatorias o mantenga oficinas allí, ni que todos los instrumentos o estructuras estén disponibles allí. Significa que GDA coordina proyectos allí, sujeto a la ley local, las características del activo, el tipo de instrumento, el tipo de inversionista, la estructura de la transacción, la revisión profesional y los requisitos regulatorios aplicables.",
  },

  team: {
    eyebrow: "Equipo",
    heading: "Las personas que coordinan el proceso.",
    empty: "Los perfiles del equipo están en preparación y aparecerán aquí una vez aprobados.",
  },

  contact: {
    heading: "Contacto",
    body: "Para consultas de proyectos, inversionistas, socios, gobiernos o medios.",
    primary: { label: "Contactar a GDA", href: "/contact", event: "contact" } satisfies Cta,
    secondary: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
  },
};
