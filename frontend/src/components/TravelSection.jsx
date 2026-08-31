import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, Hotel, Globe2, Backpack, MessageCircle } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

const cards = [
  { icon: Plane, title: "Vuelos" },
  { icon: Hotel, title: "Alojamientos" },
  { icon: Globe2, title: "Destinos" },
  { icon: Backpack, title: "Experiencias" },
];

export const TravelSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="viajes" ref={ref} className="py-24 sm:py-32 bg-white overflow-hidden" data-testid="travel-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="order-2 lg:order-1 relative">
          <motion.div style={{ y: imgY }} className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-[#0B235E]/10 shadow-2xl shadow-[#0B235E]/15 aspect-[4/3]">
              <img
                src={site.images.travel}
                alt="Agencia de viajes en La Seu d'Urgell — vuelos y destinos"
                className="w-full h-full object-cover"
                loading="lazy"
                data-testid="travel-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B235E]/35 to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-5 left-6 backdrop-blur-xl bg-white/90 border border-white/50 shadow-xl rounded-2xl px-5 py-3">
              <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#5A677D]">Agencia de viajes</p>
              <p className="text-sm font-semibold text-[#0B235E]">Atención personalizada</p>
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">Viajes</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0B235E] leading-tight">
              El mundo está más cerca de lo que parece
            </h2>
            <p className="mt-5 text-base sm:text-lg font-light text-[#5A677D] leading-relaxed max-w-lg">
              Como agencia de viajes, te ayudamos a convertir tus próximos planes en experiencias.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div
                  className="group rounded-2xl bg-[#F5F7FA] border border-[#0B235E]/8 p-5 transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0B235E]/10"
                  data-testid={`travel-card-${c.title.toLowerCase()}`}
                >
                  <c.icon className="w-6 h-6 text-[#0B235E] transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-3 font-medium text-[#0A1224]">{c.title}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href={waLink(site.whatsappMessages.travel)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "travel_section" })}
              data-testid="travel-plan-whatsapp-btn"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0B235E] hover:bg-[#061334] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Quiero planificar mi viaje
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
