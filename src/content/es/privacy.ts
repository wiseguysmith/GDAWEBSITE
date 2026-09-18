import { retention } from "@/config/retention";
import { site } from "@/config/site";
import type { LegalDocument } from "../types";

/**
 * Copia de trabajo hasta su revisión por asesores legales. Debe reflejar el
 * comportamiento real (handoff §31). Los regímenes de protección de datos de la
 * presencia operativa incluyen leyes estatales de EE. UU., la LGPD de Brasil y
 * la Ley 1581 de Colombia; los asesores confirmarán el marco aplicable y el
 * lenguaje sobre derechos.
 */
export const privacy: LegalDocument = {
  meta: {
    title: "Política de Privacidad",
    description: "Cómo Global Digital Access recopila, usa y conserva la información personal enviada a través de este sitio web.",
  },
  title: "Política de privacidad",
  intro:
    "Esta política explica qué información personal recopila este sitio web, por qué, con quién se comparte, cuánto tiempo se conserva y qué opciones tiene usted.",
  version: "0.1 (copia de trabajo — pendiente de revisión legal)",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "Quién es responsable",
      paragraphs: [
        `${site.legal.entityName}, ${site.legal.address}, es responsable de la información personal recopilada a través de este sitio web. Consultas sobre privacidad: ${site.contact.privacyEmail}.`,
      ],
    },
    {
      heading: "Qué recopilamos",
      paragraphs: ["Recopilamos únicamente lo que usted proporciona a través de los formularios del sitio web:"],
      bullets: [
        "Evaluación de Idoneidad del Proyecto: tipo de proyecto, ubicación y jurisdicción, etapa, su relación con el proyecto, objetivo, rangos de valor aproximado, y su nombre, organización, cargo, correo electrónico, teléfono opcional, idioma preferido y comentarios opcionales.",
        "Solicitud de acceso para inversionistas: tipo de inversionista, jurisdicción, áreas de interés, rango de asignación opcional, su condición de inversionista según su propia declaración, y su nombre, organización, cargo, correo electrónico, teléfono opcional e idioma preferido.",
        "Formulario de contacto: tipo de consulta, nombre, organización, correo electrónico y mensaje.",
        "Información técnica necesaria para proteger los formularios: un hash unidireccional con sal de su dirección de red, la hora en que se inició el formulario y metadatos estándar de la solicitud, como el tipo de navegador y la página de origen.",
        "Una cookie funcional (gda-locale) que recuerda el idioma que usted elige, conservada durante un año. Se establece únicamente cuando utiliza el selector de idioma.",
      ],
    },
    {
      heading: "Qué no recopilamos",
      paragraphs: [
        "No recopilamos documentos de identidad, identificadores gubernamentales, datos de cuentas financieras, documentación de origen de fondos ni otra información de verificación sensible a través de este sitio web. No utilizamos rastreadores publicitarios. Si la analítica está habilitada, funciona sin cookies y no recibe información personal.",
      ],
    },
    {
      heading: "Para qué la usamos",
      paragraphs: [],
      bullets: [
        "Para revisar su envío y responderle, que es el propósito con el que lo envió.",
        "Para determinar los pasos siguientes apropiados para un proyecto o un perfil de inversionista, incluidas la jurisdicción y los socios que puedan ser relevantes.",
        "Para proteger el sitio web y sus formularios contra el abuso.",
        "Para cumplir las obligaciones legales que aplican a GDA.",
      ],
    },
    {
      heading: "Con quién la compartimos",
      paragraphs: [
        "Proveedores de servicios que almacenan envíos y entregan correo electrónico en nombre de GDA: [PROCESSORS]. Socios profesionales independientes, únicamente cuando usted avanza con un proyecto o una relación de inversionista y únicamente en la medida necesaria para su ámbito. Autoridades, cuando la ley lo exige. No vendemos información personal.",
      ],
    },
    {
      heading: "Cuánto tiempo la conservamos",
      paragraphs: [
        `Envíos de la Evaluación de Idoneidad y de acceso para inversionistas: hasta ${Math.round(retention.submissionsDays / 365)} años desde el envío. Consultas de contacto: hasta ${Math.round(retention.contactDays / 365)} año. Hashes para el límite de solicitudes: hasta ${retention.rateLimitHashDays} días. Borradores de flujos sin terminar en el navegador: se eliminan al enviar o a los ${retention.localDraftDays} días.`,
        retention.enforcement === "manual"
          ? "La retención se aplica actualmente de forma manual por el equipo de GDA mediante una revisión periódica del registro de envíos."
          : "La retención se aplica automáticamente mediante un proceso programado.",
      ],
    },
    {
      heading: "Sus opciones y derechos",
      paragraphs: [
        `Según dónde se encuentre, usted puede tener derecho a acceder, corregir, eliminar o restringir el uso de su información personal, a oponerse a determinados tratamientos, a la portabilidad de los datos y a retirar su consentimiento. Para ejercer cualquiera de estos derechos, escriba a ${site.contact.privacyEmail}. Responderemos dentro del plazo que exija la ley aplicable.`,
        "[RIGHTS_BY_JURISDICTION]",
      ],
    },
    {
      heading: "Transferencias internacionales",
      paragraphs: [
        "GDA opera en varias jurisdicciones y sus proveedores de servicios pueden almacenar información fuera del país en el que usted se encuentra. Cuando la ley exige salvaguardas para dichas transferencias, GDA se apoya en ellas. [TRANSFER_MECHANISM]",
      ],
    },
    {
      heading: "Menores de edad",
      paragraphs: ["Este sitio web está destinado a uso profesional y no está dirigido a menores. No recopilamos a sabiendas información de menores de 18 años."],
    },
    {
      heading: "Cambios",
      paragraphs: ["Esta política puede actualizarse. La versión y la fecha al inicio de esta página identifican el texto vigente."],
    },
  ],
};
