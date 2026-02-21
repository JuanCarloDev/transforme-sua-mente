export default function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      className="py-30 px-6 text-center border-t border-border"
      style={{
        background: `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200, 164, 78, 0.06) 0%, transparent 60%), var(--color-bg-deep)`,
      }}
    >
      <div className="reveal">
        <div className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium mb-4 text-center">
          E-book gratuito
        </div>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-4 tracking-tight text-center">
          Há esperança. Há cura.
          <br />
          Há um caminho.
        </h2>
        <p className="text-base text-text-dim max-w-[600px] leading-[1.8] mb-12 mx-auto text-center">
          E ele começa com um único passo: o de encarar a verdade e permitir que ela nos liberte.
          Baixe o e-book agora.
        </p>
        <button
          onClick={onOpenModal}
          className="cta-btn relative overflow-hidden inline-flex items-center gap-3 px-14 py-[22px] bg-gradient-to-br from-gold-dim to-gold text-[#0a0908] font-semibold text-base tracking-wide border-none rounded-full cursor-pointer transition-all duration-400"
        >
          <span className="relative z-1">Baixar E-book Grátis</span>
          <svg className="relative z-1 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
        <span className="block mt-3 text-xs text-text-muted tracking-wide text-center">
          Sem custo. Sem spam. Direto no seu e-mail.
        </span>
      </div>
    </section>
  );
}
