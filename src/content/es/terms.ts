import { site } from "@/config/site";
import type { LegalDocument } from "../types";

/** Copia de trabajo hasta su revisión por asesores legales. */
export const terms: LegalDocument = {
  meta: {
    title: "Términos de uso",
    description: "Términos que rigen el uso del sitio web de Global Digital Access.",
  },
  title: "Términos de uso",
  intro: "Estos términos rigen su uso de este sitio web. Al utilizarlo, usted los acepta.",
  version: "0.1 (copia de trabajo — pendiente de revisión legal)",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "El sitio web",
      paragraphs: [
        `Este sitio web es operado por ${site.legal.entityName} («GDA»). Ofrece información sobre el proceso de preparación y estructuración de GDA y le permite enviar una Evaluación de Idoneidad del Proyecto, una solicitud de acceso para inversionistas o una consulta.`,
      ],
    },
    {
      heading: "Sin asesoría, sin oferta",
      paragraphs: [
        "El contenido de este sitio web es información general. No constituye asesoría legal, tributaria, de inversión, de valuación ni regulatoria, y no es una oferta, una solicitud ni una recomendación de ningún valor, activo digital o inversión. Por favor, lea los Avisos importantes, que forman parte de estos términos.",
      ],
    },
    {
      heading: "Envíos",
      paragraphs: [
        "Al enviar un formulario, usted confirma que la información es exacta a su leal saber y entender y que está autorizado para proporcionarla. Una respuesta a un envío —incluida una indicación preliminar de la Evaluación de Idoneidad— no es una aprobación, una determinación, una contratación ni un compromiso de ningún tipo. Cualquier relación entre GDA y un titular de proyecto, un inversionista o un socio se rige por términos escritos separados.",
      ],
    },
    {
      heading: "Uso aceptable",
      paragraphs: ["Usted se compromete a no:"],
      bullets: [
        "Enviar información falsa, engañosa o no autorizada.",
        "Intentar interferir con el sitio web, sus formularios o sus medidas de seguridad, ni enviar solicitudes automatizadas.",
        "Utilizar el sitio web para cualquier fin ilícito.",
      ],
    },
    {
      heading: "Propiedad intelectual",
      paragraphs: [
        "El texto, el diseño y demás contenido de este sitio web pertenecen a GDA o a sus licenciantes. Usted puede ver e imprimir páginas para su propia referencia. No puede reproducir ni distribuir el contenido con fines comerciales sin autorización.",
      ],
    },
    {
      heading: "Enlaces a terceros",
      paragraphs: ["Los enlaces a otros sitios web se ofrecen por conveniencia. GDA no es responsable de su contenido."],
    },
    {
      heading: "Exención y limitación de responsabilidad",
      paragraphs: [
        "El sitio web se ofrece tal cual. En la máxima medida permitida por la ley, GDA excluye toda garantía en relación con el sitio web y su contenido, y no es responsable de ninguna pérdida derivada del uso del sitio web o de su contenido, ni de la confianza depositada en ellos. Nada en estos términos excluye responsabilidades que no puedan excluirse por ley.",
      ],
    },
    {
      heading: "Ley aplicable",
      paragraphs: [`Estos términos se rigen por la ley de ${site.legal.jurisdiction}. [DISPUTE_FORUM]`],
    },
    {
      heading: "Cambios",
      paragraphs: ["GDA puede actualizar estos términos. La versión y la fecha al inicio de esta página identifican el texto vigente."],
    },
  ],
};
