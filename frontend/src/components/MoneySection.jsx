import { MessageCircle, Globe2, HandHeart, ShieldCheck } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const icons = [Globe2, HandHeart, ShieldCheck];

export const MoneySection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="envios-dinero"
      className="noise relative overflow-hidden bg-[#EEF7F2] py-24 sm:py-32"
      data-testid="money-transfer-section"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,211,102,0.10),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#2D7A54] mb-4">
            {t.money.overline}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-[#1E2430]">
            {t.money.title}
          </h2>
          <p className="mt-5 text-base sm:text-lg font-light text-[#475569] leading-relaxed max-w-lg">
            {t.money.text}
          </p>

          <ul className="mt-8 space-y-4">
            {t.money.points.map((text, i) => {
              const Icon = icons[i];
              return (
                <li key={text} className="flex items-center gap-3 text-sm sm:text-base text-[#1E2430]/85">
                  <span className="inline-flex w-9 h-9 rounded-xl bg-[#D3EEDD] items-center justify-center text-[#2D7A54] shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  {text}
                </li>
              );
            })}
          </ul>

          <a
            href={waLink(t.messages.money)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "money_section" })}
            data-testid="money-consult-whatsapp-btn"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            {t.money.cta}
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="backdrop-blur-xl bg-white/60 border border-[#C2E8D2] rounded-[2rem] p-8 sm:p-12 shadow-xl shadow-[#2D7A54]/8">
            <p className="font-mono-brand text-[10px] tracking-[0.3em] uppercase text-[#78869A] mb-8 text-center">
              {t.money.partners}
            </p>
            <div className="space-y-5">
              <div
                className="rounded-2xl bg-white border border-[#C2E8D2] px-8 py-7 flex items-center justify-center shadow-sm"
                data-testid="partner-badge-ria"
              >
                <span className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#1E2430]">Ria</span>
              </div>
              <div
                className="rounded-2xl bg-white border border-[#C2E8D2] px-8 py-7 flex items-center justify-center shadow-sm"
                data-testid="partner-badge-western-union"
              >
                <span className="text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#1E2430]">
                  WESTERN <span className="text-[#C88463]">UNION</span>
                </span>
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-[#78869A] font-light">{t.money.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
