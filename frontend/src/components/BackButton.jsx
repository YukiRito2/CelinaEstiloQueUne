import { ArrowLeft } from "lucide-react";

// Botón "volver" claro, visible en todas las páginas internas (sobre todo móvil)
export const BackButton = ({ to = "/", label, dark = false }) => (
  <a
    href={to}
    data-testid="back-button"
    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-x-1 hover:shadow-md active:scale-[0.97] ${
      dark
        ? "bg-white/10 border border-white/20 text-white backdrop-blur"
        : "bg-white border border-[#1E2430]/10 text-[#1E2430]"
    }`}
  >
    <ArrowLeft className="w-4 h-4 text-[#C47B62]" />
    {label}
  </a>
);
