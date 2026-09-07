"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent, type SiteLocale } from "@/lib/site-content";

export default function FloatingNav({ locale }: { locale: SiteLocale }) {
  const [visible, setVisible] = useState(false);
  const copy = siteContent[locale];

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`floating-nav ${visible ? "visible" : ""}`}>
      <div className="floating-nav-inner">
        <span className="font-serif text-lg font-semibold tracking-tight text-text">
          {copy.shortBookTitle}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/quiz"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-rose text-[13px] font-medium tracking-wide border border-[rgba(179,90,90,0.3)] rounded-full transition-all duration-300 no-underline hover:bg-[rgba(179,90,90,0.1)] hover:border-rose"
          >
            🧠 {copy.navQuiz}
          </Link>
          <Link
            href={copy.switchHref}
            hrefLang={locale === "pt" ? "en" : "pt-BR"}
            aria-label={locale === "pt" ? "View this page in English" : "Ver esta página em português"}
            className="inline-flex items-center justify-center min-w-10 h-10 px-3 text-gold text-[12px] font-bold tracking-widest border border-gold-dim/40 rounded-full no-underline transition-all duration-300 hover:bg-gold-dim/10 hover:border-gold"
          >
            {copy.switchLabel}
          </Link>
          <a
            href="#downloads"
            className="cta-btn relative overflow-hidden inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-br from-gold-dim to-gold text-[#0a0908] font-semibold text-[12px] sm:text-[13px] tracking-wide border-none rounded-full cursor-pointer transition-all duration-400 no-underline"
          >
            <span className="relative z-1">{copy.navDownload}</span>
            <svg className="relative z-1 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
