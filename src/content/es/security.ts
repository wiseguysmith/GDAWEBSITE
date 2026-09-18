import { retention } from "@/config/retention";
import type { LegalDocument } from "../types";

/**
 * Describe únicamente los controles que existen realmente (handoff §10, §30).
 * Si un control cambia en el código, se cambia aquí en el mismo commit.
 */
export const security: LegalDocument = {
  meta: {
    title: "Seguridad",
    description: "Cómo maneja Global Digital Access la información enviada a través de este sitio web.",
  },
  title: "Manejo de la información",
  intro:
    "Esta página describe cómo se maneja hoy la información enviada a través de este sitio web. Indica lo que está implementado, no lo que está planificado, y no afirma certificaciones ni controles que no existen.",
  version: "1.1",
  updatedAt: "2026-09-18",
  controls: {
    heading: "Controles de un vistazo",
    columns: { control: "Control", state: "Estado", meaning: "Qué significa" },
    states: {
      implemented: "Implementado",
      "implemented-manual": "Implementado — manual",
      "not-claimed": "No se afirma",
    },
    items: [
      { control: "Transporte cifrado (HTTPS)", state: "implemented", meaning: "Todo el tráfico, incluidos los envíos de formularios, viaja mediante TLS." },
      {
        control: "Validación de esquema en el servidor",
        state: "implemented",
        meaning: "Cada envío se valida contra un esquema estricto antes de almacenar cualquier dato.",
      },
      {
        control: "Límite de solicitudes y filtro de bots",
        state: "implemented",
        meaning: "Límites por conexión y por correo electrónico; verificaciones de campo oculto y de tiempo; Cloudflare Turnstile cuando está habilitado.",
      },
      {
        control: "No se recopilan documentos de verificación",
        state: "implemented",
        meaning: "El sitio web nunca solicita archivos de identidad, de constitución societaria ni de origen de fondos.",
      },
      {
        control: "Cabeceras de seguridad (CSP, HSTS, marcos)",
        state: "implemented",
        meaning: "Protecciones estándar del navegador contra inyección y clickjacking.",
      },
      {
        control: "Retención definida",
        state: "implemented-manual",
        meaning: `Los plazos están definidos (envíos hasta ${Math.round(retention.submissionsDays / 365)} años) y se aplican mediante revisión periódica; la automatización está planificada.`,
      },
      {
        control: "Certificación de seguridad independiente",
        state: "not-claimed",
        meaning: "GDA no cuenta con SOC 2, ISO 27001 ni certificaciones similares para este sitio web, y no afirma lo contrario.",
      },
      {
        control: "Cifrado en reposo, descrito",
        state: "not-claimed",
        meaning: "El almacenamiento lo proporcionan proveedores designados; GDA no describe controles que no ha verificado.",
      },
    ],
  },
  sections: [
    {
      heading: "Qué recopila el sitio web",
      paragraphs: [
        "El sitio web recopila únicamente lo que sus formularios solicitan: las respuestas de la Evaluación de Idoneidad del Proyecto, de la solicitud de acceso para inversionistas y del formulario de contacto, junto con los datos de contacto que usted proporciona. No recopila documentos de identidad, pasaportes, documentos de constitución societaria, documentación de origen de fondos ni otros archivos de verificación sensibles. Cuando dicha verificación se requiera en el futuro, se realizará a través del proveedor autorizado o calificado correspondiente, no a través de este sitio web.",
      ],
    },
    {
      heading: "Transporte",
      paragraphs: [
        "El sitio web se sirve mediante HTTPS. Los envíos de formularios viajan por la misma conexión cifrada hasta el punto de recepción de GDA.",
      ],
    },
    {
      heading: "A dónde van los envíos",
      paragraphs: [
        "Cada envío se valida en el servidor, recibe un número de referencia, se escribe en el registro de envíos de GDA y se notifica por correo electrónico a una bandeja de GDA. Se envía un correo de confirmación, que repite el resultado mostrado en pantalla, a la dirección que usted proporciona.",
        "El acceso a los registros de envíos y a la bandeja de notificaciones está limitado a los miembros del equipo de GDA que atienden las consultas.",
      ],
    },
    {
      heading: "Protección de los formularios",
      paragraphs: [
        "Los envíos se validan contra un esquema en el servidor, se limitan por dirección de red y por dirección de correo electrónico, y se filtran contra abuso automatizado mediante un campo oculto y un tiempo mínimo de llenado. Cuando Cloudflare Turnstile está habilitado, proporciona una verificación adicional contra bots.",
        "Para el límite de solicitudes, el sitio web conserva durante un breve período un hash unidireccional con sal de la dirección de red. La dirección en sí no se almacena junto con su envío.",
      ],
    },
    {
      heading: "Su navegador",
      paragraphs: [
        "Mientras completa un flujo, sus respuestas a las preguntas (pero nunca sus datos de contacto) se guardan en su propio navegador para que pueda retomarlo si se interrumpe. Este borrador se elimina al enviar y caduca a los " +
          `${retention.localDraftDays} días. Puede borrarlo en cualquier momento desde el flujo.`,
      ],
    },
    {
      heading: "Retención",
      paragraphs: [
        `Los envíos de la Evaluación de Idoneidad y de acceso para inversionistas se conservan hasta ${Math.round(retention.submissionsDays / 365)} años desde su envío. Las consultas de contacto se conservan hasta ${Math.round(retention.contactDays / 365)} año. Los hashes para el límite de solicitudes se conservan hasta ${retention.rateLimitHashDays} días.`,
        retention.enforcement === "manual"
          ? "La retención se aplica actualmente de forma manual por el equipo de GDA mediante una revisión periódica del registro de envíos."
          : "La retención se aplica automáticamente mediante un proceso programado.",
      ],
    },
    {
      heading: "Analítica",
      paragraphs: [
        "Si la analítica está habilitada, se trata de un servicio sin cookies y respetuoso de la privacidad que registra vistas de página y un pequeño conjunto de eventos con nombre (por ejemplo, que se inició o completó una Evaluación de Idoneidad). Las respuestas de los formularios, nombres, correos electrónicos y otra información personal nunca se envían a la analítica.",
      ],
    },
    {
      heading: "Cabeceras de seguridad del sitio web",
      paragraphs: [
        "El sitio web envía cabeceras de seguridad estándar del navegador, incluida una Política de Seguridad de Contenido (CSP), HTTP Strict Transport Security y cabeceras que impiden que otros sitios lo incrusten en marcos y que se infiera el tipo de contenido.",
      ],
    },
    {
      heading: "Qué no se afirma",
      paragraphs: [
        "GDA no afirma ninguna certificación de seguridad (como SOC 2 o ISO 27001) para este sitio web, y no describe controles que no ha implementado. Si eso cambia, esta página cambiará.",
      ],
    },
  ],
};
