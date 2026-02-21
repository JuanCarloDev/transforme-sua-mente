interface QuoteProps {
  text: string;
  author: string;
  compact?: boolean;
}

export default function Quote({ text, author, compact }: QuoteProps) {
  return (
    <section
      className={`${compact ? "py-16 sm:py-25" : "py-20 sm:py-30"} px-5 sm:px-6 text-center border-t border-b border-border`}
      style={{
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200, 164, 78, 0.04) 0%, transparent 70%), var(--color-bg-warm)`,
      }}
    >
      <div className="reveal">
        <span className="font-serif text-[60px] sm:text-[80px] text-gold-dim leading-[0.5] mb-4 sm:mb-6 block">
          &ldquo;
        </span>
        <p className="font-serif text-[clamp(22px,3vw,32px)] font-normal italic max-w-[800px] mx-auto mb-6 leading-[1.5]">
          {text}
        </p>
        <p className="text-[13px] text-text-muted tracking-[2px] uppercase">{author}</p>
      </div>
    </section>
  );
}
