import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";

export const WhatsAppButton = () => {
  const { t } = useLanguage();

  return (
    <motion.a
      href={waLink(t.messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.fab.aria}
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
      data-testid="floating-whatsapp-fab"
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="wa-pulse fixed right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold shadow-2xl shadow-[#25D366]/40 px-5 py-4 transition-all duration-300 hover:scale-105 active:scale-95"
    style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="text-sm hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
};
