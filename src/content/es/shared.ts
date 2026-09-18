import type { Application, LedgerColumn, Pillar, Principle, Stage } from "../types";

/** Los tres pilares (handoff §6). Se reutilizan en la portada y en Cómo funciona. */
export const pillars: Pillar[] = [
  {
    numeral: "I",
    title: "Evaluar",
    body: "Determinar si esta infraestructura es apropiada para el proyecto.",
    href: "/how-it-works#evaluate",
  },
  {
    numeral: "II",
    title: "Estructurar",
    body: "Coordinar el proceso de preparación y estructuración con los socios profesionales correspondientes.",
    href: "/how-it-works#structure",
  },
  {
    numeral: "III",
    title: "Activar",
    body: "Llevar los proyectos técnicamente preparados hacia su implementación a través del proveedor correspondiente.",
    href: "/how-it-works#activate",
  },
];

/** El flujo de trabajo de cinco etapas (handoff §6). */
export const stages: Stage[] = [
  {
    index: 1,
    name: "Idoneidad",
    lead: "¿Es este tipo de infraestructura digital apropiado para este proyecto?",
    body: "La Evaluación de Idoneidad examina las características básicas del proyecto. No todo activo debe tokenizarse. Cuando el modelo no encaja, lo decimos.",
    responsible: "GDA, junto con el titular del proyecto.",
  },
  {
    index: 2,
    name: "Preparación",
    lead: "Una evaluación de preparación en las áreas aplicables al proyecto.",
    body: "Según el proyecto, estas pueden incluir titularidad y control, documentación, diligencia del activo, jurisdicción, estructura de la entidad, vía regulatoria, requisitos de cumplimiento, viabilidad económica, requisitos de valuación, consideraciones ambientales, requisitos técnicos, preparación operativa y preparación de la sala de datos.",
    responsible: "GDA coordina; el titular del proyecto aporta la información.",
  },
  {
    index: 3,
    name: "Validación",
    lead: "Los asuntos aplicables son revisados, asesorados, verificados o validados por el profesional calificado o el socio técnico correspondiente, dentro de su ámbito de competencia.",
    body: "No todo proyecto requiere a todos los profesionales. GDA coordina el proceso. Los especialistas correspondientes evalúan los asuntos dentro de su ámbito; GDA no valida su propio trabajo.",
    responsible: "Socios profesionales y técnicos independientes.",
  },
  {
    index: 4,
    name: "Estructuración",
    lead: "GDA coordina el proceso de estructuración con los socios profesionales correspondientes.",
    body: "Según el proyecto, esto puede incluir la arquitectura de la entidad, la selección del instrumento, los derechos de propiedad o económicos, los derechos de los inversionistas, las restricciones de distribución, la vía de cumplimiento, la estructura económica, la documentación, los requisitos técnicos, los requisitos de reporte y el gobierno corporativo.",
    responsible: "GDA coordina; los socios profesionales asesoran y documentan.",
  },
  {
    index: 5,
    name: "Activación",
    lead: "Una vez satisfechos los requisitos de preparación aplicables, el proyecto puede pasar a la implementación técnica.",
    body: "La activación técnica se realiza a través del proveedor de infraestructura técnica correspondiente. La tecnología llega al final, por diseño.",
    responsible: "El proveedor de infraestructura técnica.",
  },
];

/** Las trece áreas de preparación (handoff §6, etapa 2). */
export const readinessAreas: string[] = [
  "Titularidad y control",
  "Documentación",
  "Diligencia del activo y del proyecto",
  "Jurisdicción",
  "Estructura de la entidad y estructura legal",
  "Vía regulatoria",
  "Requisitos de cumplimiento",
  "Viabilidad económica",
  "Requisitos de valuación",
  "Consideraciones ambientales",
  "Requisitos técnicos",
  "Preparación operativa",
  "Preparación de la sala de datos",
];

/** Categorías de proyecto (handoff §8). Los instrumentos se describen por separado. */
export const applications: Application[] = [
  { slug: "real-estate", title: "Bienes raíces", descriptor: "Activos generadores de renta y en desarrollo." },
  {
    slug: "environmental",
    title: "Activos ambientales y naturales",
    descriptor: "Proyectos de conservación, carbono, agua, tierra y recursos.",
  },
  { slug: "infrastructure", title: "Infraestructura", descriptor: "Infraestructura de transporte, servicios públicos, digital y social." },
  { slug: "agriculture", title: "Agricultura", descriptor: "Tierra productiva, operaciones y activos de la cadena de suministro." },
  { slug: "energy", title: "Energía", descriptor: "Proyectos de generación, almacenamiento y transición." },
  {
    slug: "private-enterprise",
    title: "Empresas en operación / empresa privada",
    descriptor: "Negocios establecidos y empresas privadas.",
  },
];

