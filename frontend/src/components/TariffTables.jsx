import { Check, MessageCircle, Smartphone, Star, Tv, Wifi } from "lucide-react";
import { useState } from "react";
import { tariffs } from "../config/tariffs";
import { cloudinaryWidth } from "../lib/cloudinary";
import { waLink } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const groupIcon = { mobile: Smartphone, additional: Smartphone, fibraMobile: Wifi, fibra: Wifi, secondHome: Wifi, tv: Tv };

const composeName = (group, it, L) => {
  switch (group.type) {
    case "combo":
      return `${L.fiber} ${it.fiber} + ${L.mobile} ${it.mobile}`;
    case "mobile":
      return `${L.mobile} ${it.mobile}`;
    case "fiber":
      return `${L.fiber} ${it.fiber}`;
    case "jazztelCombo":
      return `${L.fiber} ${it.fiber}`;
    case "jazztelMobile": {
      const base = it.unlimited ? `${L.mobile} ${L.unlimited}` : `${L.mobile} ${it.mobile}`;
      return it.share ? `${base} · ${L.share}` : base;
    }
    case "named":
      return it.name;
    default:
      return "";
  }
};

const subLabel = (group, it, L) => {
  if (group.type !== "jazztelCombo") return null;
  const dataPart = it.unlimited ? L.unlimited : `+${it.data}${it.share ? ` ${L.share}` : ""}`;
  const linePart = it.lines === 1 ? L.line1 : L.lines2;
  return `${dataPart} · ${linePart}`;
};

const priceText = (it, L) => `${it.from ? `${L.from} ` : ""}${it.price}${L.perMonth}`;

// Tinte suave del color del operador para fondos (badges, iconos)
const tint = (hex, alpha = "1A") => `${hex}${alpha}`;

