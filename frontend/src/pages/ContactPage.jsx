import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ContactSection } from "../components/ContactSection";
import { DirectContact } from "../components/DirectContact";
import { LocationSection } from "../components/LocationSection";
import { BackButton } from "../components/BackButton";
import { usePageSeo, useBreadcrumbSchema } from "../lib/seo";

// Contacto: opciones por servicio + contacto directo + ubicación
export default function ContactPage() {
  const { t } = useLanguage();
  usePageSeo(t.pagesSeo.contact.title, t.pagesSeo.contact.desc);
  useBreadcrumbSchema([
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-20 bg-[#F5EFE6]">
        <h1 className="sr-only">{t.pagesSeo.contact.h1}</h1>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton to="/" label={t.travelPage.back} />
        </div>
        <ContactSection />
        <DirectContact />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
