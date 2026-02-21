"use client";

import { useState, useEffect } from "react";

interface Lead {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const analises = [
  {
    title: "Análise Editorial Completa",
    desc: "Estrutura, estilo, conteúdo e recomendações detalhadas do manuscrito original.",
    href: "/analises/analise-editorial.html",
  },
  {
    title: "Análise Comparativa",
    desc: "Comparação entre versão original e revisada — melhorias, mudanças e evolução do texto.",
    href: "/analises/analise-comparativa.html",
  },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    fetch("/api/admin/verify")
      .then((r) => {
        if (r.ok) {
          setAuthenticated(true);
          loadLeads();
        }
      })
      .finally(() => setChecking(false));
  }, []);

  function loadLeads() {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data.leads || []);
        setTotalLeads(data.total || 0);
      });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao fazer login");
      }

      setAuthenticated(true);
      loadLeads();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setUser("");
    setPassword("");
    setLeads([]);
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060504]">
        <div className="text-[#7a7067] text-sm">Verificando sessão...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060504] px-5">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-semibold text-[#f5f0e8] mb-2">
              Área Restrita
            </h1>
            <p className="text-sm text-[#7a7067]">
              Painel administrativo — Transforme Sua Mente
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#151210] border border-[#2a2520] rounded-2xl p-8"
          >
            <div className="mb-4">
              <label className="block text-xs font-semibold tracking-wide uppercase text-[#7a7067] mb-1.5">
                Usuário
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Seu usuário"
                className="w-full py-3 px-4 bg-[#060504] border border-[#2a2520] rounded-[10px] text-[#f5f0e8] text-[15px] outline-none transition-all duration-300 focus:border-[#8a6f2e] focus:shadow-[0_0_0_3px_rgba(200,164,78,0.1)] placeholder:text-[#7a7067]"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold tracking-wide uppercase text-[#7a7067] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full py-3 px-4 bg-[#060504] border border-[#2a2520] rounded-[10px] text-[#f5f0e8] text-[15px] outline-none transition-all duration-300 focus:border-[#8a6f2e] focus:shadow-[0_0_0_3px_rgba(200,164,78,0.1)] placeholder:text-[#7a7067]"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-[#b35a5a] mb-3">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gradient-to-br from-[#8a6f2e] to-[#c8a44e] text-[#0a0908] font-semibold text-[15px] rounded-full border-none cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(200,164,78,0.3)] disabled:opacity-60"
            >
              {loginLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060504] text-[#f5f0e8]">
      {/* Header */}
      <header className="border-b border-[#2a2520] px-5 sm:px-8">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between py-4">
          <div>
            <h1 className="font-serif text-xl font-semibold">Painel Admin</h1>
            <p className="text-[11px] text-[#7a7067] tracking-wide">
              Transforme Sua Mente
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-medium text-[#7a7067] border border-[#2a2520] rounded-full hover:border-[#b35a5a] hover:text-[#b35a5a] transition-all duration-300"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8 sm:py-12 space-y-10">
        {/* Leads */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[rgba(200,164,78,0.1)] flex items-center justify-center text-[#c8a44e]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Fila de Espera</h2>
              <p className="text-xs text-[#7a7067]">
                {totalLeads} {totalLeads === 1 ? "pessoa" : "pessoas"} na fila
              </p>
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="bg-[#151210] border border-[#2a2520] rounded-xl p-8 text-center text-sm text-[#7a7067]">
              Nenhum lead capturado ainda.
            </div>
          ) : (
            <div className="bg-[#151210] border border-[#2a2520] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2520]">
                      <th className="text-left py-3 px-4 text-[10px] font-semibold tracking-[2px] uppercase text-[#7a7067]">
                        Nome
                      </th>
                      <th className="text-left py-3 px-4 text-[10px] font-semibold tracking-[2px] uppercase text-[#7a7067]">
                        E-mail
                      </th>
                      <th className="text-left py-3 px-4 text-[10px] font-semibold tracking-[2px] uppercase text-[#7a7067] hidden sm:table-cell">
                        Telefone
                      </th>
                      <th className="text-left py-3 px-4 text-[10px] font-semibold tracking-[2px] uppercase text-[#7a7067] hidden sm:table-cell">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#2a2520] last:border-b-0 hover:bg-[#1c1916] transition-colors"
                      >
                        <td className="py-3 px-4 font-medium">{lead.name}</td>
                        <td className="py-3 px-4 text-[#b8ad9e]">
                          {lead.email}
                        </td>
                        <td className="py-3 px-4 text-[#b8ad9e] hidden sm:table-cell">
                          {lead.phone}
                        </td>
                        <td className="py-3 px-4 text-[#7a7067] hidden sm:table-cell">
                          {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Análises */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[rgba(106,138,106,0.1)] flex items-center justify-center text-[#6a8a6a]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Análises do Livro</h2>
              <p className="text-xs text-[#7a7067]">
                Relatórios editoriais detalhados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analises.map((a) => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 bg-[#151210] border border-[#2a2520] rounded-xl transition-all duration-300 hover:border-[#3d3529] hover:bg-[#1c1916] hover:-translate-y-0.5 no-underline"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-[15px] text-[#f5f0e8]">
                    {a.title}
                  </h3>
                  <svg
                    className="w-4 h-4 text-[#7a7067] shrink-0 mt-0.5 group-hover:text-[#c8a44e] transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <p className="text-[13px] text-[#7a7067] leading-[1.6]">
                  {a.desc}
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
