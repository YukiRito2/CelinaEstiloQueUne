import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LangSwitch = ({ className = "" }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-[#1E2430]/15 bg-white/70 backdrop-blur p-1 ${className}`}
      role="group"
      aria-label="Idioma / Idioma / Language"
    >
      {["es", "ca", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          data-testid={`nav-lang-${l}`}
          aria-pressed={lang === l}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
            lang === l ? "bg-[#1E2430] text-white shadow-sm" : "text-[#475569] hover:text-[#1E2430]"
          }`}
        >
          {l === "ca" ? "CAT" : l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const slug = (h) => (h === "/" ? "inicio" : h.replace(/[#/]/g, ""));

// La ruta activa se ilumina: texto terracota + píldora animada que se desliza
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú si cambia de ruta (evita quedar abierto tras navegar)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea el scroll del body y mueve el foco al abrir; lo devuelve al cerrar
  useEffect(() => {
    if (!open) return;
    const triggerEl = menuBtnRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerEl?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-[#FAF7F2]/85 backdrop-blur-xl shadow-lg shadow-[#1E2430]/5 border-b border-[#1E2430]/8"
            : "bg-transparent"
        }`}
        data-testid="main-navbar"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="/" className="flex items-baseline gap-2" data-testid="nav-logo">
            <span className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1E2430]">
              CELINA
            </span>
            <span className="hidden sm:block text-[10px] tracking-[0.3em] uppercase text-[#626E7E]">
              Estilo que Une
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {t.nav.links.map((l) => {
              const active = pathname === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  data-testid={`nav-link-${slug(l.href)}`}
                  className={`relative px-1 py-1 text-sm font-medium transition-colors duration-300 ${
                    active ? "text-[#955D4A]" : "link-underline text-[#1E2430]/75 hover:text-[#1E2430]"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute left-0 right-0 -bottom-1 h-[2.5px] rounded-full bg-[#D99776]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <LangSwitch />
            <a
              href={waLink(t.messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "navbar" })}
              data-testid="nav-whatsapp-button"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-[#1E2430] text-sm font-semibold px-5 py-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              {t.nav.whatsapp}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LangSwitch />
            <button
              ref={menuBtnRef}
              className="inline-flex items-center gap-1.5 h-11 pl-3.5 pr-4 rounded-full bg-[#1E2430] text-white shadow-md shadow-[#1E2430]/20 active:scale-[0.97] transition-transform"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              data-testid="nav-menu-open-button"
            >
              <Menu className="w-5 h-5" />
              <span className="text-sm font-semibold">{t.nav.menuLabel}</span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.openMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-[60] bg-[#26232E] text-white flex flex-col overflow-y-auto overscroll-contain pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
            data-testid="mobile-menu"
          >
            <div className="h-16 px-4 flex items-center justify-between shrink-0">
              <span className="font-display text-2xl">CELINA</span>
              <button
                ref={closeBtnRef}
                className="w-11 h-11 inline-flex items-center justify-center"
                onClick={() => setOpen(false)}
                aria-label={t.nav.closeMenu}
                data-testid="nav-menu-close-button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2 py-6">
              {t.nav.links.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.08 * i, duration: reduceMotion ? 0 : 0.5 }}
                    className={`font-display text-4xl py-3 border-b border-white/10 transition-colors flex items-center gap-3 ${
                      active ? "text-[#D99776]" : "hover:text-[#D99776]"
                    }`}
                    data-testid={`mobile-nav-link-${slug(l.href)}`}
                  >
                    {active && <span className="w-2 h-2 rounded-full bg-[#D99776]" aria-hidden="true" />}
                    {l.label}
                  </motion.a>
                );
              })}
            </nav>
            <div className="p-8 shrink-0">
              <a
                href={waLink(t.messages.general)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "mobile_menu" })}
                data-testid="mobile-nav-whatsapp-button"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-[#1E2430] font-semibold px-6 py-4 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                {t.nav.whatsapp}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
