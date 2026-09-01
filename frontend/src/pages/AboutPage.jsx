import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { TrustSection } from "../components/TrustSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { BackButton } from "../components/BackButton";
import { Reveal, MaskedLine } from "../components/Reveal";

// Collage editorial: 3 imágenes en arco rotadas con flotación
const Collage = () => (
  <div className="relative h-[380px] sm:h-[440px] hidden md:block" aria-hidden="true">
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -7 }}
      animate={{ opacity: 1, y: 0, rotate: -7 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-8 w-44 sm:w-52 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-white shadow-xl shadow-[#2D7A54]/15 aspect-[3/4]"
    >
      <img src={site.images.money} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 4 }}
      transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 -translate-x-1/2 top-0 w-44 sm:w-52 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-white shadow-2xl shadow-[#874B38]/20 aspect-[3/4] z-10"
    >
      <img src={site.images.jewelry[0]} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 8 }}
      animate={{ opacity: 1, y: 0, rotate: 8 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-28 w-40 sm:w-48 overflow-hidden rounded-t-full rounded-b-2xl border-2 border-white shadow-xl shadow-[#2B6CB0]/15 aspect-[3/4]"
    >
      <img src={site.images.travel} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
    <div className="orb-float absolute -bottom-6 left-1/3 w-40 h-40 rounded-full bg-[#E3F5EC] blur-2xl opacity-80" />
  </div>
);

const chapterImages = [site.images.money, site.images.travel, site.images.jewelry[2], site.images.studio];
const chapterTints = ["text-[#2D7A54]/35", "text-[#2B6CB0]/35", "text-[#C47B62]/35", "text-[#A78BFA]/45"];
const chapterShadows = [
  "shadow-[#2D7A54]/15",
  "shadow-[#2B6CB0]/15",
  "shadow-[#C47B62]/15",
  "shadow-[#A78BFA]/20",
];

const Chapter = ({ num, title, text, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-12 gap-6 md:gap-8 items-center border-t border-[#1E2430]/8 py-12 sm:py-14"
      data-testid={`about-chapter-${index}`}
    >
      <Reveal className={`md:col-span-3 ${flip ? "md:order-2" : ""}`}>
        <span className={`font-display text-7xl sm:text-8xl font-light leading-none ${chapterTints[index]}`}>
          {num}
        </span>
      </Reveal>
      <Reveal delay={0.08} className={`md:col-span-4 ${flip ? "md:order-3" : ""}`}>
        <h3 className="font-display text-3xl sm:text-4xl italic font-medium text-[#1E2430]">{title}</h3>
        <p className="mt-3 text-sm sm:text-base font-light text-[#475569] leading-relaxed">{text}</p>
      </Reveal>
      <Reveal delay={0.16} className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <motion.div
          style={{ y: imgY }}
          className={`overflow-hidden rounded-3xl border border-white/70 shadow-xl ${chapterShadows[index]} aspect-[16/9] ${flip ? "md:-rotate-2" : "md:rotate-2"}`}
        >
          <img src={chapterImages[index]} alt={title} className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
      </Reveal>
    </div>
  );
};

export default function AboutPage() {
  const { t } = useLanguage();
  const ap = t.aboutPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = t.pagesSeo.about.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.pagesSeo.about.desc);
  }, [t]);

  return (
    <div className="App">
      <Navbar />
      <main>
        {/* Hero editorial con collage */}
        <section className="noise relative overflow-hidden bg-[#FAF7F2] pt-28 pb-20 sm:pb-24" data-testid="about-hero">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <BackButton to="/" label={t.travelPage.back} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-mono-brand text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#C88463] mb-6"
                data-testid="about-overline"
              >
                {ap.overline}
              </motion.p>
              <h1
                className="font-display text-[#1E2430] font-light leading-[1.02] tracking-tight text-[11vw] sm:text-6xl lg:text-7xl"
                data-testid="about-title"
              >
                <MaskedLine delay={0.25}>{ap.title}</MaskedLine>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-7 text-base sm:text-lg font-light text-[#475569] max-w-xl leading-relaxed"
                data-testid="about-intro"
              >
                {ap.intro}
              </motion.p>
            </div>
            <div className="lg:col-span-5">
              <Collage />
            </div>
          </div>
        </section>

        {/* Manifiesto numerado */}
        <section className="py-10 sm:py-14 bg-[#FAF7F2]" data-testid="about-manifesto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#78869A] mb-2">
                {ap.manifestoOverline}
              </p>
            </Reveal>
            {ap.chapters.map((c, i) => (
              <Chapter key={c.title} num={String(i + 1).padStart(2, "0")} title={c.title} text={c.text} index={i} />
            ))}
          </div>
        </section>

        {/* Cita de marca */}
        <section className="noise relative overflow-hidden bg-[#2B2638] py-24 sm:py-32 text-center" data-testid="about-quote">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.15),transparent_60%)]"
            aria-hidden="true"
          />
          <Reveal className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <p className="font-display italic font-light text-3xl sm:text-5xl lg:text-6xl text-[#F8F5FC] leading-tight">
              “{ap.quote}”
            </p>
            <p className="mt-8 font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#D99776]">
              CELINA — ESTILO QUE UNE
            </p>
          </Reveal>
        </section>

        <TrustSection />
        <ReviewsSection />

        {/* Cierre */}
        <section className="py-20 sm:py-24 bg-[#F5EFE6]" data-testid="about-closing">
          <Reveal className="text-center max-w-2xl mx-auto px-4">
            <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">
              {t.location.title}
            </h2>
            <a
              href="/contacto"
              data-testid="about-contact-btn"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {ap.visitCta}
              <ArrowRight className="w-5 h-5" />
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
