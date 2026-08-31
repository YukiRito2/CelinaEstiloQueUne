import { MapPin, HandHeart, Globe2, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const pillars = [
  {
    icon: MapPin,
    title: "Atención presencial",
    text: "Estamos cerca de ti.",
  },
  {
    icon: HandHeart,
    title: "Atención cercana",
    text: "Te ayudamos a encontrar la solución que necesitas.",
  },
  {
    icon: Globe2,
    title: "Conexión internacional",
    text: "Servicios pensados para conectar personas y destinos.",
  },
  {
    icon: Sparkles,
    title: "Todo en un mismo lugar",
    text: "Diferentes servicios bajo una misma marca.",
  },
];

export const TrustSection = () => (
  <section id="sobre-celina" className="py-24 sm:py-32 bg-white" data-testid="trust-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">
          Por qué Celina
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0B235E]">
          Más que un local
        </h2>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div
              className="group h-full rounded-3xl bg-[#F5F7FA] border border-[#0B235E]/8 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0B235E]/10 hover:border-[#04BE4F]/30"
              data-testid={`trust-pillar-${i}`}
            >
              <span className="inline-flex w-14 h-14 rounded-2xl bg-[#0B235E] text-white items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <p.icon className="w-6 h-6" />
              </span>
              <h3 className="mt-6 font-display text-xl sm:text-2xl font-medium text-[#0B235E]">{p.title}</h3>
              <p className="mt-2 text-sm font-light text-[#5A677D] leading-relaxed">{p.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
