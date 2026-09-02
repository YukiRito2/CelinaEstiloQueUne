import { useState } from "react";
import { Check, Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

// Contacto directo: WhatsApp, llamada y email copiable
export const DirectContact = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.contact.email}`;
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2]" data-testid="direct-contact-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C88463] mb-4">
            {t.contact.directTitle}
          </p>
        </Reveal>

        <div className="mt-8 grid sm:grid-cols-3 gap-5">
          <Reveal>
            <a
              href={waLink(t.messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "direct_contact" })}
              data-testid="direct-whatsapp-card"
              className="group flex flex-col items-center rounded-3xl bg-[#25D366] text-white p-8 text-center shadow-lg shadow-[#25D366]/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#25D366]/35"
            >
              <span className="inline-flex w-14 h-14 rounded-2xl bg-white/20 items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <MessageCircle className="w-7 h-7" />
              </span>
              <p className="mt-5 font-display text-2xl font-medium">WhatsApp</p>
              <p className="mt-1 text-sm text-white/85 font-light">{site.contact.phoneDisplay}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-[#128C7E] text-sm font-semibold px-6 py-2.5 transition-transform duration-300 group-hover:scale-105">
                {t.nav.whatsapp}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={`tel:${site.contact.phone}`}
              onClick={() => trackEvent("phone_click", { source: "direct_contact" })}
              data-testid="direct-phone-card"
              className="group flex flex-col items-center rounded-3xl bg-white border border-[#1E2430]/10 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="inline-flex w-14 h-14 rounded-2xl bg-[#F0F6FF] text-[#2B6CB0] items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Phone className="w-7 h-7" />
              </span>
              <p className="mt-5 font-display text-2xl font-medium text-[#1E2430]">{t.contact.callUs}</p>
              <p className="mt-1 text-sm text-[#475569] font-light">{site.contact.phoneDisplay}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#2B6CB0] text-[#2B6CB0] text-sm font-semibold px-6 py-2.5 transition-all duration-300 group-hover:bg-[#2B6CB0] group-hover:text-white">
                {t.contact.callUs}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <button
              onClick={copyEmail}
              data-testid="direct-email-card"
              className="group w-full flex flex-col items-center rounded-3xl bg-white border border-[#1E2430]/10 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              <span className="inline-flex w-14 h-14 rounded-2xl bg-[#FDF2F0] text-[#C47B62] items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Mail className="w-7 h-7" />
              </span>
              <p className="mt-5 font-display text-2xl font-medium text-[#1E2430]">Email</p>
              <p className="mt-1 text-sm text-[#475569] font-light break-all">{site.contact.email}</p>
              <span
                className={`mt-5 inline-flex items-center gap-2 rounded-full border-2 text-sm font-semibold px-6 py-2.5 transition-all duration-300 ${
                  copied
                    ? "border-[#25D366] bg-[#25D366] text-white"
                    : "border-[#C47B62] text-[#C47B62] group-hover:bg-[#C47B62] group-hover:text-white"
                }`}
                data-testid="direct-email-copy-btn"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t.contact.copied : t.contact.copyEmail}
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
