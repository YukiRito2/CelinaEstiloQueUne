import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { TrustSection } from "../components/TrustSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { Reveal } from "../components/Reveal";

export default function AboutPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t.pagesSeo.about.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.pagesSeo.about.desc);
  }, [t]);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-16">
        <section className="py-16 sm:py-20 bg-[#FAF7F2]" data-testid="about-intro">
          <Reveal className="text-center max-w-2xl mx-auto px-4">
            <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C88463] mb-4">
              CELINA — ESTILO QUE UNE
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-[#1E2430]">
              {t.trust.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg font-light text-[#475569] leading-relaxed">{t.footer.concept}</p>
          </Reveal>
        </section>
        <TrustSection />
        <ReviewsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
