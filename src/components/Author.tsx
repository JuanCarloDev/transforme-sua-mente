export default function Author() {
  return (
    <section className="py-16 sm:py-25 px-5 sm:px-6 bg-bg border-t border-border">
      <div className="max-w-[1100px] mx-auto reveal">
        <div className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium mb-4">
          O Autor
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-10 tracking-tight">
          Ricardo Batista Cavassin
        </h2>

        <div className="flex gap-8 sm:gap-12 items-center p-6 sm:p-12 border border-border rounded-[20px] bg-bg-card max-[900px]:flex-col max-[900px]:text-center">
          <div className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] rounded-full bg-gradient-to-br from-gold-dim to-warm flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold text-bg-deep shrink-0">
            RC
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-[28px] font-semibold mb-1">Ricardo Batista Cavassin</h3>
            <div className="text-[12px] sm:text-[13px] text-gold tracking-[1px] uppercase mb-4 font-medium">
              Escritor &middot; Pesquisador &middot; Conselheiro
            </div>
            <p className="text-[14px] sm:text-[15px] text-text-dim leading-[1.8] max-w-[560px] max-[900px]:max-w-full">
              Ricardo é estudioso da interseção entre psicanálise e teologia cristã, com anos de
              dedicação à compreensão dos traumas emocionais e seus efeitos na identidade humana. Sua
              abordagem única combina rigor acadêmico com sensibilidade pastoral, criando pontes
              entre a ciência do comportamento e a fé cristã. &ldquo;Transforme Sua Mente&rdquo; é o
              resultado dessa jornada de pesquisa e vivência — um convite a olhar para dentro com
              coragem e encontrar, na renovação da mente, o caminho para a verdadeira liberdade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
