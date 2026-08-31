import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { ServicesHub } from "./components/ServicesHub";
import { MoneySection } from "./components/MoneySection";
import { TravelSection } from "./components/TravelSection";
import { JewelrySection } from "./components/JewelrySection";
import { StudioSection } from "./components/StudioSection";
import { TrustSection } from "./components/TrustSection";
import { LocationSection } from "./components/LocationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import TravelPage from "./pages/TravelPage";

const Landing = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.seo.description);
  }, [t]);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ServicesHub />
        <MoneySection />
        <TravelSection />
        <JewelrySection />
        <StudioSection />
        <TrustSection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/viajes" element={<TravelPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
