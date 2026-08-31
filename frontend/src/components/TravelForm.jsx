import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";

const inputClass =
  "w-full rounded-xl border border-[#C7E0FE] bg-white px-4 py-3.5 text-sm text-[#1E2430] placeholder:text-[#78869A] outline-none transition-all duration-300 focus:border-[#2B6CB0] focus:ring-4 focus:ring-[#2B6CB0]/10";

export const TravelForm = () => {
  const { t } = useLanguage();
  const f = t.travelPage.form;
  const [dest, setDest] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("2");
  const [flex, setFlex] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!dest.trim()) {
      setError(f.errorDest);
      return;
    }
    setError("");
    const lines = [f.msgIntro, `${f.msgDest}: ${dest.trim()}`];
    if (from) lines.push(`${f.msgFrom}: ${from}`);
    if (to) lines.push(`${f.msgTo}: ${to}`);
    lines.push(`${f.msgPeople}: ${people}`);
    lines.push(`${f.msgFlex}: ${flex ? f.msgYes : f.msgNo}`);
    trackEvent("travel_click", { source: "travel_form", destination: dest.trim() });
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 sm:py-32 bg-[#F0F6FF]" data-testid="travel-form-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1E2430]">
            {f.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg font-light text-[#475569] max-w-xl mx-auto">{f.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mt-12 rounded-3xl bg-white border border-[#C7E0FE] shadow-xl shadow-[#2B6CB0]/8 p-7 sm:p-10"
            data-testid="travel-form"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="travel-dest" className="block text-sm font-semibold text-[#1E2430] mb-2">
                  {f.destLabel} *
                </label>
                <input
                  id="travel-dest"
                  type="text"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder={f.destPlaceholder}
                  className={inputClass}
                  data-testid="travel-form-destination-input"
                />
                {error && (
                  <p className="mt-2 text-sm text-[#C47B62] font-medium" data-testid="travel-form-error">
                    {error}
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="travel-from" className="block text-sm font-semibold text-[#1E2430] mb-2">
                    {f.fromLabel}
                  </label>
                  <input
                    id="travel-from"
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className={inputClass}
                    data-testid="travel-form-from-input"
                  />
                </div>
                <div>
                  <label htmlFor="travel-to" className="block text-sm font-semibold text-[#1E2430] mb-2">
                    {f.toLabel}
                  </label>
                  <input
                    id="travel-to"
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    min={from || undefined}
                    className={inputClass}
                    data-testid="travel-form-to-input"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 items-end">
                <div>
                  <label htmlFor="travel-people" className="block text-sm font-semibold text-[#1E2430] mb-2">
                    {f.peopleLabel}
                  </label>
                  <input
                    id="travel-people"
                    type="number"
                    min="1"
                    max="30"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className={inputClass}
                    data-testid="travel-form-people-input"
                  />
                </div>
                <label
                  className="flex items-center gap-3 cursor-pointer rounded-xl border border-[#C7E0FE] bg-[#F0F6FF] px-4 py-3.5 select-none"
                  data-testid="travel-form-flex-checkbox"
                >
                  <input
                    type="checkbox"
                    checked={flex}
                    onChange={(e) => setFlex(e.target.checked)}
                    className="w-4 h-4 accent-[#2B6CB0]"
                  />
                  <span className="text-sm font-medium text-[#1A497A]">{f.flexLabel}</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              data-testid="travel-form-submit-button"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 text-base transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="w-5 h-5" />
              {f.submit}
              <MessageCircle className="w-5 h-5" />
            </button>
            <p className="mt-4 text-center text-xs text-[#78869A] font-light">{f.note}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
