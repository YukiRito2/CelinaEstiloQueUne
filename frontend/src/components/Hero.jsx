import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle, MapPin } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { MaskedLine } from "./Reveal";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="noise relative min-h-screen flex items-center overflow-hidden bg-[#F5F7FA] pt-24 pb-16"
      data-testid="hero-section"
    >
      {/* Abstract composition: arcs connecting points */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.10] pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-80 700 C 300 500, 700 900, 1150 550 S 1500 300, 1600 250" stroke="#0B235E" strokeWidth="1.5" />
        <path d="M-100 300 C 350 100, 800 500, 1300 200 S 1550 100, 1650 80" stroke="#04BE4F" strokeWidth="1.5" />
        <circle cx="1150" cy="550" r="6" fill="#04BE4F" />
        <circle cx="700" cy="680" r="5" fill="#0B235E" />
        <circle cx="350" cy="215" r="5" fill="#0B235E" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-mono-brand text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#04BE4F] mb-6"
            data-testid="hero-overline"
          >
            La Seu d'Urgell · Pirineos
          </motion.p>

          <h1 className="font-display text-[#0B235E] font-light leading-[0.95] tracking-tight" data-testid="hero-title">
            <MaskedLine delay={0.25} className="text-[18vw] sm:text-8xl lg:text-[7.5rem]">
              CELINA
            </MaskedLine>
            <MaskedLine delay={0.4} className="text-[8vw] sm:text-4xl lg:text-6xl italic font-normal text-[#0A1224]/85 mt-2">
              Estilo que <span className="text-[#04BE4F] not-italic font-medium">Une</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 text-base sm:text-lg font-light text-[#5A677D] max-w-xl leading-relaxed"
            data-testid="hero-subtitle"
          >
            Un solo lugar para conectar personas, destinos, estilos y negocios.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-3 font-mono-brand text-[11px] tracking-[0.25em] uppercase text-[#0B235E]/50"
          >
            {site.pillars}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#servicios"
              data-testid="hero-explore-services-btn"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B235E] text-white font-semibold px-8 py-4 text-sm sm:text-base transition-all duration-300 hover:bg-[#061334] hover:scale-[1.02] active:scale-[0.98]"
            >
              Descubrir nuestros servicios
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
              data-testid="hero-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#04BE4F] text-[#039C40] font-semibold px-8 py-4 text-sm sm:text-base transition-all duration-300 hover:bg-[#04BE4F] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              Hablar por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Visual: clipped photo frame + floating glass badges */}
        <div className="lg:col-span-5 relative hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div style={{ y: imgY }} className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.18),transparent_70%)]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-[#0B235E]/10 shadow-2xl shadow-[#0B235E]/20 aspect-[3/4]">
                <img
                  src={site.images.hero}
                  alt="Celina Estilo que Une — elegancia y conexión"
                  className="w-full h-full object-cover"
                  loading="eager"
                  data-testid="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B235E]/40 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </motion.div>

            <motion.div
              style={{ y: badgeY }}
              className="absolute -left-8 top-16"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <div className="backdrop-blur-xl bg-white/85 border border-white/50 shadow-xl shadow-[#0B235E]/10 rounded-2xl px-5 py-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A677D]">Envíos internacionales</p>
                <p className="text-sm font-semibold text-[#0B235E]">Ria · Western Union</p>
              </div>
            </motion.div>

            <motion.div
              style={{ y: badgeY }}
              className="absolute -right-4 bottom-20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.35, duration: 0.7 }}
            >
              <div className="backdrop-blur-xl bg-[#0B235E]/90 border border-white/10 shadow-2xl rounded-2xl px-5 py-3 text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#04BE4F]" />
                <p className="text-sm font-medium">La Seu d'Urgell</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
