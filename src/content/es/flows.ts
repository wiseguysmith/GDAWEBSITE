/**
 * Toda la copia de los dos flujos guiados. Las definiciones en src/forms/*
 * consumen estas cadenas por clave, de modo que la traducción nunca toca la
 * lógica del formulario.
 */
export const flowUi = {
  continue: "Continuar",
  back: "Atrás",
  skip: "Omitir",
  begin: "Comenzar",
  submit: "Enviar",
  submitting: "Enviando…",
  edit: "Editar",
  stepOf: (step: number, total: number) => `Paso ${step} de ${total}`,
  review: "Revise sus respuestas",
  reviewSub: "Verifique todo antes de enviar. Puede editar cualquier respuesta.",
  required: "Esta respuesta es obligatoria.",
  selectPlaceholder: "Seleccione…",
  countrySearch: "Buscar países",
  otherSpecify: "Por favor, especifique",
  optional: "Opcional",
  reference: "Referencia",
  resume: {
    title: "¿Continuar donde lo dejó?",
    body: "Tiene un envío sin terminar guardado en este navegador.",
    continue: "Continuar",
    startOver: "Empezar de nuevo",
  },
  clearDraft: "Borrar respuestas guardadas",
  error: {
    title: "No se pudo enviar su solicitud.",
    body: "No se ha perdido nada. Por favor, inténtelo de nuevo en un momento. Si el problema persiste, contáctenos.",
    retry: "Intentar de nuevo",
    rateLimited: "Demasiados envíos desde esta conexión. Por favor, espere unos minutos e inténtelo de nuevo.",
    invalid: "Algunas respuestas necesitan atención. Por favor, revise los campos señalados.",
  },
  privacyNote: "Cómo se maneja esta información",
  consentRequired: "Por favor, confirme su consentimiento para continuar.",
  /** Módulo "Usted está aquí" en las pantallas de resultado (dirección de diseño §02). */
  position: {
    eyebrow: "Su posición en el proceso",
    stageOf: (current: number, total: number) => `Etapa ${String(current).padStart(2, "0")} de ${String(total).padStart(2, "0")}`,
    notStarted: "No iniciada",
    fitPotential: "Indicación preliminar emitida · pendiente de revisión por GDA",
    fitReview: "Recibido · pendiente de revisión por GDA",
  },
  /** Mensajes de validación, indexados por el mensaje en inglés que emiten los esquemas. */
  validation: {
    "This answer is required.": "Esta respuesta es obligatoria.",
    "Please choose one.": "Por favor, elija una opción.",
    "Please choose a range.": "Por favor, elija un rango.",
    "Please choose a country.": "Por favor, elija un país.",
    "Please choose at least one.": "Por favor, elija al menos una opción.",
    "Please choose an enquiry type.": "Por favor, elija un tipo de consulta.",
    "Please describe.": "Por favor, describa.",
    "Please enter your email.": "Por favor, ingrese su correo electrónico.",
    "Please enter a valid email address.": "Por favor, ingrese un correo electrónico válido.",
    "Please enter a valid phone number.": "Por favor, ingrese un número de teléfono válido.",
    "Please confirm consent to continue.": "Por favor, confirme su consentimiento para continuar.",
    "Please tell us a little more.": "Por favor, cuéntenos un poco más.",
    "Expected array, received boolean": "Por favor, elija al menos una opción.",
  } as Record<string, string>,
};

/** Cajón de manejo de la información en los pasos de contacto (dirección de diseño §04). Los valores provienen de config/retention. */
export const handling = {
  summary: "Cómo se maneja esta información",
  rows: {
    collected: { label: "Se recopila", body: "Solo las respuestas de este formulario y los datos de contacto que usted ingrese. Sin documentos de identidad." },
    sentTo: {
      label: "Se envía a",
      body: "El registro de envíos de GDA y la bandeja del equipo que atiende las consultas, a través de una conexión cifrada.",
    },
    seenBy: {
      label: "Lo ve",
      body: "Los miembros del equipo de GDA que atienden las consultas. Los socios, solo si usted avanza y solo dentro de su ámbito.",
    },
    keptFor: {
      label: "Se conserva",
      body: (years: number, draftDays: number) =>
        `Hasta ${years} años. Su borrador en el navegador nunca incluye datos de contacto y caduca a los ${draftDays} días.`,
    },
  },
  more: "Detalles completos en la página de Seguridad",
};

