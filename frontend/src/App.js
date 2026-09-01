import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { ServicesHub } from "./components/ServicesHub";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import ServicesPage, { HomeClosing } from "./pages/ServicesPage";
import TravelPage from "./pages/TravelPage";
import MoneyPage from "./pages/MoneyPage";
import JewelryPage from "./pages/JewelryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import QrPage from "./pages/QrPage";
import QrMoneyPage from "./pages/QrMoneyPage";
import QrJewelryPage from "./pages/QrJewelryPage";
import NotFoundPage from "./pages/NotFoundPage";

// Home: hub de marca que deriva a la página de cada servicio
const Landing = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <HomeClosing />
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
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/envios-dinero" element={<MoneyPage />} />
          <Route path="/viajes" element={<TravelPage />} />
          <Route path="/bisuteria" element={<JewelryPage />} />
          <Route path="/sobre-celina" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/ubicacion" element={<Navigate to="/contacto" replace />} />
          <Route path="/qr" element={<QrPage />} />
          <Route path="/qr-envios" element={<QrMoneyPage />} />
          <Route path="/qr-bisuteria" element={<QrJewelryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
