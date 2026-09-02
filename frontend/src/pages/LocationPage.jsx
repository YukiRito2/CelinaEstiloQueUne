import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LocationSection } from "../components/LocationSection";

export default function LocationPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t.pagesSeo.location.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.pagesSeo.location.desc);
  }, [t]);

  return (
    <div className="App">
      <Navbar />
      <main className="pt-16">
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
