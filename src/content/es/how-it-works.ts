import type { ContentBlock, Cta, FaqItem, Meta } from "../types";

export const howItWorks = {
  meta: {
    title: "Cómo funciona",
    description:
      "Tres pilares, cinco etapas, un camino claro. Cómo GDA coordina el proceso de preparación y estructuración, quién es responsable en cada etapa y qué no hace GDA.",
  } satisfies Meta,

  hero: {
    eyebrow: "Cómo funciona",
    heading: "Simple en la superficie. Riguroso por dentro.",
    sub: "Todo proyecto recorre las mismas cinco etapas, en el mismo orden, con la misma separación entre quienes coordinan y quienes revisan. Esto es lo que ocurre en cada una, quién es responsable y qué necesitará usted.",
  },

  pillarsIntro: {
    eyebrow: "Tres pilares",
    heading: "Evaluar. Estructurar. Activar.",
    body: "En el nivel más alto, GDA hace tres cosas. El flujo de cinco etapas que está debajo es la forma en que se lleva a cabo cada una.",
  },

  stagesIntro: {
    eyebrow: "Cinco etapas",
    heading: "Idoneidad. Preparación. Validación. Estructuración. Activación.",
    body: "Nada avanza antes de estar preparado. Cada etapa tiene un propósito definido, un responsable definido y un resultado definido.",
    stageLabel: "Etapa {current} de {total}",
    responsibleLabel: "Responsable",
  },

  responsibilities: {
    eyebrow: "Modelo de responsabilidades",
    heading: "Tres funciones. Separación clara.",
    body: "GDA coordina el flujo de trabajo. Los socios profesionales atienden los asuntos dentro de su ámbito profesional. Los proveedores técnicos se encargan de la implementación técnica.",
  },

  does: {
    heading: "Qué hace GDA",
    paragraphs: [],
    bullets: [
      "Determina si la infraestructura de activos digitales puede ser apropiada para un proyecto, y lo dice con claridad cuando no lo es.",
      "Coordina la evaluación de preparación en las áreas aplicables al proyecto.",
      "Convoca a los socios profesionales y técnicos independientes correspondientes para la jurisdicción, el activo y la estructura.",
      "Coordina la estructuración con esos socios y mantiene informado al titular del proyecto en cada etapa.",
      "Lleva los proyectos que han satisfecho los requisitos de preparación aplicables hacia la implementación técnica a través del proveedor correspondiente.",
    ],
  } satisfies ContentBlock,

  doesNot: {
    heading: "Qué no hace GDA",
    paragraphs: [],
    bullets: [
      "GDA no brinda asesoría legal, tributaria, de inversión, de valuación ni regulatoria.",
      "GDA no actúa como asesor legal, intermediario de valores, asesor de inversiones, bolsa, agente de transferencia, custodio ni otro intermediario regulado.",
      "GDA no realiza verificaciones de identidad, elegibilidad, KYC ni KYB; lo hacen los proveedores correspondientes, cuando se requiere.",
      "GDA no realiza la implementación técnica; lo hace el proveedor de infraestructura técnica correspondiente.",
      "GDA no valida su propio trabajo, no aprueba proyectos en sentido legal o regulatorio y no garantiza ningún resultado.",
    ],
  } satisfies ContentBlock,

  faq: {
    eyebrow: "Preguntas",
    heading: "Preguntas frecuentes.",
    items: [
      {
        question: "¿Es GDA una firma de abogados, un intermediario de valores, una bolsa o un fondo?",
        answer:
          "No. GDA coordina un proceso de preparación y estructuración. Los asuntos legales, de cumplimiento, de valores, de valuación, tributarios y otros asuntos profesionales son atendidos por socios independientes calificados dentro de su ámbito, y las funciones reguladas son realizadas por proveedores autorizados cuando se requiere.",
      },
      {
        question: "¿Todos los proyectos califican?",
        answer:
          "No, y GDA no asume que deban hacerlo. La Evaluación de Idoneidad existe para determinar desde el inicio si esta infraestructura puede ser apropiada. Algunos proyectos están mejor servidos por estructuras convencionales, y GDA lo dirá.",
      },
      {
        question: "¿Qué ocurre después de enviar una Evaluación de Idoneidad?",
        answer:
          "Usted recibe una indicación preliminar en pantalla y por correo electrónico, con un número de referencia. Un miembro del equipo de GDA revisa después el envío antes de determinar los pasos siguientes apropiados. La indicación no es una aprobación ni una determinación de ningún tipo.",
      },
      {
        question: "¿Cuánto tiempo toma el proceso?",
        answer:
          "Depende del proyecto, de su jurisdicción y de cuán preparadas estén ya su documentación y su estructura. GDA no promete una duración. Lo que sí promete es que usted sabrá en qué etapa se encuentra y qué se requiere para pasar a la siguiente.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "La Evaluación de Idoneidad es gratuita y no implica ningún compromiso. Los términos de contratación para el proceso de preparación y estructuración se conversan una vez que GDA y el titular del proyecto han acordado que tiene sentido avanzar.",
      },
      {
        question: "¿GDA tokeniza el activo?",
        answer:
          "No. GDA coordina el proceso de preparación y estructuración. La activación técnica, cuando corresponde, la realiza el proveedor de infraestructura técnica correspondiente, y solo después de que se hayan satisfecho los requisitos de preparación aplicables.",
      },
      {
        question: "¿En qué jurisdicciones opera GDA actualmente?",
        answer:
          "GDA apoya actualmente proyectos en Estados Unidos, El Salvador, Costa Rica, Panamá, Colombia y Brasil. Cada jurisdicción requiere su propia vía legal, de cumplimiento y de estructuración, coordinada con los socios locales y especializados correspondientes.",
      },
    ] satisfies FaqItem[],
  },

  cta: {
    heading: "Comience con la estructura correcta.",
    body: "Siete preguntas, unos tres minutos, sin compromiso.",
    primary: { label: "Evalúe su proyecto", href: "/evaluate", event: "evaluate" } satisfies Cta,
    secondary: { label: "Hable con GDA", href: "/contact", event: "contact" } satisfies Cta,
  },
};
