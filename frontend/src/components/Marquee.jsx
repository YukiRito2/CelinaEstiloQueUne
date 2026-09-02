import { useLanguage } from "../context/LanguageContext";

export const Marquee = () => {
  const { t } = useLanguage();
  const row = [...t.marquee, ...t.marquee];

  return (
    <div
      className="relative overflow-hidden bg-[#F5EFE6] py-5 border-y border-[#1E2430]/8"
      aria-hidden="true"
      data-testid="editorial-marquee"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-display italic text-xl sm:text-2xl text-[#1E2430]/70 px-8 whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[#D99776] text-xs">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
