const features = [
  {
    icon: "\u{1F9E0}",
    bgColor: "rgba(200,164,78,0.1)",
    color: "var(--color-gold)",
    title: "Base Psicanalítica Sólida",
    desc: "15+ autores renomados da psicologia e neurociência, com conceitos explicados de forma acessível.",
  },
  {
    icon: "\u271D\uFE0F",
    bgColor: "rgba(106,138,106,0.1)",
    color: "var(--color-sage)",
    title: "Fundamentação Bíblica",
    desc: "30+ referências bíblicas integradas naturalmente — AT e NT, de Gênesis a Romanos.",
  },
  {
    icon: "\u{1F494}",
    bgColor: "rgba(179,90,90,0.1)",
    color: "var(--color-rose)",
    title: "Casos Reais",
    desc: 'Histórias clínicas que criam identificação — como Ana, que cresceu sendo criticada, e o homem que não conseguia confiar.',
  },
  {
    icon: "\u{1F511}",
    bgColor: "rgba(212,136,10,0.1)",
    color: "var(--color-amber)",
    title: "Caminhos de Cura",
    desc: "Não apenas diagnóstico — o livro apresenta caminhos reais de reconexão, hábitos e enfrentamento.",
  },
];

export default function AboutBook() {
  return (
    <section
      className="py-16 sm:py-25 px-5 sm:px-6 relative"
      style={{
        background: `radial-gradient(ellipse 50% 50% at 80% 20%, rgba(200, 164, 78, 0.03) 0%, transparent 60%), var(--color-bg)`,
      }}
    >
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium mb-4">
          Sobre o livro
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-5 tracking-tight">
          Onde a ciência encontra a fé
        </h2>
        <p className="text-[15px] sm:text-base text-text-dim max-w-[600px] leading-[1.8] mb-10 sm:mb-14">
          Uma abordagem única que não opõe psicologia e espiritualidade — mostra que ambas apontam
          para as mesmas verdades por caminhos complementares.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-15 items-start">
          <div>
            <p className="text-base text-text-dim leading-[1.9] mb-5">
              <strong className="text-text font-semibold">Transforme Sua Mente</strong> nasce da
              convicção de que a cura emocional e a restauração espiritual não são caminhos
              distintos, mas movimentos complementares. A psicologia nos fornece a linguagem e a
              compreensão dos processos internos; a fé nos oferece sentido, direção e transcendência.
            </p>
            <p className="text-base text-text-dim leading-[1.9] mb-5">
              Ao longo de 12 capítulos, Ricardo Batista Cavassin conduz o leitor por uma jornada que
              vai das <strong className="text-text font-semibold">origens do trauma na infância</strong>{" "}
              até os <strong className="text-text font-semibold">caminhos práticos de restauração</strong>,
              passando pela formação de crenças limitantes, padrões geracionais, mecanismos de defesa
              e o poder da renovação da mente.
            </p>
            <p className="text-base text-text-dim leading-[1.9]">
              Fundamentado em autores como{" "}
              <strong className="text-text font-semibold">
                Freud, Winnicott, Bowlby, Bandura, Gabor Maté e Van der Kolk
              </strong>
              , e ancorado na Palavra de Deus — especialmente em{" "}
              <strong className="text-text font-semibold">Romanos 12:2</strong> — este livro é ao
              mesmo tempo profundo e acessível, técnico e pastoral.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex gap-3.5 sm:gap-4 p-4 sm:p-5 border border-border rounded-xl bg-bg-card transition-all duration-300 hover:border-gold-dim hover:bg-bg-card-hover"
              >
                <div
                  className="w-11 h-11 rounded-[10px] flex items-center justify-center text-xl shrink-0"
                  style={{ background: f.bgColor, color: f.color }}
                >
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-[13px] text-text-muted leading-[1.6]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