export const fitCheck = {
  meta: {
    title: "Evaluación de Idoneidad del Proyecto",
    description: "Siete preguntas breves para determinar si la infraestructura de activos digitales puede ser apropiada para su proyecto.",
  },
  intro: {
    eyebrow: "Evaluación de Idoneidad del Proyecto",
    heading: "¿Es esta la infraestructura correcta para su proyecto?",
    facts: ["7 preguntas breves", "Aproximadamente 3 minutos", "Sin compromiso"],
    body: "La Evaluación de Idoneidad examina las características básicas de su proyecto. Ofrece únicamente una indicación preliminar, y cada envío es revisado por un miembro del equipo de GDA antes de determinar cualquier paso siguiente.",
    whatNext:
      "Qué ocurre después: usted recibe una indicación preliminar en pantalla y por correo electrónico, con un número de referencia. El equipo de GDA revisa el envío y lo contacta sobre los pasos siguientes apropiados.",
  },
  steps: {
    projectType: {
      title: "¿Qué tipo de proyecto o activo está desarrollando?",
      options: [
        { value: "real-estate", label: "Bienes raíces" },
        { value: "environmental", label: "Activo ambiental o natural" },
        { value: "infrastructure", label: "Infraestructura" },
        { value: "agriculture", label: "Agricultura" },
        { value: "energy", label: "Energía" },
        { value: "private-enterprise", label: "Empresa en operación / empresa privada" },
        { value: "other", label: "Otro" },
      ],
      otherLabel: "Describa el proyecto o activo",
    },
    jurisdiction: {
      title: "¿Dónde se encuentra el proyecto o activo principal?",
      countryLabel: "País",
      regionLabel: "Región o estado",
      entityQuestion: "¿La entidad titular o del proyecto está constituida en una jurisdicción distinta?",
      entityOptions: [
        { value: "no", label: "No" },
        { value: "yes", label: "Sí" },
        { value: "not-sure", label: "No estoy seguro" },
      ],
      entityCountryLabel: "País donde está constituida la entidad",
    },
    stage: {
      title: "¿En qué etapa está el proyecto?",
      options: [
        { value: "concept", label: "Concepto" },
        { value: "planning", label: "Planificación / factibilidad" },
        { value: "documented", label: "Documentado / con permisos" },
        { value: "development", label: "Desarrollo" },
        { value: "operating", label: "En operación" },
        { value: "operating-financed", label: "En operación con inversionistas o financiamiento existentes" },
      ],
    },
    relationship: {
      title: "¿Cuál es su relación con el proyecto?",
      options: [
        { value: "owner", label: "Propietario" },
        { value: "controlling", label: "Propietario mayoritario / parte con control" },
        { value: "developer", label: "Desarrollador / patrocinador" },
        { value: "representative", label: "Representante autorizado" },
        { value: "government", label: "Gobierno / entidad pública" },
        { value: "adviser", label: "Asesor" },
        { value: "other", label: "Otro" },
      ],
      otherLabel: "Describa su relación",
    },
    objective: {
      title: "¿Cuál es su objetivo principal?",
      help: "Elija el que más importa. Puede señalar otros abajo.",
      options: [
        { value: "raise-capital", label: "Levantar capital" },
        { value: "broaden-access", label: "Ampliar el acceso de inversionistas" },
        { value: "restructure", label: "Reestructurar la propiedad" },
        { value: "investor-rights", label: "Crear o formalizar derechos de inversionistas" },
        { value: "transferability", label: "Facilitar la transferibilidad futura" },
        { value: "governance", label: "Mejorar la gobernanza / los reportes" },
        { value: "explore", label: "Explorar si la tokenización tiene sentido" },
        { value: "other", label: "Otro" },
      ],
      alsoLabel: "También relevante",
      otherLabel: "Describa su objetivo",
    },
    economics: {
      title: "¿Cuál es el valor aproximado del proyecto o activo?",
      help: "Con rangos es suficiente. Esta información orienta la economía y el enrutamiento interno; no es un umbral de calificación.",
      valueLabel: "Valor aproximado del proyecto o activo (equivalente en USD)",
      capitalLabel: "Requerimiento de capital o monto buscado",
      options: [
        { value: "under-1m", label: "Menos de 1 millón" },
        { value: "1m-5m", label: "1 – 5 millones" },
        { value: "5m-25m", label: "5 – 25 millones" },
        { value: "25m-100m", label: "25 – 100 millones" },
        { value: "over-100m", label: "Más de 100 millones" },
        { value: "undetermined", label: "Aún no determinado" },
      ],
    },
    contact: {
      title: "¿Cómo puede contactarlo GDA?",
      name: "Nombre completo",
      organisation: "Organización",
      role: "Cargo",
      email: "Correo electrónico",
      phone: "Teléfono",
      language: "Idioma preferido",
      languages: [
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
        { value: "pt", label: "Português" },
      ],
      comments: "¿Algo más que debamos saber?",
      commentsHelp: "Por favor, no incluya documentos confidenciales ni información personal sensible.",
    },
  },
  results: {
    "potential-fit": {
      eyebrow: "Indicación preliminar",
      heading: "Idoneidad potencial — Pendiente de revisión",
      paragraphs: [
        "Con base en la información proporcionada, su proyecto presenta características que pueden justificar una revisión de preparación adicional.",
        "Esta es únicamente una indicación preliminar. No constituye una aprobación, una determinación legal o regulatoria, una evaluación de inversión ni una garantía de que el proyecto vaya a avanzar. El equipo de GDA revisará su envío antes de determinar los pasos siguientes apropiados.",
      ],
    },
    "submitted-for-review": {
      eyebrow: "Recibido",
      heading: "Enviado para revisión",
      paragraphs: [
        "Su información ha sido recibida y requiere una revisión adicional antes de que GDA pueda ofrecer una indicación preliminar de idoneidad.",
        "Un miembro del equipo de GDA revisará el envío y determinará los pasos siguientes apropiados.",
      ],
    },
  },
  afterResult: {
    emailNote: "Se ha enviado una confirmación con esta referencia a su correo electrónico.",
    keepNote: "Por favor, conserve esta referencia para sus registros.",
    links: [
      { label: "Cómo funciona el proceso", href: "/how-it-works" },
      { label: "Volver a la página de inicio", href: "/" },
    ],
  },
};

