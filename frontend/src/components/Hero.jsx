import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, MessageCircle, MapPin } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { MaskedLine } from "./Reveal";

const TiltScene = ({ t }) => {
  const sceneRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(mx, { stiffness: 180, damping: 25 });

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start end", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const onMove = (e) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * 16);
    my.set(-py * 13);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div ref={sceneRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 1200 }}>
      <motion.div style={{ y: sceneY }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative will-change-transform"
          data-testid="hero-3d-tilt-card"
        >
          {/* Depth -40: pastel orbs */}
          <div
            className="absolute -inset-10 pointer-events-none"
            style={{ transform: "translateZ(-40px)" }}
            aria-hidden="true"
          >
            <div className="orb-float absolute -top-6 -left-8 w-40 h-40 rounded-full bg-[#FDE8E1] blur-2xl opacity-90" />
            <div className="orb-float-slow absolute -bottom-8 -right-6 w-48 h-48 rounded-full bg-[#E3F5EC] blur-2xl opacity-90" />
            <div className="orb-float absolute top-1/2 -right-10 w-28 h-28 rounded-full bg-[#E8F2FC] blur-xl opacity-80" />
          </div>

          {/* Depth 35: portrait frame */}
          <div style={{ transform: "translateZ(35px)" }} className="relative">
            <div className="relative overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-white/70 shadow-2xl shadow-[#1E2430]/20 aspect-[3/4] bg-white">
              <img
                src={site.images.hero}
                alt={t.hero.imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
                data-testid="hero-image"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#2B2638]/35 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Depth 75: glass badge partners */}
          <motion.div
            className="absolute -left-12 top-14"
            style={{ transform: "translateZ(75px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <div className="backdrop-blur-xl bg-white/85 border border-white/70 shadow-xl shadow-[#874B38]/10 rounded-2xl px-5 py-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#78869A]">{t.hero.badgeOver}</p>
              <p className="text-sm font-semibold text-[#1E2430]">{t.hero.badgeSub}</p>
            </div>
          </motion.div>

          {/* Depth 110: location badge */}
          <motion.div
            className="absolute -right-4 bottom-20"
            style={{ transform: "translateZ(110px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.7 }}
          >
            <div className="backdrop-blur-xl bg-[#E3F5EC]/90 border border-[#C2E8D2] shadow-xl shadow-[#1E5238]/10 rounded-2xl px-5 py-3 text-[#1E5238] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <p className="text-sm font-medium">{t.hero.badgeLocation}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="inicio"
      className="noise relative min-h-screen flex items-center overflow-hidden bg-[#FAF7F2] pt-24 pb-16"
      data-testid="hero-section"
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-80 700 C 300 500, 700 900, 1150 550 S 1500 300, 1600 250" stroke="#D99776" strokeWidth="1.5" />
        <path d="M-100 300 C 350 100, 800 500, 1300 200 S 1550 100, 1650 80" stroke="#7BC7A0" strokeWidth="1.5" />
        <circle cx="1150" cy="550" r="6" fill="#25D366" />
        <circle cx="700" cy="680" r="5" fill="#D99776" />
        <circle cx="350" cy="215" r="5" fill="#D99776" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-mono-brand text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#C88463] mb-6"
            data-testid="hero-overline"
          >
            {t.hero.overline}
          </motion.p>

          <h1 className="font-display text-[#1E2430] font-light leading-[0.95] tracking-tight" data-testid="hero-title">
            <MaskedLine delay={0.25} className="text-[18vw] sm:text-8xl lg:text-[7.5rem]">
              CELINA
            </MaskedLine>
            <MaskedLine delay={0.4} className="text-[8vw] sm:text-4xl lg:text-6xl italic font-normal text-[#475569] mt-2">
              Estilo que <span className="text-[#C47B62] not-italic font-medium">Une</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-7 text-base sm:text-lg font-light text-[#475569] max-w-xl leading-relaxed"
            data-testid="hero-subtitle"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-3 font-mono-brand text-[11px] tracking-[0.25em] uppercase text-[#78869A]"
          >
            {t.hero.pillars}
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2430] text-white font-semibold px-8 py-4 text-sm sm:text-base transition-all duration-300 hover:bg-[#2A3242] hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.hero.ctaPrimary}
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href={waLink(t.messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
              data-testid="hero-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] text-[#128C7E] font-semibold px-8 py-4 text-sm sm:text-base transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative hidden md:block">
          <TiltScene t={t} />
        </div>
      </div>
    </section>
  );
};
