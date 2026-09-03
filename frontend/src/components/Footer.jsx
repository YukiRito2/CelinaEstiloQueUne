import { Instagram, Facebook, Music2, MessageCircle, Mail } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";

const slug = (h) => (h === "/" ? "inicio" : h.replace(/[#/]/g, ""));

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#26232E] text-[#F8F5FC] pt-16 pb-8" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-display text-3xl font-medium">CELINA</p>
            <p className="font-mono-brand text-[10px] tracking-[0.35em] uppercase text-[#D99776] mt-1">
              Estilo que Une
            </p>
            <p className="mt-5 text-sm font-light text-[#9F99B0] leading-relaxed max-w-xs">{t.footer.concept}</p>
          </div>

          <nav aria-label={t.footer.navigation}>
            <p className="text-[10px] font-mono-brand tracking-[0.3em] uppercase text-[#9F99B0] mb-5">
              {t.footer.navigation}
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {t.footer.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-light text-[#C8C2DB] hover:text-[#D99776] transition-colors"
                    data-testid={`footer-link-${slug(l.href)}`}
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
                  className="text-sm font-light text-[#C8C2DB] hover:text-[#D99776] transition-colors"
                  data-testid="footer-link-celina-studio"
                >
                  Celina Studio
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[10px] font-mono-brand tracking-[0.3em] uppercase text-[#9F99B0] mb-5">
              {t.footer.follow}
            </p>
            <div className="flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Celina"
                data-testid="footer-social-instagram"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#C8C2DB] hover:text-[#D99776] hover:border-[#D99776]/50 transition-colors"
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
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#C8C2DB] hover:text-[#D99776] hover:border-[#D99776]/50 transition-colors"
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
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#C8C2DB] hover:text-[#D99776] hover:border-[#D99776]/50 transition-colors"
                >
                  <Music2 className="w-5 h-5" />
                </a>
              )}
              <a
                href={waLink(t.messages.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Celina"
                onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
                data-testid="footer-social-whatsapp"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#C8C2DB] hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                aria-label="Email de Celina"
                data-testid="footer-social-email"
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#C8C2DB] hover:text-[#D99776] hover:border-[#D99776]/50 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <a
              href={site.maps.footerAddress}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("directions_click", { source: "footer" })}
              data-testid="footer-address-link"
              className="mt-6 block text-xs font-light text-[#9F99B0] hover:text-[#D99776] transition-colors"
            >
              {site.address.street}, {site.address.city}
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 mb-6">
            {t.footer.legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-light text-[#9F99B0] hover:text-[#D99776] transition-colors"
                data-testid={`footer-legal-${l.href.replace(/\//g, "")}`}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs font-light text-[#9F99B0]">{t.footer.rights}</p>
          <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#9F99B0]">
            {t.hero.pillars}
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
