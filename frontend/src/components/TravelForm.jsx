import { ArrowUpRight, Camera, Mail, MessageCircle, Sparkles } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const bulletIcons = [Camera, Mail];

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
            className="mt-12 rounded-3xl bg-white border border-[#C7E0FE] shadow-xl shadow-[#2B6CB0]/8 p-7 sm:p-10"
            data-testid="travel-form"
          >
            <div className="flex items-start gap-3 rounded-2xl bg-[#FDF2F0] border border-[#F7D8D3] p-5" data-testid="travel-form-price-note">
              <Sparkles className="w-5 h-5 text-[#C47B62] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base font-medium text-[#874B38]">{f.priceNote}</p>
            </div>

            <ul className="mt-7 space-y-4">
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
              className="mt-9 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 text-base transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
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
        </Reveal>
      </div>
    </section>
  );
};
