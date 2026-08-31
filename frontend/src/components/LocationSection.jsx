import { MapPin, Clock, Phone, Mail, Navigation, MessageCircle } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

export const LocationSection = () => (
  <section id="ubicacion" className="py-24 sm:py-32 bg-[#F5F7FA]" data-testid="location-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">Ubicación</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#0B235E]">
          Ven a conocernos
        </h2>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col gap-4">
          <Reveal>
            <div className="rounded-3xl bg-white border border-[#0B235E]/10 p-7 shadow-sm" data-testid="location-address-card">
              <div className="flex items-start gap-4">
                <span className="inline-flex w-11 h-11 rounded-xl bg-[#0B235E]/5 text-[#0B235E] items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-[#0B235E]">{site.address.street}</p>
                  <p className="text-sm text-[#5A677D] font-light">
                    {site.address.city}
                    <br />
                    {site.address.region}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl bg-white border border-[#0B235E]/10 p-7 shadow-sm" data-testid="location-hours-card">
                <Clock className="w-5 h-5 text-[#0B235E]" />
                <p className="mt-3 text-[10px] font-mono-brand tracking-[0.25em] uppercase text-[#5A677D]">Horario</p>
                <p className="mt-1 text-sm font-medium text-[#0A1224]">{site.hours}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <a
                href={`tel:${site.contact.phone}`}
                onClick={() => trackEvent("phone_click", { source: "location" })}
                data-testid="location-phone-card"
                className="block h-full rounded-3xl bg-white border border-[#0B235E]/10 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Phone className="w-5 h-5 text-[#0B235E]" />
                <p className="mt-3 text-[10px] font-mono-brand tracking-[0.25em] uppercase text-[#5A677D]">Teléfono</p>
                <p className="mt-1 text-sm font-medium text-[#0A1224]">{site.contact.phoneDisplay}</p>
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href={`mailto:${site.contact.email}`}
                data-testid="location-email-card"
                className="block h-full rounded-3xl bg-white border border-[#0B235E]/10 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Mail className="w-5 h-5 text-[#0B235E]" />
                <p className="mt-3 text-[10px] font-mono-brand tracking-[0.25em] uppercase text-[#5A677D]">Email</p>
                <p className="mt-1 text-sm font-medium text-[#0A1224] break-all">{site.contact.email}</p>
              </a>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "location" })}
                data-testid="location-whatsapp-card"
                className="block h-full rounded-3xl bg-[#04BE4F] p-7 shadow-sm text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#04BE4F]/30"
              >
                <MessageCircle className="w-5 h-5" />
                <p className="mt-3 text-[10px] font-mono-brand tracking-[0.25em] uppercase text-white/70">WhatsApp</p>
                <p className="mt-1 text-sm font-semibold">Escríbenos directamente</p>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="h-full">
          <div className="relative h-full min-h-[360px] rounded-3xl overflow-hidden border border-[#0B235E]/10 shadow-xl shadow-[#0B235E]/10 bg-white">
            <iframe
              title="Mapa — Celina Estilo que Une, La Seu d'Urgell"
              src={site.maps.embed}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="location-map-iframe"
            />
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("directions_click", { source: "location" })}
              data-testid="location-directions-btn"
              className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-[#0B235E] text-white text-sm font-semibold px-6 py-3 shadow-xl transition-all duration-300 hover:bg-[#061334] hover:scale-[1.03]"
            >
              <Navigation className="w-4 h-4" />
              Cómo llegar
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
