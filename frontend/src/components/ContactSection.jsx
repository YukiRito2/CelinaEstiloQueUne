import { useRef } from "react";
import { motion } from "framer-motion";
import { Banknote, Plane, Gem, MonitorSmartphone, ArrowUpRight } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

// Cada opción lleva a la página del servicio, que explica todo y deriva
const meta = [
  {
    icon: Banknote,
    event: "money_transfer_click",
    testid: "contact-option-transfers",
    card: "bg-[#EEF7F2] border-[#C2E8D2] hover:border-[#2D7A54]/40",
    iconBox: "bg-[#D3EEDD] text-[#2D7A54]",
    cta: "text-[#2D7A54]",
    spot: "rgba(45,122,84,0.20)",
    href: site.links.money,
  },
  {
    icon: Plane,
    event: "travel_click",
    testid: "contact-option-travel",
    card: "bg-[#F0F6FF] border-[#C7E0FE] hover:border-[#2B6CB0]/40",
    iconBox: "bg-[#D8E8FD] text-[#2B6CB0]",
    cta: "text-[#2B6CB0]",
    spot: "rgba(43,108,176,0.18)",
    href: site.links.travel,
  },
  {
    icon: Gem,
    event: "jewelry_click",
    testid: "contact-option-jewelry",
    card: "bg-[#FDF2F0] border-[#F7D8D3] hover:border-[#C47B62]/40",
    iconBox: "bg-[#FBE3DF] text-[#C47B62]",
    cta: "text-[#C47B62]",
    spot: "rgba(196,123,98,0.20)",
    href: site.links.jewelry,
  },
  {
    icon: MonitorSmartphone,
    event: "studio_click",
    testid: "contact-option-studio",
    card: "bg-[#2B2638] border-[#E2D4F0]/15 hover:border-[#A78BFA]/50",
    iconBox: "bg-[#A78BFA]/15 text-[#A78BFA]",
    cta: "text-[#E2D4F0]",
    spot: "rgba(167,139,250,0.28)",
    href: site.links.studio,
    external: true,
    dark: true,
  },
];

// Estado en vivo según el horario configurado (08:00–22:00)
const LiveStatus = () => {
  const { t } = useLanguage();
  const h = new Date().getHours();
  const isOpen = h >= site.hoursRange.open && h < site.hoursRange.close;

  return (
    <div
      className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white border border-[#1E2430]/10 px-5 py-2.5 shadow-sm"
      data-testid="contact-live-status"
    >
      <span className="relative flex w-2.5 h-2.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${
            isOpen ? "bg-[#25D366]" : "bg-[#C47B62]"
          }`}
        />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? "bg-[#25D366]" : "bg-[#C47B62]"}`} />
      </span>
      <span className="text-sm font-semibold text-[#1E2430]">
        {isOpen ? t.contact.openNow : t.contact.closedNow}
      </span>
      <span className="text-sm font-light text-[#78869A]">{isOpen ? `· ${site.hours}` : `· ${t.contact.opensAt}`}</span>
    </div>
  );
};

const SpotlightCard = ({ o, m, i }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.a
      key={o.title}
      href={m.href}
      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackEvent(m.event, { source: "contact_hub" })}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden flex flex-col justify-between rounded-3xl border p-7 min-h-[240px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#1E2430]/8 ${m.card}`}
      data-testid={m.testid}
    >
      <span ref={ref} onMouseMove={onMove} className="absolute inset-0" aria-hidden="true">
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${m.spot}, transparent 70%)` }}
        />
      </span>

      <span
        className={`relative inline-flex w-12 h-12 rounded-2xl items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${m.iconBox}`}
      >
        <m.icon className="w-6 h-6" />
      </span>
      <div className="relative mt-8">
        <h3 className={`font-display text-2xl font-medium ${m.dark ? "text-[#F8F5FC]" : "text-[#1E2430]"}`}>
          {o.title}
        </h3>
        <span className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${m.cta}`}>
          {o.cta}
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </motion.a>
  );
};

export const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="contacto"
      className="noise relative py-24 sm:py-32 bg-[#F5EFE6] overflow-hidden"
      data-testid="contact-section"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(217,153,118,0.15),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C88463] mb-4">
            {t.contact.overline}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
          <LiveStatus />
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.contact.options.map((o, i) => (
            <SpotlightCard key={o.title} o={o} m={meta[i]} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
