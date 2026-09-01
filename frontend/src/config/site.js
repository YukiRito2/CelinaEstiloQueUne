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
    directions: "https://maps.app.goo.gl/6inodAoKQkdFLPvv9", // Ficha Google del local
  },

  social: {
    instagram: "https://www.instagram.com/celina_estilqueuneix/",
    facebook: "", // Añadir URL cuando exista
    tiktok: "", // Añadir URL cuando exista
  },

  // Feed de Instagram en /bisuteria (3 modos, por prioridad):
  // 1) widgetScript + widgetHtml: pega el código de SnapWidget/Behold/Elfsight → feed automático.
  // 2) posts: permalinks oficiales ("https://www.instagram.com/p/XXX/") → embeds oficiales.
  // 3) Si ambos están vacíos → tarjeta con enlace al perfil (sin contenido falso).
  instagram: {
    widgetScript: "",
    widgetHtml: "",
    posts: [],
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
    moneyForm: "https://datosdeenvio.vercel.app/",
    travel: "/viajes",
    travelForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSfWYgf772uZPd5TzYtkJMkQ2eRi0tTsiXVVOVbxrXGaj-hZNw/viewform?usp=header",
    jewelry: "/bisuteria",
    jewelryCatalog: "https://celina-estilo-que-une.vercel.app/",
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
    money: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    travel:
      "https://images.unsplash.com/photo-1759340875604-84a9d7473b21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxtZWRpdGVycmFuZWFuJTIwdHJhdmVsJTIwZmxpZ2h0JTIwYWlycGxhbmUlMjB3YW5kZXJsdXN0JTIwYmVhY2glMjBkZXN0aW5hdGlvbnxlbnwwfHx8fDE3ODgxOTU0Mjl8MA&ixlib=rb-4.1.0&q=85",
    travelDestinations: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    ],
    studio:
      "https://images.unsplash.com/photo-1779949294758-f2728920623c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjB3YXJtJTIwYWVzdGhldGljJTIwZGlnaXRhbCUyMGNyZWF0aXZlJTIwc3R1ZGlvJTIwd29ya3NwYWNlfGVufDB8fHx8MTc4ODE5NjMyNnww&ixlib=rb-4.1.0&q=85",
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
