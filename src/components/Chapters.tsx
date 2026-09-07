import { siteContent, type SiteLocale } from "@/lib/site-content";

export default function Chapters({ locale }: { locale: SiteLocale }) {
  const copy = siteContent[locale].chapters;

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 bg-bg-deep border-t border-border">
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
            {copy.description}
          </p>
        </div>

        <div className="space-y-10 sm:space-y-12">
          {copy.phases.map((phase, pi) => (
            <div key={phase.label} className="reveal">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-serif text-sm font-semibold text-gold tracking-wide">
                  {copy.phase} {pi + 1}
                </span>
                <span className="w-6 h-px bg-border-glow" />
                <span className="text-[11px] tracking-[2px] uppercase text-text-muted font-medium">
                  {phase.label}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {phase.chapters.map((ch) => (
                  <div
                    key={ch.num}
                    className="chapter-card p-5 sm:p-6 border border-border rounded-xl bg-bg-card flex gap-4 transition-all duration-300 hover:border-border-glow hover:-translate-y-0.5 hover:bg-bg-card-hover"
                  >
                    <div className="font-serif text-[26px] font-bold text-gold-dim/50 leading-none shrink-0 w-8 select-none">
                      {ch.num}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold mb-1.5 leading-snug">{ch.title}</h4>
                      <p className="text-[12px] text-text-muted leading-[1.6]">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
