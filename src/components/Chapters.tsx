const phases = [
  {
    label: "Compreender",
    chapters: [
      { num: "01", title: "O Convite à Transformação", desc: "Romanos 12:2 como tese central. O terreno fértil da infância e a renovação da mente." },
      { num: "02", title: "A Criança Interior", desc: "Conceito de criança interior (Bradshaw, Rogers). Como as feridas se tornam estruturas internas." },
      { num: "03", title: "A Construção da Identidade", desc: "Identidade no processo da criação. A Queda e o distanciamento. O papel da figura paterna." },
      { num: "04", title: "Crenças Limitantes", desc: 'Esquemas cognitivos (Young). Os "óculos invisíveis". Figuras que distorcem a verdade.' },
    ],
  },
  {
    label: "Enfrentar",
    chapters: [
      { num: "05", title: "Aprendizagem Social", desc: "Bandura e Skinner. O experimento dos 5 macacos. Como os padrões são transmitidos." },
      { num: "06", title: "O Trauma Emocional", desc: "Definição integrada: Freud, Bowlby, Van der Kolk, Levine, Gabor Maté." },
      { num: "07", title: "Carne e Espírito", desc: "Gálatas 5 sob leitura psicanalítica. Os frutos da carne como manifestações do trauma." },
      { num: "08", title: "A Dor como Mecanismo", desc: "Ciclo da dor. Vergonha, medo, culpa, fuga. Adão e Eva como arquétipo." },
    ],
  },
  {
    label: "Restaurar",
    chapters: [
      { num: "09", title: "Traumas Geracionais", desc: "Herança emocional. Visão bíblica e científica da transmissão intergeracional." },
      { num: "10", title: "Consequências das Feridas", desc: "Dissociação, síndrome do impostor, vícios, agressividade. As 5 feridas emocionais." },
      { num: "11", title: "Reconexão e Hábitos", desc: "O aqui e agora. Natureza do hábito. A mudança começa no enfrentamento." },
      { num: "12", title: "Há Esperança", desc: "Malaquias 4:6. O perdão como presente a si mesmo. A renovação que transforma." },
    ],
  },
];

export default function Chapters() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 bg-bg-deep border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal">
          <div className="section-ornament">
            <span className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium">
              Conteúdo
            </span>
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-5 tracking-tight">
            12 capítulos de transformação
          </h2>
          <p className="text-[15px] sm:text-base text-text-dim max-w-[560px] leading-[1.8] mb-12 sm:mb-16">
            Uma jornada em três fases — da compreensão ao enfrentamento, do enfrentamento à restauração.
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {phases.map((phase, pi) => (
            <div key={phase.label} className="reveal">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-serif text-sm font-semibold text-gold tracking-wide">
                  Fase {pi + 1}
                </span>
                <span className="w-6 h-px bg-border-glow" />
                <span className="text-[11px] tracking-[2px] uppercase text-text-muted font-medium">
                  {phase.label}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {phase.chapters.map((ch) => (
                  <div
                    key={ch.num}
                    className="chapter-card p-5 sm:p-6 border border-border rounded-xl bg-bg-card flex gap-4 transition-all duration-300 hover:border-border-glow hover:-translate-y-0.5 hover:bg-bg-card-hover"
                  >
                    <div className="font-serif text-[26px] font-bold text-gold-dim/50 leading-none shrink-0 w-8 select-none">
                      {ch.num}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold mb-1.5 leading-snug">{ch.title}</h4>
                      <p className="text-[12px] text-text-muted leading-[1.6]">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
