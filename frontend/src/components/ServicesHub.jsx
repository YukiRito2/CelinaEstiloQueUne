import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Banknote, Plane, Gem, FileText, MonitorSmartphone, Wifi } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const meta = {
  transfers: {
    num: "01",
    icon: Banknote,
    href: site.links.money,
    event: "money_transfer_click",
    span: "md:col-span-6",
    image: site.images.money,
    blend: "from-[#EEF7F2]",
    card: "bg-[#EEF7F2] border-[#C2E8D2]",
    tag: "bg-[#2D7A54] text-white",
    iconBox: "bg-[#D3EEDD] text-[#2D7A54]",
    ctaBtn: "bg-[#2D7A54] hover:bg-[#256646] text-white",
    chip: "bg-white/70 border-[#C2E8D2] text-[#1E5238]",
    shadow: "hover:shadow-[#2D7A54]/15",
    dark: false,
  },
  travel: {
    num: "02",
    icon: Plane,
    href: site.links.travel,
    event: "travel_click",
    span: "md:col-span-6",
    image: site.images.travel,
    blend: "from-[#F0F6FF]",
    card: "bg-[#F0F6FF] border-[#C7E0FE]",
    tag: "bg-[#2B6CB0] text-white",
    iconBox: "bg-[#D8E8FD] text-[#2B6CB0]",
    ctaBtn: "bg-[#2B6CB0] hover:bg-[#235a94] text-white",
    chip: "bg-white/70 border-[#C7E0FE] text-[#1A497A]",
    shadow: "hover:shadow-[#2B6CB0]/15",
    dark: false,
  },
  jewelry: {
    num: "03",
    icon: Gem,
    href: site.links.jewelry,
    event: "jewelry_click",
    span: "md:col-span-6",
    image: site.images.jewelry[1],
    blend: "from-[#FDF2F0]",
    card: "bg-[#FDF2F0] border-[#F7D8D3]",
    tag: "bg-[#C47B62] text-white",
    iconBox: "bg-[#FBE3DF] text-[#C47B62]",
    ctaBtn: "bg-[#C47B62] hover:bg-[#ac6850] text-white",
    chip: "bg-white/70 border-[#F7D8D3] text-[#874B38]",
    shadow: "hover:shadow-[#C47B62]/15",
    dark: false,
  },
  documents: {
    num: "04",
    icon: FileText,
    href: site.links.documents,
    event: "documents_click",
    span: "md:col-span-6",
    image: site.images.documents,
    blend: "from-[#FBF1E6]",
    card: "bg-[#FBF1E6] border-[#EAD2B3]",
    tag: "bg-[#B8763F] text-white",
    iconBox: "bg-[#F3E1C8] text-[#B8763F]",
    ctaBtn: "bg-[#B8763F] hover:bg-[#9c632f] text-white",
    chip: "bg-white/70 border-[#EAD2B3] text-[#7A4E24]",
    shadow: "hover:shadow-[#B8763F]/15",
    dark: false,
  },
  studio: {
    num: "05",
    icon: MonitorSmartphone,
    href: site.links.studio,
    event: "studio_click",
    span: "md:col-span-12",
    external: true,
    image: site.images.studio,
    blend: "from-[#2B2638]",
    card: "bg-[#2B2638] border-[#E2D4F0]/15",
    tag: "bg-[#A78BFA] text-[#2B2638]",
    iconBox: "bg-[#A78BFA]/15 text-[#A78BFA]",
    ctaBtn: "bg-[#A78BFA] hover:bg-[#c4b5fc] text-[#2B2638]",
    chip: "",
    shadow: "hover:shadow-black/40",
    dark: true,
  },
  fiber: {
    num: "06",
    icon: Wifi,
    href: site.links.fiber,
    event: "fiber_click",
    span: "md:col-span-12",
    image: site.images.fiber,
    blend: "from-[#E9F6F6]",
    card: "bg-[#E9F6F6] border-[#BFE6E6]",
    tag: "bg-[#0E7C86] text-white",
    iconBox: "bg-[#CFEDED] text-[#0E7C86]",
    ctaBtn: "bg-[#0E7C86] hover:bg-[#0B6870] text-white",
    chip: "bg-white/70 border-[#BFE6E6] text-[#0B5158]",
    shadow: "hover:shadow-[#0E7C86]/15",
    dark: false,
  },
};

