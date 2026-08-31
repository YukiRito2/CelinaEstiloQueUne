import { useEffect } from "react";
import { motion } from "framer-motion";
import { Globe2, HandHeart, Smartphone } from "lucide-react";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ServicePageLayout } from "../components/ServicePageLayout";
import { Reveal } from "../components/Reveal";

const featureIcons = [Globe2, HandHeart, Smartphone];

const PartnersCard = ({ t }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="backdrop-blur-xl bg-white/60 border border-[#C2E8D2] rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-[#2D7A54]/8 max-w-md mx-auto"
  >
    <p className="font-mono-brand text-[10px] tracking-[0.3em] uppercase text-[#78869A] mb-7 text-center">
      {t.money.partners}
    </p>
    <div className="space-y-4">
      <div className="rounded-2xl bg-white border border-[#C2E8D2] px-8 py-6 flex items-center justify-center shadow-sm" data-testid="partner-badge-ria">
        <span className="text-3xl font-black italic tracking-tight text-[#1E2430]">Ria</span>
      </div>
      <div className="rounded-2xl bg-white border border-[#C2E8D2] px-8 py-6 flex items-center justify-center shadow-sm" data-testid="partner-badge-western-union">
        <span className="text-lg sm:text-xl font-bold tracking-[0.12em] text-[#1E2430]">
          WESTERN <span className="text-[#C88463]">UNION</span>
        </span>
      </div>
    </div>
    <p className="mt-7 text-center text-xs text-[#78869A] font-light">{t.money.note}</p>
  </motion.div>
);

export default function MoneyPage() {
  const { t } = useLanguage();
  const p = t.moneyPage;

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
          theme="mint"
          overline={p.overline}
          title={p.title}
          subtitle={p.subtitle}
          right={<PartnersCard t={t} />}
          ctaLabel={p.ctaForm}
          ctaHref={site.links.moneyForm}
          ctaExternal
          ctaEvent="money_transfer_click"
          whatsappLabel={t.money.ctaWhatsapp}
          whatsappMessage={t.messages.money}
        >
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

          {/* Cómo funciona */}
          <section className="py-24 sm:py-28 bg-[#EEF7F2]" data-testid="money-page-steps">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal className="text-center">
                <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
                  {p.stepsTitle}
                </h2>
              </Reveal>
              <div className="mt-12 grid sm:grid-cols-3 gap-5">
                {p.steps.map((step, i) => (
                  <Reveal key={step} delay={i * 0.12}>
                    <div className="rounded-3xl bg-white border border-[#C2E8D2] p-8 text-center shadow-sm" data-testid={`money-step-${i}`}>
                      <span className="font-mono-brand text-xs tracking-[0.3em] w-12 h-12 rounded-full bg-[#1E2430] text-white inline-flex items-center justify-center">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-5 font-medium text-[#1E2430]">{step}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </ServicePageLayout>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
