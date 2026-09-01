import { motion } from "framer-motion";
import { ArrowRight, Banknote, Plane, Gem, MonitorSmartphone } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";

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
    iconBox: "bg-[#D3EEDD] text-[#2D7A54]",
    ctaColor: "text-[#2D7A54]",
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
    iconBox: "bg-[#D8E8FD] text-[#2B6CB0]",
    ctaColor: "text-[#2B6CB0]",
    chip: "bg-white/70 border-[#C7E0FE] text-[#1A497A]",
    shadow: "hover:shadow-[#2B6CB0]/15",
    dark: false,
  },
  jewelry: {
    num: "03",
    icon: Gem,
    href: site.links.jewelry,
    event: "jewelry_click",
    span: "md:col-span-7",
    image: site.images.jewelry[1],
    blend: "from-[#FDF2F0]",
    card: "bg-[#FDF2F0] border-[#F7D8D3]",
    iconBox: "bg-[#FBE3DF] text-[#C47B62]",
    ctaColor: "text-[#C47B62]",
    chip: "bg-white/70 border-[#F7D8D3] text-[#874B38]",
    shadow: "hover:shadow-[#C47B62]/15",
    dark: false,
  },
  studio: {
    num: "04",
    icon: MonitorSmartphone,
    href: site.links.studio,
    event: "studio_click",
    span: "md:col-span-5",
    external: true,
    image: site.images.studio,
    blend: "from-[#2B2638]",
    card: "bg-[#2B2638] border-[#E2D4F0]/15",
    iconBox: "bg-[#A78BFA]/15 text-[#A78BFA]",
    ctaColor: "text-[#E2D4F0]",
    chip: "",
    shadow: "hover:shadow-black/40",
    dark: true,
  },
};

const ServiceCard = ({ s, m, index }) => {
  const Icon = m.icon;
  return (
    <motion.a
      href={m.href}
      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackEvent(m.event, { source: "services_hub" })}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${m.span} ${m.card} ${m.shadow}`}
      data-testid={`service-card-${s.id}`}
    >
      {/* Imagen identificativa del servicio */}
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={m.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${m.blend} via-transparent to-transparent`} aria-hidden="true" />
        <span className="absolute top-4 left-4 font-mono-brand text-[10px] tracking-[0.25em] px-2.5 py-1 rounded-full bg-white/85 backdrop-blur text-[#1E2430]">
          {m.num}
        </span>
        <span
          className={`absolute top-4 right-4 inline-flex w-11 h-11 rounded-2xl items-center justify-center backdrop-blur bg-white/85 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
            m.dark ? "text-[#A78BFA]" : m.iconBox.split(" ")[1]
          }`}
        >
          <Icon className="w-5 h-5" />
        </span>
      </div>

      <div className="p-7 sm:p-8 pt-4 sm:pt-5">
        <h3
          className={`font-display text-2xl sm:text-3xl font-medium tracking-tight ${
            m.dark ? "text-[#F8F5FC]" : "text-[#1E2430]"
          }`}
        >
          {s.title}
        </h3>
        <p className={`mt-3 text-sm sm:text-base font-light leading-relaxed ${m.dark ? "text-[#C8C2DB]" : "text-[#475569]"}`}>
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
        <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${m.ctaColor}`}>
          {s.cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
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

        <div className="mt-14 grid md:grid-cols-12 gap-5">
          {t.services.cards.map((s, i) => (
            <ServiceCard key={s.id} s={s} m={meta[s.id]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
