import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { ServicesHub } from "./components/ServicesHub";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { usePageSeo } from "./lib/seo";
import ServicesPage, { HomeClosing } from "./pages/ServicesPage";

// Rutas fuera de la home en su propio chunk: reduce el bundle inicial
const TravelPage = lazy(() => import("./pages/TravelPage"));
const MoneyPage = lazy(() => import("./pages/MoneyPage"));
const JewelryPage = lazy(() => import("./pages/JewelryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const QrPage = lazy(() => import("./pages/QrPage"));
const QrMoneyPage = lazy(() => import("./pages/QrMoneyPage"));
const QrJewelryPage = lazy(() => import("./pages/QrJewelryPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));

// Home: hub de marca que deriva a la página de cada servicio
const Landing = () => {
  const { t } = useLanguage();
  usePageSeo(t.seo.title, t.seo.description);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
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
            <Route path="/aviso-legal" element={<LegalPage doc="aviso" />} />
            <Route path="/privacidad" element={<LegalPage doc="privacidad" />} />
            <Route path="/cookies" element={<LegalPage doc="cookies" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </LanguageProvider>
  );
}

export default App;
