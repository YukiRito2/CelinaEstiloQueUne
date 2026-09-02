// ============================================================
// CELINA — Configuración central de la marca
// Cambia aquí cualquier dato comercial, URL, red social o texto.
// No hay datos de negocio repartidos en otros archivos.
// ============================================================

export const site = {
  name: "CELINA",
  slogan: "ESTILO QUE UNE",
  concept: "Conectamos personas, destinos, estilos y negocios.",
  pillars: "Personas. Destinos. Estilos. Negocios.",

  contact: {
    phoneDisplay: "+34 621 42 80 21",
    phone: "+34621428021",
    whatsapp: "34621428021",
    email: "celina.env.r@gmail.com",
  },

  address: {
    street: "Avinguda del Salòria, 34",
    city: "25700 La Seu d'Urgell",
    region: "Lleida, España",
    full: "Avinguda del Salòria, 34, 25700 La Seu d'Urgell, Lleida, España",
  },

  hours: "Todos los días · 08:00 – 22:00",
  hoursRange: { open: 8, close: 22 }, // Para el indicador "Abierto ahora"

  maps: {
    embed:
      "https://www.google.com/maps?q=Avinguda+del+Sal%C3%B2ria+34,+25700+La+Seu+d'Urgell,+Lleida&output=embed",
    directions: "https://maps.app.goo.gl/6inodAoKQkdFLPvv9", // Ficha Google del local
    footerAddress: "https://maps.app.goo.gl/1CWSG3kMdLckyGGeA", // Enlace de la dirección en el pie de página
  },

  social: {
    instagram: "https://www.instagram.com/celina_estilqueuneix/",
    facebook: "", // Añadir URL cuando exista
    tiktok: "", // Añadir URL cuando exista
  },

  // Reseñas reales de Google: añade aquí las verdaderas
  // ({ name: "María G.", text: "...", rating: 5 }). Mientras esté
  // vacío, la sección muestra un enlace honesto a Google.
  reviews: {
    googleUrl: "https://maps.app.goo.gl/6inodAoKQkdFLPvv9", // Ficha Google del local
    items: [],
  },

  // ----------------------------------------------------------
  // Enlaces del ecosistema Celina.
  // Páginas internas: money, travel, jewelry, studio.
  // Destinos externos: moneyForm, travelForm, jewelryCatalog, studioExternal.
  // ----------------------------------------------------------
  links: {
    money: "/envios-dinero",
    moneyForm: "https://formulario.celinaestiloqueune.com/",
    travel: "/viajes",
    travelForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSfWYgf772uZPd5TzYtkJMkQ2eRi0tTsiXVVOVbxrXGaj-hZNw/viewform?usp=header",
    jewelry: "/bisuteria",
    jewelryCatalog: "https://bisuteria.celinaestiloqueune.com/",
    documents: "/documentos",
    documentsForm: "https://cv.celinaestiloqueune.com/",
    studio: "https://studio.celinaestiloqueune.com/",
    fiber: "/fibra-optica",
    fiberPartner: "https://nasertel.es",
  },

  whatsappMessages: {
    general: "Hola, Celina. Quiero más información.",
    money: "Hola, quiero información sobre un envío de dinero.",
    travel: "Hola, quiero información sobre un viaje.",
    jewelry: "Hola, quiero información sobre un producto de bisutería.",
    studio: "Hola, quiero información sobre una página web para mi negocio.",
    fiber: "Hola, quiero información sobre fibra óptica para mi empresa.",
    mobile: "Hola, quiero información sobre líneas de telefonía móvil.",
  },

  images: {
    hero: "https://images.unsplash.com/photo-1585960622850-ed33c41d6418?crop=entropy&cs=srgb&fm=auto&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
    money: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fm=auto",
    travel:
      "https://images.unsplash.com/photo-1759340875604-84a9d7473b21?crop=entropy&cs=srgb&fm=auto&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxtZWRpdGVycmFuZWFuJTIwdHJhdmVsJTIwZmxpZ2h0JTIwYWlycGxhbmUlMjB3YW5kZXJsdXN0JTIwYmVhY2glMjBkZXN0aW5hdGlvbnxlbnwwfHx8fDE3ODgxOTU0Mjl8MA&ixlib=rb-4.1.0&q=85",
    travelDestinations: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fm=auto",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80&fm=auto",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80&fm=auto",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&fm=auto",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80&fm=auto",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&fm=auto",
    ],
    studio: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80&fm=auto",
    documents: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&fm=auto",
    fiber: "https://images.unsplash.com/photo-1606420187127-dae7c868fa7a?crop=entropy&cs=srgb&fm=auto&w=1200&q=85",
    // Logos alojados en Cloudinary (f_auto,q_auto: formato y calidad optimos
    // automaticamente segun el navegador, para que pesen lo minimo).
    partners: {
      ria: "https://res.cloudinary.com/iliifvu8/image/upload/f_auto,q_auto/celina/partners/ria",
      westernUnion: "https://res.cloudinary.com/iliifvu8/image/upload/f_auto,q_auto/celina/partners/western-union",
      transfast: "https://res.cloudinary.com/iliifvu8/image/upload/f_auto,q_auto/celina/partners/transfast",
      moneygram: "https://res.cloudinary.com/iliifvu8/image/upload/f_auto,q_auto/celina/partners/moneygram",
      // TODO: sustituir por el logo real de Nasertel en PNG (placeholder de texto por ahora)
      nasertel: null,
      simyo: "https://res.cloudinary.com/iliifvu8/image/upload/f_auto,q_auto/celina/partners/simyo",
      jazztel: "https://res.cloudinary.com/iliifvu8/image/upload/f_auto,q_auto/celina/partners/jazztel",
    },
    jewelry: [
      "https://images.unsplash.com/photo-1585960622850-ed33c41d6418?crop=entropy&cs=srgb&fm=auto&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?crop=entropy&cs=srgb&fm=auto&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?crop=entropy&cs=srgb&fm=auto&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
    ],
  },

  seo: {
    siteUrl: "https://celinaestiloqueune.com",
    title: "Celina | Envíos, viajes y bisutería en La Seu d'Urgell",
    description:
      "Celina Estilo que Une en La Seu d'Urgell: envíos de dinero a todo el mundo, agencia de viajes, bisutería y servicios digitales, con atención cercana.",
  },

  analytics: {
    gaMeasurementId: process.env.REACT_APP_GA_MEASUREMENT_ID || "",
    metaPixelId: process.env.REACT_APP_META_PIXEL_ID || "",
  },
};

export default site;
