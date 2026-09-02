import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const hrefs = {
  transfers: site.links.money,
  travel: site.links.travel,
  jewelry: site.links.jewelry,
  documents: site.links.documents,
};

// Enlaces internos a los demás servicios, para no dejar cada
// página de servicio como un callejón sin salida (SEO + navegación)
export const RelatedServices = ({ exclude }) => {
  const { t } = useLanguage();
  const items = t.services.cards.filter((c) => c.id !== exclude && c.id !== "studio");

  return (
    <section className="py-14 sm:py-16 bg-[#FAF7F2] border-t border-[#1E2430]/5" data-testid="related-services">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="font-mono-brand text-[11px] tracking-[0.3em] uppercase text-[#78869A] mb-5">
            {t.services.discoverAlso}
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {items.map((c) => (
              <a
                key={c.id}
                href={hrefs[c.id]}
                onClick={() => trackEvent("related_service_click", { target: c.id })}
                className="text-sm font-medium text-[#1E2430] link-underline hover:text-[#D99776] transition-colors"
                data-testid={`related-service-${c.id}`}
              >
                {c.title}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
