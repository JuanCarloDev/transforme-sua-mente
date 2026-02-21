const painCards = [
  {
    icon: "\u{1FA9E}",
    title: "Medo de não ser suficiente",
    desc: 'Críticas internalizadas na infância que se tornaram crenças: "não sou bom o bastante", "não mereço amor".',
  },
  {
    icon: "\u{1F512}",
    title: "Padrões que se repetem",
    desc: "Relacionamentos que sempre terminam igual. Autossabotagem quando tudo parece dar certo. O ciclo que não se quebra.",
  },
  {
    icon: "\u{1F30A}",
    title: "Ansiedade e vazio crônico",
    desc: "A hipervigilância constante, a dificuldade de confiar, a sensação de que algo essencial está faltando dentro de você.",
  },
];

export default function PainPoints() {
  return (
    <section
      className="py-25 px-6 relative border-t border-b border-border"
      style={{
        background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(179, 90, 90, 0.04) 0%, transparent 60%), var(--color-bg-deep)`,
      }}
    >
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium mb-4">
          Você se reconhece?
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-5 tracking-tight">
          As feridas que ninguém vê
          <br />
          mas que controlam tudo
        </h2>
        <p className="text-base text-text-dim max-w-[600px] leading-[1.8] mb-14">
          Muitos adultos carregam dores da infância sem perceber como elas moldam cada decisão, cada
          relacionamento, cada padrão de autossabotagem.
        </p>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {painCards.map((card) => (
            <div
              key={card.title}
              className="p-8 border border-border rounded-2xl bg-bg-card transition-all duration-400 hover:border-border-glow hover:bg-bg-card-hover hover:-translate-y-1"
            >
              <span className="text-[28px] mb-4 block">{card.icon}</span>
              <h3 className="font-serif text-xl font-semibold mb-2.5">{card.title}</h3>
              <p className="text-sm text-text-muted leading-[1.7]">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
