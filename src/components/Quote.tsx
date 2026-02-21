interface QuoteProps {
  text: string;
  author: string;
  compact?: boolean;
}

export default function Quote({ text, author, compact }: QuoteProps) {
  return (
    <section
      className={`${compact ? "py-16 sm:py-24" : "py-20 sm:py-32"} px-5 sm:px-6 text-center border-t border-border relative overflow-hidden`}
      style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200, 164, 78, 0.04) 0%, transparent 70%), var(--color-bg-warm)`,
      }}
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gold-dim/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-gold-dim/30 to-transparent" />

      <div className="reveal max-w-[800px] mx-auto">
        <span className="font-serif text-[56px] sm:text-[72px] text-gold-dim/40 leading-[0.5] mb-5 sm:mb-6 block select-none">
          &ldquo;
        </span>
        <p className="font-serif text-[clamp(20px,2.8vw,30px)] font-normal italic max-w-[750px] mx-auto mb-6 leading-[1.55] text-text-dim">
          {text}
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="w-8 h-px bg-gold-dim/40" />
          <p className="text-[12px] text-text-muted tracking-[2.5px] uppercase font-medium">{author}</p>
          <span className="w-8 h-px bg-gold-dim/40" />
        </div>
      </div>
    </section>
  );
}
