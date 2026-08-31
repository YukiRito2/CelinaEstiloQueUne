import { motion } from "framer-motion";
import { Banknote, Plane, Gem, MonitorSmartphone, ArrowUpRight } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const meta = [
  {
    icon: Banknote,
    msgKey: "money",
    event: "money_transfer_click",
    testid: "contact-option-transfers",
    card: "bg-[#EEF7F2] border-[#C2E8D2] hover:border-[#2D7A54]/40",
    iconBox: "bg-[#D3EEDD] text-[#2D7A54]",
    cta: "text-[#2D7A54]",
    external: true,
  },
  {
    icon: Plane,
    msgKey: "travel",
    event: "travel_click",
    testid: "contact-option-travel",
    card: "bg-[#F0F6FF] border-[#C7E0FE] hover:border-[#2B6CB0]/40",
    iconBox: "bg-[#D8E8FD] text-[#2B6CB0]",
    cta: "text-[#2B6CB0]",
  },
  {
    icon: Gem,
    msgKey: "jewelry",
    event: "jewelry_click",
    testid: "contact-option-jewelry",
    card: "bg-[#FDF2F0] border-[#F7D8D3] hover:border-[#C47B62]/40",
    iconBox: "bg-[#FBE3DF] text-[#C47B62]",
    cta: "text-[#C47B62]",
  },
  {
    icon: MonitorSmartphone,
    msgKey: "studio",
    event: "studio_click",
    testid: "contact-option-studio",
    card: "bg-[#2B2638] border-[#E2D4F0]/15 hover:border-[#A78BFA]/50",
    iconBox: "bg-[#A78BFA]/15 text-[#A78BFA]",
    cta: "text-[#E2D4F0]",
    dark: true,
  },
];

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
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.contact.options.map((o, i) => {
            const m = meta[i];
            return (
              <motion.a
                key={o.title}
                href={m.external ? site.links.money : waLink(t.messages[m.msgKey])}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(m.event, { source: "contact_hub" })}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group flex flex-col justify-between rounded-3xl border p-7 min-h-[220px] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#1E2430]/8 ${m.card}`}
                data-testid={m.testid}
              >
                <span
                  className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center transition-transform duration-500 group-hover:scale-110 ${m.iconBox}`}
                >
                  <m.icon className="w-6 h-6" />
                </span>
                <div className="mt-8">
                  <h3
                    className={`font-display text-2xl font-medium ${m.dark ? "text-[#F8F5FC]" : "text-[#1E2430]"}`}
                  >
                    {o.title}
                  </h3>
                  <span className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${m.cta}`}>
                    {o.cta}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
