import { downloadFiles, siteContent, type SiteLocale } from "@/lib/site-content";

export default function Downloads({ locale }: { locale: SiteLocale }) {
  const copy = siteContent[locale].downloads;
  const editions = [
    {
      code: "PT",
      lang: "pt-BR",
      label: copy.ptLabel,
      description: copy.ptDescription,
      files: downloadFiles.pt,
    },
    {
      code: "EN",
      lang: "en",
      label: copy.enLabel,
      description: copy.enDescription,
      files: downloadFiles.en,
    },
  ];

  return (
    <section
      id="downloads"
      aria-labelledby="downloads-title"
      className="scroll-mt-24 py-20 sm:py-28 px-5 sm:px-6 relative overflow-hidden border-t border-border"
      style={{
        background: `
          radial-gradient(ellipse 60% 70% at 12% 50%, rgba(200, 164, 78, 0.07) 0%, transparent 65%),
          radial-gradient(ellipse 45% 60% at 90% 20%, rgba(168, 93, 32, 0.05) 0%, transparent 70%),
          var(--color-bg)
        `,
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold-dim/50 to-transparent" />

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 items-start">
        <div className="reveal lg:sticky lg:top-28">
          <div className="section-ornament">
            <span className="text-[10px] tracking-[5px] uppercase text-gold-dim font-medium">
              {copy.eyebrow}
            </span>
          </div>
          <h2
            id="downloads-title"
            className="font-serif text-[clamp(36px,4.5vw,54px)] font-normal leading-[1.08] mb-5 tracking-tight"
          >
            {copy.title}
          </h2>
          <p className="text-[15px] sm:text-base text-text-dim max-w-[430px] leading-[1.85]">
            {copy.description}
          </p>

          <div className="hidden lg:flex items-center gap-3 mt-10" aria-hidden="true">
            <span className="w-14 h-px bg-gradient-to-r from-gold-dim to-transparent" />
            <span className="font-serif text-2xl text-gold-dim/55">12:2</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {editions.map((edition, index) => (
            <article
              key={edition.code}
              lang={edition.lang}
              className="reveal-card group relative min-h-[360px] p-7 sm:p-8 border border-border rounded-[22px] bg-bg-card overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-gold-dim/50 hover:bg-bg-card-hover hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="absolute -right-14 -top-14 w-40 h-40 rounded-full border border-gold-dim/10 transition-transform duration-700 group-hover:scale-110"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between mb-12">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold-dim/10 text-gold border border-gold-dim/20">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                  </svg>
                </div>
                <span className="font-serif text-[42px] font-light leading-none text-gold-dim/35 tracking-tight">
                  {edition.code}
                </span>
              </div>

              <div className="relative mb-8">
                <h3 className="font-serif text-[30px] font-semibold leading-tight mb-2">
                  {edition.label}
                </h3>
                <p className="text-[13px] text-text-muted leading-relaxed min-h-[42px]">
                  {edition.description}
                </p>
              </div>

              <div className="relative flex flex-col gap-3">
                <a
                  href={edition.files.book}
                  download
                  aria-label={`${copy.bookButton}: ${edition.label}`}
                  className="cta-btn relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-br from-gold-dim to-gold text-bg-deep font-semibold text-[13px] tracking-wide rounded-full no-underline transition-all duration-300"
                >
                  <span className="relative z-1">{copy.bookButton}</span>
                  <DownloadIcon />
                </a>
                <a
                  href={edition.files.cover}
                  download
                  aria-label={`${copy.coverButton}: ${edition.label}`}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-gold text-[13px] font-medium tracking-wide border border-gold-dim/30 rounded-full no-underline transition-all duration-300 hover:border-gold-dim/70 hover:bg-gold-dim/8"
                >
                  <span>{copy.coverButton}</span>
                  <DownloadIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="relative z-1 w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </svg>
  );
}
