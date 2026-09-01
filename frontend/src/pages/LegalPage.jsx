import { useEffect } from "react";
import { Scale } from "lucide-react";
import { legalDocs } from "../config/legal";
import { useLanguage } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { BackButton } from "../components/BackButton";
import { Reveal } from "../components/Reveal";

// Página legal genérica: /aviso-legal, /privacidad, /cookies
export default function LegalPage({ doc }) {
  const { t } = useLanguage();
  const d = legalDocs[doc];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${d.title} | Celina Estilo que Une`;
  }, [d]);

  return (
    <div className="App">
      <Navbar />
      <main className="bg-[#FAF7F2]">
        <div className="pt-28 max-w-3xl mx-auto px-4 sm:px-6">
          <BackButton to="/" label={t.travelPage.back} />
        </div>
        <section className="pb-24 sm:pb-32 pt-10" data-testid={`legal-${doc}`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Reveal>
              <span className="inline-flex w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#C88463] items-center justify-center">
                <Scale className="w-6 h-6" />
              </span>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl font-light tracking-tight text-[#1E2430]">
                {d.title}
              </h1>
              <p className="mt-3 font-mono-brand text-[11px] tracking-[0.25em] uppercase text-[#78869A]">
                {d.updated}
              </p>
            </Reveal>

            <div className="mt-12 space-y-10">
              {d.sections.map((s, i) => (
                <Reveal key={s.h} delay={Math.min(i * 0.05, 0.25)}>
                  <section>
                    <h2 className="font-display text-xl sm:text-2xl font-medium text-[#1E2430]">{s.h}</h2>
                    {s.p?.map((par) => (
                      <p key={par.slice(0, 30)} className="mt-3 text-sm sm:text-base font-light text-[#475569] leading-relaxed">
                        {par}
                      </p>
                    ))}
                    {s.list && (
                      <ul className="mt-3 space-y-2">
                        {s.list.map((item) => (
                          <li key={item.slice(0, 30)} className="flex items-start gap-2.5 text-sm sm:text-base font-light text-[#475569] leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D99776] shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
