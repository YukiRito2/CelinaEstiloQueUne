import { useEffect } from "react";
import { Gem, MapPin, MessageCircle, Navigation, Store, Gift, Smartphone } from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ServicePageLayout } from "../components/ServicePageLayout";
import { Reveal } from "../components/Reveal";

const featureIcons = [Store, Gift, Smartphone];

export default function JewelryPage() {
  const { t } = useLanguage();
  const p = t.jewelryPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = p.seoTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.seoDesc);
  }, [p]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <ServicePageLayout
          theme="blush"
          overline={p.overline}
          title={p.title}
          subtitle={p.subtitle}
          backTo="/servicios"
          backLabel={t.ui.backServices}
          image={site.images.hero}
          imageAlt={t.hero.imageAlt}
          imageBadgeOver={t.jewelry.overline}
          imageBadgeSub={site.hours}
          ctaLabel={p.ctaCatalog}
          ctaHref={site.links.jewelryCatalog}
          ctaExternal
          ctaEvent="jewelry_click"
          whatsappLabel={t.jewelry.ctaWhatsapp}
          whatsappMessage={t.messages.jewelry}
        >
          {/* Categorías */}
          <section className="py-24 sm:py-28 bg-[#FAF7F2]" data-testid="jewelry-page-categories">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal className="text-center">
                <div className="flex flex-wrap justify-center gap-2.5">
                  {t.jewelry.categories.map((c) => (
                    <span
                      key={c}
                      className="px-5 py-2.5 rounded-full bg-[#FDF2F0] border border-[#F7D8D3] text-sm font-medium text-[#874B38] shadow-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>

              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {site.images.jewelry.map((src, i) => (
                  <Reveal key={src} delay={i * 0.12}>
                    <figure className={`group relative overflow-hidden rounded-3xl border border-white/70 shadow-xl shadow-[#874B38]/10 ${i === 1 ? "sm:translate-y-8" : ""}`}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={src}
                          alt={`${t.jewelry.imageAltPrefix} — ${t.jewelry.categories[i]}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          data-testid={`jewelry-page-image-${i}`}
                        />
                      </div>
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B2638]/60 to-transparent p-5">
                        <p className="text-white/90 text-sm font-light flex items-center gap-2">
                          <Gem className="w-4 h-4 text-[#F7D8D3]" />
                          {t.jewelry.categories[i]}
                        </p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2} className="mt-14 text-center">
                <p className="text-sm font-light text-[#78869A] italic">{t.jewelry.sampleNote}</p>
              </Reveal>
            </div>
          </section>

          {/* Forma de trabajar */}
          <section className="py-24 sm:py-28 bg-[#FDF2F0]" data-testid="jewelry-page-features">
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
                        className="group h-full rounded-3xl bg-white/85 border border-[#F7D8D3] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#C47B62]/10"
                        data-testid={`jewelry-feature-${i}`}
                      >
                        <span className="inline-flex w-12 h-12 rounded-2xl bg-[#FBE3DF] text-[#C47B62] items-center justify-center transition-transform duration-500 group-hover:scale-110">
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

          {/* Ven a la tienda */}
          <section className="noise relative overflow-hidden bg-[#2B2638] py-20 sm:py-24 text-[#F8F5FC]" data-testid="jewelry-page-visit">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,153,118,0.15),transparent_55%)]" aria-hidden="true" />
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">{p.visitTitle}</h2>
                <p className="mt-4 text-sm sm:text-base font-light text-[#C8C2DB]">
                  {site.address.street} · {site.address.city} — {site.hours}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={site.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("directions_click", { source: "jewelry_page" })}
                    data-testid="jewelry-page-directions-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E2D4F0] hover:bg-white text-[#2B2638] font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Navigation className="w-5 h-5" />
                    {t.location.directions}
                  </a>
                  <a
                    href={waLink(t.messages.jewelry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "jewelry_page_visit" })}
                    data-testid="jewelry-page-whatsapp-btn"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] text-[#25D366] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </ServicePageLayout>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
