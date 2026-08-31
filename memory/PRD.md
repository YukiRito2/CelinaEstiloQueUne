# PRD — CELINA · ESTILO QUE UNE (Web principal / Hub de marca)

## Problem statement original
Web principal moderna y orientada a conversión para Celina (La Seu d'Urgell). Función: presentar la marca, generar confianza y derivar a las áreas especializadas (Celina Studio, envíos de dinero, viajes, bisutería). Concepto: "Estilo que Une" — conectamos personas, destinos, estilos y negocios. Sin contenido falso (precios, tarifas, testimonios, estadísticas). Mobile-first, WhatsApp siempre accesible, SEO local para La Seu d'Urgell, configuración centralizada.

## User personas
- Vecinos de La Seu d'Urgell / Alt Urgell / Andorra que necesitan enviar dinero al extranjero (Ria, Western Union).
- Personas que buscan viajes con atención personalizada.
- Compradores de bisutería y accesorios.
- Pequeños negocios que necesitan presencia digital (Celina Studio).
- Comunidad internacional/latinoamericana de la zona. Llegada mayoritaria: Google, Instagram, TikTok, QR, WhatsApp (móvil).

## Arquitectura
- Frontend: React (CRA + craco), Tailwind, framer-motion (revelados y micro-interacciones), lenis (scroll suave).
- Configuración centralizada: `src/config/site.js` (datos de negocio, URLs, redes, mensajes WhatsApp, imágenes, SEO, analytics).
- Utilidades: `src/lib/whatsapp.js` (deep links wa.me), `src/lib/analytics.js` (eventos GA4/Meta).
- SEO: `public/index.html` (meta, OG, Twitter, JSON-LD LocalBusiness, carga condicional GA4/Meta Pixel), `robots.txt`, `sitemap.xml`, `favicon.svg`.
- Backend FastAPI: sin cambios (no necesario para esta landing).

## Datos de negocio configurados (reales)
- WhatsApp / teléfono: +34 621 42 80 21 · Email: celina.env.r@gmail.com
- Dirección: Avinguda del Salòria, 34, 25700 La Seu d'Urgell, Lleida
- Horario: Todos los días 08:00 – 22:00
- Instagram: https://www.instagram.com/celina_estilqueuneix/
- Celina Studio: https://celina-studio-app.vercel.app/
- Facebook/TikTok: variables vacías listas para rellenar
- GA4/Meta Pixel: variables REACT_APP_GA_MEASUREMENT_ID / REACT_APP_META_PIXEL_ID creadas (vacías)

## Implementado (2026-08-31)
- Navbar fija con glassmorphism al hacer scroll + menú hamburguesa móvil a pantalla completa.
- Hero cinético con revelado línea a línea enmascarado, composición abstracta SVG (arcos de conexión), foto con marco recortado y parallax, badges flotantes (Ria · Western Union, La Seu d'Urgell).
- Marquee editorial lento en banda navy.
- Hub de 4 servicios en grid bento numerado (01–04) con CTAs.
- Sección envíos de dinero (navy) con badges Ria / Western Union, sin tarifas inventadas, CTA WhatsApp.
- Sección viajes con imagen parallax y 4 tarjetas (Vuelos, Alojamientos, Destinos, Experiencias).
- Sección bisutería con categorías y 3 fotos marcadas como "imágenes de muestra".
- Sección Celina Studio diferenciada (dark tech, retícula, chips de servicios, enlace externo configurable).
- "Más que un local" — 4 pilares de confianza.
- Ubicación con mapa Google Maps embebido real, tarjetas de dirección/horario/teléfono/email/WhatsApp y botón "Cómo llegar".
- Hub de contacto con 4 opciones → WhatsApp con mensajes predefinidos por servicio.
- Footer con navegación, Instagram real y redes condicionales.
- Botón flotante WhatsApp con pulso.
- Eventos de analítica: whatsapp_click, money_transfer_click, travel_click, jewelry_click, studio_click, directions_click, phone_click.
- data-testid en todos los elementos interactivos.

## Verificación
- curl: frontend 200, /api 200, robots.txt 200, sitemap.xml 200.
- Screenshots desktop (hero, servicios, envíos, viajes, bisutería, studio, confianza, ubicación, contacto, footer) y móvil (hero, menú, servicios). Sin errores de consola. Enlaces wa.me y Celina Studio verificados.

## Actualización 2026-08-31 (2ª iteración)
- Web bilingüe ES/CA: selector ES/CAT en navbar (desktop + móvil), persistencia en localStorage, `html lang` y meta title/description se actualizan al cambiar. Todos los textos en `src/config/i18n.js` (es/ca), incluidos los mensajes predefinidos de WhatsApp en catalán.
- Paleta pastel completa (a petición de la dueña): crema alabastro #FAF7F2, menta #EEF7F2 (envíos), celeste #F0F6FF (viajes), rosa #FDF2F0 (bisutería), lavanda oscuro #2B2638 (Celina Studio) y footer #26232E, terracota #C88463 como acento, verde WhatsApp #25D366 para CTAs. Texto ink #1E2430 (contraste WCAG AA).
- Hero con efecto 3D: escena con perspective + preserve-3d, tilt por puntero (rotateX/rotateY con springs), orbes pastel flotantes (profundidad -40px), retrato (35px) y badges de cristal (75px/110px).
- Nota técnica: animar transform con framer-motion en un elemento con translateZ rompe la profundidad — los badges usan solo fade.
- Verificado: capturas desktop/móvil, cambio ES→CA (título, lang, textos), enlaces wa.me, sin errores de consola.

## Actualización 2026-08-31 (3ª iteración)
- Idioma inglés (EN) añadido: selector ES/CAT/EN, traducción completa en `src/config/i18n.js`, persistencia y meta dinámicas igual que ES/CA.
- Envíos de dinero redirigen al formulario externo https://datosdeenvio.vercel.app/ (`site.links.money`): tarjeta del hub, CTA principal de la sección y opción del hub de contacto. La sección explica el proceso en 3 pasos (rellenar datos → se envían por WhatsApp → cotización en tienda o por WhatsApp) y mantiene alternativa "consúltanos por WhatsApp".
- Analítica: `trackEvent` añade automáticamente el parámetro `language` (es/ca/en) a todos los eventos para medir contacto por servicio e idioma. GA4/Meta Pixel siguen esperando los IDs reales (REACT_APP_GA_MEASUREMENT_ID / REACT_APP_META_PIXEL_ID en frontend/.env) — solicitados al usuario.
- Verificado: cambio a EN (título, lang, textos), los 3 CTAs de envío apuntan a datosdeenvio.vercel.app, pasos visibles, sin errores de consola.

## Backlog priorizado
- P0: Activar GA4/Meta Pixel con IDs reales (rellenar variables en frontend/.env).
- P0: Páginas especializadas /envios-dinero, /viajes, /bisuteria (cambiar hrefs en site.js → links).
- P1: Dominio propio + actualizar seo.siteUrl, canonical, sitemap y robots.
- P1: Catálogo real de bisutería con fotos propias.
- P1: Añadir Facebook/TikTok cuando existan.
- P2: ~~Versión en catalán~~ (hecho: selector ES/CAT). Valorar versión en inglés.
- P2: Formulario de contacto con envío a email (además de WhatsApp).
