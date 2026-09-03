import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Coffee, Globe2, HandHeart, MapPin, Package, Printer, ShieldCheck, Smartphone } from "lucide-react";
import { site } from "../config/site";
import { cloudinaryWidth } from "../lib/cloudinary";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ServicePageLayout } from "../components/ServicePageLayout";
import { Reveal } from "../components/Reveal";
import { PartnerLogos } from "../components/PartnerLogos";
import { RelatedServices } from "../components/RelatedServices";
import { usePageSeo, useBreadcrumbSchema } from "../lib/seo";

const featureIcons = [Globe2, HandHeart, Smartphone];
const extraIcons = [Package, Smartphone, Printer, Coffee];

// Posiciones de los chips de destino alrededor del centro
const chipPositions = [
  "top-2 left-2",
  "top-6 right-0",
  "top-1/2 -translate-y-1/2 -left-2",
  "top-1/2 -translate-y-1/2 -right-1",
  "bottom-14 left-6",
  "bottom-0 right-8",
];

const chipColors = [
  "bg-white/90 border-[#C2E8D2] text-[#1E5238]",
  "bg-white/90 border-[#C7E0FE] text-[#1A497A]",
  "bg-white/90 border-[#F7D8D3] text-[#874B38]",
  "bg-white/90 border-[#E2D4F0] text-[#5B4B8A]",
  "bg-white/90 border-[#D3EEDD] text-[#2D7A54]",
  "bg-[#1E2430] border-[#1E2430] text-white",
];