const ServiceCard = ({ s, m, index, externalHint }) => {
  const Icon = m.icon;
  const CtaIcon = m.external ? ArrowUpRight : ArrowRight;
  return (
    <motion.a
      href={m.href}
      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackEvent(m.event, { source: "services_hub" })}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${m.span} ${m.card} ${m.shadow}`}
      data-testid={`service-card-${s.id}`}
    >
      {/* Imagen identificativa con etiqueta de categoría */}
      <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
        <img
          src={m.image}
          alt={s.title}
          width="800"
          height="480"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${m.blend} via-transparent to-transparent`} aria-hidden="true" />
        <span
          className={`absolute top-4 left-4 inline-flex items-center gap-1.5 font-mono-brand text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full shadow-md ${m.tag}`}
        >
          {m.num}
        </span>
        {/* Solo decorativo: no es un boton, por eso sin fondo tipo pastilla (para no confundirse con el CTA real) */}
        <span
          className="absolute top-4 right-4 inline-flex items-center justify-center text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" />
        </span>
      </div>

      <div className="p-7 sm:p-8 pt-5 flex flex-col flex-1">
        <h3
          className={`font-display text-2xl sm:text-3xl font-medium tracking-tight ${
            m.dark ? "text-[#F8F5FC]" : "text-[#1E2430]"
          }`}
        >
          {s.title}
        </h3>
        <p
          className={`mt-3 max-w-2xl text-sm sm:text-base font-light leading-relaxed ${
            m.dark ? "text-[#C8C2DB]" : "text-[#475569]"
          }`}
        >
          {s.text}
        </p>
        {s.chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {s.chips.map((c) => (
              <span
                key={c}
                className={`font-mono-brand text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full border ${m.chip}`}
              >
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          <span
            className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm shadow-md transition-all duration-300 group-hover:gap-3 group-hover:shadow-lg ${m.ctaBtn}`}
            data-testid={`service-card-${s.id}-cta`}
          >
            {s.cta}
            <CtaIcon className="w-4 h-4" />
          </span>
          {m.external && (
            <p className="mt-3 font-mono-brand text-[10px] tracking-[0.15em] uppercase text-[#9F99B0]">
              {externalHint} · {new URL(m.href).host}
            </p>
          )}
        </div>
      </div>
    </motion.a>
  );
};

export const ServicesHub = () => {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-24 sm:py-32 bg-[#FAF7F2]" data-testid="services-hub-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C88463] mb-4">
            {t.services.overline}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430] max-w-2xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-[#475569]">{t.services.subtitle}</p>
        </motion.div>

        {/* Guía de 3 pasos para no perderse */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 rounded-2xl bg-white border border-[#1E2430]/8 p-5 sm:p-6 shadow-sm"
            data-testid="services-guide-strip"
          >
            {t.services.guide.map((step, i) => (
              <div key={step} className="flex items-center gap-3 sm:flex-1">
                <span className="font-mono-brand text-[10px] tracking-[0.2em] w-8 h-8 shrink-0 rounded-full bg-[#F5EFE6] border border-[#D99776]/30 text-[#C47B62] inline-flex items-center justify-center">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-[#1E2430]">{step}</p>
                {i < t.services.guide.length - 1 && (
                  <ArrowRight className="hidden sm:block w-4 h-4 text-[#D99776] ml-auto mr-4 shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-12 gap-5">
          {t.services.cards.map((s, i) => (
            <ServiceCard key={s.id} s={s} m={meta[s.id]} index={i} externalHint={t.services.externalHint} />
          ))}
        </div>
      </div>
    </section>
  );
};
