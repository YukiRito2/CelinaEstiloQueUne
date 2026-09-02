import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Banknote, Gem, MessageCircle, MonitorSmartphone, Plane } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { MaskedLine } from "./Reveal";

// Arcos de conexión: del centro (retrato) hacia cada nodo satélite
const ARCS = [
  { d: "M300,300 C 220,240 160,200 108,128", color: "#2B6CB0", dur: 5.4 }, // viajes ↖
  { d: "M300,300 C 380,240 440,200 498,118", color: "#2D7A54", dur: 4.6 }, // dinero ↗
  { d: "M300,300 C 392,362 452,422 502,492", color: "#A78BFA", dur: 5.9 }, // studio ↘
  { d: "M300,300 C 218,362 158,422 102,492", color: "#C47B62", dur: 5.1 }, // bisutería ↙
];

const ArcLayer = () => (
  <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(10px)" }} aria-hidden="true">
    <svg viewBox="0 0 600 600" preserveAspectRatio="none" className="w-full h-full">
      {ARCS.map((a, i) => (
        <g key={i}>
          <motion.path
            d={a.d}
            fill="none"
            stroke={a.color}
            strokeWidth="1.8"
            strokeOpacity="0.65"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, delay: 0.5 + i * 0.15, ease: "easeOut" }}
          />
          <circle r="10" fill={a.color} opacity="0.16">
            <animateMotion dur={`${a.dur}s`} begin={`${1.8 + i * 0.4}s`} repeatCount="indefinite" path={a.d} />
          </circle>
          <circle r="4.5" fill={a.color}>
            <animateMotion dur={`${a.dur}s`} begin={`${1.8 + i * 0.4}s`} repeatCount="indefinite" path={a.d} />
          </circle>
        </g>
      ))}
      <motion.circle
        cx="300"
        cy="300"
        r="6"
        fill="#C88463"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1 }}
      />
    </svg>
  </div>
);

// Nodo satélite: profundidad Z estática + física de flotación independiente
const Node = ({ depth, className, href, external, event, delay, floatY, floatDur, testid, children }) => {
  const inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: floatY }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { type: "spring", stiffness: 200, damping: 20, delay },
        y: { duration: floatDur, repeat: Infinity, ease: "easeInOut", delay },
      }}
      whileHover={{ scale: 1.07 }}
      data-testid={testid}
    >
      {children}
    </motion.div>
  );

  return (
    <div className={`absolute ${className}`} style={{ transform: `translateZ(${depth}px)` }}>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={event ? () => trackEvent(event, { source: "hero_constellation" }) : undefined}
          className="block"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
};

