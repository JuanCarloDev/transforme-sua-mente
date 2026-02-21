"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Quote from "@/components/Quote";
import AboutBook from "@/components/AboutBook";
import Chapters from "@/components/Chapters";
import Stats from "@/components/Stats";
import Author from "@/components/Author";
import FinalCTA from "@/components/FinalCTA";
import LeadModal from "@/components/LeadModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

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

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero onOpenModal={() => setModalOpen(true)} />
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
      <FinalCTA onOpenModal={() => setModalOpen(true)} />

      <footer className="py-8 sm:py-10 px-5 sm:px-6 text-center border-t border-border text-text-muted text-[12px] sm:text-[13px]">
        <p>&copy; 2026 Ricardo Batista Cavassin. Todos os direitos reservados.</p>
        <p className="mt-2">
          <a href="mailto:contato@transformesuamente.com.br" className="text-gold-dim no-underline">
            Contato
          </a>
        </p>
      </footer>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
