import { MessageCircle, Globe2, HandHeart, ShieldCheck } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { Reveal } from "./Reveal";

const points = [
  { icon: Globe2, text: "Envíos a cualquier parte del mundo" },
  { icon: HandHeart, text: "Te acompañamos durante todo el proceso" },
  { icon: ShieldCheck, text: "Resolvemos tus dudas antes de enviar" },
];

export const MoneySection = () => (
  <section
    id="envios-dinero"
    className="noise relative overflow-hidden bg-[#0B235E] py-24 sm:py-32 text-white"
    data-testid="money-transfer-section"
  >
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(4,190,79,0.18),transparent_60%)]"
      aria-hidden="true"
    />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
      <Reveal>
        <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#04BE4F] mb-4">
          Envíos de dinero
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
          Conecta con quienes están lejos
        </h2>
        <p className="mt-5 text-base sm:text-lg font-light text-white/75 leading-relaxed max-w-lg">
          Envía dinero desde La Seu d'Urgell a cualquier parte del mundo. Te ayudamos durante el
          proceso y resolvemos tus dudas antes de realizar tu envío.
        </p>

        <ul className="mt-8 space-y-4">
          {points.map((p) => (
            <li key={p.text} className="flex items-center gap-3 text-sm sm:text-base text-white/85">
              <span className="inline-flex w-9 h-9 rounded-xl bg-[#04BE4F]/15 items-center justify-center text-[#04BE4F]">
                <p.icon className="w-5 h-5" />
              </span>
              {p.text}
            </li>
          ))}
        </ul>

        <a
          href={waLink(site.whatsappMessages.money)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "money_section" })}
          data-testid="money-consult-whatsapp-btn"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#04BE4F] hover:bg-[#039C40] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5" />
          Consultar envío
        </a>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] p-8 sm:p-12">
          <p className="font-mono-brand text-[10px] tracking-[0.3em] uppercase text-white/50 mb-8 text-center">
            Trabajamos con
          </p>
          <div className="space-y-5">
            <div
              className="rounded-2xl bg-white px-8 py-7 flex items-center justify-center shadow-lg"
              data-testid="partner-badge-ria"
            >
              <span className="text-3xl sm:text-4xl font-black italic tracking-tight text-[#0B235E]">
                Ria
              </span>
            </div>
            <div
              className="rounded-2xl bg-white px-8 py-7 flex items-center justify-center shadow-lg"
              data-testid="partner-badge-western-union"
            >
              <span className="text-xl sm:text-2xl font-bold tracking-[0.12em] text-[#0B235E]">
                WESTERN <span className="text-[#D4AF37]">UNION</span>
              </span>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-white/50 font-light">
            Condiciones, comisiones y plazos según destino. Consúltanos sin compromiso.
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);
