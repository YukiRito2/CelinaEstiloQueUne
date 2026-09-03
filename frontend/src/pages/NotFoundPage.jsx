import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { MaskedLine } from "../components/Reveal";

export default function NotFoundPage() {
  const { t } = useLanguage();
  const nf = t.notFound;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "404 | CELINA";
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute("content", "noindex, follow");
    return () => {
      if (robots) robots.setAttribute("content", "index, follow");
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <section
          className="noise relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2] px-4"
          data-testid="not-found-page"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="orb-float absolute top-24 left-[15%] w-56 h-56 rounded-full bg-[#FDE8E1] blur-2xl opacity-80" />
            <div className="orb-float-slow absolute bottom-16 right-[12%] w-64 h-64 rounded-full bg-[#E3F5EC] blur-2xl opacity-80" />
            <div className="orb-float absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-[#E8F2FC] blur-xl opacity-70" />
          </div>

          <div className="relative text-center max-w-xl">
            <div
              className="font-display text-[#1E2430] font-light leading-none tracking-tight text-[34vw] sm:text-[12rem]"
              data-testid="not-found-code"
              aria-hidden="true"
            >
              <MaskedLine delay={0.15}>404</MaskedLine>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="font-display text-2xl sm:text-3xl font-medium text-[#1E2430] -mt-4 sm:-mt-8"
            >
              {nf.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-4 text-base font-light text-[#475569]"
            >
              {nf.text}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-9 flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="/"
                data-testid="not-found-home-btn"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                {nf.cta}
              </a>
              <a
                href={waLink(t.messages.general)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="not-found-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] text-[#118476] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#25D366] hover:text-[#1E2430] hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                {t.nav.whatsapp}
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
