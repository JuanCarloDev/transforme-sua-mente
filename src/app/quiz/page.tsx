"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  questions,
  wounds,
  initialScores,
  type WoundType,
  type Scores,
} from "@/lib/quiz-data";

type Step = "hero" | "info" | "questions" | "loading" | "result";

function phoneMask(value: string): string {
  let v = value.replace(/\D/g, "");
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 7) return "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
  if (v.length > 2) return "(" + v.slice(0, 2) + ") " + v.slice(2);
  if (v.length > 0) return "(" + v;
  return "";
}

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuizPage() {
  const [step, setStep] = useState<Step>("hero");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({ ...initialScores });
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedWound, setSelectedWound] = useState<WoundType | null>(null);
  const [topWound, setTopWound] = useState<WoundType | null>(null);
  const [loaderText, setLoaderText] = useState("Analisando suas respostas...");
  const [sent, setSent] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "info") {
      setTimeout(() => nameRef.current?.focus(), 200);
    }
  }, [step]);

  const handleStartQuiz = useCallback(() => {
    setStep("questions");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStartQuestions = useCallback(() => {
    if (userName.trim().length < 2) return;
    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) return;
    setStep("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const msgs = [
      "Analisando suas respostas...",
      "Identificando padrões emocionais...",
      "Conectando com sua história...",
      "Preparando sua análise...",
    ];
    let mi = 0;
    const interval = setInterval(() => {
      mi++;
      if (mi < msgs.length) setLoaderText(msgs[mi]);
    }, 700);

    setTimeout(() => {
      clearInterval(interval);
      const wound = (Object.entries(scores) as [WoundType, number][])
        .sort((a, b) => b[1] - a[1])[0][0];
      setTopWound(wound);
      setStep("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  }, [userName, phone, scores]);

  const handleSelect = useCallback((index: number, wound: WoundType) => {
    setSelected(index);
    setSelectedWound(wound);
  }, []);

  const handleNext = useCallback(() => {
    if (selected === null || !selectedWound) return;
    const newScores = { ...scores, [selectedWound]: scores[selectedWound] + 1 };
    setScores(newScores);
    setSelected(null);
    setSelectedWound(null);

    if (currentQ + 1 >= questions.length) {
      setStep("info");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentQ(currentQ + 1);
    }
  }, [selected, selectedWound, scores, currentQ]);

  // Enviar resultado para API
  useEffect(() => {
    if (step !== "result" || !topWound || sent) return;
    setSent(true);
    const phoneClean = phone.replace(/\D/g, "");
    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName.trim(),
        phone: phoneClean,
        wound: topWound,
        scores,
      }),
    }).catch(() => {});
  }, [step, topWound, sent, userName, phone, scores]);

  const handleRestart = useCallback(() => {
    setStep("hero");
    setUserName("");
    setPhone("");
    setCurrentQ(0);
    setScores({ ...initialScores });
    setSelected(null);
    setSelectedWound(null);
    setTopWound(null);
    setLoaderText("Analisando suas respostas...");
    setSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const infoValid = userName.trim().length >= 2 && phone.replace(/\D/g, "").length >= 10;
  const q = questions[currentQ];
  const w = topWound ? wounds[topWound] : null;
  const progress = (currentQ / questions.length) * 100;
  const isLast = currentQ === questions.length - 1;

  return (
    <div className="min-h-screen relative">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 15% 10%, rgba(179,90,90,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 90%, rgba(106,138,106,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[1]">
        {/* HERO */}
        {step === "hero" && (
          <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 px-5 py-2 border border-[rgba(200,164,78,0.3)] rounded-full text-[0.72rem] tracking-[3px] uppercase text-gold mb-10">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              Psicanálise · Autoconhecimento
            </div>

            {/* Ricardo's Photo */}
            <div className="animate-fade-up delay-300 relative mx-auto mb-5">
              <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full overflow-hidden border-2 border-[rgba(200,164,78,0.4)] shadow-[0_0_60px_rgba(200,164,78,0.15)]">
                <Image
                  src="/ricardo.jpeg"
                  alt="Ricardo Cavassin"
                  width={130}
                  height={130}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              <span className="absolute -inset-3 rounded-full border border-[rgba(200,164,78,0.12)]" />
              <span className="absolute -inset-6 rounded-full border border-[rgba(200,164,78,0.06)]" />
            </div>

            <p className="animate-fade-up delay-300 font-serif text-lg sm:text-xl text-text tracking-[0.5px] mb-1">
              Ricardo Cavassin
            </p>
            <p className="animate-fade-up delay-300 text-[0.72rem] sm:text-[0.78rem] tracking-[3px] uppercase text-gold-dim mb-12 font-medium">
              Psicanalista · Terapeuta
            </p>

            <h1 className="animate-fade-up delay-500 font-serif text-[clamp(2.6rem,9vw,4.5rem)] font-bold leading-[1.08] mb-6">
              Qual é a sua
              <br />
              <em className="text-gold-bright italic">Ferida Emocional?</em>
            </h1>

            <p className="animate-fade-up delay-700 text-[1.05rem] sm:text-lg text-text-dim leading-[1.8] max-w-[480px] mx-auto mb-14 font-light">
              Responda 10 perguntas e descubra qual ferida emocional está influenciando seus
              relacionamentos, suas escolhas e sua forma de se ver.
            </p>

            <button
              onClick={handleStartQuiz}
              className="animate-fade-up delay-900 inline-flex items-center gap-3 px-10 py-[18px] bg-gradient-to-br from-rose to-sage text-text text-[1rem] font-medium border-none rounded-full cursor-pointer transition-all duration-300 tracking-[0.5px] shadow-[0_8px_40px_rgba(179,90,90,0.35)] hover:translate-y-[-3px] hover:shadow-[0_16px_50px_rgba(179,90,90,0.5)]"
            >
              ✦ Descobrir minha ferida
            </button>

            <div className="animate-fade-up delay-1100 mt-20 flex flex-col items-center gap-2 text-[0.72rem] tracking-[2px] uppercase text-border-glow">
              <span>role para baixo</span>
              <div className="w-px h-10 bg-gradient-to-b from-border-glow to-transparent" />
            </div>
          </section>
        )}

        {/* INFO STEP (Nome + Telefone) */}
        {step === "info" && (
          <section className="max-w-[560px] mx-auto px-5 pt-24 pb-20 min-h-screen flex flex-col justify-center">
            <div className="bg-bg-card border border-border rounded-[24px] p-8 sm:p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgba(200,164,78,0.15)] to-[rgba(200,164,78,0.05)] border border-[rgba(200,164,78,0.2)] flex items-center justify-center text-2xl mx-auto mb-6">
                ✦
              </div>
              <h2 className="font-serif text-[1.8rem] sm:text-[2rem] text-text mb-3">Falta pouco...</h2>
              <p className="text-[0.95rem] text-text-muted mb-8 leading-[1.7]">
                Suas respostas foram registradas! Informe seus dados para receber sua análise personalizada.
              </p>

              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-[0.72rem] font-semibold tracking-[2px] uppercase text-text-muted mb-2 text-left">
                    Seu nome
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Seu primeiro nome"
                    maxLength={40}
                    className="w-full bg-bg-deep border border-border rounded-xl py-4 px-5 text-text font-sans text-[1rem] transition-colors duration-200 outline-none placeholder:text-text-muted focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-[0.72rem] font-semibold tracking-[2px] uppercase text-text-muted mb-2 text-left">
                    Seu telefone
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(phoneMask(e.target.value))}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-bg-deep border border-border rounded-xl py-4 px-5 text-text font-sans text-[1rem] transition-colors duration-200 outline-none placeholder:text-text-muted focus:border-gold"
                  />
                </div>
              </div>

              <p className="text-[0.78rem] text-text-muted mb-8">
                Seu telefone será usado para enviar o resultado personalizado.
              </p>

              <button
                onClick={handleStartQuestions}
                disabled={!infoValid}
                className={`w-full py-[18px] bg-gradient-to-br from-rose to-sage text-text font-sans text-[1rem] font-medium border-none rounded-xl cursor-pointer transition-all duration-200 tracking-[0.5px] ${
                  infoValid
                    ? "opacity-100 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(179,90,90,0.4)]"
                    : "opacity-35 pointer-events-none"
                }`}
              >
                Ver meu resultado →
              </button>
            </div>
          </section>
        )}

        {/* QUESTIONS */}
        {step === "questions" && q && (
          <section className="max-w-[640px] mx-auto px-5 pt-10 pb-20">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, var(--color-rose), var(--color-gold))",
                  }}
                />
              </div>
              <span className="text-[0.8rem] text-text-muted whitespace-nowrap font-medium">
                {currentQ + 1} / {questions.length}
              </span>
            </div>

            {/* Question Card */}
            <div
              key={currentQ}
              className="bg-bg-card border border-border rounded-[24px] p-8 sm:p-10 mb-4 animate-fade-up"
            >
              <div className="text-[0.72rem] tracking-[3px] uppercase text-rose font-medium mb-4">
                Pergunta {currentQ + 1} de {questions.length}
              </div>
              <div className="font-serif text-[1.4rem] sm:text-[1.6rem] text-text leading-[1.4] mb-3">
                {q.text}
              </div>
              <div className="text-[0.85rem] text-text-muted italic mb-7 leading-[1.6]">
                {q.hint}
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(i, opt.wound)}
                    className={`flex items-start gap-3.5 py-4 px-5 border-[1.5px] rounded-2xl cursor-pointer transition-all duration-200 text-left w-full font-sans text-[0.92rem] leading-[1.55] ${
                      selected === i
                        ? "border-gold bg-[rgba(200,164,78,0.08)] text-text"
                        : "bg-bg-deep border-border text-text-dim hover:border-rose hover:bg-[rgba(179,90,90,0.07)]"
                    }`}
                  >
                    <span
                      className={`min-w-[28px] h-[28px] rounded-full border flex items-center justify-center text-[0.75rem] font-semibold flex-shrink-0 transition-all duration-200 mt-0.5 ${
                        selected === i
                          ? "bg-gold border-gold text-bg-deep"
                          : "border-border-glow text-text-muted"
                      }`}
                    >
                      {LETTERS[i]}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={selected === null}
                className={`block w-full py-[18px] mt-4 bg-gradient-to-br from-rose to-sage text-text font-sans text-[1rem] font-medium border-none rounded-2xl cursor-pointer transition-all duration-200 tracking-[0.5px] ${
                  selected !== null
                    ? "opacity-100 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(179,90,90,0.4)]"
                    : "opacity-35 pointer-events-none"
                }`}
              >
                {isLast ? "Ver meu resultado →" : "Próxima pergunta →"}
              </button>
            </div>
          </section>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <section className="text-center py-20 px-5 max-w-[400px] mx-auto min-h-screen flex flex-col items-center justify-center">
            <div className="w-14 h-14 border-2 border-border border-t-rose rounded-full animate-spin mx-auto mb-6" />
            <div className="font-serif text-[1.2rem] text-text mb-2 italic">{loaderText}</div>
            <div className="text-[0.8rem] text-text-muted">
              Identificando sua ferida emocional predominante
            </div>
          </section>
        )}

        {/* RESULT */}
        {step === "result" && w && (
          <section className="max-w-[640px] mx-auto px-5 pt-8 pb-20">
            {/* Hero Card */}
            <div className="bg-bg-card border border-border rounded-[20px] p-10 text-center mb-4.5 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: "linear-gradient(90deg, var(--color-rose), var(--color-gold), var(--color-sage))" }}
              />
              <div className="text-[0.68rem] tracking-[3px] uppercase text-rose font-medium mb-4">
                {userName}, sua ferida predominante é
              </div>
              <div className="text-5xl mb-3">{w.emoji}</div>
              <div className="font-serif text-[clamp(2rem,7vw,3rem)] font-bold text-text leading-[1.1] mb-2">
                {w.name}
              </div>
              <div className="text-[0.72rem] tracking-[3px] uppercase text-gold-bright mb-5">
                {w.sub}
              </div>
              <div className="w-10 h-px bg-border-glow mx-auto mb-5" />
              <div className="font-serif text-[1.05rem] italic text-text-muted leading-[1.8] max-w-[440px] mx-auto">
                {w.teaser}
              </div>
            </div>

            {/* Description */}
            <div className="bg-bg-card border border-border rounded-2xl p-6 mb-4.5">
              <h3 className="font-serif text-[1.2rem] text-gold-bright mb-3">
                O que isso significa?
              </h3>
              <p className="text-[0.87rem] text-text-muted leading-[1.8]">{w.description}</p>
            </div>

            {/* Traits */}
            <div className="bg-bg-card border border-border rounded-2xl p-6 mb-4.5">
              <h3 className="font-serif text-[1.1rem] text-text mb-3.5">
                Sinais que aparecem na sua vida
              </h3>
              {w.traits.map((trait, i) => (
                <div key={i} className="flex items-start gap-2.5 mb-2.5 text-[0.84rem] text-text-muted leading-[1.5]">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose mt-1.5 flex-shrink-0" />
                  <span>{trait}</span>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-[rgba(179,90,90,0.15)] to-[rgba(106,138,106,0.1)] border border-[rgba(179,90,90,0.3)] rounded-2xl p-7 text-center mb-4.5">
              <h3 className="font-serif text-[1.4rem] text-text mb-2.5 leading-[1.3]">
                {w.cta}
              </h3>
              <p className="text-[0.85rem] text-text-muted leading-[1.7] mb-5">
                O Ricardo já recebeu seu resultado e entrará em contato pelo seu telefone para agendar uma conversa gratuita.
              </p>
              <div className="inline-flex items-center gap-2.5 px-7 py-4 bg-sage text-text font-sans text-[0.9rem] font-semibold border-none rounded-full shadow-[0_8px_30px_rgba(106,138,106,0.3)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Resultado enviado ao Ricardo ✓
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 p-6 bg-bg-card border border-border rounded-2xl mb-3">
              <div className="w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-[rgba(200,164,78,0.3)] flex-shrink-0">
                <Image
                  src="/ricardo.jpeg"
                  alt="Ricardo Cavassin"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="font-serif text-[1.05rem] font-semibold text-text">Ricardo Cavassin</div>
                <div className="text-[0.72rem] text-gold-dim tracking-[2px] uppercase mt-0.5">
                  Psicanalista · Terapeuta
                </div>
                <div className="text-[0.82rem] text-text-muted italic mt-1.5 leading-[1.5]">
                  &ldquo;A cura começa quando você nomeia o que dói.&rdquo;
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-1">
              <button
                onClick={handleRestart}
                className="flex-1 py-3.5 bg-transparent text-text-muted font-sans text-[0.82rem] border border-border rounded-xl cursor-pointer transition-all duration-200 hover:border-border-glow hover:text-text"
              >
                ↺ Refazer o quiz
              </button>
              <Link
                href="/"
                className="flex-1 py-3.5 bg-transparent text-text-muted font-sans text-[0.82rem] border border-border rounded-xl cursor-pointer transition-all duration-200 hover:border-border-glow hover:text-text text-center no-underline"
              >
                ← Voltar ao site
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
