"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
}

function phoneMask(value: string): string {
  let v = value.replace(/\D/g, "");
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 7) return "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
  if (v.length > 2) return "(" + v.slice(0, 2) + ") " + v.slice(2);
  if (v.length > 0) return "(" + v;
  return "";
}

export default function LeadModal({ open, onClose }: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => nameRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
      setError("");
      setLoading(false);
    }, 500);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone) {
      setError("Preencha todos os campos.");
      return;
    }

    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      setError("Telefone deve ter pelo menos 10 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phoneClean, source: "livro-ricardo" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar");

      setSuccess(true);

      if (data.downloadUrl) {
        const a = document.createElement("a");
        a.href = data.downloadUrl;
        a.download = "Transforme-Sua-Mente-Ricardo-Batista-Cavassin.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      setTimeout(handleClose, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar");
      setLoading(false);
    }
  }

  const inputClass =
    "form-input w-full py-3.5 px-4 bg-bg-deep border border-border rounded-[10px] text-text font-sans text-[15px] transition-all duration-300 outline-none placeholder:text-text-muted";

  return (
    <div
      className={`modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-6 ${open ? "active" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-content bg-bg-card border border-border-glow rounded-3xl p-12 max-w-[480px] w-full relative shadow-[0_40px_80px_rgba(0,0,0,0.6)] max-[600px]:p-6 max-[600px]:rounded-[20px]">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 border border-border rounded-full bg-transparent text-text-muted cursor-pointer flex items-center justify-center text-lg transition-all duration-300 hover:border-text-muted hover:text-text"
        >
          &times;
        </button>

        {!success ? (
          <div>
            <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[rgba(200,164,78,0.15)] to-[rgba(200,164,78,0.05)] border border-[rgba(200,164,78,0.2)] flex items-center justify-center text-2xl mb-6">
              📖
            </div>
            <h2 className="font-serif text-[28px] font-semibold mb-2">Baixar E-book</h2>
            <p className="text-sm text-text-muted mb-7">
              Preencha seus dados para receber o PDF gratuito.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-1.5">
                  Nome
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className={inputClass}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className={inputClass}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold tracking-wide uppercase text-text-muted mb-1.5">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(phoneMask(e.target.value))}
                  placeholder="(11) 99999-9999"
                  className={inputClass}
                  required
                />
              </div>

              {error && <p className="text-xs text-rose mt-1 mb-2">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="cta-btn relative overflow-hidden w-full mt-2 inline-flex items-center justify-center gap-3 px-10 py-[18px] bg-gradient-to-br from-gold-dim to-gold text-[#0a0908] font-semibold text-[15px] tracking-wide border-none rounded-full cursor-pointer transition-all duration-400 disabled:opacity-60"
              >
                <span className="relative z-1">{loading ? "Enviando..." : "Baixar Agora"}</span>
                <svg className="relative z-1 w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[rgba(106,138,106,0.2)] to-[rgba(106,138,106,0.05)] border border-[rgba(106,138,106,0.3)] flex items-center justify-center text-[32px] mx-auto mb-5">
              ✓
            </div>
            <h3 className="font-serif text-2xl mb-2">E-book liberado!</h3>
            <p className="text-sm text-text-muted leading-[1.7]">
              Seu download começou automaticamente.
              <br />
              Verifique sua pasta de downloads.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
