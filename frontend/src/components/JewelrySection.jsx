import { ArrowUpRight, Gem, MessageCircle } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

export const JewelrySection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="bisuteria"
      className="noise relative py-24 sm:py-32 bg-[#FDF2F0] overflow-hidden"
      data-testid="jewelry-section"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(216,153,118,0.14),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C47B62] mb-4">
            {t.jewelry.overline}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {t.jewelry.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-xl mx-auto">
            {t.jewelry.text}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5" data-testid="jewelry-categories">
            {t.jewelry.categories.map((c) => (
              <span
                key={c}
                className="px-5 py-2.5 rounded-full bg-white/80 border border-[#F7D8D3] text-sm font-medium text-[#874B38] shadow-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {site.images.jewelry.map((src, i) => (
            <Reveal key={src} delay={i * 0.12}>
              <figure
                className={`group relative overflow-hidden rounded-3xl border border-white/70 shadow-xl shadow-[#874B38]/10 ${
                  i === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={src}
                    alt={`${t.jewelry.imageAltPrefix} — ${t.jewelry.categories[i]}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    data-testid={`jewelry-sample-image-${i}`}
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2638]/60 to-transparent p-5">
                  <p className="text-white/90 text-sm font-light flex items-center gap-2">
                    <Gem className="w-4 h-4 text-[#F7D8D3]" />
                    {t.jewelry.categories[i]}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-16 text-center">
          <p className="text-sm font-light text-[#626E7E] italic">{t.jewelry.sampleNote}</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={site.links.jewelry}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("jewelry_click", { source: "jewelry_section" })}
              data-testid="jewelry-view-catalog-btn"
              className="inline-flex items-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.jewelry.cta}
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href={waLink(t.messages.jewelry)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "jewelry_section" })}
              data-testid="jewelry-view-whatsapp-btn"
              className="inline-flex items-center gap-2 text-[#118476] font-semibold px-2 py-2 link-underline"
            >
              <MessageCircle className="w-5 h-5" />
              {t.jewelry.ctaWhatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
