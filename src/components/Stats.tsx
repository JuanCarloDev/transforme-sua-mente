const stats = [
  { num: "12", label: "Capítulos" },
  { num: "34k", label: "Palavras" },
  { num: "15+", label: "Autores Citados" },
  { num: "30+", label: "Ref. Bíblicas" },
];

export default function Stats() {
  return (
    <section className="py-25 px-6 bg-bg-deep">
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="grid grid-cols-4 gap-8 max-[900px]:grid-cols-2 max-[900px]:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center py-8 px-4">
              <div className="font-serif text-[52px] max-[600px]:text-[40px] font-bold text-gold leading-none mb-2">
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
