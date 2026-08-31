import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { MaskedLine } from "./Reveal";

const themes = {
  mint: {
    bg: "bg-[#EEF7F2]",
    accent: "text-[#2D7A54]",
    subtitle: "text-[#475569]",
    title: "text-[#1E2430]",
    orb1: "bg-[#D3EEDD]",
    orb2: "bg-[#FDE8E1]",
    primaryBtn: "bg-[#1E2430] hover:bg-[#2A3242] text-white",
    alt: "text-[#128C7E]",
  },
  blush: {
    bg: "bg-[#FDF2F0]",
    accent: "text-[#C47B62]",
    subtitle: "text-[#475569]",
    title: "text-[#1E2430]",
    orb1: "bg-[#FBE3DF]",
    orb2: "bg-[#E8F2FC]",
    primaryBtn: "bg-[#1E2430] hover:bg-[#2A3242] text-white",
    alt: "text-[#128C7E]",
  },
  lavender: {
    bg: "bg-[#2B2638]",
    accent: "text-[#A78BFA]",
    subtitle: "text-[#C8C2DB]",
    title: "text-[#F8F5FC]",
    orb1: "bg-[#A78BFA]/25",
    orb2: "bg-[#E2D4F0]/10",
    primaryBtn: "bg-[#E2D4F0] hover:bg-white text-[#2B2638]",
    alt: "text-[#25D366]",
  },
};

// Layout común de las páginas de servicio: hero temático + CTAs + contenido
export const ServicePageLayout = ({
  theme = "mint",
  overline,
  title,
  subtitle,
  image,
  imageAlt,
  imageBadgeOver,
  imageBadgeSub,
  right,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  ctaEvent,
  whatsappLabel,
  whatsappMessage,
  children,
}) => {
  const th = themes[theme];

  return (
    <>
      <section
        className={`noise relative overflow-hidden ${th.bg} pt-32 pb-20 sm:pb-28`}
        data-testid="service-page-hero"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className={`orb-float absolute top-16 right-[12%] w-56 h-56 rounded-full ${th.orb1} blur-2xl opacity-80`} />
          <div className={`orb-float-slow absolute bottom-0 left-[8%] w-64 h-64 rounded-full ${th.orb2} blur-2xl opacity-70`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={`font-mono-brand text-[11px] sm:text-xs tracking-[0.35em] uppercase ${th.accent} mb-6`}
              data-testid="service-page-overline"
            >
              {overline}
            </motion.p>

            <h1
              className={`font-display ${th.title} font-light leading-[1.02] tracking-tight text-[11vw] sm:text-6xl lg:text-7xl`}
              data-testid="service-page-title"
            >
              <MaskedLine delay={0.25}>{title}</MaskedLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`mt-6 text-base sm:text-lg font-light ${th.subtitle} max-w-xl leading-relaxed`}
              data-testid="service-page-subtitle"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <a
                href={ctaHref}
                {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={ctaEvent ? () => trackEvent(ctaEvent, { source: "service_page_hero" }) : undefined}
                data-testid="service-page-cta-btn"
                className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${th.primaryBtn}`}
              >
                {ctaLabel}
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <a
                href={waLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "service_page_hero" })}
                data-testid="service-page-whatsapp-alt"
                className={`inline-flex items-center gap-2 font-semibold px-2 py-2 link-underline ${th.alt}`}
              >
                <MessageCircle className="w-5 h-5" />
                {whatsappLabel}
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            {right ? (
              right
            ) : image ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="overflow-hidden rounded-t-[9rem] rounded-b-[2rem] border-2 border-white/80 shadow-2xl shadow-[#1E2430]/15 aspect-[4/5] max-w-sm mx-auto bg-white">
                  <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="eager" data-testid="service-page-image" />
                </div>
                {(imageBadgeOver || imageBadgeSub) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.7 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/90 border border-white/70 shadow-xl rounded-2xl px-5 py-3 whitespace-nowrap"
                  >
                    <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#78869A]">{imageBadgeOver}</p>
                    <p className="text-sm font-semibold text-[#1E2430]">{imageBadgeSub}</p>
                  </motion.div>
                )}
              </motion.div>
            ) : null}
          </div>
        </div>
      </section>
      {children}
    </>
  );
};
