import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ServicesHub } from "../components/ServicesHub";
import { BackButton } from "../components/BackButton";
import { Reveal } from "../components/Reveal";
import { usePageSeo } from "../lib/seo";

export const HomeClosing = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 sm:py-24 bg-[#F5EFE6]" data-testid="home-closing-cta">
      <Reveal className="text-center max-w-2xl mx-auto px-4">
        <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
          {t.contact.title}
        </h2>
        <a
          href="/contacto"
          data-testid="home-closing-contact-btn"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.homeCta}
          <ArrowRight className="w-5 h-5" />
        </a>
      </Reveal>
    </section>
  );
};

export default function ServicesPage() {
  const { t } = useLanguage();
  usePageSeo(t.pagesSeo.services.title, t.pagesSeo.services.desc);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-20">
        <h1 className="sr-only">{t.pagesSeo.services.h1}</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton to="/" label={t.travelPage.back} />
        </div>
        <ServicesHub />
        <HomeClosing />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
