import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, Hotel, Globe2, Backpack, MessageCircle, ArrowUpRight } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const icons = [Plane, Hotel, Globe2, Backpack];

export const TravelSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="viajes" ref={ref} className="py-24 sm:py-32 bg-[#F0F6FF] overflow-hidden" data-testid="travel-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="order-2 lg:order-1 relative">
          <motion.div style={{ y: imgY }} className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 shadow-2xl shadow-[#2B6CB0]/15 aspect-[4/3]">
              <img
                src={site.images.travel}
                alt={t.travel.imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
                data-testid="travel-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A497A]/30 to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-5 left-6 backdrop-blur-xl bg-white/90 border border-[#C7E0FE] shadow-xl shadow-[#2B6CB0]/10 rounded-2xl px-5 py-3">
              <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#78869A]">
                {t.travel.badgeOver}
              </p>
              <p className="text-sm font-semibold text-[#1A497A]">{t.travel.badgeSub}</p>
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#2B6CB0] mb-4">
              {t.travel.overline}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430] leading-tight">
              {t.travel.title}
            </h2>
            <p className="mt-5 text-base sm:text-lg font-light text-[#475569] leading-relaxed max-w-lg">
              {t.travel.text}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {t.travel.cards.map((title, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={title} delay={i * 0.08}>
                  <div
                    className="group rounded-2xl bg-white/80 border border-[#C7E0FE] p-5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2B6CB0]/10"
                    data-testid={`travel-card-${i}`}
                  >
                    <Icon className="w-6 h-6 text-[#2B6CB0] transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-3 font-medium text-[#1E2430]">{title}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={site.links.travelForm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("travel_click", { source: "travel_section" })}
                data-testid="travel-plan-form-btn"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {t.travel.cta}
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <a
                href={waLink(t.messages.travel)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "travel_section" })}
                data-testid="travel-plan-whatsapp-btn"
                className="inline-flex items-center gap-2 text-[#128C7E] font-semibold px-2 py-2 link-underline"
              >
                <MessageCircle className="w-5 h-5" />
                {t.travelPage.form.whatsappAlt}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
