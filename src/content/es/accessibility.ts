import { site } from "@/config/site";
import type { LegalDocument } from "../types";

export const accessibility: LegalDocument = {
  meta: {
    title: "Accesibilidad",
    description: "Declaración de accesibilidad de Global Digital Access para este sitio web.",
  },
  title: "Declaración de accesibilidad",
  intro:
    "GDA quiere que este sitio web pueda ser utilizado por todas las personas. Esta declaración describe el estándar con el que trabajamos, lo que hemos hecho y cómo avisarnos cuando algo no funciona.",
  version: "1.0",
  updatedAt: "2026-09-18",
  sections: [
    {
      heading: "Estándar",
      paragraphs: ["Este sitio web está diseñado y construido para cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 en el nivel AA."],
    },
    {
      heading: "Qué hemos hecho",
      paragraphs: [],
      bullets: [
        "HTML semántico con un orden lógico de encabezados en cada página.",
        "Operación completa mediante teclado, incluidos el menú, los formularios y los flujos de varios pasos, con un indicador de foco visible.",
        "Contraste de color igual o superior a la relación AA para todo el texto, y ninguna información transmitida únicamente mediante color.",
        "Etiquetas, descripciones y mensajes de error en cada control de formulario, anunciados a las tecnologías de asistencia.",
        "Áreas táctiles de al menos 44 por 44 píxeles.",
        "Respeto de la preferencia de movimiento reducido: la animación se elimina cuando está configurada.",
        "Texto que puede ampliarse al 200 % sin pérdida de contenido ni de funcionalidad.",
      ],
    },
    {
      heading: "Limitaciones conocidas",
      paragraphs: [
        "El sitio es nuevo. Realizamos pruebas con herramientas automatizadas y verificaciones manuales con teclado y lector de pantalla, pero pueden persistir algunos problemas. Si encuentra alguno, nos gustaría saberlo.",
      ],
    },
    {
      heading: "Comentarios",
      paragraphs: [`Si alguna parte de este sitio web le resulta difícil de usar, escriba a ${site.contact.email}. Describa la página y el problema, y responderemos y corregiremos lo que podamos.`],
    },
  ],
};
