import { useEffect } from "react";
import { site } from "../config/site";

const setMeta = (selector, attr, value) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Actualiza title, meta description, canonical y Open Graph/Twitter
// para la ruta actual. El HTML servido de inicio trae los valores por
// defecto de la home (ver public/index.html); esto los corrige por
// página una vez carga React, para que compartir un link o navegar
// por la web muestre el título/descripción correctos de cada sección.
export const usePageSeo = (title, description) => {
  useEffect(() => {
    document.title = title;
    const url = `${site.seo.siteUrl}${window.location.pathname}`;

    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [title, description]);
};

// Inyecta un BreadcrumbList (JSON-LD) para la ruta actual.
// items: [{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }, ...]
export const useBreadcrumbSchema = (items) => {
  const key = JSON.stringify(items);
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${site.seo.siteUrl}${item.path}`,
      })),
    };

    let script = document.getElementById("breadcrumb-schema");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "breadcrumb-schema";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => script?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
};

// Inyecta un FAQPage (JSON-LD) para las preguntas del acordeón de la página.
// items: [{ question, answer }, ...]
export const useFaqSchema = (items) => {
  const key = JSON.stringify(items);
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((it) => ({
        "@type": "Question",
        name: it.question,
        acceptedAnswer: { "@type": "Answer", text: it.answer },
      })),
    };

    let script = document.getElementById("faq-schema");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "faq-schema";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => script?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
};
