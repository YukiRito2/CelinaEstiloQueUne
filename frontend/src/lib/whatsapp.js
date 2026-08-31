import { site } from "../config/site";

export const waLink = (message = site.whatsappMessages.general) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
