"use client";

import { useState, useEffect } from "react";
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
