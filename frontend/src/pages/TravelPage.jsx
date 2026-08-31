import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Backpack,
  Globe2,
  Hotel,
  MessageCircle,
  Navigation,
  Plane,
  Sparkles,
} from "lucide-react";
import { site } from "../config/site";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal, MaskedLine } from "../components/Reveal";

const serviceIcons = [Plane, Hotel, Globe2, Backpack];

export default function TravelPage() {
  const { t } = useLanguage();
  const tp = t.travelPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = tp.seoTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", tp.seoDesc);
  }, [tp]);

  return (
    <div className="App">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className="noise relative overflow-hidden bg-[#F0F6FF] pt-32 pb-20 sm:pb-28"
          data-testid="travel-page-hero"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="orb-float absolute top-16 right-[15%] w-56 h-56 rounded-full bg-[#D8E8FD] blur-2xl opacity-80" />
            <div className="orb-float-slow absolute bottom-0 left-[10%] w-64 h-64 rounded-full bg-[#FDE8E1] blur-2xl opacity-70" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-mono-brand text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#2B6CB0] mb-6"
                data-testid="travel-page-overline"
              >
                {tp.overline}
              </motion.p>

              <h1
                className="font-display text-[#1E2430] font-light leading-[1.02] tracking-tight text-[11vw] sm:text-6xl lg:text-7xl"
                data-testid="travel-page-title"
              >
                <MaskedLine delay={0.25}>{tp.title}</MaskedLine>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 text-base sm:text-lg font-light text-[#475569] max-w-xl leading-relaxed"
                data-testid="travel-page-subtitle"
              >
                {tp.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-9 flex flex-col sm:flex-row gap-4"
              >
                <a
                  href={waLink(t.messages.travel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "travel_page_hero" })}
                  data-testid="travel-page-whatsapp-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {tp.ctaPrimary}
                </a>
                <a
                  href="#destinos"
                  data-testid="travel-page-destinations-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1E2430] text-[#1E2430] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#1E2430] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                >
                  {tp.ctaSecondary}
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="overflow-hidden rounded-t-[9rem] rounded-b-[2rem] border-2 border-white/80 shadow-2xl shadow-[#2B6CB0]/20 aspect-[4/5] max-w-sm mx-auto bg-white">
                  <img
                    src={site.images.travel}
                    alt={t.travel.imageAlt}
                    className="w-full h-full object-cover"
                    loading="eager"
                    data-testid="travel-page-image"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/90 border border-[#C7E0FE] shadow-xl rounded-2xl px-5 py-3 whitespace-nowrap"
                >
                  <p className="font-mono-brand text-[10px] tracking-[0.25em] uppercase text-[#78869A]">
                    {t.travel.badgeOver}
                  </p>
                  <p className="text-sm font-semibold text-[#1A497A]">{tp.heroBadge}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Banda mundo */}
        <div className="bg-[#1E2430] py-5" data-testid="travel-page-world-note">
          <p className="text-center font-display italic text-xl sm:text-2xl text-white/90 flex items-center justify-center gap-3 px-4">
            <Globe2 className="w-5 h-5 text-[#25D366]" />
            {tp.worldNote}
          </p>
        </div>

        {/* Destinos */}
        <section id="destinos" className="py-24 sm:py-32 bg-[#FAF7F2]" data-testid="travel-page-destinations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#2B6CB0] mb-4">
                {t.travel.overline}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
                {tp.destTitle}
              </h2>
              <p className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-2xl mx-auto">{tp.destSub}</p>
            </Reveal>

            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tp.destinations.map((d, i) => (
                <Reveal key={d.title} delay={(i % 3) * 0.1}>
                  <motion.a
                    href={waLink(t.messages.travel)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("travel_click", { source: "travel_page_destination", destination: d.title })}
                    className="group block relative overflow-hidden rounded-3xl border border-white/70 shadow-xl shadow-[#1E2430]/8"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4 }}
                    data-testid={`travel-destination-${i}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={site.images.travelDestinations[i]}
                        alt={d.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E2430]/75 via-[#1E2430]/10 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-2xl font-medium text-white">{d.title}</h3>
                      <p className="mt-1 text-sm font-light text-white/80">{d.text}</p>
                    </div>
                  </motion.a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section className="py-24 sm:py-32 bg-[#F0F6FF]" data-testid="travel-page-services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
                {tp.servicesTitle}
              </h2>
            </Reveal>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tp.services.map((s, i) => {
                const Icon = serviceIcons[i];
                return (
                  <Reveal key={s.title} delay={i * 0.08}>
                    <div
                      className="group h-full rounded-3xl bg-white/85 border border-[#C7E0FE] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2B6CB0]/10"
                      data-testid={`travel-service-${i}`}
                    >
                      <span className="inline-flex w-12 h-12 rounded-2xl bg-[#D8E8FD] text-[#2B6CB0] items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </span>
                      <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-[#1E2430]">{s.title}</h3>
                      <p className="mt-2 text-sm font-light text-[#475569] leading-relaxed">{s.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pasos */}
        <section className="py-24 sm:py-32 bg-[#FAF7F2]" data-testid="travel-page-steps">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#2B6CB0] mb-4">
                <Sparkles className="inline w-4 h-4 -mt-1" />
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
                {tp.stepsTitle}
              </h2>
            </Reveal>
            <div className="mt-14 grid sm:grid-cols-3 gap-5">
              {tp.steps.map((step, i) => (
                <Reveal key={step} delay={i * 0.12}>
                  <div
                    className="rounded-3xl bg-white border border-[#1E2430]/8 p-8 text-center shadow-sm"
                    data-testid={`travel-step-${i}`}
                  >
                    <span className="font-mono-brand text-xs tracking-[0.3em] w-12 h-12 rounded-full bg-[#1E2430] text-white inline-flex items-center justify-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-5 font-medium text-[#1E2430]">{step}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section
          className="noise relative overflow-hidden bg-[#2B2638] py-24 sm:py-28 text-[#F8F5FC]"
          data-testid="travel-page-visit"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.18),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                {tp.visitTitle}
              </h2>
              <p className="mt-5 text-base sm:text-lg font-light text-[#C8C2DB] max-w-xl mx-auto leading-relaxed">
                {tp.visitText}
              </p>
              <p className="mt-4 font-mono-brand text-[11px] tracking-[0.25em] uppercase text-[#9F99B0]">
                {site.address.full}
              </p>
              <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={waLink(t.messages.travel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "travel_page_visit" })}
                  data-testid="travel-page-visit-whatsapp-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  {tp.ctaWhats}
                </a>
                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("directions_click", { source: "travel_page" })}
                  data-testid="travel-page-directions-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E2D4F0]/40 text-[#E2D4F0] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#E2D4F0] hover:text-[#2B2638] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="w-5 h-5" />
                  {tp.ctaVisit}
                </a>
              </div>
              <a
                href="/"
                data-testid="travel-page-back-home"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#9F99B0] hover:text-[#E2D4F0] transition-colors link-underline"
              >
                <ArrowLeft className="w-4 h-4" />
                {tp.back}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
