import { site } from "../config/site";
import { cloudinaryWidth } from "../lib/cloudinary";

const PARTNERS = [
  { key: "ria", alt: "Ria", src: site.images.partners.ria, imgClass: "h-12 w-12 rounded-2xl", w: 48, h: 48 },
  {
    key: "western-union",
    alt: "Western Union",
    src: site.images.partners.westernUnion,
    imgClass: "h-10 sm:h-12 w-auto rounded-lg",
    w: 160,
    h: 48,
  },
  {
    key: "transfast",
    alt: "Transfast",
    src: site.images.partners.transfast,
    imgClass: "h-8 sm:h-9 w-auto",
    w: 160,
    h: 36,
  },
  {
    key: "moneygram",
    alt: "MoneyGram",
    src: site.images.partners.moneygram,
    imgClass: "h-8 sm:h-9 w-auto",
    w: 160,
    h: 36,
  },
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
        <img
          src={cloudinaryWidth(p.src, p.w * 2)}
          alt={p.alt}
          width={p.w}
          height={p.h}
          className={p.imgClass}
          loading="lazy"
        />
      </div>
    ))}
  </div>
);

export default PartnerLogos;
