import { site } from "../config/site";

const PARTNERS = [
  { key: "ria", alt: "Ria", src: site.images.partners.ria, imgClass: "h-12 w-12 rounded-2xl" },
  {
    key: "western-union",
    alt: "Western Union",
    src: site.images.partners.westernUnion,
    imgClass: "h-10 sm:h-12 w-auto rounded-lg",
  },
  { key: "transfast", alt: "Transfast", src: site.images.partners.transfast, imgClass: "h-8 sm:h-9 w-auto" },
];

// Tarjetas con los logotipos reales de los proveedores de envío de dinero
export const PartnerLogos = ({ className = "space-y-4" }) => (
  <div className={className} data-testid="partner-logos">
    {PARTNERS.map((p) => (
      <div
        key={p.key}
        className="rounded-2xl bg-white border border-[#C2E8D2] px-8 py-6 flex items-center justify-center shadow-sm"
        data-testid={`partner-badge-${p.key}`}
      >
        <img src={p.src} alt={p.alt} className={p.imgClass} loading="lazy" />
      </div>
    ))}
  </div>
);

export default PartnerLogos;
