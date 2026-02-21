"use client";

import { useState, useEffect } from "react";

export default function FloatingNav({ onOpenModal }: { onOpenModal: () => void }) {
  const [visible, setVisible] = useState(false);

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
          Transforme Sua Mente
        </span>
        <button
          onClick={onOpenModal}
          className="cta-btn relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-gold-dim to-gold text-[#0a0908] font-semibold text-[13px] tracking-wide border-none rounded-full cursor-pointer transition-all duration-400"
        >
          <span className="relative z-1">Entrar na Fila</span>
          <svg className="relative z-1 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
