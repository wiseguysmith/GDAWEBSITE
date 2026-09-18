import { site } from "@/config/site";
import type { LegalDocument } from "../types";
import { legal } from "./legal";

/** Copia de trabajo hasta su revisión por asesores legales (handoff §21). */
export const disclosures: LegalDocument = {
  meta: {
    title: "Avisos importantes",
    description: "Avisos societarios y regulatorios en lenguaje claro de Global Digital Access.",
  },
  title: "Avisos importantes",
  intro: "Declaraciones en lenguaje claro sobre qué es Global Digital Access, qué no es, y qué hace y no hace este sitio web.",
  version: "0.1 (copia de trabajo — pendiente de revisión legal)",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "Quiénes somos",
      paragraphs: [`Este sitio web es operado por ${site.legal.entityName} («GDA», «nosotros»), constituida en ${site.legal.jurisdiction}.`],
    },
    {
      heading: "Qué hace GDA",
      paragraphs: [legal.standing],
    },
    {
      heading: "Qué no es GDA",
      paragraphs: [
        "GDA no es una firma de abogados, un intermediario de valores, un asesor de inversiones, una bolsa de valores, un sistema alternativo de negociación, un agente de transferencia, un custodio, un gestor de fondos ni otro intermediario regulado, y no se presenta como ninguno de ellos en ninguna jurisdicción. GDA no brinda asesoría legal, tributaria, de inversión, de valuación, contable ni regulatoria. Cuando un proyecto requiere dichos servicios, los prestan profesionales independientes calificados o proveedores autorizados dentro de su propio ámbito y bajo su propia responsabilidad.",
      ],
    },
    {
      heading: "Sin oferta, solicitud ni recomendación",
      paragraphs: [
        "Nada en este sitio web es, ni debe interpretarse como, una oferta de venta, una solicitud de una oferta de compra o una recomendación de ningún valor, activo digital, instrumento o inversión en ninguna jurisdicción. En este sitio web no se presenta ninguna oportunidad de inversión. Cualquier oferta, si llegara a realizarse, se hará únicamente a través de la documentación, las entidades y los intermediarios autorizados correspondientes cuando se requiera, y únicamente a personas elegibles para recibirla conforme a la ley aplicable.",
      ],
    },
    {
      heading: "Sin resultados garantizados",
      paragraphs: [
        "GDA no garantiza que ningún proyecto califique para el proceso de preparación y estructuración, lo recorra o lo complete; que ningún proyecto atraiga capital; que ninguna estructura esté disponible en ninguna jurisdicción; ni que ocurra ninguna implementación técnica. Una indicación preliminar de la Evaluación de Idoneidad del Proyecto no es una aprobación, una determinación legal, una determinación regulatoria ni una evaluación de inversión.",
      ],
    },
    {
      heading: "Jurisdicciones",
      paragraphs: [
        "GDA apoya actualmente proyectos en Estados Unidos, El Salvador, Costa Rica, Panamá, Colombia y Brasil. Mencionar una jurisdicción no significa que GDA tenga licencias regulatorias o mantenga oficinas allí, que algún producto, instrumento o estructura esté disponible allí, ni que el mismo marco legal o de cumplimiento aplique en todas esas jurisdicciones. Cada proyecto está sujeto a la ley local, a la revisión profesional y a los requisitos regulatorios aplicables.",
      ],
    },
    {
      heading: "Verificación",
      paragraphs: [
        "La verificación de identidad, elegibilidad, KYC, KYB, origen de fondos y otras verificaciones relacionadas, cuando se requieren, son realizadas por los proveedores autorizados o calificados correspondientes. Este sitio web no recopila documentos de verificación.",
      ],
    },
    {
      heading: "Terceros",
      paragraphs: [
        "Las referencias a categorías de socios profesionales o técnicos describen los tipos de firmas independientes con las que GDA puede coordinarse. No implican que alguna firma específica esté contratada, respalde a GDA o sea responsable del contenido de este sitio web. Los socios se nombran únicamente con su autorización.",
      ],
    },
    {
      heading: "Declaraciones a futuro",
      paragraphs: [
        "Las descripciones de canales, funciones o capacidades que GDA está desarrollando describen intenciones, no compromisos. Pueden cambiar o no llegar a materializarse.",
      ],
    },
    {
      heading: "Cambios",
      paragraphs: ["Estos avisos pueden actualizarse. La versión y la fecha al inicio de esta página identifican el texto vigente."],
    },
  ],
};
