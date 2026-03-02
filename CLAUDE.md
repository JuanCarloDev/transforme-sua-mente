# Transforme Sua Mente — Ricardo Cavassin

## Projeto

Site do livro "Transforme Sua Mente" do Ricardo Cavassin (psicanalista/terapeuta).
Landing page + Quiz de Ferida Emocional + Admin dashboard.

**Produção:** https://www.ricardocavassin.com
**Quiz:** https://www.ricardocavassin.com/quiz
**Admin:** https://www.ricardocavassin.com/admin

## Deploy

- **Hospedagem:** Vercel (deploy automático via push no GitHub)
- **Repo:** github.com/JuanCarloDev/transforme-sua-mente
- **Branch principal:** main
- **NÃO está na VPS** — é Vercel puro. Não criar PM2/Caddy.
- Push pro `main` = deploy automático

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Vercel Blob (storage de leads e quiz results)
- Telegram Bot API (notificações)

## Arquitetura

```
src/
├── app/
│   ├── page.tsx          # Home — landing page do livro
│   ├── quiz/page.tsx     # Quiz "Ferida Emocional" (10 perguntas, 5 feridas)
│   ├── admin/page.tsx    # Dashboard — leads, quiz results, apresentações
│   ├── layout.tsx        # Root layout (Cormorant Garamond + DM Sans)
│   └── api/
│       ├── leads/        # POST: captura lead + Telegram | GET: lista
│       ├── quiz/         # POST: salva resultado + Telegram | GET: lista
│       ├── admin/        # login, logout, verify (cookie session)
│       └── track-visitor # Geolocation tracking
├── components/           # Hero, PainPoints, FloatingNav, LeadModal, etc.
├── lib/
│   ├── db.ts             # Vercel Blob — leads (leads.json)
│   ├── quiz-db.ts        # Vercel Blob — quiz results (quiz-results.json)
│   ├── quiz-data.ts      # Perguntas, feridas, tipos
│   └── telegram.ts       # Envio de mensagens via Bot API
└── hooks/
    └── use-visitor-tracking.tsx
```

## Integrações

### Telegram
- Bot Token e Chat ID hardcoded em `src/lib/telegram.ts`
- Envia notificação para o Ricardo quando:
  - Novo lead se inscreve na fila de espera
  - Alguém completa o quiz (com texto pronto pra copiar e enviar pro cliente)
  - Novo visitante acessa o site

### Vercel Blob
- `leads.json` — leads da fila de espera (nome, email, telefone)
- `quiz-results.json` — resultados do quiz (nome, telefone, ferida, scores)
- Env var: `BLOB_READ_WRITE_TOKEN`
- Fallback: funciona sem token (salva apenas via Telegram)

### Admin
- Login: Ricardo / Cavassin123 (hardcoded em `api/admin/login`)
- Cookie session de 7 dias

## Design System

- **Tema:** Dark (bg #060504, text cream #f5f0e8)
- **Cores:** Gold (#c8a44e) como primary, Rose (#b35a5a) secondary, Sage (#6a8a6a) tertiary
- **Fontes:** Cormorant Garamond (serif, títulos) + DM Sans (sans, body)
- **Animações:** fade-up, reveal on scroll, card transitions

## Quiz — Ferida Emocional

5 feridas: Abandono, Rejeição, Humilhação, Traição, Injustiça.
10 perguntas, cada uma com 5 opções mapeadas para uma ferida.
Coleta nome + telefone antes das perguntas.
Resultado enviado pro Telegram com texto formatado pro Ricardo copiar e enviar ao cliente.

## Regras

- Conventional commits em português
- Não commitar .env.local
- Testar com `npm run build` antes de push
- Push = deploy (Vercel automático)
