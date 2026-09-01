import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Printer } from "lucide-react";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

// Póster imprimible con QR (viajes, envíos, ...)
export const QrPoster = ({ target, title, subtitle, highlightNote, bullets = [], bulletIcons = [], testid }) => {
  const { t } = useLanguage();
  const [qr, setQr] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `${title} | CELINA`;
    QRCode.toDataURL(target, {
      width: 640,
      margin: 1,
      color: { dark: "#1E2430", light: "#FFFFFF" },
    }).then(setQr);
  }, [title, target]);

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex flex-col items-center justify-center py-14 px-4">
      <button
        onClick={() => window.print()}
        data-testid="qr-print-btn"
        className="no-print mb-8 inline-flex items-center gap-2 rounded-full bg-[#1E2430] text-white font-semibold px-7 py-3.5 transition-all duration-300 hover:bg-[#2A3242] hover:scale-[1.02] active:scale-[0.98]"
      >
        <Printer className="w-4 h-4" />
        {t.qrPage.printBtn}
      </button>

      <div
        className="w-full max-w-xl bg-white rounded-[2rem] border border-[#1E2430]/8 shadow-2xl shadow-[#1E2430]/10 px-8 sm:px-12 py-12 text-center"
        data-testid={testid}
      >
        <p className="font-display text-4xl font-medium text-[#1E2430]">CELINA</p>
        <p className="font-mono-brand text-[10px] tracking-[0.35em] uppercase text-[#C88463] mt-1">
          Estilo que Une
        </p>

        <h1 className="mt-8 font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">{title}</h1>
        <p className="mt-3 text-sm sm:text-base font-light text-[#475569] max-w-md mx-auto">{subtitle}</p>

        {qr && (
          <div className="mt-8 inline-block rounded-3xl border-2 border-[#1E2430]/10 p-4 bg-white">
            <img src={qr} alt={`QR — ${title}`} className="w-52 h-52 sm:w-64 sm:h-64" data-testid="qr-code-image" />
          </div>
        )}

        {highlightNote && (
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FDF2F0] border border-[#F7D8D3] px-5 py-2.5">
            <p className="text-xs sm:text-sm font-medium text-[#874B38]">{highlightNote}</p>
          </div>
        )}

        {bullets.length > 0 && (
          <ul className={`mt-7 space-y-3 max-w-md mx-auto ${bulletIcons.length > 0 ? "text-left" : "text-center"}`}>
            {bullets.map((b, i) => {
              const Icon = bulletIcons[i];
              return (
                <li key={b} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {Icon && (
                    <span className="inline-flex w-7 h-7 rounded-lg bg-[#D8E8FD] text-[#2B6CB0] items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                  )}
                  {b}
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-9 pt-6 border-t border-[#1E2430]/8">
          <p className="text-sm font-semibold text-[#1E2430]">
            {site.address.street} · {site.address.city}
          </p>
          <p className="mt-1 text-xs text-[#78869A]">
            WhatsApp {site.contact.phoneDisplay} · {site.hours}
          </p>
        </div>
      </div>

      <p className="no-print mt-6 text-xs text-[#78869A] font-light">{t.qrPage.note}</p>
    </div>
  );
};