const Constellation = ({ t }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(my, { stiffness: 190, damping: 28 });
  const rotateY = useSpring(mx, { stiffness: 190, damping: 28 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-[540px] xl:h-[600px] hidden lg:block"
      style={{ perspective: 1400 }}
    >
      <motion.div style={{ y: parY }} className="h-full">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-full will-change-transform"
          data-testid="hero-3d-tilt-card"
        >
          {/* Orbes pastel de fondo */}
          <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(-60px)" }} aria-hidden="true">
            <div className="orb-float absolute top-4 -left-6 w-44 h-44 rounded-full bg-[#FDE8E1] blur-2xl opacity-90" />
            <div className="orb-float-slow absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#E3F5EC] blur-2xl opacity-90" />
            <div className="orb-float absolute top-1/3 right-8 w-32 h-32 rounded-full bg-[#E8F2FC] blur-xl opacity-80" />
            <div className="orb-float-slow absolute bottom-16 left-8 w-24 h-24 rounded-full bg-[#EFE9F7] blur-xl opacity-70" />
          </div>

          <ArcLayer />

          {/* Retrato central: bisutería / estilo */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(40px)" }}>
            <motion.a
              href="/bisuteria"
              onClick={() => trackEvent("jewelry_click", { source: "hero_center" })}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.4 }}
              className="group block w-[240px] xl:w-[280px]"
              data-testid="hero-center-portrait"
            >
              <div className="overflow-hidden rounded-t-full rounded-b-[2rem] border-2 border-white/80 shadow-2xl shadow-[#874B38]/20 aspect-[3/4] bg-white">
                <img
                  src={site.images.hero}
                  alt={t.hero.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchpriority="high"
                  data-testid="hero-image"
                />
              </div>
            </motion.a>
          </div>

          {/* Nodo: Envíos de dinero */}
          <Node
            depth={110}
            className="top-2 right-0"
            href={site.links.money}
            event="money_transfer_click"
            delay={0.65}
            floatY={[-8, 8, -8]}
            floatDur={4.2}
            testid="hero-satellite-money-card"
          >
            <div className="backdrop-blur-xl bg-[#EEF7F2]/95 border border-[#C2E8D2] shadow-xl shadow-[#2D7A54]/15 rounded-2xl px-4 py-3 max-w-[205px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#2D7A54] font-semibold">
                  {t.hero.nodes.money}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <img src={site.images.partners.ria} alt="Ria" className="h-5 w-5 rounded-md" />
                <img src={site.images.partners.westernUnion} alt="Western Union" className="h-4 w-auto rounded" />
                <img src={site.images.partners.transfast} alt="Transfast" className="h-3 w-auto" />
              </div>
            </div>
          </Node>

          {/* Nodo: Viajes */}
          <Node
            depth={85}
            className="top-0 left-0"
            href="/viajes"
            event="travel_click"
            delay={0.8}
            floatY={[6, -10, 6]}
            floatDur={5.0}
            testid="hero-satellite-travel-card"
          >
            <div className="w-[168px] rounded-2xl overflow-hidden border border-white/80 shadow-xl shadow-[#2B6CB0]/15 bg-white/90 backdrop-blur-md">
              <img src={site.images.travel} alt="" className="h-20 w-full object-cover" loading="lazy" />
              <p className="px-3 py-2 text-[11px] font-semibold text-[#1A497A] flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5" />
                {t.hero.nodes.travel}
              </p>
            </div>
          </Node>

          {/* Nodo: Celina Studio */}
          <Node
            depth={130}
            className="bottom-0 right-0"
            href={site.links.studio}
            external
            event="studio_click"
            delay={0.95}
            floatY={[-10, 6, -10]}
            floatDur={4.6}
            testid="hero-satellite-studio-card"
          >
            <div className="w-[180px] rounded-2xl overflow-hidden border border-[#E2D4F0]/25 shadow-2xl shadow-black/30 bg-[#2B2638]/95 backdrop-blur-xl">
              <img src={site.images.studio} alt="" className="h-16 w-full object-cover opacity-90" loading="lazy" />
              <p className="px-3 py-2 text-[11px] font-semibold text-[#E2D4F0] flex items-center gap-1.5">
                <MonitorSmartphone className="w-3.5 h-3.5" />
                {t.hero.nodes.studio}
              </p>
            </div>
          </Node>

          {/* Nodo: Bisutería */}
          <Node
            depth={70}
            className="bottom-8 left-0"
            href="/bisuteria"
            event="jewelry_click"
            delay={1.1}
            floatY={[4, -6, 4]}
            floatDur={3.8}
            testid="hero-satellite-jewelry-card"
          >
            <div className="w-[168px] rounded-2xl overflow-hidden border border-white/80 shadow-xl shadow-[#C47B62]/15 bg-white/90 backdrop-blur-md">
              <img src={site.images.jewelry[1]} alt="" className="h-20 w-full object-cover" loading="lazy" />
              <p className="px-3 py-2 text-[11px] font-semibold text-[#874B38] flex items-center gap-1.5">
                <Gem className="w-3.5 h-3.5" />
                {t.hero.nodes.jewelry}
              </p>
            </div>
          </Node>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Palabra rotativa: "Conectamos personas / destinos / estilos / negocios"
const RotatingWords = ({ prefix, words }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-xl sm:text-2xl font-light text-[#475569]"
      data-testid="hero-rotating-words"
    >
      {prefix}{" "}
      <span className="relative inline-block overflow-hidden align-bottom min-w-[7ch]">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[i]}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block font-display italic font-medium text-[#C47B62]"
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.p>
  );
};

// Versión móvil de la constelación: grid 2x2 limpio
const MobileNodes = ({ t }) => (
  <div className="lg:hidden mt-12 grid grid-cols-2 gap-3" data-testid="hero-mobile-nodes">
    <motion.a
      href={site.links.money}
      onClick={() => trackEvent("money_transfer_click", { source: "hero_mobile" })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="rounded-2xl bg-[#EEF7F2] border border-[#C2E8D2] p-4"
      data-testid="hero-mobile-node-money"
    >
      <Banknote className="w-5 h-5 text-[#2D7A54]" />
      <p className="mt-2 text-xs font-semibold text-[#1E5238]">{t.hero.nodes.money}</p>
      <div className="mt-1 flex items-center gap-1.5">
        <img src={site.images.partners.ria} alt="Ria" className="h-3.5 w-3.5 rounded" />
        <img src={site.images.partners.westernUnion} alt="Western Union" className="h-3 w-auto rounded" />
        <img src={site.images.partners.transfast} alt="Transfast" className="h-2 w-auto" />
      </div>
    </motion.a>
    <motion.a
      href="/viajes"
      onClick={() => trackEvent("travel_click", { source: "hero_mobile" })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="rounded-2xl overflow-hidden bg-[#F0F6FF] border border-[#C7E0FE]"
      data-testid="hero-mobile-node-travel"
    >
      <img src={site.images.travel} alt="" className="h-16 w-full object-cover" loading="lazy" />
      <p className="p-3 text-xs font-semibold text-[#1A497A]">{t.hero.nodes.travel}</p>
    </motion.a>
    <motion.a
      href="/bisuteria"
      onClick={() => trackEvent("jewelry_click", { source: "hero_mobile" })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      className="rounded-2xl overflow-hidden bg-[#FDF2F0] border border-[#F7D8D3]"
      data-testid="hero-mobile-node-jewelry"
    >
      <img src={site.images.hero} alt="" className="h-16 w-full object-cover" loading="lazy" />
      <p className="p-3 text-xs font-semibold text-[#874B38]">{t.services.cards[2].title}</p>
    </motion.a>
    <motion.a
      href={site.links.studio}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("studio_click", { source: "hero_mobile" })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="rounded-2xl bg-[#2B2638] border border-[#E2D4F0]/20 p-4"
      data-testid="hero-mobile-node-studio"
    >
      <MonitorSmartphone className="w-5 h-5 text-[#A78BFA]" />
      <p className="mt-2 text-xs font-semibold text-[#E2D4F0]">{t.hero.nodes.studio}</p>
    </motion.a>
  </div>
);

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="inicio"
      className="noise relative min-h-screen flex items-center overflow-hidden bg-[#FAF7F2] pt-28 pb-16"
      data-testid="hero-section"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-6 items-center w-full">
        <div className="lg:col-span-6 relative z-10">
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
            <MaskedLine delay={0.25} className="text-[17vw] sm:text-8xl lg:text-[7rem]">
              CELINA
            </MaskedLine>
            <MaskedLine delay={0.4} className="text-[8vw] sm:text-4xl lg:text-5xl italic font-normal text-[#475569] mt-2">
              Estilo que <span className="text-[#C47B62] not-italic font-medium">Une</span>
            </MaskedLine>
          </h1>

          <div className="mt-7">
            <RotatingWords prefix={t.hero.connectPrefix} words={t.hero.rotateWords} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-xl leading-relaxed"
            data-testid="hero-subtitle"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-9 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/servicios"
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

          <MobileNodes t={t} />
        </div>

        <div className="lg:col-span-6">
          <Constellation t={t} />
        </div>
      </div>
    </section>
  );
};