export const investorAccess = {
  meta: {
    title: "Solicitar acceso para inversionistas",
    description: "Solicite acceso al canal para inversionistas que GDA está desarrollando. Sin oferta, sin solicitud, sin documentos.",
  },
  intro: {
    eyebrow: "Acceso para inversionistas",
    heading: "Solicite acceso, por etapas.",
    facts: ["6 preguntas breves", "Aproximadamente 2 minutos", "Sin documentos"],
    means:
      "Solicitar acceso crea una relación perfilada con GDA. A medida que los proyectos satisfagan los requisitos de preparación aplicables, GDA puede contactarlo sobre el paso siguiente apropiado para su perfil y su jurisdicción.",
    doesNotMean:
      "No es una oferta, una solicitud ni una recomendación de inversión, y no garantiza el acceso a ninguna oportunidad. La verificación de identidad, elegibilidad y otras verificaciones relacionadas, cuando se requieren, son realizadas por el proveedor autorizado o calificado correspondiente, no a través de este sitio web.",
    begin: "Solicitar acceso",
  },
  steps: {
    investorType: {
      title: "¿Cuál opción lo describe mejor?",
      options: [
        { value: "individual", label: "Persona natural" },
        { value: "family-office", label: "Family office" },
        { value: "institutional", label: "Inversionista institucional" },
        { value: "fund", label: "Fondo / gestor de activos" },
        { value: "corporate", label: "Empresa" },
        { value: "other", label: "Otro" },
      ],
      otherLabel: "Por favor, describa",
    },
    jurisdiction: {
      title: "¿Dónde reside o está constituido?",
      countryLabel: "País de residencia o constitución",
    },
    interests: {
      title: "¿En qué áreas está interesado?",
      help: "Elija todas las que apliquen.",
      options: [
        { value: "real-estate", label: "Bienes raíces" },
        { value: "environmental", label: "Activos ambientales / naturales" },
        { value: "infrastructure", label: "Infraestructura" },
        { value: "agriculture", label: "Agricultura" },
        { value: "energy", label: "Energía" },
        { value: "private-enterprise", label: "Empresa privada" },
        { value: "open", label: "Abierto a varias categorías" },
      ],
    },
    allocation: {
      title: "¿Cuál es su rango de asignación habitual?",
      help: "Opcional. Solo con fines de perfil; no es una determinación de elegibilidad.",
      options: [
        { value: "under-100k", label: "Menos de 100 000" },
        { value: "100k-500k", label: "100 000 – 500 000" },
        { value: "500k-2m", label: "500 000 – 2 millones" },
        { value: "2m-10m", label: "2 – 10 millones" },
        { value: "over-10m", label: "Más de 10 millones" },
        { value: "prefer-not", label: "Prefiero no decirlo" },
      ],
    },
    status: {
      title: "¿Se considera usted un inversionista acreditado, calificado, profesional o de otro modo elegible según las normas que le aplican?",
      note: "Esta respuesta es únicamente informativa. La elegibilidad, cuando se requiera, será determinada o verificada a través del proveedor autorizado o calificado correspondiente.",
      options: [
        { value: "yes", label: "Sí" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "No estoy seguro" },
      ],
    },
    contact: {
      title: "¿Cómo puede contactarlo GDA?",
      name: "Nombre completo",
      organisation: "Organización",
      role: "Cargo",
      email: "Correo electrónico",
      phone: "Teléfono",
      language: "Idioma preferido",
      languages: [
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
        { value: "pt", label: "Português" },
      ],
    },
  },
  results: {
    received: {
      eyebrow: "Recibido",
      heading: "Solicitud recibida.",
      paragraphs: [
        "El acceso para inversionistas se otorga por etapas. GDA lo contactará sobre los pasos siguientes apropiados.",
        "Nada en esta solicitud constituye una oferta, una solicitud, una recomendación de inversión ni una garantía de acceso.",
      ],
    },
  },
  afterResult: {
    emailNote: "Se ha enviado una confirmación con esta referencia a su correo electrónico.",
    keepNote: "Por favor, conserve esta referencia para sus registros.",
    links: [
      { label: "Sobre el canal para inversionistas", href: "/investors" },
      { label: "Volver a la página de inicio", href: "/" },
    ],
  },
};
