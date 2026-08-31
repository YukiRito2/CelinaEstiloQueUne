import { PenLine, Star } from "lucide-react";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const GoogleG = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.3 5.3C41 35.4 44 30.2 44 24c0-1.3-.1-2.6-.4-3.9z" />
  </svg>
);

const Stars = ({ n = 5 }) => (
  <div className="flex gap-1 justify-center" aria-label={`${n} / 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < n ? "fill-[#D99776] text-[#D99776]" : "text-[#D99776]/30"}`} />
    ))}
  </div>
);

export const ReviewsSection = () => {
  const { t } = useLanguage();
  const r = t.reviews;
  const items = site.reviews.items;

  return (
    <section id="resenas" className="py-24 sm:py-32 bg-[#FAF7F2]" data-testid="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C88463] mb-4">{r.overline}</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {r.title}
          </h2>
        </Reveal>

        {items.length === 0 ? (
          <Reveal delay={0.1}>
            <div
              className="mt-14 max-w-2xl mx-auto rounded-3xl bg-white border border-[#1E2430]/8 shadow-xl shadow-[#1E2430]/5 p-10 sm:p-12 text-center"
              data-testid="reviews-google-card"
            >
              <div className="flex justify-center">
                <GoogleG />
              </div>
              <p className="mt-6 text-base sm:text-lg font-light text-[#475569] leading-relaxed">{r.emptyText}</p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={site.reviews.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="reviews-read-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {r.readCta}
                </a>
                <a
                  href={site.reviews.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="reviews-write-btn"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D99776] text-[#C47B62] font-semibold px-8 py-4 transition-all duration-300 hover:bg-[#D99776] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PenLine className="w-4 h-4" />
                  {r.writeCta}
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((rev, i) => (
              <Reveal key={`${rev.name}-${i}`} delay={i * 0.1}>
                <figure
                  className="h-full rounded-3xl bg-white border border-[#1E2430]/8 shadow-sm p-8 text-center"
                  data-testid={`review-card-${i}`}
                >
                  <Stars n={rev.rating} />
                  <blockquote className="mt-5 text-sm sm:text-base font-light text-[#475569] leading-relaxed">
                    “{rev.text}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-[#1E2430]">{rev.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
