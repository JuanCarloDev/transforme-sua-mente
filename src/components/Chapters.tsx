const chapters = [
  { num: "01", title: "O Convite à Transformação", desc: "Romanos 12:2 como tese central. O terreno fértil da infância e a renovação da mente." },
  { num: "02", title: "A Criança Interior e as Primeiras Feridas", desc: "Conceito de criança interior (Bradshaw, Rogers). Como as feridas se tornam estruturas internas." },
  { num: "03", title: "A Construção da Identidade", desc: "Identidade no processo da criação. A Queda e o distanciamento. O papel da figura paterna." },
  { num: "04", title: "Crenças Limitantes e Falsos Profetas", desc: 'Esquemas cognitivos (Young). Os "óculos invisíveis". Figuras que distorcem a verdade.' },
  { num: "05", title: "Aprendizagem Social e Modelagem", desc: "Bandura e Skinner. O experimento dos 5 macacos. Como os padrões são transmitidos." },
  { num: "06", title: "O Trauma Emocional", desc: "Definição integrada: Freud, Bowlby, Van der Kolk, Levine, Gabor Maté. Analogia da unha encravada." },
  { num: "07", title: "Carne e Espírito", desc: "Gálatas 5 sob leitura psicanalítica. Os frutos da carne como manifestações do trauma." },
  { num: "08", title: "A Dor como Mecanismo e Motivação", desc: "Ciclo da dor. Vergonha, medo, culpa, fuga. Adão e Eva como arquétipo." },
  { num: "09", title: "Traumas Geracionais e Epigenética", desc: "Herança emocional. Visão bíblica e científica da transmissão intergeracional." },
  { num: "10", title: "Consequências das Feridas", desc: "Dissociação, síndrome do impostor, vícios, agressividade. As 5 feridas emocionais." },
  { num: "11", title: "Reconexão, Hábitos e Enfrentamento", desc: "O aqui e agora. Natureza do hábito. A mudança começa no enfrentamento." },
  { num: "12", title: "Há Esperança: Restauração e Cura", desc: "Malaquias 4:6. O perdão como presente a si mesmo. A renovação que transforma." },
];

export default function Chapters() {
  return (
    <section className="py-16 sm:py-25 px-5 sm:px-6 bg-bg-deep border-t border-border">
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium mb-4">
          Conteúdo
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-5 tracking-tight">
          12 capítulos de transformação
        </h2>
        <p className="text-[15px] sm:text-base text-text-dim max-w-[600px] leading-[1.8] mb-10 sm:mb-14">
          Uma jornada progressiva — das origens do trauma até a restauração da identidade.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 sm:gap-4">
          {chapters.map((ch) => (
            <div
              key={ch.num}
              className="p-5 sm:p-6 border border-border rounded-xl bg-bg-card flex gap-3.5 sm:gap-4 transition-all duration-300 hover:border-border-glow hover:-translate-y-0.5"
            >
              <div className="font-serif text-[28px] font-bold text-gold-dim leading-none shrink-0 w-9">
                {ch.num}
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1.5 leading-snug">{ch.title}</h4>
                <p className="text-xs text-text-muted leading-[1.5]">{ch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
