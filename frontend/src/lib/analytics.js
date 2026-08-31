// Eventos de conversión: whatsapp_click, money_transfer_click, travel_click,
// jewelry_click, studio_click, directions_click, phone_click
export const trackEvent = (name, params = {}) => {
  if (typeof window === "undefined") return;
  if (window.gtag) window.gtag("event", name, params);
  if (window.fbq) window.fbq("trackCustom", name, params);
};
