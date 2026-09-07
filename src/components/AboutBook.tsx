import { siteContent, type SiteLocale } from "@/lib/site-content";

const featureStyles = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 8h-6c-1.5-2-4-4.5-4-8a7 7 0 0 1 7-7z" />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        <line x1="10" y1="13" x2="14" y2="13" />
      </svg>
    ),
    bgColor: "rgba(200,164,78,0.1)",
    color: "var(--color-gold)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    bgColor: "rgba(106,138,106,0.1)",
    color: "var(--color-sage)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    bgColor: "rgba(179,90,90,0.1)",
    color: "var(--color-rose)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    bgColor: "rgba(212,136,10,0.1)",
    color: "var(--color-amber)",
  },
];

export default function AboutBook({ locale }: { locale: SiteLocale }) {
  const copy = siteContent[locale].about;

  return (
    <section
      className="py-20 sm:py-28 px-5 sm:px-6 relative"
      style={{
        background: `radial-gradient(ellipse 50% 50% at 80% 20%, rgba(200, 164, 78, 0.03) 0%, transparent 60%), var(--color-bg)`,
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
          </h2>
          <p className="text-[15px] sm:text-base text-text-dim max-w-[560px] leading-[1.8] mb-12 sm:mb-16">
            {copy.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start reveal">
          <div>
            {copy.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-base text-text-dim leading-[1.9] ${index < copy.paragraphs.length - 1 ? "mb-6" : ""}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {copy.features.map((feature, i) => {
              const featureStyle = featureStyles[i];

              return (
                <div
                  key={feature.title}
                  className="reveal-card flex gap-4 p-5 sm:p-6 border border-border rounded-xl bg-bg-card transition-all duration-300 hover:border-gold-dim/40 hover:bg-bg-card-hover group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: featureStyle.bgColor, color: featureStyle.color }}
                  >
                    {featureStyle.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold">{feature.title}</h4>
                      <span className="text-[10px] tracking-[1px] uppercase text-text-muted font-medium shrink-0 hidden sm:block">
                        {feature.stat}
                      </span>
                    </div>
                    <p className="text-[13px] text-text-muted leading-[1.65]">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