export const TariffTables = () => {
  const { t } = useLanguage();
  const L = t.fiberPage.tariffs;
  const [filter, setFilter] = useState("all");

  // La tarjeta "recomendada" respeta el filtro activo: si estás viendo
  // "Solo móvil" no tiene sentido destacar una recomendación de combo
  const recommendedPlans = tariffs
    .map((op) => {
      for (const group of op.groups) {
        if (filter !== "all" && group.kind !== filter) continue;
        const it = group.items.find((x) => x.recommended);
        if (it) return { op, group, it };
      }
      return null;
    })
    .filter(Boolean);

  const filterKeys = ["mobile", "combo", "fiber", "all"];
  const matchFilter = (group) => (filter === "all" ? true : group.kind === filter);

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2]" data-testid="fiber-page-tariffs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono-brand text-[11px] tracking-[0.3em] uppercase text-[#15803D] mb-4">Nasertel</p>
          <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-[#1E2430]">{L.title}</h2>
          <p className="mt-4 max-w-2xl text-sm sm:text-base font-light text-[#475569] leading-relaxed">{L.subtitle}</p>
          <p className="mt-2 text-xs font-medium text-[#14532D]">{t.fiberPage.partnerText}</p>
        </Reveal>

        {recommendedPlans.length > 0 && (
          <Reveal delay={0.05}>
            <div className="mt-10" data-testid="tariff-compare">
              <p className="font-mono-brand text-[10px] tracking-[0.2em] uppercase text-[#15803D] mb-4">
                {L.compareTitle}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendedPlans.map(({ op, group, it }) => {
                  const name = composeName(group, it, L);
                  const sub = subLabel(group, it, L);
                  const msg = `${L.cta}: ${op.name} — ${name}${sub ? ` (${sub})` : ""} · ${priceText(it, L)}`;
                  return (
                    <div
                      key={op.id}
                      data-testid={`tariff-compare-${op.id}`}
                      className="relative rounded-3xl bg-white border-2 p-6 flex flex-col shadow-md shadow-black/10"
                      style={{ borderColor: op.accent }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          {op.logo && (
                            <img
                              src={cloudinaryWidth(op.logo, 80)}
                              alt=""
                              loading="lazy"
                              width="32"
                              height="32"
                              className="w-8 h-8 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <span className="font-display text-xl font-semibold" style={{ color: op.accent }}>
                            {op.name}
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1 font-mono-brand text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-white"
                          style={{ backgroundColor: op.accent }}
                        >
                          <Star className="w-3 h-3" fill="currentColor" />
                          {L.recommended}
                        </span>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#1E2430] leading-snug">{name}</p>
                      {sub && <p className="mt-1 text-xs font-light text-[#64748B] leading-snug">{sub}</p>}
                      <p className="mt-3 font-display text-3xl font-medium" style={{ color: op.accent }}>
                        {it.price}
                        <span className="text-xs font-light text-[#64748B]">{L.perMonth}</span>
                      </p>
                      <span className="mt-1 font-mono-brand text-[9px] tracking-[0.12em] uppercase text-[#14532D]">
                        {L.badges[op.badgeKey]}
                      </span>
                      {L.reasons?.[op.id] && (
                        <p className="mt-3 text-xs font-light text-[#475569] leading-snug">{L.reasons[op.id]}</p>
                      )}
                      <a
                        href={waLink(msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("tariff_whatsapp_click", { operator: op.id, plan: name, source: "compare" })
                        }
                        data-testid={`tariff-compare-cta-${op.id}`}
                        style={{ backgroundColor: op.accent }}
                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-6 py-3 text-sm transition-all duration-300 hover:brightness-90 hover:scale-[1.02] active:scale-[0.98] self-start"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {L.cta}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2" data-testid="tariff-filters">
            {filterKeys.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setFilter(k);
                  trackEvent("tariff_filter", { filter: k });
                }}
                data-testid={`tariff-filter-${k}`}
                aria-pressed={filter === k}
                className={`font-mono-brand text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  filter === k
                    ? "bg-[#16A34A] border-[#16A34A] text-white shadow-md"
                    : "bg-white border-[#86EFAC] text-[#14532D] hover:border-[#16A34A]"
                }`}
              >
                {L.filters[k]}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Tabs
            defaultValue={tariffs[0].id}
            className="mt-8"
            onValueChange={(v) => trackEvent("tariff_tab", { operator: v })}
          >
            <TabsList className="h-auto flex-wrap gap-1 rounded-full bg-white border border-[#86EFAC] p-1.5">
              {tariffs.map((op) => (
                <TabsTrigger
                  key={op.id}
                  value={op.id}
                  data-testid={`tariff-tab-${op.id}`}
                  style={{ "--op-accent": op.accent }}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold data-[state=active]:bg-[var(--op-accent)] data-[state=active]:text-white"
                >
                  {op.logo && (
                    <img
                      src={cloudinaryWidth(op.logo, 48)}
                      alt=""
                      loading="lazy"
                      width="20"
                      height="20"
                      className="w-5 h-5 rounded-md object-cover shrink-0"
                    />
                  )}
                  {op.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {tariffs.map((op) => (
              <TabsContent key={op.id} value={op.id} className="mt-8" data-testid={`tariff-panel-${op.id}`}>
                <div className="flex items-center gap-3 mb-8">
                  {op.logo && (
                    <img
                      src={cloudinaryWidth(op.logo, 96)}
                      alt=""
                      loading="lazy"
                      width="40"
                      height="40"
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                  )}
                  <span
                    className="font-display text-2xl font-semibold tracking-tight"
                    style={{ color: op.accent }}
                  >
                    {op.name}
                  </span>
                  <span
                    className="font-mono-brand text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: tint(op.accent), color: op.accent }}
                  >
                    {L.badges[op.badgeKey]}
                  </span>
                </div>

                <div className="space-y-10">
                  {op.groups.filter(matchFilter).map((group) => {
                    const Icon = groupIcon[group.key] || Wifi;
                    return (
                      <div key={group.key} data-testid={`tariff-group-${op.id}-${group.key}`}>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span
                            className="inline-flex w-9 h-9 rounded-xl items-center justify-center"
                            style={{ backgroundColor: tint(op.accent), color: op.accent }}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <h3 className="font-display text-lg sm:text-xl font-medium text-[#1E2430]">
                            {L.groups[group.key]}
                          </h3>
                        </div>
                        {L.groupNotes?.[group.key] && (
                          <p className="ml-11 mb-4 text-xs font-light text-[#64748B] leading-snug">
                            {L.groupNotes[group.key]}
                          </p>
                        )}

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {group.items.map((it, i) => {
                            const name = composeName(group, it, L);
                            const sub = subLabel(group, it, L);
                            const msg = `${L.cta}: ${op.name} — ${name}${sub ? ` (${sub})` : ""} · ${priceText(it, L)}`;
                            return (
                              <div
                                key={i}
                                className={`group relative rounded-2xl bg-white p-5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                  it.recommended ? "border-2 shadow-md shadow-black/10" : "border"
                                }`}
                                style={{ borderColor: it.recommended ? op.accent : "#86EFAC" }}
                                data-testid={`tariff-item-${op.id}-${group.key}-${i}`}
                              >
                                {it.recommended && (
                                  <span
                                    className="self-start mb-2 inline-flex items-center gap-1 font-mono-brand text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-white"
                                    style={{ backgroundColor: op.accent }}
                                  >
                                    <Star className="w-3 h-3" fill="currentColor" />
                                    {L.recommended}
                                  </span>
                                )}
                                {it.tag && (
                                  <span
                                    className="self-start mb-2 font-mono-brand text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full text-white"
                                    style={{ backgroundColor: op.accent }}
                                  >
                                    {L.tags[it.tag]}
                                  </span>
                                )}
                                <p className="text-sm font-semibold text-[#1E2430] leading-snug">{name}</p>
                                {sub && <p className="mt-1 text-xs font-light text-[#64748B] leading-snug">{sub}</p>}
                                <p className="mt-3 font-display text-2xl font-medium" style={{ color: op.accent }}>
                                  {it.from && <span className="text-xs font-light text-[#64748B] mr-1">{L.from}</span>}
                                  {it.price}
                                  <span className="text-xs font-light text-[#64748B]">{L.perMonth}</span>
                                </p>
                                {it.recommended && L.reasons?.[op.id] && (
                                  <p
                                    className="mt-2 text-xs font-light text-[#475569] leading-snug"
                                    data-testid={`tariff-reason-${op.id}`}
                                  >
                                    {L.reasons[op.id]}
                                  </p>
                                )}
                                {it.noteKey && L.itemNotes?.[it.noteKey] && (
                                  <p className="mt-2 text-xs font-light text-[#64748B] leading-snug">
                                    {L.itemNotes[it.noteKey]}
                                  </p>
                                )}
                                <a
                                  href={waLink(msg)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => trackEvent("tariff_whatsapp_click", { operator: op.id, plan: name })}
                                  data-testid={`tariff-cta-${op.id}-${group.key}-${i}`}
                                  style={{ backgroundColor: tint(op.accent, "14"), color: op.accent }}
                                  className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:brightness-95 self-start"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  {L.cta}
                                </a>
                              </div>
                            );
                          })}
                        </div>

                        {group.footnoteKey && (
                          <p className="mt-4 flex items-start gap-2 text-xs font-light text-[#475569]">
                            <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: op.accent }} />
                            {L.footnotes[group.footnoteKey]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-xs font-light text-[#94A3B8] max-w-3xl" data-testid="tariff-disclaimer">
            {L.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default TariffTables;
