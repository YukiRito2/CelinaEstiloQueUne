import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";

export const WhatsAppButton = () => (
  <motion.a
    href={waLink()}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hablar con Celina por WhatsApp"
    onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
    data-testid="floating-whatsapp-fab"
    initial={{ opacity: 0, scale: 0.6, y: 24 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="wa-pulse fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 rounded-full bg-[#04BE4F] hover:bg-[#039C40] text-white font-semibold shadow-2xl shadow-[#04BE4F]/40 px-5 py-4 transition-all duration-300 hover:scale-105 active:scale-95"
  >
    <MessageCircle className="w-6 h-6" />
    <span className="text-sm hidden sm:inline">WhatsApp</span>
  </motion.a>
);
