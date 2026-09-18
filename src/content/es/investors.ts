import type { ContentBlock, Cta, Meta } from "../types";

export const investors = {
  meta: {
    title: "Inversionistas",
    description:
      "GDA está desarrollando un canal para inversionistas que dé acceso a oportunidades apropiadas del mundo real a medida que los proyectos estén disponibles y se satisfagan los requisitos aplicables. Acceso, por etapas.",
  } satisfies Meta,

  hero: {
    eyebrow: "Inversionistas",
    heading: "Acceso, por etapas.",
    sub: "GDA está desarrollando un canal para inversionistas que dé acceso a oportunidades apropiadas del mundo real a medida que los proyectos estén disponibles y se satisfagan los requisitos aplicables. Hoy no existe un mercado público, y nada en esta página constituye una oferta.",
    cta: { label: "Solicitar acceso para inversionistas", href: "/investors/access", event: "investor" } satisfies Cta,
  },

  means: {
    heading: "Qué significa solicitar acceso",
    paragraphs: [
      "Una relación perfilada con GDA: quién es usted, dónde está y en qué está interesado. A medida que los proyectos satisfagan los requisitos de preparación aplicables, GDA puede contactarlo sobre el paso siguiente apropiado para su perfil y su jurisdicción.",
    ],
  } satisfies ContentBlock,

  doesNotMean: {
    heading: "Qué no significa solicitar acceso",
    paragraphs: [],
    bullets: [
      "No es una oferta, una solicitud ni una recomendación de inversión.",
      "No garantiza el acceso a ninguna oportunidad, en ningún momento.",
      "No es una determinación de elegibilidad. Sus respuestas son únicamente informativas.",
      "No crea una cuenta, un acceso a un mercado ni un portafolio. Todavía no existe ninguno.",
    ],
  } satisfies ContentBlock,

  dependsOn: {
    eyebrow: "El acceso depende de",
    items: ["Jurisdicción", "Elegibilidad del inversionista", "Estructura de la oferta", "Verificación profesional", "Ley aplicable"],
  },

  pathway: {
    eyebrow: "El canal para inversionistas",
    heading: "Cuatro pasos, a medida que el canal se desarrolla.",
    steps: [
      { title: "Solicitar acceso", body: "Un perfil breve: tipo de inversionista, jurisdicción, áreas de interés y datos de contacto." },
      { title: "Perfil del inversionista", body: "GDA revisa el perfil y confirma el paso siguiente apropiado para su jurisdicción." },
      {
        title: "Verificación",
        body: "La verificación de identidad, elegibilidad, KYC, KYB y otras verificaciones relacionadas, cuando se requieren, son realizadas por el proveedor autorizado o calificado correspondiente, no por GDA.",
      },
      {
        title: "Acceso apropiado",
        body: "Acceso a oportunidades que han satisfecho los requisitos de preparación aplicables, según su elegibilidad, su jurisdicción y la estructura de cada oferta.",
      },
    ],
  },

  licensedRole: {
    heading: "El papel de los socios autorizados",
    paragraphs: [
      "GDA es dueña del flujo de trabajo y de la experiencia. Las funciones reguladas —verificación, oferta, custodia, distribución— son realizadas por los proveedores autorizados o calificados correspondientes cuando se requiere, a través de la documentación y las entidades apropiadas. GDA no las realiza ni afirma hacerlo.",
    ],
  } satisfies ContentBlock,

  cta: {
    heading: "Solicite acceso.",
    body: "Seis preguntas breves. Sin documentos. Sin compromiso.",
    primary: { label: "Solicitar acceso para inversionistas", href: "/investors/access", event: "investor" } satisfies Cta,
    secondary: { label: "Hable con GDA", href: "/contact", event: "contact" } satisfies Cta,
  },
};
