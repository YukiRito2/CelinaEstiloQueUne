import { ArrowUpRight, Code2, ShoppingCart, TrendingUp, Search, Palette, Wrench } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const icons = [Code2, ShoppingCart, TrendingUp, Search, Palette, Wrench];

export const StudioSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="studio"
      className="noise relative overflow-hidden bg-[#2B2638] py-24 sm:py-32 text-[#F8F5FC]"
      data-testid="studio-section"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(226,212,240,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(226,212,240,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(167,139,250,0.16),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Reveal>
            <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#A78BFA] mb-4">
              {t.studio.overline}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
              {t.studio.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg font-light text-[#E2D4F0] leading-relaxed max-w-lg">
              {t.studio.sub}
            </p>
            <p className="mt-3 text-sm sm:text-base font-light text-[#C8C2DB] leading-relaxed max-w-lg">
              {t.studio.text}
            </p>
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-3">
            {t.studio.services.map((label, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={label} delay={i * 0.06}>
                  <div className="flex items-center gap-3 rounded-xl border border-[#E2D4F0]/15 bg-[#363046]/80 px-4 py-3.5 transition-colors duration-300 hover:border-[#A78BFA]/50 hover:bg-[#363046]">
                    <Icon className="w-5 h-5 text-[#A78BFA] shrink-0" />
                    <span className="text-sm font-medium text-[#F8F5FC]/90">{label}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <a
              href={site.links.studio}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("studio_click", { source: "studio_section" })}
              data-testid="studio-visit-btn"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#E2D4F0] hover:bg-white text-[#2B2638] font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.studio.cta}
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.14),transparent_70%)]"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#E2D4F0]/15 shadow-2xl shadow-black/40">
              <img
                src={site.images.studio}
                alt={t.studio.imageAlt}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                data-testid="studio-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2638]/60 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl px-4 py-2.5">
                <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#E2D4F0]">
                  {t.studio.badge}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
