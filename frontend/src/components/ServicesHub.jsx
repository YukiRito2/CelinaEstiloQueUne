import { motion } from "framer-motion";
import { ArrowRight, Banknote, Plane, Gem, FileText, MonitorSmartphone, Wifi } from "lucide-react";
import { site } from "../config/site";
import { cloudinaryWidth } from "../lib/cloudinary";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { IrresistibleButton } from "./IrresistibleButton/IrresistibleButton";

// Logos disponibles por operador para los chips de servicio (los que aun no
// tienen PNG/JPG en Cloudinary se muestran solo como texto, igual que en FiberPage)
const chipLogos = {
  SIMYO: site.images.partners.simyo,
  JAZZTEL: site.images.partners.jazztel,
};

const meta = {
  transfers: {
    num: "01",
    variant: "money",
    icon: Banknote,
    href: site.links.money,
    event: "money_transfer_click",
    span: "md:col-span-6",
    image: site.images.money,
    blend: "from-[#FADD7A]",
    card: "bg-[#FADD7A] border-[#EFC766]",
    tag: "bg-[#1E2430] text-[#F6DFA0]",
    iconBox: "bg-[#1E2430] text-[#F6DFA0]",
    chip: "bg-white/70 border-[#EFC766] text-[#92400E]",
    shadow: "hover:shadow-[#1E2430]/15",
    dark: false,
  },
  travel: {
    num: "02",
    variant: "travel",
    icon: Plane,
    href: site.links.travel,
    event: "travel_click",
    span: "md:col-span-6",
    image: site.images.travelDestinations[0],
    blend: "from-[#CFF8F3]",
    card: "bg-[#CFF8F3] border-[#5EEAD4]",
    tag: "bg-[#0891B2] text-white",
    iconBox: "bg-[#A5F3FC] text-[#0891B2]",
    chip: "bg-white/70 border-[#5EEAD4] text-[#0E7490]",
    shadow: "hover:shadow-[#0891B2]/20",
    dark: false,
  },
  jewelry: {
    num: "03",
    variant: "jewelry",
    icon: Gem,
    href: site.links.jewelry,
    event: "jewelry_click",
    span: "md:col-span-6",
    image: site.images.jewelry[1],
    blend: "from-[#FBE0DB]",
    card: "bg-[#FBE0DB] border-[#F0B8AC]",
    tag: "bg-[#D9714F] text-white",
    iconBox: "bg-[#F8CFC3] text-[#D9714F]",
    chip: "bg-white/70 border-[#F0B8AC] text-[#874B38]",
    shadow: "hover:shadow-[#D9714F]/15",
    dark: false,
  },
  documents: {
    num: "04",
    variant: "documents",
    icon: FileText,
    href: site.links.documents,
    event: "documents_click",
    span: "md:col-span-6",
    image: site.images.documents,
    blend: "from-[#F7E1C4]",
    card: "bg-[#F7E1C4] border-[#E0B67D]",
    tag: "bg-[#C2792F] text-white",
    iconBox: "bg-[#F0D4A8] text-[#C2792F]",
    chip: "bg-white/70 border-[#E0B67D] text-[#7A4E24]",
    shadow: "hover:shadow-[#C2792F]/15",
    dark: false,
  },
  studio: {
    num: "05",
    variant: "studio",
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
    chip: "",
    shadow: "hover:shadow-black/40",
    dark: true,
  },
  fiber: {
    num: "06",
    variant: "fiber",
    icon: Wifi,
    href: site.links.fiber,
    event: "fiber_click",
    span: "md:col-span-12",
    image: site.images.fiber,
    blend: "from-[#DCFCE7]",
    card: "bg-[#DCFCE7] border-[#86EFAC]",
    tag: "bg-[#16A34A] text-white",
    iconBox: "bg-[#BBF7D0] text-[#15803D]",
    chip: "bg-white/70 border-[#86EFAC] text-[#14532D]",
    shadow: "hover:shadow-[#16A34A]/15",
    dark: false,
  },
};

const ServiceCard = ({ s, m, index, externalHint }) => {
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
      className={`group relative overflow-hidden rounded-3xl border flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${m.span} ${m.card} ${m.shadow}`}
      data-testid={`service-card-${s.id}`}
    >
      {/* Imagen identificativa con etiqueta de categoría */}
      <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
        <img
          src={m.image}
          alt=""
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
                className={`inline-flex items-center gap-1.5 font-mono-brand text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full border ${m.chip}`}
              >
                {chipLogos[c] && (
                  <img src={cloudinaryWidth(chipLogos[c], 40)} alt="" loading="lazy" width="14" height="14" className="w-3.5 h-3.5 rounded-full object-cover" />
                )}
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          <IrresistibleButton
            as="span"
            label={s.cta}
            variant={m.variant}
            icon={<Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />}
            className="w-full sm:w-auto"
            data-testid={`service-card-${s.id}-cta`}
          />
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
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#905F47] mb-4">
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
