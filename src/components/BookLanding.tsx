"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AboutBook from "@/components/AboutBook";
import Author from "@/components/Author";
import Chapters from "@/components/Chapters";
import Downloads from "@/components/Downloads";
import FinalCTA from "@/components/FinalCTA";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Quote from "@/components/Quote";
import Stats from "@/components/Stats";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";
import { siteContent, type SiteLocale } from "@/lib/site-content";

export default function BookLanding({ locale }: { locale: SiteLocale }) {
  const landingRef = useRef<HTMLDivElement>(null);
  const copy = siteContent[locale];

  useVisitorTracking();

  useEffect(() => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = copy.htmlLang;

    return () => {
      document.documentElement.lang = previousLanguage;
    };
  }, [copy.htmlLang]);

  useEffect(() => {
    const root = landingRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(".reveal, .reveal-card");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [locale]);

  return (
    <div ref={landingRef} lang={copy.htmlLang}>
      <FloatingNav locale={locale} />

      <main>
        <Hero locale={locale} />
        <PainPoints locale={locale} />
        <Quote text={copy.quote.text} author={copy.quote.author} />
        <AboutBook locale={locale} />
        <Chapters locale={locale} />
        <Stats locale={locale} />
        <Author locale={locale} />
        <Quote text={copy.quote.freud} author="Sigmund Freud" compact />
        <Downloads locale={locale} />

        <section
          aria-labelledby="quiz-title"
          className="py-20 sm:py-28 px-5 sm:px-6 reveal"
        >
          <div className="max-w-[640px] mx-auto">
            <div className="bg-bg-card border border-border rounded-[24px] p-8 sm:p-12 text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-rose), var(--color-gold), var(--color-sage))",
                }}
                aria-hidden="true"
              />
              <div className="section-ornament justify-center mb-6">
                <span className="text-[11px] sm:text-xs tracking-[3px] uppercase text-rose font-medium">
                  {copy.quiz.eyebrow}
                </span>
              </div>
              <h2
                id="quiz-title"
                className="font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-semibold leading-[1.15] mb-5"
              >
                <em className="text-gold-bright italic">{copy.quiz.title}</em>
                <br />
                <span className="text-text-dim">{copy.quiz.titleMuted}</span>
              </h2>
              <p className="text-[15px] sm:text-base text-text-muted leading-[1.8] max-w-[500px] mx-auto mb-10">
                {copy.quiz.description}
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-3 px-10 py-[18px] bg-gradient-to-br from-rose to-sage text-text font-semibold text-[15px] sm:text-base tracking-wide border-none rounded-full cursor-pointer transition-all duration-400 no-underline shadow-[0_8px_30px_rgba(179,90,90,0.3)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(179,90,90,0.4)]"
              >
                <span aria-hidden="true">✦</span>
                <span>{copy.quiz.button}</span>
                <svg
                  aria-hidden="true"
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA locale={locale} />
      </main>

      <footer className="py-10 sm:py-12 px-5 sm:px-6 text-center border-t border-border">
        <p className="text-text-muted text-[12px] sm:text-[13px]">
          &copy; 2026 Ricardo Batista Cavassin. {copy.footerRights}
        </p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="w-4 h-px bg-border-glow" aria-hidden="true" />
          <a
            href="mailto:contato@transformesuamente.com.br"
            className="text-[12px] text-gold-dim no-underline hover:text-gold transition-colors duration-300 tracking-wide"
          >
            {copy.contact}
          </a>
          <span className="w-4 h-px bg-border-glow" aria-hidden="true" />
        </div>
      </footer>
    </div>
  );
}
