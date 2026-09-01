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
