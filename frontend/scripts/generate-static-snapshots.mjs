// Genera un HTML estatico por ruta dentro de build/, con el title,
// meta description, canonical, og/twitter tags y un resumen del
// contenido principal (h1 + texto + enlaces internos) ya presentes
// en el HTML que se sirve antes de que cargue JavaScript.
//
// Por que: esta es una SPA (React + createRoot, sin SSR). El HTML
// que responde el servidor normalmente esta casi vacio hasta que el
// bundle de React se ejecuta. Los crawlers que no ejecutan JS (o lo
// hacen con retraso) ven una pagina sin contenido. Este script no
// cambia nada del comportamiento para las personas que visitan la
// web con JS activado: createRoot() sustituye este HTML en cuanto
// React monta, de forma instantanea y sin errores de hydration
// (no se usa hydrateRoot en este proyecto).
//
// El contenido inyectado sale siempre de las mismas fuentes que usa
// React (src/config/i18n.js, site.js, legal.js) para que no se
// pueda desincronizar del contenido real.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const buildDir = path.join(frontendRoot, "build");

const importSrc = (relPath) => import(pathToFileURL(path.join(frontendRoot, relPath)).href);

const { translations } = await importSrc("src/config/i18n.js");
const { site } = await importSrc("src/config/site.js");
const { legalDocs } = await importSrc("src/config/legal.js");

const es = translations.es;

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const navLinks = es.nav.links;
const footerLinks = es.footer.links;

const legalRoutes = [
  { path: "/aviso-legal", doc: legalDocs.aviso },
  { path: "/privacidad", doc: legalDocs.privacidad },
  { path: "/cookies", doc: legalDocs.cookies },
].map(({ path: p, doc }) => ({
  path: p,
  title: `${doc.title} | Celina Estilo que Une`,
  description: `${doc.title} de Celina Estilo que Une, La Seu d'Urgell.`,
  h1: doc.title,
  intro: doc.sections?.[0]?.p?.[0] || "",
}));

const routes = [
  {
    path: "/",
    title: es.seo.title,
    description: es.seo.description,
    h1: "Celina — Estilo que Une",
    intro: es.hero.subtitle,
  },
  {
    path: "/servicios",
    title: es.pagesSeo.services.title,
    description: es.pagesSeo.services.desc,
    h1: es.pagesSeo.services.h1,
    intro: es.services.subtitle,
  },
  {
    path: "/envios-dinero",
    title: es.moneyPage.seoTitle,
    description: es.moneyPage.seoDesc,
    h1: es.moneyPage.title,
    intro: es.moneyPage.subtitle,
  },
  {
    path: "/viajes",
    title: es.travelPage.seoTitle,
    description: es.travelPage.seoDesc,
    h1: es.travelPage.title,
    intro: es.travelPage.subtitle,
  },
  {
    path: "/bisuteria",
    title: es.jewelryPage.seoTitle,
    description: es.jewelryPage.seoDesc,
    h1: es.jewelryPage.title,
    intro: es.jewelryPage.subtitle,
  },
  {
    path: "/documentos",
    title: es.documentsPage.seoTitle,
    description: es.documentsPage.seoDesc,
    h1: es.documentsPage.title,
    intro: es.documentsPage.subtitle,
  },
  {
    path: "/fibra-optica",
    title: es.fiberPage.seoTitle,
    description: es.fiberPage.seoDesc,
    h1: es.fiberPage.title,
    intro: es.fiberPage.subtitle,
  },
  {
    path: "/sobre-celina",
    title: es.pagesSeo.about.title,
    description: es.pagesSeo.about.desc,
    h1: es.aboutPage.title,
    intro: es.aboutPage.intro,
  },
  {
    path: "/contacto",
    title: es.pagesSeo.contact.title,
    description: es.pagesSeo.contact.desc,
    h1: es.pagesSeo.contact.h1,
    intro: es.contact.subtitle,
  },
  ...legalRoutes,
];

const navHtml = (links) =>
  links
    .map((l) => `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`)
    .join(" ");

const snapshotHtml = (route) => `
<header><a href="/">Celina — Estilo que Une</a></header>
<main>
  <h1>${escapeHtml(route.h1)}</h1>
  ${route.intro ? `<p>${escapeHtml(route.intro)}</p>` : ""}
  <nav aria-label="Principal">${navHtml(navLinks)}</nav>
  <nav aria-label="Servicios">${navHtml(footerLinks)}</nav>
</main>
`.trim();

const replaceTag = (html, regex, replacement) =>
  regex.test(html) ? html.replace(regex, replacement) : html;

const buildPageHtml = (template, route) => {
  const url = `${site.seo.siteUrl}${route.path}`;
  const title = escapeHtml(route.title);
  const desc = escapeHtml(route.description);

  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\/>/, `<meta name="description" content="${desc}"/>`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\/>/, `<link rel="canonical" href="${url}"/>`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\/>/, `<meta property="og:title" content="${title}"/>`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\/>/, `<meta property="og:description" content="${desc}"/>`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\/>/, `<meta property="og:url" content="${url}"/>`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\/>/, `<meta name="twitter:title" content="${title}"/>`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\/>/, `<meta name="twitter:description" content="${desc}"/>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${snapshotHtml(route)}</div>`);
  return html;
};

async function main() {
  if (!existsSync(buildDir)) {
    console.error("[snapshots] No existe build/, ejecuta el build antes.");
    process.exit(1);
  }
  const template = await readFile(path.join(buildDir, "index.html"), "utf-8");

  for (const route of routes) {
    const html = buildPageHtml(template, route);
    if (route.path === "/") {
      await writeFile(path.join(buildDir, "index.html"), html, "utf-8");
    } else {
      const dir = path.join(buildDir, route.path.replace(/^\//, ""));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, "index.html"), html, "utf-8");
    }
  }

  console.log(`[snapshots] Generados ${routes.length} HTML estaticos en build/`);
}

main();
