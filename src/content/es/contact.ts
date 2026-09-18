import type { Meta } from "../types";

export const contact = {
  meta: {
    title: "Contacto",
    description: "Consultas generales, gubernamentales, de socios y de medios para Global Digital Access.",
  } satisfies Meta,

  hero: {
    eyebrow: "Contacto",
    heading: "Hable con GDA.",
    sub: "Para todo lo que no sea una Evaluación de Idoneidad de proyecto o una solicitud de acceso para inversionistas. Elija el tipo de consulta para que llegue a la persona correcta.",
  },

  aside: {
    project: {
      title: "¿Tiene un proyecto?",
      body: "La Evaluación de Idoneidad es la ruta más rápida.",
      link: { label: "Evalúe su proyecto", href: "/evaluate" },
    },
    investor: {
      title: "¿Es inversionista?",
      body: "Solicite acceso al canal para inversionistas.",
      link: { label: "Solicitar acceso para inversionistas", href: "/investors/access" },
    },
  },

  form: {
    typeLabel: "Tipo de consulta",
    types: [
      { value: "general", label: "Consulta general" },
      { value: "government", label: "Consulta de gobierno o sector público" },
      { value: "partner", label: "Consulta de socios" },
      { value: "media", label: "Consulta de medios" },
      { value: "other", label: "Otro" },
    ],
    name: "Nombre",
    organisation: "Organización",
    email: "Correo electrónico",
    message: "Mensaje",
    messageHelp: "Por favor, no incluya documentos confidenciales ni información personal sensible.",
    submit: "Enviar consulta",
    sending: "Enviando…",
  },

  confirmation: {
    eyebrow: "Recibido",
    heading: "Gracias.",
    body: "Su consulta ha sido recibida. Un miembro del equipo de GDA responderá por correo electrónico.",
    reference: "Referencia",
  },
};
