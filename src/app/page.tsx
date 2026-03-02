"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Quote from "@/components/Quote";
import AboutBook from "@/components/AboutBook";
import Chapters from "@/components/Chapters";
import Stats from "@/components/Stats";
import Author from "@/components/Author";
import FinalCTA from "@/components/FinalCTA";
import LeadModal from "@/components/LeadModal";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useVisitorTracking();

  useEffect(() => {
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

    document.querySelectorAll(".reveal, .reveal-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openModal = () => setModalOpen(true);

  return (
    <>
      <FloatingNav onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <PainPoints />
      <Quote
        text="O trauma não é o fim da história. É o ponto a partir do qual a história pode, enfim, ser reescrita."
        author="Do livro Transforme Sua Mente"
      />
      <AboutBook />
      <Chapters />
      <Stats />
      <Author />
      <Quote
        text="Quando a dor de não estar vivendo for maior que o medo da mudança, a pessoa muda."
        author="Sigmund Freud"
        compact
      />

      {/* Quiz CTA Section */}
      <section className="py-20 sm:py-28 px-5 sm:px-6 reveal">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="section-ornament justify-center">
            <span className="text-[11px] sm:text-xs tracking-[3px] uppercase text-rose font-medium">
              Quiz Gratuito
            </span>
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,5vw,2.8rem)] font-semibold leading-[1.15] mt-4 mb-4">
            Descubra qual <em className="text-gold-bright italic">Ferida Emocional</em>
            <br />
            está influenciando sua vida
          </h2>
          <p className="text-[15px] text-text-muted leading-[1.8] max-w-[520px] mx-auto mb-8">
            Responda 10 perguntas e descubra qual ferida emocional está moldando seus
            relacionamentos, escolhas e forma de se ver.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 px-10 py-[18px] bg-gradient-to-br from-rose to-sage text-text font-semibold text-[15px] tracking-wide border-none rounded-full cursor-pointer transition-all duration-400 no-underline shadow-[0_8px_30px_rgba(179,90,90,0.3)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_rgba(179,90,90,0.4)]"
          >
            <span>🧠</span>
            <span>Fazer o Quiz Agora</span>
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>

      <FinalCTA onOpenModal={openModal} />

      <footer className="py-10 sm:py-12 px-5 sm:px-6 text-center border-t border-border">
        <p className="text-text-muted text-[12px] sm:text-[13px]">
          &copy; 2026 Ricardo Batista Cavassin. Todos os direitos reservados.
        </p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="w-4 h-px bg-border-glow" />
          <a
            href="mailto:contato@transformesuamente.com.br"
            className="text-[12px] text-gold-dim no-underline hover:text-gold transition-colors duration-300 tracking-wide"
          >
            Contato
          </a>
          <span className="w-4 h-px bg-border-glow" />
        </div>
      </footer>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
