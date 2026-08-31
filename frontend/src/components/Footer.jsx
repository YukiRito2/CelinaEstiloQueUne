import { Instagram, Facebook, Music2, MessageCircle, Mail } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Envíos de dinero", href: "#envios-dinero" },
  { label: "Viajes", href: "#viajes" },
  { label: "Bisutería", href: "#bisuteria" },
  { label: "Contacto", href: "#contacto" },
];

export const Footer = () => (
  <footer className="bg-[#061334] text-white pt-16 pb-8" data-testid="main-footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <p className="font-display text-3xl font-medium">CELINA</p>
          <p className="font-mono-brand text-[10px] tracking-[0.35em] uppercase text-[#04BE4F] mt-1">
            Estilo que Une
          </p>
          <p className="mt-5 text-sm font-light text-white/60 leading-relaxed max-w-xs">{site.concept}</p>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <p className="text-[10px] font-mono-brand tracking-[0.3em] uppercase text-white/40 mb-5">Navegación</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-light text-white/70 hover:text-[#04BE4F] transition-colors"
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.links.studio}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("studio_click", { source: "footer" })}
                className="text-sm font-light text-white/70 hover:text-[#04BE4F] transition-colors"
                data-testid="footer-link-celina-studio"
              >
                Celina Studio
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-[10px] font-mono-brand tracking-[0.3em] uppercase text-white/40 mb-5">Síguenos</p>
          <div className="flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Celina"
              data-testid="footer-social-instagram"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#04BE4F] hover:border-[#04BE4F]/50 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Celina"
                data-testid="footer-social-facebook"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#04BE4F] hover:border-[#04BE4F]/50 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {site.social.tiktok && (
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Celina"
                data-testid="footer-social-tiktok"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#04BE4F] hover:border-[#04BE4F]/50 transition-colors"
              >
                <Music2 className="w-5 h-5" />
              </a>
            )}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Celina"
              onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
              data-testid="footer-social-whatsapp"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#04BE4F] hover:border-[#04BE4F]/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              aria-label="Email de Celina"
              data-testid="footer-social-email"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-[#04BE4F] hover:border-[#04BE4F]/50 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-6 text-xs font-light text-white/40">
            {site.address.street}, {site.address.city}
          </p>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs font-light text-white/40">© 2026 Celina Estilo que Une</p>
        <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-white/30">{site.pillars}</p>
      </div>
    </div>
  </footer>
);
