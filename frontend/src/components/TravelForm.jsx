import { ArrowUpRight, Camera, Mail, MessageCircle, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const bulletIcons = [Camera, Mail];

// Formulario de viaje con estética de tarjeta de embarque
export const TravelForm = () => {
  const { t } = useLanguage();
  const f = t.travelPage.form;

  return (
    <section className="py-24 sm:py-32 bg-[#F0F6FF]" data-testid="travel-form-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {f.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-xl mx-auto">{f.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mt-12 rounded-[2rem] bg-white border border-[#C7E0FE] shadow-2xl shadow-[#2B6CB0]/10 overflow-hidden"
            data-testid="travel-form"
          >
            {/* Cabecera boarding pass */}
            <div className="bg-[#1E2430] px-7 sm:px-10 py-5 flex items-center justify-between">
              <p className="font-mono-brand text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/70">
                {f.ticketOver}
              </p>
              <p className="font-display italic text-lg sm:text-xl text-white">CELINA</p>
            </div>

            {/* Ruta visual */}
            <div className="px-7 sm:px-10 pt-8 pb-7">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#78869A]">
                    {f.ticketOriginLabel}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-medium text-[#1E2430] leading-tight">
                    {f.ticketFrom}
                  </p>
                </div>
                <div className="flex-1 flex items-center gap-2 px-2" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-[#2B6CB0] shrink-0" />
                  <span className="flex-1 border-t-2 border-dashed border-[#2B6CB0]/40" />
                  <Plane className="w-5 h-5 text-[#2B6CB0] rotate-45 shrink-0" />
                  <span className="flex-1 border-t-2 border-dashed border-[#2B6CB0]/40" />
                  <span className="w-2 h-2 rounded-full bg-[#D99776] shrink-0" />
                </div>
                <div className="text-right">
                  <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#78869A]">
                    {f.ticketDestLabel}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl italic font-medium text-[#C47B62] leading-tight">
                    {f.ticketTo}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#FDF2F0] border border-[#F7D8D3] p-5" data-testid="travel-form-price-note">
                <Sparkles className="w-5 h-5 text-[#C47B62] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base font-medium text-[#874B38]">{f.priceNote}</p>
              </div>
            </div>

            {/* Perforación de ticket */}
            <div className="relative" aria-hidden="true">
              <div className="border-t-2 border-dashed border-[#C7E0FE]" />
              <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-[#F0F6FF] border-r border-[#C7E0FE]" />
              <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-[#F0F6FF] border-l border-[#C7E0FE]" />
            </div>

            {/* Cuerpo: seguridad + requisitos + CTA */}
            <div className="px-7 sm:px-10 py-8">
              <div className="flex items-start gap-3 rounded-2xl bg-[#EEF7F2] border border-[#C2E8D2] p-5" data-testid="travel-form-security">
                <ShieldCheck className="w-5 h-5 text-[#2D7A54] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#1E5238]">{f.securityTitle}</p>
                  <p className="mt-1 text-sm font-light text-[#2D7A54]/90 leading-relaxed">{f.securityText}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {f.bullets.map((b, i) => {
                  const Icon = bulletIcons[i];
                  return (
                    <li key={b} className="flex items-start gap-3 text-sm text-[#475569] leading-relaxed">
                      <span className="inline-flex w-9 h-9 rounded-xl bg-[#D8E8FD] text-[#2B6CB0] items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      {b}
                    </li>
                  );
                })}
              </ul>

              <a
                href={site.links.travelForm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("travel_click", { source: "travel_google_form" })}
                data-testid="travel-form-google-btn"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#2B6CB0] hover:bg-[#235a94] text-white font-semibold px-8 py-4 text-base transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                {f.submit}
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <a
                href={waLink(t.messages.travel)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "travel_form_alt" })}
                data-testid="travel-form-whatsapp-alt"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[#128C7E] font-semibold py-2 link-underline"
              >
                <MessageCircle className="w-5 h-5" />
                {f.whatsappAlt}
              </a>
              <p className="mt-4 text-center text-xs text-[#78869A] font-light">{f.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
