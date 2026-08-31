import { useEffect } from "react";
import Lenis from "lenis";
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
import { LanguageProvider } from "./context/LanguageContext";

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
    </LanguageProvider>
  );
}

export default App;
