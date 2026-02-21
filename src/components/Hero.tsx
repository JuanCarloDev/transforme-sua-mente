import Image from "next/image";

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-15 overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, rgba(200, 164, 78, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 70% 80%, rgba(168, 93, 32, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(10, 9, 8, 1) 40%, rgba(6, 5, 4, 1) 100%)
          `,
        }}
      />

      {/* Shards */}
      <div className="shard w-[120px] h-[80px] top-[15%] left-[5%] -rotate-[15deg]" style={{ clipPath: "polygon(20% 0, 100% 10%, 80% 100%, 0 70%)" }} />
      <div className="shard w-[80px] h-[60px] top-[35%] left-[2%] rotate-[25deg]" style={{ clipPath: "polygon(0 20%, 100% 0, 80% 100%, 10% 80%)" }} />
      <div className="shard w-[60px] h-[100px] top-[60%] left-[8%] -rotate-[35deg]" style={{ clipPath: "polygon(30% 0, 100% 20%, 70% 100%, 0 60%)" }} />
      <div className="shard w-[100px] h-[50px] top-[10%] right-[3%] rotate-[12deg]" style={{ clipPath: "polygon(10% 0, 100% 30%, 90% 100%, 0 80%)" }} />
      <div className="shard w-[70px] h-[90px] top-[75%] right-[5%] -rotate-[20deg] max-md:hidden" style={{ clipPath: "polygon(40% 0, 100% 15%, 60% 100%, 0 50%)" }} />

      {/* Content */}
      <div className="relative z-2 flex items-center gap-20 max-w-[1200px] w-full max-[900px]:flex-col-reverse max-[900px]:gap-12 max-[900px]:text-center">
        <div className="flex-1 max-w-[580px] max-[900px]:max-w-full">
          <div className="text-[11px] tracking-[4px] uppercase text-gold font-medium mb-6 animate-fade-up delay-300">
            E-book Gratuito
          </div>
          <h1 className="font-serif text-[clamp(42px,5.5vw,72px)] font-light leading-[1.08] tracking-tight mb-2 animate-fade-up delay-500">
            <strong className="font-bold bg-gradient-to-br from-gold-bright via-gold to-amber bg-clip-text text-transparent">
              Transforme
            </strong>
            <br />
            Sua Mente
          </h1>
          <p className="font-serif text-[clamp(18px,2.2vw,26px)] font-light italic text-text-dim mb-8 tracking-wide animate-fade-up delay-700">
            Ciência, Fé e a Superação dos Traumas
          </p>
          <p className="text-[15px] text-text-muted leading-[1.8] mb-10 max-w-[460px] max-[900px]:max-w-full max-[900px]:mx-auto animate-fade-up delay-900">
            Uma obra que integra psicanálise, neurociência e teologia cristã para iluminar as raízes
            do trauma emocional e abrir caminhos reais de cura e restauração da identidade.
          </p>
          <div className="animate-fade-up delay-1100 max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center">
            <button
              onClick={onOpenModal}
              className="cta-btn relative overflow-hidden inline-flex items-center gap-3 px-10 py-[18px] bg-gradient-to-br from-gold-dim to-gold text-[#0a0908] font-semibold text-[15px] tracking-wide border-none rounded-full cursor-pointer transition-all duration-400"
            >
              <span className="relative z-1">Baixar E-book Grátis</span>
              <svg className="relative z-1 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
            <span className="block mt-3 text-xs text-text-muted tracking-wide">
              PDF gratuito — sem spam, sem pegadinha
            </span>
          </div>
        </div>

        {/* Book 3D */}
        <div className="shrink-0 animate-fade-in" style={{ perspective: "1200px", animationDelay: "0.6s" }}>
          <div className="book-3d w-[320px] max-[900px]:w-[240px] relative">
            <div className="absolute -inset-10 bg-radial-[ellipse_at_center] from-[rgba(200,164,78,0.1)] to-transparent pointer-events-none -z-1" />
            <div className="book-spine" />
            <Image
              src="/capa.png"
              alt="Capa do livro Transforme Sua Mente"
              width={320}
              height={480}
              priority
              className="book-cover w-full block"
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-[10px] tracking-[3px] uppercase animate-fade-in" style={{ animationDelay: "2s" }}>
        <div className="w-px h-10 bg-gradient-to-b from-gold-dim to-transparent" style={{ animation: "scrollPulse 2s ease infinite" }} />
        <span>Descubra</span>
      </div>
    </section>
  );
}
