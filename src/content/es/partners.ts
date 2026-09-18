import type { ContentBlock, Cta, Meta, PartnerCategory, PartnerLogo } from "../types";

/** Lista canónica de once (handoff §17). Las primeras ocho se destacan en la portada. */
export const partnerCategories: PartnerCategory[] = [
  { slug: "legal", title: "Legal", descriptor: "Arquitectura de la entidad, derechos, documentación y asesoría en cada jurisdicción.", featured: true },
  {
    slug: "compliance",
    title: "Cumplimiento y regulación",
    descriptor: "Vía regulatoria y requisitos de cumplimiento, atendidos con proveedores calificados.",
    featured: true,
  },
  {
    slug: "valuation",
    title: "Valuación y economía",
    descriptor: "Valuación independiente y análisis económico por profesionales calificados, cuando se requiere.",
    featured: true,
  },
  { slug: "environmental", title: "Ambiental", descriptor: "Evaluación ambiental y experiencia en activos naturales.", featured: true },
  {
    slug: "diligence",
    title: "Diligencia técnica y del activo",
    descriptor: "Diligencia de ingeniería y a nivel de activo apropiada para el proyecto.",
    featured: true,
  },
  {
    slug: "technical",
    title: "Infraestructura técnica",
    descriptor: "Implementación y activación, realizadas por el proveedor correspondiente.",
    featured: true,
  },
  { slug: "custody", title: "Custodia", descriptor: "Realizada por proveedores autorizados, cuando se requiere.", featured: true },
  {
    slug: "distribution",
    title: "Distribución e intermediarios",
    descriptor: "Intermediarios de valores y distribución, a través de entidades autorizadas cuando se requiere.",
    featured: true,
  },
  { slug: "securities", title: "Valores", descriptor: "Profesionales e intermediarios de valores, cuando un instrumento los requiere.", featured: false },
  { slug: "economic", title: "Análisis económico", descriptor: "Análisis de viabilidad y de estructura económica.", featured: false },
  { slug: "transfer-agency", title: "Agencia de transferencia", descriptor: "Realizada por proveedores autorizados, cuando se requiere.", featured: false },
];

/** Los logotipos se muestran solo con autorización escrita registrada. Ninguno al lanzamiento. */
export const partnerLogos: PartnerLogo[] = [];

export const partners = {
  meta: {
    title: "Socios",
    description:
      "Experiencia independiente. Ejecución coordinada. Cómo trabaja GDA con socios legales, de cumplimiento, de valuación, ambientales, técnicos y de infraestructura en cada jurisdicción.",
  } satisfies Meta,

  hero: {
    eyebrow: "Socios",
    heading: "Experiencia independiente. Ejecución coordinada.",
    sub: "GDA coordina el flujo de preparación. Los socios profesionales atienden los asuntos dentro de sus ámbitos profesionales. Los socios técnicos se encargan de la implementación técnica. GDA no sustituye a ninguno de ellos: se asegura de que los correctos participen en la etapa correcta.",
  },

  model: {
    eyebrow: "El modelo",
    heading: "Coordinar no es lo mismo que validar.",
    body: "La separación es deliberada. GDA conduce el proceso; las personas calificadas para revisar un asunto lo revisan y siguen siendo responsables de él. No todo proyecto necesita todas las categorías de socios, y ningún socio se convoca cuando el proyecto no lo requiere.",
  },

  categories: {
    eyebrow: "Categorías de socios",
    heading: "Convocados según el requisito.",
    body: "Categorías que cubre la red de GDA. Los socios se nombran solo con su autorización escrita; ninguno se muestra al lanzamiento.",
  },

  selection: {
    heading: "Cómo se seleccionan los socios",
    paragraphs: [
      "Por su idoneidad para el proyecto: clase de activo, instrumento, jurisdicción y etapa. Por su prestigio profesional en su campo y, cuando interviene una función regulada, por las licencias y autorizaciones que la jurisdicción exige. Por su disposición a trabajar dentro de un proceso definido y transparente en el que su ámbito es claro.",
    ],
  } satisfies ContentBlock,

  jurisdiction: {
    heading: "Cómo influye la jurisdicción en la selección de socios",
    paragraphs: [
      "La estructura legal, los requisitos de cumplimiento, los estándares de valuación y la disponibilidad de intermediarios autorizados varían según el país. GDA convoca socios en, o calificados para, la jurisdicción donde se encuentran el activo, la entidad y los inversionistas, que puede ser más de una.",
    ],
  } satisfies ContentBlock,

  scope: {
    heading: "Cómo los profesionales siguen siendo responsables de su ámbito",
    paragraphs: [
      "Cada socio revisa, asesora, valida, verifica o aprueba únicamente los asuntos dentro de su ámbito profesional, bajo sus propias obligaciones profesionales y, cuando aplica, su propia licencia. GDA coordina la secuencia y las transiciones; no firma por el trabajo.",
    ],
  } satisfies ContentBlock,

  cta: {
    heading: "Trabaje con GDA.",
    body: "Si usted es una firma profesional o técnica interesada en unirse a la red, cuéntenos sobre su práctica y sus jurisdicciones.",
    primary: { label: "Consulta de socios", href: "/contact?type=partner", event: "contact" } satisfies Cta,
  },
};
