import { ArrowUpRight, Code2, ShoppingCart, TrendingUp, Search, Palette, Wrench } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

const services = [
  { icon: Code2, label: "Diseño y desarrollo web" },
  { icon: ShoppingCart, label: "Tiendas online" },
  { icon: TrendingUp, label: "Marketing digital" },
  { icon: Search, label: "SEO" },
  { icon: Palette, label: "Branding" },
  { icon: Wrench, label: "Mantenimiento web" },
];

export const StudioSection = () => (
  <section
    id="studio"
    className="noise relative overflow-hidden bg-[#061334] py-24 sm:py-32 text-white"
    data-testid="studio-section"
  >
    <div
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(4,190,79,0.14),transparent_55%)]"
      aria-hidden="true"
    />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <Reveal>
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">
            Celina Studio — Digital
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
            ¿Tienes un negocio?
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-white/75 leading-relaxed max-w-lg">
            Tu presencia digital también puede hacer la diferencia.
          </p>
          <p className="mt-3 text-sm sm:text-base font-light text-white/60 leading-relaxed max-w-lg">
            En Celina Studio diseñamos y desarrollamos páginas web, tiendas online y soluciones
            digitales para negocios que quieren crecer.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-3">
          {services.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors duration-300 hover:border-[#04BE4F]/40 hover:bg-white/10">
                <s.icon className="w-5 h-5 text-[#04BE4F] shrink-0" />
                <span className="text-sm font-medium text-white/90">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <a
            href={site.links.studio}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("studio_click", { source: "studio_section" })}
            data-testid="studio-visit-btn"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#04BE4F] hover:bg-[#039C40] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Visitar Celina Studio
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(4,190,79,0.12),transparent_70%)]" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40">
            <img
              src={site.images.studio}
              alt="Celina Studio — diseño web y marketing digital"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
              data-testid="studio-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061334]/60 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl px-4 py-2.5">
              <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-white/70">
                Web · E-commerce · SEO
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
