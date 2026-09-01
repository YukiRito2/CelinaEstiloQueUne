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

## Actualización 2026-08-31 (4ª iteración)
- Nuevo hero "Constelación de Conexión": retrato central en arco (bisutería, enlaza a #bisuteria) rodeado de 4 nodos satélite clicables (Envíos → formulario datosdeenvio.vercel.app, Viajes → #viajes, Celina Studio → externo, Ubicación → #ubicacion), conectados por arcos SVG animados (pathLength) con pulsos de luz viajando (animateMotion), orbes pastel flotantes, tilt 3D por puntero (perspective 1400px, springs) y parallax de scroll. Palabra rotativa "Conectamos personas/destinos/estilos/negocios" (trilingüe). Fallback móvil: grid 2x2 de los 4 nodos.
- Catálogo de bisutería enlazado: site.links.jewelry = https://celina-estilo-que-une.vercel.app/ — tarjeta del hub, CTA de la sección (nuevo botón principal + WhatsApp secundario) y opción del hub de contacto apuntan al catálogo externo.
- i18n: nuevas claves hero.connectPrefix/rotateWords/nodes y jewelry.ctaWhatsapp en es/ca/en.
- Verificado: capturas desktop (constelación + tilt + rotación de palabra) y móvil (grid 2x2), hrefs de catálogo y formulario confirmados, sin errores de consola.

## Actualización 2026-08-31 (5ª iteración)
- Micrositio /viajes (src/pages/TravelPage.jsx): hero propio ("El mundo entero, desde La Seu d'Urgell"), banda "Viajamos contigo a cualquier parte del mundo", grid de 6 destinos inspiracionales con fotos (playas, ciudades, cruceros, aventura, escapadas, a medida — sin precios ni ofertas inventadas), 4 servicios, proceso en 3 pasos y CTA final (WhatsApp + cómo llegar + volver al inicio). Trilingüe (i18n.travelPage), title/meta propios por idioma.
- Enrutado con react-router: / (landing) y /viajes. Navbar/Footer prefijan los anchors con "/" fuera de home. Title/meta gestionados por página (LanguageContext ya no fija el título).
- site.links.travel = "/viajes": tarjeta del hub, nodo del hero (desktop y móvil) enlazan a la página. Imágenes de destinos centralizadas en site.images.travelDestinations. sitemap.xml incluye /viajes.
- Verificado: /viajes en ES y CA (título cambia), nav vuelve a "/#inicio", home intacta, tarjeta travel del hub → /viajes, sin errores de consola.

## Actualización 2026-08-31 (6ª iteración)
- Formulario de viaje (src/components/TravelForm.jsx) en /viajes entre pasos y CTA final: destino (obligatorio, validación), fecha ida/vuelta, nº personas, checkbox "fechas flexibles". Al enviar compone un mensaje estructurado y abre WhatsApp (wa.me/34621428021) en pestaña nueva — sin backend, igual que el flujo de envíos. Trilingüe (travelPage.form en i18n). Evento travel_click con source=travel_form y destino.
- Verificado e2e: error si falta destino, popup de WhatsApp con mensaje completo (Destino: Perú / Ida / Vuelta / Personas: 3 / Fechas flexibles: Sí).

## Actualización 2026-08-31 (7ª iteración)
- Viajes redirige al Google Form del negocio (site.links.travelForm): la sección de viajes de la home (CTA principal + alternativa WhatsApp) y la sección de formulario de /viajes. La tarjeta de /viajes destaca "Buscamos las mejores opciones, combinaciones y precios para tu viaje" y advierte: foto de pasaporte a mano (se pide al final) + inicio de sesión con Gmail para subirla. El mini-formulario propio (destino/fechas/personas) se sustituyó por este flujo, que coincide con la automatización de WhatsApp del negocio.
- i18n: travelPage.form reescrito en es/ca/en (bullets pasaporte/Gmail, priceNote, submit, whatsappAlt).
- Verificado: botón home y tarjeta /viajes abren el Google Form; alternativa WhatsApp intacta; sin errores de consola.

## Actualización 2026-08-31 (8ª iteración)
- Póster imprimible con QR en /qr (src/pages/QrPage.jsx, librería `qrcode`): QR generado en cliente hacia site.links.travelForm, marca CELINA, bullets pasaporte/Gmail, dirección y horario; botón Imprimir (no-print) y CSS @media print. Trilingüe.
- Sección Reseñas en home (src/components/ReviewsSection.jsx, entre Confianza y Ubicación): lee site.reviews.items; vacío → tarjeta honesta con logo Google y botones "Leer reseñas en Google" / "Dejar una reseña" (site.reviews.googleUrl). Con items reales → cards con estrellas. NUNCA inventar reseñas: el usuario debe pasarlas.
- Reestructura multi-página: home ligera (Hero, Marquee, Hub, Confianza, Reseñas, Ubicación, Contacto). Nuevas páginas /envios-dinero (MoneyPage: hero menta + Ria/WU + por qué + cómo funciona, CTA → datosdeenvio.vercel.app) y /bisuteria (JewelryPage: hero blush + categorías + muestras + cómo trabajamos + ven a la tienda, CTA → catálogo celina-estilo-que-une.vercel.app). Layout compartido: components/ServicePageLayout.jsx (themes mint/blush/lavender). Los antiguos MoneySection/TravelSection/JewelrySection/StudioSection quedan sin uso en home.
- Enlaces: site.links reestructurado (money→página, moneyForm→externo; jewelry→página, jewelryCatalog→externo; studio→externo celina-studio-app.vercel.app en TODOS los puntos: hub, hero, footer, contacto). Hub cards, nodos del hero y hub de contacto llevan a las páginas internas; Navbar/Footer resuelven anchors vs páginas (pageMap en Footer, linkHref en Navbar).
- i18n: moneyPage, jewelryPage, qrPage, reviews en es/ca/en. Sitemap con /envios-dinero, /viajes, /bisuteria.
- Verificado: home (hub cards correctos), /envios-dinero (title SEO, CTA→formulario), /bisuteria (CTA→catálogo), /qr (QR presente), sin errores de consola.

## Actualización 2026-09-01 (9ª iteración)
- Sitio totalmente multipágina con navegación real (react-router), sin anclas: / (home ligera: hero + marquee + hub + cierre), /servicios, /envios-dinero, /viajes, /bisuteria, /sobre-celina (confianza + reseñas), /ubicacion (mapa + datos), /contacto (hub + tarjetas de datos), /qr (póster viajes), /qr-envios (póster envíos → datosdeenvio.vercel.app). Navbar y footer usan rutas reales; cada página fija su propio title/meta por idioma (i18n.pagesSeo). Sitemap actualizado.
- QrPoster refactor: components/QrPoster.jsx genérico; QrPage (viajes) y QrMoneyPage (envíos) lo reutilizan.
- i18n: nav/footer links a rutas, pagesSeo, qrMoney, homeCta en es/ca/en.
- Verificado: navegación por navbar entre las 5 vistas con cambio de URL y título, logo vuelve a /, póster /qr-envios con QR presente, sin errores de consola.

## Actualización 2026-09-01 (10ª iteración)
- Ubicación y Contacto fusionados en /contacto (ContactSection + LocationSection con mapa); /ubicacion redirige a /contacto (Navigate). "Ubicación" eliminado del menú en es/ca/en; nodo de ubicación del hero → /contacto; sitemap sin /ubicacion. LocationPage.jsx queda sin uso.
- Tarjetas de servicios con imagen identificativa (cabecera visual por servicio: envíos, viajes, bisutería, studio) con número e icono flotantes y degradado hacia el color de cada tarjeta. Imagen de envíos en site.images.money.
- Navbar con estado activo: el enlace de la página actual se ilumina en terracota con una píldora subrayada animada que se desliza entre enlaces (framer-motion layoutId); en el menú móvil, punto terracota junto a la página activa.
- Verificado: /servicios con imágenes, clase activa en Contacto, redirect /ubicacion→/contacto, sin errores de consola.

## Actualización 2026-09-01 (11ª iteración)
- "Cómo llegar" y todos los enlaces de ubicación apuntan a la ficha real de Google del local: site.maps.directions = https://maps.app.goo.gl/6inodAoKQkdFLPvv9 (el embed sigue con la dirección escrita).
- Tercer póster imprimible /qr-bisuteria (QrJewelryPage): QR al catálogo celina-estilo-que-une.vercel.app con las categorías. Pósters: /qr (viajes), /qr-envios (envíos), /qr-bisuteria (bisutería). QrPoster centra bullets sin iconos.
- Página 404 (NotFoundPage, ruta *): "404" serif gigante con reveal, orbes pastel, botones Inicio + WhatsApp, trilingüe (i18n.notFound).
- i18n: qrJewelry + notFound en es/ca/en.
- Verificado: QR bisutería presente, 404 renderiza con título, directions → maps.app.goo.gl del local, sin errores de consola.

## Actualización 2026-09-01 (12ª iteración)
- Todos los enlaces de ubicación/reseñas apuntan a la ficha real del negocio: maps.directions y reviews.googleUrl = https://maps.app.goo.gl/6inodAoKQkdFLPvv9 (botones "Cómo llegar", "Leer reseñas en Google", "Dejar una reseña"). El iframe embebido se mantiene con la dirección escrita.
- Verificado: los 3 botones devuelven la URL del negocio.

## Actualización 2026-09-01 (13ª iteración)
- Sección Instagram en /bisuteria (components/InstagramSection.jsx, tras las fotos de muestra) con 3 modos configurables en site.instagram: (1) widgetScript+widgetHtml (SnapWidget/Behold/Elfsight → feed automático real), (2) posts[] (permalinks → embeds oficiales de Instagram con embed.js), (3) vacío → tarjeta honesta con enlace al perfil @celina_estilqueuneix. Sin contenido falso. i18n igFeed en es/ca/en.
- Nota: Instagram no permite feed automático sin que la dueña conecte un widget (SnapWidget/Behold recomendados) o API de Meta. Cuando pegue el código del proveedor en site.instagram, el feed aparece solo.
- Verificado: modo CTA renderiza y enlaza al perfil real; sin errores de consola.

## Actualización 2026-09-01 (14ª iteración — REVERSIÓN)
- A petición del usuario se deshace el feed de Instagram: eliminado InstagramSection.jsx, su uso en JewelryPage, el bloque site.instagram y las claves igFeed de i18n (es/ca/en). La página /bisuteria vuelve a: hero, categorías+muestras, forma de trabajar, ven a la tienda.
- El enlace de Instagram del footer (perfil real) se mantiene.
- Verificado: sección eliminada, resto de la página intacto.

## Actualización 2026-09-01 (15ª iteración)
- /sobre-celina rediseñada: hero editorial con collage de 3 fotos en arco rotadas, manifiesto numerado (01 Personas, 02 Destinos, 03 Estilos, 04 Negocios) con imágenes alternadas y parallax, banda de cita de marca en lavanda oscuro, pilares, reseñas y cierre a /contacto. i18n aboutPage en es/ca/en.
- Hub de servicios mejorado: guía de 3 pasos ("Elige tu servicio → Te lo explicamos → Contacta"), etiqueta de categoría numerada sobre cada imagen, botones CTA grandes con color de cada servicio, hint "Web independiente · celina-studio-app.vercel.app" en la tarjeta de Studio. i18n services.guide/externalHint en es/ca/en.
- Imagen de Celina Studio sustituida por foto de diseño web/marketing (portátil con web en pantalla): site.images.studio — aplica en hero, hub y Sobre Celina.
- Verificado: /servicios con guía y botones, nodo Studio del hero con nueva imagen, Sobre Celina completa desktop+móvil, sin errores de consola.

## Actualización 2026-09-01 (16ª iteración)
- /envios-dinero rediseñada: visual "órbita de destinos" (La Seu d'Urgell al centro con Ria·Western Union, chips flotantes de Perú, Colombia, Marruecos, Senegal, R. Dominicana y "Y todo el mundo" con arcos punteados animados), banda de transparencia "Sin letra pequeña" (comisiones/importe/plazo explicados antes de confirmar — sin cifras inventadas), pasos como línea de tiempo con conector. i18n: moneyPage.destinations/hereLabel/honestyTitle/honestyText en es/ca/en.
- Verificado: hero con órbita animada, banda, timeline y móvil; sin errores de consola.

## Actualización 2026-09-01 (17ª iteración)
- Botones "Volver" claros en todas las páginas internas (components/BackButton.jsx): servicios→/servicios en /envios-dinero, /viajes, /bisuteria; inicio en /servicios, /sobre-celina, /contacto y legales. FAB WhatsApp respeta safe-area del móvil.
- /contacto renovada: indicador en vivo "Abierto ahora / Ahora cerrado" calculado con site.hoursRange (8–22), tarjetas de servicio con efecto spotlight que sigue el cursor, y bloque "Contacto directo" (WhatsApp, Llamar, Email con copiar al portapapeles y feedback "¡Copiado!"). i18n contact.* en es/ca/en.
- Legal: /aviso-legal, /privacidad, /cookies (config/legal.js, LSSI-CE + RGPD + LOPDGDD) con datos reales del negocio y placeholders [Nombre/NIF] que el titular debe completar. Enlaces legales en el footer (es/ca/en). Sitemap actualizado.
- Verificado: estado en vivo, copia de email, back buttons, página privacidad renderiza, footer legal presente, sin errores de consola.

## Backlog priorizado
- P0: Activar GA4/Meta Pixel con IDs reales (rellenar variables en frontend/.env).
- P0: Páginas especializadas /envios-dinero, /viajes, /bisuteria (cambiar hrefs en site.js → links).
- P1: Dominio propio + actualizar seo.siteUrl, canonical, sitemap y robots.
- P1: Catálogo real de bisutería con fotos propias.
- P1: Añadir Facebook/TikTok cuando existan.
- P2: ~~Versión en catalán~~ (hecho: selector ES/CAT). Valorar versión en inglés.
- P2: Formulario de contacto con envío a email (además de WhatsApp).
