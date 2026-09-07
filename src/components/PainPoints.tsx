import { siteContent, type SiteLocale } from "@/lib/site-content";

const painCardStyles = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <line x1="1" y1="1" x2="23" y2="23" opacity="0.3" />
      </svg>
    ),
    color: "var(--color-rose)",
    bgColor: "rgba(179, 90, 90, 0.1)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    color: "var(--color-amber)",
    bgColor: "rgba(212, 136, 10, 0.1)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 12V6" />
        <path d="M12 12l4-2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    color: "var(--color-sage)",
    bgColor: "rgba(106, 138, 106, 0.1)",
  },
];

export default function PainPoints({ locale }: { locale: SiteLocale }) {
  const copy = siteContent[locale].pain;

  return (
    <section
      className="py-20 sm:py-28 px-5 sm:px-6 relative border-t border-border"
      style={{
        background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(179, 90, 90, 0.04) 0%, transparent 60%), var(--color-bg-deep)`,
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="reveal">
          <div className="section-ornament">
            <span className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium">
              {copy.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.15] mb-5 tracking-tight">
            {copy.title}
            <br />
            <span className="text-text-dim">{copy.titleMuted}</span>
          </h2>
          <p className="text-[15px] sm:text-base text-text-dim max-w-[560px] leading-[1.8] mb-12 sm:mb-16">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {copy.cards.map((card, i) => {
            const cardStyle = painCardStyles[i];

            return (
            <div
              key={card.title}
              className="reveal-card p-7 sm:p-8 border border-border rounded-2xl bg-bg-card transition-all duration-400 hover:border-border-glow hover:bg-bg-card-hover hover:-translate-y-1 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: cardStyle.bgColor, color: cardStyle.color }}
              >
                {cardStyle.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-sm text-text-muted leading-[1.75]">{card.desc}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
