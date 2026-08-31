import { motion } from "framer-motion";
import { Banknote, Plane, Gem, MonitorSmartphone, ArrowUpRight } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

const options = [
  {
    icon: Banknote,
    title: "Enviar dinero",
    cta: "Quiero enviar dinero",
    message: site.whatsappMessages.money,
    event: "money_transfer_click",
    testid: "contact-option-transfers",
  },
  {
    icon: Plane,
    title: "Planificar un viaje",
    cta: "Quiero organizar un viaje",
    message: site.whatsappMessages.travel,
    event: "travel_click",
    testid: "contact-option-travel",
  },
  {
    icon: Gem,
    title: "Comprar bisutería",
    cta: "Quiero ver bisutería",
    message: site.whatsappMessages.jewelry,
    event: "jewelry_click",
    testid: "contact-option-jewelry",
  },
  {
    icon: MonitorSmartphone,
    title: "Crear una web",
    cta: "Quiero crear una página web",
    message: site.whatsappMessages.studio,
    event: "studio_click",
    testid: "contact-option-studio",
  },
];

export const ContactSection = () => (
  <section
    id="contacto"
    className="noise relative py-24 sm:py-32 bg-[#0B235E] text-white overflow-hidden"
    data-testid="contact-section"
  >
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(4,190,79,0.16),transparent_55%)]"
      aria-hidden="true"
    />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">Contacto</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
          ¿En qué podemos ayudarte?
        </h2>
        <p className="mt-4 text-base sm:text-lg font-light text-white/70 max-w-xl mx-auto">
          Elige lo que necesitas y hablamos ahora mismo por WhatsApp.
        </p>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {options.map((o, i) => (
          <motion.a
            key={o.title}
            href={waLink(o.message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent(o.event, { source: "contact_hub" })}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-7 min-h-[220px] transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-[#04BE4F]/40"
            data-testid={o.testid}
          >
            <span className="inline-flex w-12 h-12 rounded-2xl bg-[#04BE4F]/15 text-[#04BE4F] items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <o.icon className="w-6 h-6" />
            </span>
            <div className="mt-8">
              <h3 className="font-display text-2xl font-medium">{o.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#04BE4F]">
                {o.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);
