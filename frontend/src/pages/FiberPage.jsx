import { useEffect } from "react";
import {
  ArrowUpRight,
  Gauge,
  Layers,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ServicePageLayout } from "../components/ServicePageLayout";
import { Reveal } from "../components/Reveal";
import { RelatedServices } from "../components/RelatedServices";
import { usePageSeo, useBreadcrumbSchema, useFaqSchema } from "../lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const featureIcons = [Gauge, ShieldCheck, Layers];

export default function FiberPage() {
  const { t } = useLanguage();
  const p = t.fiberPage;
  usePageSeo(p.seoTitle, p.seoDesc);
  useBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Fibra óptica y móvil", path: "/fibra-optica" },
  ]);
  useFaqSchema(p.faq);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <ServicePageLayout
          theme="teal"
          overline={p.overline}
          title={p.title}
          subtitle={p.subtitle}
          backTo="/servicios"
          backLabel={t.ui.backServices}
          image={site.images.fiber}
          imageAlt={p.overline}
          imageBadgeOver="Nasertel"
          imageBadgeSub="Telecom · desde 2011"
          ctaLabel={p.ctaLabel}
          ctaHref={waLink(t.messages.fiber)}
          ctaExternal
          ctaEvent="fiber_whatsapp_click"
          ctaHint={p.ctaHint}
          whatsappLabel={p.whatsappLabel}
          whatsappMessage={t.messages.fiber}
        >
          {/* Por qué elegir fibra óptica */}
          <section className="py-24 sm:py-28 bg-[#FAF7F2]" data-testid="fiber-page-features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
                  {p.featuresTitle}
                </h2>
              </Reveal>
              <div className="mt-12 grid sm:grid-cols-3 gap-5">
                {p.features.map((f, i) => {
                  const Icon = featureIcons[i];
                  return (
                    <Reveal key={f.title} delay={i * 0.1}>
                      <div
                        className="group h-full rounded-3xl bg-white border border-[#1E2430]/8 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0E7C86]/10"
                        data-testid={`fiber-feature-${i}`}
                      >
                        <span className="inline-flex w-12 h-12 rounded-2xl bg-[#CFEDED] text-[#0E7C86] items-center justify-center transition-transform duration-500 group-hover:scale-110">
                          <Icon className="w-6 h-6" />
                        </span>
                        <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-[#1E2430]">{f.title}</h3>
                        <p className="mt-2 text-sm font-light text-[#475569] leading-relaxed">{f.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ acordeón */}
          <section className="py-20 sm:py-24 bg-[#E9F6F6]" data-testid="fiber-page-faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="font-mono-brand text-[11px] tracking-[0.3em] uppercase text-[#0E7C86] mb-4">FAQ</p>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
                  {p.featuresTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Accordion type="single" collapsible className="mt-10">
                  {p.faq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border-b border-[#0E7C86]/15"
                      data-testid={`fiber-faq-${i}`}
                    >
                      <AccordionTrigger className="text-base sm:text-lg font-medium text-[#1E2430] hover:no-underline py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base font-light text-[#475569] leading-relaxed pb-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </section>

          {/* ¿Sabías que...? */}
          <section className="py-20 sm:py-24 bg-[#FAF7F2]" data-testid="fiber-page-facts">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
                  {p.factsTitle}
                </h2>
              </Reveal>
              <div className="mt-10 grid sm:grid-cols-3 gap-5">
                {p.facts.map((fact, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div
                      className="h-full rounded-3xl bg-white border border-[#BFE6E6] p-7 flex flex-col gap-4"
                      data-testid={`fiber-fact-${i}`}
                    >
                      <span className="inline-flex w-10 h-10 rounded-xl bg-[#CFEDED] text-[#0E7C86] items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                      </span>
                      <p className="text-sm font-light text-[#475569] leading-relaxed">{fact}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Telefonía móvil */}
          <section
            className="noise relative overflow-hidden bg-[#0B4A50] py-20 sm:py-24 text-[#EAF7F7]"
            data-testid="fiber-page-mobile"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,124,134,0.4),transparent_55%)]"
              aria-hidden="true"
            />
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <p className="font-mono-brand text-[11px] tracking-[0.3em] uppercase text-[#8FD4D9] mb-4">
                  Telefonía móvil
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">{p.mobile.title}</h2>
                <p className="mt-4 max-w-2xl text-sm sm:text-base font-light text-[#B8DDDF] leading-relaxed">
                  {p.mobile.text}
                </p>
              </Reveal>

              <div className="mt-10 grid sm:grid-cols-3 gap-5">
                {p.mobile.points.map((point, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="h-full rounded-3xl bg-white/8 border border-white/12 p-6 flex flex-col gap-4 backdrop-blur-sm">
                      <span className="inline-flex w-11 h-11 rounded-2xl bg-[#0E7C86] text-white items-center justify-center">
                        <Smartphone className="w-5 h-5" />
                      </span>
                      <p className="text-sm font-light text-[#EAF7F7] leading-relaxed">{point}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.operators.map((op) => (
                    <span
                      key={op}
                      className="font-mono-brand text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-[#EAF7F7]"
                      data-testid={`fiber-mobile-operator-${op.toLowerCase()}`}
                    >
                      {op}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href={waLink(t.messages.mobile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("mobile_whatsapp_click", { source: "fiber_page_mobile" })}
                  data-testid="fiber-page-mobile-whatsapp-btn"
                  className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1eb257] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {p.mobile.ctaLabel}
                </a>
              </Reveal>
            </div>
          </section>

          {/* Partner: Nasertel */}
          <section className="py-20 sm:py-24 bg-[#E9F6F6]" data-testid="fiber-page-partner">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Reveal>
                <p className="font-mono-brand text-[11px] tracking-[0.3em] uppercase text-[#0E7C86] mb-5">
                  {p.partnerTitle}
                </p>
                {/* TODO: sustituir por el logo real de Nasertel en PNG cuando esté disponible */}
                <div
                  className="mx-auto inline-flex items-center justify-center rounded-2xl bg-white border border-[#BFE6E6] px-10 py-6 shadow-sm"
                  data-testid="partner-badge-nasertel"
                >
                  <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#0E7C86]">
                    Nasertel
                  </span>
                </div>
                <p className="mt-5 text-sm sm:text-base font-light text-[#475569]">{p.partnerText}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {p.operators.map((op) => (
                    <span
                      key={op}
                      className="font-mono-brand text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full border border-[#BFE6E6] bg-white/70 text-[#0B5158]"
                      data-testid={`fiber-partner-operator-${op.toLowerCase()}`}
                    >
                      {op}
                    </span>
                  ))}
                </div>
                <a
                  href={site.links.fiberPartner}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("nasertel_click", { source: "fiber_page_partner" })}
                  data-testid="fiber-page-partner-link"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0E7C86] link-underline"
                >
                  {p.partnerLink}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Reveal>
            </div>
          </section>

          {/* Cierre */}
          <section
            className="noise relative overflow-hidden bg-[#0E7C86] py-20 sm:py-24 text-white"
            data-testid="fiber-page-visit"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_55%)]"
              aria-hidden="true"
            />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">{p.visitTitle}</h2>
                <p className="mt-4 text-sm sm:text-base font-light text-white/85 max-w-2xl mx-auto">{p.visitNote}</p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={waLink(t.messages.fiber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("fiber_whatsapp_click", { source: "fiber_page_visit" })}
                    data-testid="fiber-page-whatsapp-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0E7C86] font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {p.ctaLabel}
                  </a>
                  <a
                    href={site.links.fiberPartner}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("nasertel_click", { source: "fiber_page_visit" })}
                    data-testid="fiber-page-visit-partner-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 text-white font-semibold px-8 py-4 transition-all duration-300 hover:bg-white hover:text-[#0E7C86] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {p.partnerLink}
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </ServicePageLayout>
        <RelatedServices exclude="fiber" />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
