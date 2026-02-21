export default function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      className="py-24 sm:py-36 px-5 sm:px-6 text-center border-t border-border relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200, 164, 78, 0.07) 0%, transparent 60%),
          radial-gradient(ellipse 80% 40% at 50% 100%, rgba(200, 164, 78, 0.04) 0%, transparent 50%),
          var(--color-bg-deep)
        `,
      }}
    >
      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold-dim/20 to-transparent" />

      <div className="reveal max-w-[600px] mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-8 h-px bg-gold-dim/40" />
          <span className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium">
            Seja o primeiro
          </span>
          <span className="w-8 h-px bg-gold-dim/40" />
        </div>

        <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] font-normal leading-[1.12] mb-5 tracking-tight">
          Há esperança. Há cura.
          <br />
          <span className="text-text-dim">Há um caminho.</span>
        </h2>

        <p className="text-[15px] sm:text-base text-text-dim max-w-[480px] leading-[1.85] mb-10 sm:mb-12 mx-auto">
          E ele começa com um único passo: o de encarar a verdade e permitir que ela nos liberte.
        </p>

        <button
          onClick={onOpenModal}
          className="cta-btn relative overflow-hidden inline-flex items-center gap-3 px-12 sm:px-14 py-[20px] sm:py-[22px] bg-gradient-to-br from-gold-dim to-gold text-[#0a0908] font-semibold text-[15px] sm:text-base tracking-wide border-none rounded-full cursor-pointer transition-all duration-400"
        >
          <span className="relative z-1">Entrar na Fila de Espera</span>
          <svg className="relative z-1 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l7-7 7 7M12 5v14" />
          </svg>
        </button>
        <span className="block mt-4 text-[11px] text-text-muted tracking-wide">
          Gratuito &middot; Sem spam &middot; Você será notificado
        </span>
      </div>
    </section>
  );
}
