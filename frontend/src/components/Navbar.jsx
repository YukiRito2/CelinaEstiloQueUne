import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre Celina", href: "#sobre-celina" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-lg shadow-[#0B235E]/5 border-b border-[#0B235E]/8"
            : "bg-transparent"
        }`}
        data-testid="main-navbar"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="#inicio" className="flex items-baseline gap-2" data-testid="nav-logo">
            <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#0B235E]">
              CELINA
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.3em] uppercase text-[#5A677D]">
              Estilo que Une
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="link-underline text-sm font-medium text-[#0A1224]/80 hover:text-[#0B235E] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "navbar" })}
              data-testid="nav-whatsapp-button"
              className="inline-flex items-center gap-2 rounded-full bg-[#04BE4F] hover:bg-[#039C40] text-white text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#0B235E]"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            data-testid="nav-menu-open-button"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#061334] text-white flex flex-col"
            data-testid="mobile-menu"
          >
            <div className="h-16 px-4 flex items-center justify-between">
              <span className="font-display text-2xl">CELINA</span>
              <button
                className="w-11 h-11 inline-flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                data-testid="nav-menu-close-button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  className="font-display text-4xl py-3 border-b border-white/10 hover:text-[#04BE4F] transition-colors"
                  data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="p-8">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "mobile_menu" })}
                data-testid="mobile-nav-whatsapp-button"
                className="flex items-center justify-center gap-2 rounded-full bg-[#04BE4F] text-white font-semibold px-6 py-4 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
