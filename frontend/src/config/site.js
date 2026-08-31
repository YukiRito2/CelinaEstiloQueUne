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

  maps: {
    embed:
      "https://www.google.com/maps?q=Avinguda+del+Sal%C3%B2ria+34,+25700+La+Seu+d'Urgell,+Lleida&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Avinguda+del+Sal%C3%B2ria+34,+25700+La+Seu+d'Urgell,+Lleida,+Espa%C3%B1a",
  },

  social: {
    instagram: "https://www.instagram.com/celina_estilqueuneix/",
    facebook: "", // Añadir URL cuando exista
    tiktok: "", // Añadir URL cuando exista
  },

  // ----------------------------------------------------------
  // Enlaces de las áreas especializadas.
  // Hoy los servicios apuntan a su sección dentro de esta página.
  // Cuando existan las webs independientes, sustituye el href:
  //   money:   "/envios-dinero"  o  "https://envios.celina..."
  //   travel:  "/viajes"
  //   jewelry: "/bisuteria"
  // ----------------------------------------------------------
  links: {
    money: "#envios-dinero",
    travel: "#viajes",
    jewelry: "#bisuteria",
    studio: "https://celina-studio-app.vercel.app/",
  },

  whatsappMessages: {
    general: "Hola, Celina. Quiero más información.",
    money: "Hola, quiero información sobre un envío de dinero.",
    travel: "Hola, quiero información sobre un viaje.",
    jewelry: "Hola, quiero información sobre un producto de bisutería.",
    studio: "Hola, quiero información sobre una página web para mi negocio.",
  },

  images: {
    hero: "https://images.unsplash.com/photo-1585960622850-ed33c41d6418?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
    travel:
      "https://images.unsplash.com/photo-1759340875604-84a9d7473b21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxtZWRpdGVycmFuZWFuJTIwdHJhdmVsJTIwZmxpZ2h0JTIwYWlycGxhbmUlMjB3YW5kZXJsdXN0JTIwYmVhY2glMjBkZXN0aW5hdGlvbnxlbnwwfHx8fDE3ODgxOTU0Mjl8MA&ixlib=rb-4.1.0&q=85",
    studio:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaWdpdGFsJTIwYWdlbmN5JTIwY3JlYXRpdmUlMjBjYW1wYWlnbiUyMGxhcHRvcCUyMGRlc2t8ZW58MHx8fHwxNzg2MzQ3MTA1fDA&ixlib=rb-4.1.0&q=85",
    jewelry: [
      "https://images.unsplash.com/photo-1585960622850-ed33c41d6418?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBnb2xkJTIwamV3ZWxyeSUyMG1vZGVsJTIwd29tYW58ZW58MHx8fHwxNzgzOTgwMDc0fDA&ixlib=rb-4.1.0&q=85",
    ],
  },

  seo: {
    siteUrl: "https://celina-main.preview.emergentagent.com", // Cambiar al dominio propio
    title: "Celina Estilo que Une | Servicios, viajes, envíos de dinero y bisutería",
    description:
      "Celina Estilo que Une en La Seu d'Urgell. Envíos de dinero a todo el mundo, agencia de viajes, bisutería y servicios digitales.",
  },

  analytics: {
    gaMeasurementId: process.env.REACT_APP_GA_MEASUREMENT_ID || "",
    metaPixelId: process.env.REACT_APP_META_PIXEL_ID || "",
  },
};

export default site;