// Visual: La Seu en el centro y destinos orbitando con arcos
const MoneyVisual = ({ t }) => {
  const dests = t.moneyPage.destinations;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[380px] sm:h-[440px] max-w-md mx-auto"
      data-testid="money-orbit-visual"
    >
      {/* Arcos punteados desde el centro */}
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 440" fill="none" aria-hidden="true">
        {[
          "M200,220 C 140,160 100,120 60,60",
          "M200,220 C 270,160 320,120 360,70",
          "M200,220 C 120,220 60,225 20,220",
          "M200,220 C 280,220 340,225 385,220",
          "M200,220 C 150,300 110,330 80,370",
          "M200,220 C 260,300 300,340 330,400",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#2D7A54"
            strokeOpacity="0.35"
            strokeWidth="1.4"
            strokeDasharray="5 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Centro */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="backdrop-blur-xl bg-white/90 border-2 border-[#C2E8D2] shadow-2xl shadow-[#2D7A54]/20 rounded-3xl px-6 py-5 text-center">
          <span className="inline-flex w-10 h-10 rounded-full bg-[#25D366]/15 items-center justify-center">
            <MapPin className="w-5 h-5 text-[#2D7A54]" />
          </span>
          <p className="mt-2 text-[10px] font-mono-brand tracking-[0.2em] uppercase text-[#626E7E]">
            {t.moneyPage.hereLabel}
          </p>
          <p className="text-base font-bold text-[#1E2430]">La Seu d'Urgell</p>
          <div className="mt-1.5 flex items-center justify-center gap-1.5">
            <img
              src={cloudinaryWidth(site.images.partners.ria, 40)}
              alt="Ria"
              width="16"
              height="16"
              className="h-4 w-4 rounded-md"
            />
            <img
              src={cloudinaryWidth(site.images.partners.westernUnion, 80)}
              alt="Western Union"
              width="26"
              height="14"
              className="h-3.5 w-auto rounded"
            />
            <img
              src={cloudinaryWidth(site.images.partners.transfast, 80)}
              alt="Transfast"
              width="33"
              height="10"
              className="h-2.5 w-auto"
            />
          </div>
        </div>
      </motion.div>

      {/* Chips de destino */}
      {dests.map((d, i) => (
        <motion.div
          key={d}
          className={`absolute ${chipPositions[i]}`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.9 + i * 0.12 }}
        >
          <motion.span
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3.4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className={`inline-block rounded-full border px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur ${chipColors[i]}`}
          >
            {d}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function MoneyPage() {
  const { t } = useLanguage();
  const p = t.moneyPage;
  usePageSeo(p.seoTitle, p.seoDesc);
  useBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Envíos de dinero", path: "/envios-dinero" },
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
          right={<MoneyVisual t={t} />}
          ctaLabel={p.ctaForm}
          ctaHref={site.links.moneyForm}
          ctaExternal
          ctaEvent="money_transfer_click"
          ctaHint={p.ctaHint}
          whatsappLabel={t.money.ctaWhatsapp}
          whatsappMessage={t.messages.money}
        >
          {/* Banda: adelanta tus datos y gana tiempo */}
          <section className="bg-[#EEF7F2] pb-2 pt-4 sm:pt-6" data-testid="money-time-band">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <div className="rounded-3xl bg-[#1E2430] shadow-lg shadow-[#1E2430]/15 px-7 py-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <span className="inline-flex w-14 h-14 rounded-2xl bg-white/10 text-[#25D366] items-center justify-center shrink-0">
                    <Clock3 className="w-7 h-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium text-white">{p.timeTitle}</h2>
                    <p className="mt-2 text-sm sm:text-base font-light text-[#C8CFDB] leading-relaxed max-w-2xl">
                      {p.timeText}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Banda de transparencia */}
          <section className="bg-[#EEF7F2] pb-2 pt-4 sm:pt-6" data-testid="money-honesty-band">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <div className="rounded-3xl bg-white/85 border border-[#C2E8D2] shadow-lg shadow-[#2D7A54]/8 px-7 py-6 sm:px-10 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <span className="inline-flex w-14 h-14 rounded-2xl bg-[#D3EEDD] text-[#2D7A54] items-center justify-center shrink-0">
                    <ShieldCheck className="w-7 h-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1E2430]">{p.honestyTitle}</h2>
                    <p className="mt-2 text-sm sm:text-base font-light text-[#475569] leading-relaxed max-w-2xl">
                      {p.honestyText}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Por qué con Celina */}
          <section className="py-24 sm:py-28 bg-[#FAF7F2]" data-testid="money-page-features">
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
                        className="group h-full rounded-3xl bg-[#EEF7F2] border border-[#C2E8D2] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2D7A54]/10"
                        data-testid={`money-feature-${i}`}
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

          {/* Cómo funciona: línea de tiempo */}
          <section className="py-24 sm:py-28 bg-[#EEF7F2]" data-testid="money-page-steps">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal className="text-center">
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
                  {p.stepsTitle}
                </h2>
              </Reveal>
              <div className="mt-14 relative">
                <div
                  className="hidden sm:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#2D7A54]/20 via-[#2D7A54]/40 to-[#2D7A54]/20"
                  aria-hidden="true"
                />
                <div className="grid sm:grid-cols-3 gap-10 sm:gap-5">
                  {p.steps.map((step, i) => (
                    <Reveal key={step} delay={i * 0.15}>
                      <div className="relative text-center" data-testid={`money-step-${i}`}>
                        <span className="relative z-10 font-mono-brand text-xs tracking-[0.3em] w-12 h-12 rounded-full bg-[#1E2430] text-white inline-flex items-center justify-center shadow-lg shadow-[#1E2430]/20">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-5 font-medium text-[#1E2430] max-w-[240px] mx-auto">{step}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal delay={0.2} className="text-center">
                <p className="mt-12 text-xs text-[#626E7E] font-light">{t.money.note}</p>
              </Reveal>
            </div>
          </section>

          {/* Trabajamos con: logos reales de los proveedores */}
          <section className="py-24 sm:py-28 bg-[#FAF7F2]" data-testid="money-page-partners">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Reveal>
                <p className="font-mono-brand text-[10px] tracking-[0.3em] uppercase text-[#626E7E] mb-8">
                  {t.money.partners}
                </p>
                <PartnerLogos className="grid grid-cols-2 sm:grid-cols-4 gap-4" />
              </Reveal>
            </div>
          </section>

          {/* También en tienda: paquetería, móvil, fotocopias, snacks */}
          <section className="py-24 sm:py-28 bg-[#EEF7F2]" data-testid="money-page-extras">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
                  {p.extrasTitle}
                </h2>
              </Reveal>
              <div className="mt-12 grid sm:grid-cols-2 gap-5">
                {p.extras.map((f, i) => {
                  const Icon = extraIcons[i];
                  return (
                    <Reveal key={f.title} delay={i * 0.1}>
                      <div
                        className="group h-full rounded-3xl bg-white border border-[#C2E8D2] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2D7A54]/10"
                        data-testid={`money-extra-${i}`}
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

          {/* CTA final: recalca rellenar el formulario antes de venir */}
          <section className="py-20 sm:py-24 bg-[#1E2430]" data-testid="money-page-closing-cta">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Reveal>
                <span className="inline-flex w-14 h-14 rounded-2xl bg-white/10 text-[#25D366] items-center justify-center mb-6">
                  <Clock3 className="w-7 h-7" />
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-white">
                  {p.closingTitle}
                </h2>
                <p className="mt-4 text-base sm:text-lg font-light text-[#C8CFDB] leading-relaxed max-w-xl mx-auto">
                  {p.closingText}
                </p>
                <a
                  href={site.links.moneyForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("money_transfer_click", { source: "money_page_closing" })}
                  data-testid="money-page-closing-cta-btn"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-[#EEF7F2] text-[#1E2430] font-semibold px-10 py-5 text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/20"
                >
                  {p.ctaForm}
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </Reveal>
            </div>
          </section>
        </ServicePageLayout>
        <RelatedServices exclude="transfers" />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
