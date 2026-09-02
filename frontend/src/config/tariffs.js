// ============================================================
// Tarifas de los operadores que gestiona Nasertel.
// Datos numéricos neutrales (precios/GB/Mb): las etiquetas de
// texto ("Fibra", "Móvil", "GB ilimitados"...) se traducen desde
// i18n (fiberPage.tariffs). Actualiza aquí precios y planes.
//
// Simyo: prepago y contrato. Jazztel: solo contrato.
// `kind` alimenta el filtro rápido: "mobile" | "combo" | "fiber" | "extras".
// ============================================================

import { site } from "./site";

export const tariffs = [
  {
    id: "simyo",
    name: "Simyo",
    badgeKey: "simyo",
    accent: "#F26722", // naranja Simyo
    logo: site.images.partners.simyo,
    groups: [
      {
        key: "mobile",
        type: "mobile",
        kind: "mobile",
        footnoteKey: "simyoMobileNote",
        items: [
          { mobile: "15GB", price: "5€" },
          { mobile: "50GB", price: "7,5€", tag: "best" },
          { mobile: "100GB", price: "10€" },
          { mobile: "300GB", price: "20€" },
        ],
      },
      {
        key: "fibraMobile",
        type: "combo",
        kind: "combo",
        footnoteKey: "limitedOffer",
        items: [
          { fiber: "600Mb", mobile: "100GB", price: "33,99€" },
          { fiber: "1Gb", mobile: "100GB", price: "35,99€", recommended: true },
          { fiber: "600Mb", mobile: "150GB", price: "37,99€" },
          { fiber: "1Gb", mobile: "150GB", price: "39,99€" },
        ],
      },
      {
        key: "fibra",
        type: "fiber",
        kind: "fiber",
        items: [
          { fiber: "500Mb", price: "25,99€", tag: "new" },
          { fiber: "1Gb", price: "29,99€" },
        ],
      },
      {
        key: "additional",
        type: "mobile",
        kind: "mobile",
        footnoteKey: "simyoAddonCondition",
        items: [
          { mobile: "15GB", price: "3€" },
          { mobile: "50GB", price: "5€" },
          { mobile: "100GB", price: "8€" },
          { mobile: "300GB", price: "12€" },
        ],
      },
      {
        key: "secondHome",
        type: "fiber",
        kind: "fiber",
        footnoteKey: "simyoAddonCondition",
        items: [
          { fiber: "300Mb", price: "15€" },
          { fiber: "600Mb", price: "21,99€" },
          { fiber: "1Gb", price: "23,99€" },
        ],
      },
    ],
  },
  {
    id: "jazztel",
    name: "Jazztel",
    badgeKey: "jazztel",
    accent: "#E6007E", // magenta Jazztel
    logo: site.images.partners.jazztel,
    groups: [
      {
        key: "fibraMobile",
        type: "jazztelCombo",
        kind: "combo",
        footnoteKey: "upgrade1gb",
        items: [
          { fiber: "600Mb", data: "50GB", lines: 1, price: "39,95€", recommended: true },
          { fiber: "600Mb", data: "120GB", share: true, lines: 2, price: "44,95€" },
          { fiber: "600Mb", unlimited: true, lines: 1, price: "49,95€" },
          { fiber: "600Mb", unlimited: true, lines: 2, price: "59,95€" },
        ],
      },
      {
        key: "fibra",
        type: "fiber",
        kind: "fiber",
        items: [
          { fiber: "600Mb", price: "19,95€", tag: "limited", noteKey: "jazztelFinalPrice" },
          { fiber: "1Gb", price: "30,95€" },
        ],
      },
      {
        key: "additional",
        type: "jazztelMobile",
        kind: "mobile",
        items: [
          { mobile: "20GB", share: true, price: "6€" },
          { mobile: "50GB", share: true, price: "9€" },
          { unlimited: true, price: "10€" },
        ],
      },
      {
        key: "tv",
        type: "named",
        kind: "extras",
        footnoteKey: "callsAddon",
        items: [
          { name: "Jazztel TV + Disney+", price: "6,99€", noteKey: "jazztelDisney" },
          { name: "Jazztel TV + Netflix", price: "8,99€", noteKey: "jazztelNetflix" },
          { name: "Jazztel TV + Prime / HBO Max", price: "9,99€", noteKey: "jazztelPrimeHbo" },
          { name: "Orange TV Libre", price: "2,99€", from: true, noteKey: "orangeTvLibre" },
        ],
      },
    ],
  },
];

export default tariffs;
