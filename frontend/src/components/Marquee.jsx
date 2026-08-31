const items = [
  "Envíos de dinero",
  "Agencia de viajes",
  "Bisutería",
  "Diseño web & marketing",
  "La Seu d'Urgell",
  "Estilo que Une",
];

export const Marquee = () => {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden bg-[#0B235E] py-5 border-y border-white/10"
      aria-hidden="true"
      data-testid="editorial-marquee"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-display italic text-xl sm:text-2xl text-white/85 px-8 whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[#04BE4F] text-xs">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
