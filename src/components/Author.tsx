export default function Author() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 bg-bg border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal">
          <div className="section-ornament">
            <span className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium">
              O Autor
            </span>
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-10 sm:mb-12 tracking-tight">
            Ricardo Batista Cavassin
          </h2>
        </div>

        <div className="reveal flex gap-8 sm:gap-14 items-start p-8 sm:p-12 border border-border rounded-[20px] bg-bg-card max-[900px]:flex-col max-[900px]:items-center max-[900px]:text-center">
          <div className="relative shrink-0">
            <div className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] rounded-full bg-gradient-to-br from-gold-dim to-warm flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold text-bg-deep">
              RC
            </div>
            <div className="absolute -inset-2 rounded-full border border-gold-dim/15" />
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-[28px] font-semibold mb-1.5">
              Ricardo Batista Cavassin
            </h3>
            <div className="flex items-center gap-2 mb-5 max-[900px]:justify-center">
              <span className="w-4 h-px bg-gold-dim" />
              <span className="text-[11px] text-gold tracking-[1.5px] uppercase font-medium">
                Escritor &middot; Pesquisador &middot; Conselheiro
              </span>
            </div>
            <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.85] max-w-[540px] max-[900px]:max-w-full mb-6">
              Ricardo é estudioso da interseção entre psicanálise e teologia cristã, com anos de
              dedicação à compreensão dos traumas emocionais e seus efeitos na identidade humana. Sua
              abordagem única combina rigor acadêmico com sensibilidade pastoral, criando pontes
              entre a ciência do comportamento e a fé cristã.
            </p>
            <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.85] max-w-[540px] max-[900px]:max-w-full italic">
              &ldquo;Transforme Sua Mente&rdquo; é o resultado dessa jornada de pesquisa e vivência
              — um convite a olhar para dentro com coragem e encontrar, na renovação da mente, o
              caminho para a verdadeira liberdade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
