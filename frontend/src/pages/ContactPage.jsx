import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ContactSection } from "../components/ContactSection";
import { LocationSection } from "../components/LocationSection";

// Contacto + Ubicación fusionados: opciones de contacto y luego dónde estamos
export default function ContactPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t.pagesSeo.contact.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.pagesSeo.contact.desc);
  }, [t]);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-16">
        <ContactSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
