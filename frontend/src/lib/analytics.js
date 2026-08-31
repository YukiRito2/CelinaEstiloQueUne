// Eventos de conversión: whatsapp_click, money_transfer_click, travel_click,
// jewelry_click, studio_click, directions_click, phone_click
// Todos incluyen el idioma activo (language: es | ca | en)
export const trackEvent = (name, params = {}) => {
  if (typeof window === "undefined") return;
  let language = "es";
  try {
    language = localStorage.getItem("celina-lang") || "es";
  } catch {}
  const payload = { language, ...params };
  if (window.gtag) window.gtag("event", name, payload);
  if (window.fbq) window.fbq("trackCustom", name, payload);
};