export const instrumentsNote: string =
  "El instrumento apropiado —capital accionario, deuda, derechos vinculados a ingresos, una estructura respaldada por activos u otro— se determina por separado según el proyecto, su jurisdicción y su estructura legal, con orientación profesional. Todo proyecto comienza con la misma Evaluación de Idoneidad.";

/** Principios de la sección 5 (handoff §11). Sin afirmaciones absolutas. */
export const validationPrinciples: Principle[] = [
  { title: "Transparencia", body: "Usted sabe en qué punto está su proyecto y qué se requiere a continuación." },
  { title: "Gobernanza", body: "Etapas definidas. Responsabilidades definidas. Preparación antes de la activación." },
  {
    title: "Responsabilidad profesional",
    body: "Los profesionales siguen siendo responsables de los asuntos dentro de su propio ámbito.",
  },
  {
    title: "Conciencia jurisdiccional",
    body: "Cada jurisdicción requiere su propia vía legal, de cumplimiento y de estructuración.",
  },
  {
    title: "Manejo de la información",
    body: "La información de proyectos e inversionistas se recopila solo cuando es necesaria y se maneja según se describe en nuestra página de Seguridad.",
  },
  {
    title: "Separación de responsabilidades",
    body: "La coordinación, la revisión profesional y la implementación técnica son funciones distintas.",
  },
];

/** El modelo de responsabilidades (handoff §7). */
export const responsibilityLedger: LedgerColumn[] = [
  {
    title: "GDA",
    items: [
      "Coordina el flujo de preparación desde la primera evaluación hasta la activación.",
      "Determina la idoneidad preliminar y organiza la evaluación de preparación.",
      "Convoca a los socios correspondientes para la jurisdicción y la estructura.",
      "Mantiene informado al titular del proyecto sobre el estado y los pasos siguientes.",
    ],
  },
  {
    title: "Socios profesionales",
    items: [
      "Revisan, asesoran, validan, verifican o aprueban los asuntos aplicables dentro de su ámbito profesional.",
      "Siguen siendo responsables de su propio asesoramiento y de sus determinaciones.",
      "Realizan funciones reguladas cuando se requiere, a través de entidades autorizadas.",
    ],
  },
  {
    title: "Proveedores técnicos",
    items: [
      "Determinan si una implementación propuesta puede desplegarse de forma responsable en su infraestructura.",
      "Realizan la implementación técnica cuando corresponde.",
      "La viabilidad técnica no prevalece sobre la preparación legal, de cumplimiento o económica; y la preparación no obliga a un proveedor a implementar una arquitectura que considere inapropiada.",
    ],
  },
];

/** Principios operativos (handoff §3). */
export const brandPrinciples: Principle[] = [
  { title: "Transparencia", body: "Los titulares de proyectos y los inversionistas siempre saben en qué punto del proceso se encuentran." },
  {
    title: "Validación profesional",
    body: "Los asuntos aplicables son revisados por profesionales calificados dentro de su ámbito, cuando se requiere.",
  },
  { title: "Responsabilidad clara", body: "La coordinación, la revisión y la implementación son funciones separadas con responsabilidades separadas." },
  {
    title: "Conciencia jurisdiccional",
    body: "Las estructuras varían según la jurisdicción, el activo, el instrumento y el inversionista. Cada mercado se aborda en sus propios términos.",
  },
  {
    title: "Conciencia de seguridad",
    body: "La información se recopila solo cuando es necesaria y se maneja según se describe; no se afirma nada más.",
  },
  { title: "Preparación antes de la activación", body: "La tecnología es el último paso, no el primero." },
  { title: "Sin resultados garantizados", body: "GDA no garantiza que un proyecto califique, avance o atraiga capital." },
  {
    title: "Orientación global, ejecución local",
    body: "Una plataforma global, ejecutada a través de los socios profesionales que cada jurisdicción requiere.",
  },
];
