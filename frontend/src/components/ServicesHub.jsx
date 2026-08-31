import { motion } from "framer-motion";
import { ArrowRight, Banknote, Plane, Gem, MonitorSmartphone } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

const services = [
  {
    id: "transfers",
    num: "01",
    icon: Banknote,
    title: "Envía dinero al mundo",
    text: "Realiza tus envíos de dinero de forma sencilla y recibe asesoramiento en nuestro local.",
    cta: "Quiero enviar dinero",
    href: site.links.money,
    event: "money_transfer_click",
    span: "md:col-span-6",
    style: "bg-white border border-[#0B235E]/10",
    dark: false,
    chips: ["RIA", "WESTERN UNION"],
  },
  {
    id: "travel",
    num: "02",
    icon: Plane,
    title: "Tu próximo destino empieza aquí",
    text: "Te ayudamos a planificar tu viaje con atención personalizada.",
    cta: "Planificar mi viaje",
    href: site.links.travel,
    event: "travel_click",
    span: "md:col-span-6",
    style: "bg-white border border-[#0B235E]/10",
    dark: false,
    chips: [],
  },
  {
    id: "jewelry",
    num: "03",
    icon: Gem,
    title: "Encuentra tu estilo",
    text: "Descubre nuestra selección de accesorios y bisutería para cada ocasión.",
    cta: "Ver colección",
    href: site.links.jewelry,
    event: "jewelry_click",
    span: "md:col-span-7",
    style: "bg-white border border-[#0B235E]/10",
    dark: false,
    chips: ["COLLARES", "PULSERAS", "ANILLOS", "ARETES"],
  },
  {
    id: "studio",
    num: "04",
    icon: MonitorSmartphone,
    title: "Impulsa tu negocio",
    text: "Diseño web, desarrollo y marketing digital para negocios que quieren crecer.",
    cta: "Conocer Celina Studio",
    href: site.links.studio,
    event: "studio_click",
    span: "md:col-span-5",
    style: "bg-[#061334] border border-white/10",
    dark: true,
    chips: [],
    external: true,
  },
];

const ServiceCard = ({ s, index }) => {
  const Icon = s.icon;
  return (
    <motion.a
      href={s.href}
      {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackEvent(s.event, { source: "services_hub" })}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[280px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0B235E]/15 ${s.span} ${s.style}`}
      data-testid={`service-card-${s.id}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`font-mono-brand text-xs tracking-[0.3em] ${
            s.dark ? "text-[#04BE4F]" : "text-[#0B235E]/40"
          }`}
        >
          {s.num}
        </span>
        <span
          className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
            s.dark ? "bg-[#04BE4F]/15 text-[#04BE4F]" : "bg-[#0B235E]/5 text-[#0B235E]"
          }`}
        >
          <Icon className="w-6 h-6" />
        </span>
      </div>

      <div className="mt-10">
        <h3
          className={`font-display text-2xl sm:text-3xl font-medium tracking-tight ${
            s.dark ? "text-white" : "text-[#0B235E]"
          }`}
        >
          {s.title}
        </h3>
        <p className={`mt-3 text-sm sm:text-base font-light leading-relaxed ${s.dark ? "text-white/70" : "text-[#5A677D]"}`}>
          {s.text}
        </p>
        {s.chips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {s.chips.map((c) => (
              <span
                key={c}
                className="font-mono-brand text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full bg-[#F5F7FA] border border-[#0B235E]/10 text-[#0B235E]"
              >
                {c}
              </span>
            ))}
          </div>
        )}
        <span
          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
            s.dark ? "text-[#04BE4F]" : "text-[#039C40]"
          }`}
        >
          {s.cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </motion.a>
  );
};

export const ServicesHub = () => (
  <section id="servicios" className="py-24 sm:py-32 bg-[#F5F7FA]" data-testid="services-hub-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">
          Todo lo que nos une
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0B235E] max-w-2xl">
          Descubre todo lo que Celina tiene para ti
        </h2>
        <p className="mt-4 text-base sm:text-lg font-light text-[#5A677D]">
          Diferentes necesidades. Una misma marca.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-12 gap-5">
        {services.map((s, i) => (
          <ServiceCard key={s.id} s={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);
