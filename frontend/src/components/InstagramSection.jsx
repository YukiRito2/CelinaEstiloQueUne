import { useEffect } from "react";
import { Instagram } from "lucide-react";
import { site } from "../config/site";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const loadScriptOnce = (src, onload) => {
  if (document.querySelector(`script[src="${src}"]`)) {
    onload?.();
    return;
  }
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (onload) s.onload = onload;
  document.body.appendChild(s);
};

// Feed de Instagram: widget configurado > posts oficiales > tarjeta al perfil
export const InstagramSection = () => {
  const { t } = useLanguage();
  const ig = t.igFeed;
  const conf = site.instagram;
  const mode = conf.widgetScript ? "widget" : conf.posts.length > 0 ? "posts" : "cta";

  useEffect(() => {
    if (mode === "widget") {
      loadScriptOnce(conf.widgetScript);
    } else if (mode === "posts") {
      loadScriptOnce("https://www.instagram.com/embed.js", () => window.instgrm?.Embeds?.process());
      const timer = setTimeout(() => window.instgrm?.Embeds?.process(), 800);
      return () => clearTimeout(timer);
    }
  }, [mode, conf.widgetScript]);

  return (
    <section className="py-24 sm:py-28 bg-[#FDF2F0]" data-testid="instagram-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-mono-brand text-[11px] tracking-[0.35em] uppercase text-[#C47B62] mb-4">{ig.overline}</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {ig.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-xl mx-auto">{ig.subtitle}</p>
        </Reveal>

        {mode === "widget" && (
          <Reveal delay={0.1}>
            <div
              className="mt-12 rounded-3xl bg-white border border-[#F7D8D3] p-4 sm:p-6 shadow-xl shadow-[#874B38]/8"
              data-testid="instagram-widget-container"
              dangerouslySetInnerHTML={{ __html: conf.widgetHtml }}
            />
          </Reveal>
        )}

        {mode === "posts" && (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="instagram-posts-grid">
            {conf.posts.map((url, i) => (
              <Reveal key={url} delay={i * 0.08}>
                <blockquote
                  className="instagram-media w-full rounded-3xl overflow-hidden border border-[#F7D8D3] bg-white"
                  data-instgrm-permalink={`${url.replace(/\/$/, "")}/`}
                  data-instgrm-version="14"
                  data-testid={`instagram-post-${i}`}
                />
              </Reveal>
            ))}
          </div>
        )}

        {mode === "cta" && (
          <Reveal delay={0.1}>
            <div
              className="mt-12 max-w-2xl mx-auto rounded-3xl bg-white border border-[#F7D8D3] shadow-xl shadow-[#874B38]/8 p-10 sm:p-12 text-center"
              data-testid="instagram-cta-card"
            >
              <span
                className="inline-flex w-16 h-16 rounded-2xl items-center justify-center text-white shadow-lg"
                style={{
                  background: "linear-gradient(45deg, #F9CE34 0%, #EE2A7B 55%, #6228D7 100%)",
                }}
              >
                <Instagram className="w-8 h-8" />
              </span>
              <p className="mt-6 text-base sm:text-lg font-light text-[#475569] leading-relaxed">{ig.emptyText}</p>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("instagram_click", { source: "jewelry_page" })}
                data-testid="instagram-profile-btn"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E2430] hover:bg-[#2A3242] text-white font-semibold px-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Instagram className="w-5 h-5" />
                {ig.cta}
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
