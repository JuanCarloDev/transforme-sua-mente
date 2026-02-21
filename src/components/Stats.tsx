const stats = [
  { num: "12", label: "Capítulos" },
  { num: "34k", label: "Palavras" },
  { num: "15+", label: "Autores Citados" },
  { num: "30+", label: "Ref. Bíblicas" },
];

export default function Stats() {
  return (
    <section className="py-14 sm:py-25 px-5 sm:px-6 bg-bg-deep">
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-6 sm:py-8 px-3 sm:px-4">
              <div className="font-serif text-[36px] sm:text-[52px] font-bold text-gold leading-none mb-2">
                {s.num}
              </div>
              <div className="text-xs text-text-muted tracking-[1.5px] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
