import { useEffect } from "react";
import { Clock3, FileText, MessageCircle, Navigation, Send } from "lucide-react";
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
import { usePageSeo, useBreadcrumbSchema } from "../lib/seo";

const featureIcons = [Clock3, Send, FileText];

export default function DocumentsPage() {
  const { t } = useLanguage();
  const p = t.documentsPage;
  usePageSeo(p.seoTitle, p.seoDesc);
  useBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "CV y documentos", path: "/documentos" },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <ServicePageLayout
          theme="mint"
          overline={p.overline}
          title={p.title}
          subtitle={p.subtitle}
          backTo="/servicios"
          backLabel={t.ui.backServices}
          image={site.images.documents}
          imageAlt={p.overline}
          imageBadgeOver={p.priceOver}
          imageBadgeSub={p.priceSub}
          ctaLabel={p.ctaLabel}
          ctaHref={site.links.documentsForm}
          ctaExternal
          ctaEvent="documents_form_click"
          ctaHint={p.ctaHint}
          whatsappLabel={p.whatsappLabel}
          whatsappMessage={t.messages.documents}
        >
          {/* Por qué hacerlo con Celina */}
          <section className="py-24 sm:py-28 bg-[#FAF7F2]" data-testid="documents-page-features">
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
                        className="group h-full rounded-3xl bg-white border border-[#1E2430]/8 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2D7A54]/10"
                        data-testid={`documents-feature-${i}`}
                      >
                        <span className="inline-flex w-12 h-12 rounded-2xl bg-[#D3EEDD] text-[#2D7A54] items-center justify-center transition-transform duration-500 group-hover:scale-110">
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

          {/* Trae tu documento */}
          <section
            className="noise relative overflow-hidden bg-[#2B2638] py-20 sm:py-24 text-[#F8F5FC]"
            data-testid="documents-page-visit"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(45,122,84,0.18),transparent_55%)]" aria-hidden="true" />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">{p.visitTitle}</h2>
                <p className="mt-4 text-sm sm:text-base font-light text-[#C8C2DB]">
                  {site.address.street} · {site.address.city} — {site.hours}
                </p>
                <p className="mt-2 text-sm sm:text-base font-light text-[#C8C2DB]">{p.visitNote}</p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={site.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("directions_click", { source: "documents_page" })}
                    data-testid="documents-page-directions-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E2D4F0] hover:bg-white text-[#2B2638] font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Navigation className="w-5 h-5" />
                    {t.location.directions}
                  </a>
                  <a
                    href={waLink(t.messages.documents)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "documents_page_visit" })}
                    data-testid="documents-page-whatsapp-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] text-[#188741] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#25D366] hover:text-[#1E2430] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </ServicePageLayout>
        <RelatedServices exclude="documents" />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
