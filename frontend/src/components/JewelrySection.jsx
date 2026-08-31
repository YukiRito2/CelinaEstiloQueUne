import { Gem, MessageCircle } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

const categories = ["Collares", "Pulseras", "Anillos", "Aretes", "Accesorios"];

export const JewelrySection = () => (
  <section
    id="bisuteria"
    className="noise relative py-24 sm:py-32 bg-[#F5F7FA] overflow-hidden"
    data-testid="jewelry-section"
  >
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.12),transparent_55%)]"
      aria-hidden="true"
    />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] mb-4">
          Bisutería & estilo
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0B235E]">
          Estilo que habla de ti
        </h2>
        <p className="mt-4 text-base sm:text-lg font-light text-[#5A677D] max-w-xl mx-auto">
          Descubre piezas pensadas para acompañarte todos los días.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5" data-testid="jewelry-categories">
          {categories.map((c) => (
            <span
              key={c}
              className="px-5 py-2.5 rounded-full bg-white border border-[#D4AF37]/25 text-sm font-medium text-[#0B235E] shadow-sm"
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
              className={`group relative overflow-hidden rounded-3xl border border-[#0B235E]/10 shadow-xl shadow-[#0B235E]/10 ${
                i === 1 ? "sm:translate-y-8" : ""
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={src}
                  alt={`Ejemplo de estilo en bisutería — ${categories[i]}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  data-testid={`jewelry-sample-image-${i}`}
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1224]/70 to-transparent p-5">
                <p className="text-white/90 text-sm font-light flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#D4AF37]" />
                  {categories[i]}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-16 text-center">
        <p className="text-sm font-light text-[#5A677D] italic">
          Imágenes de muestra. La colección completa te espera en tienda.
        </p>
        <a
          href={waLink(site.whatsappMessages.jewelry)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "jewelry_section" })}
          data-testid="jewelry-view-whatsapp-btn"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#0B235E] text-[#0B235E] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#0B235E] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5" />
          Ver bisutería
        </a>
      </Reveal>
    </div>
  </section>
);
