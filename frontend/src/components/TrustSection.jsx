import { MapPin, HandHeart, Globe2, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const icons = [MapPin, HandHeart, Globe2, Sparkles];

export const TrustSection = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre-celina" className="py-24 sm:py-32 bg-[#F4F7F4]" data-testid="trust-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#3D6E54] mb-4">
            {t.trust.overline}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {t.trust.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.trust.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <div
                  className="group h-full rounded-3xl bg-white/80 border border-[#DBE4DC] p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3D6E54]/10 hover:border-[#3D6E54]/30"
                  data-testid={`trust-pillar-${i}`}
                >
                  <span className="inline-flex w-14 h-14 rounded-2xl bg-[#1E2430] text-white items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="mt-6 font-display text-xl sm:text-2xl font-medium text-[#1E2430]">{p.title}</h3>
                  <p className="mt-2 text-sm font-light text-[#475569] leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
