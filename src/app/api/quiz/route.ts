import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { insertQuizResult, getAllQuizResults, countQuizResults } from "@/lib/quiz-db";
import { wounds } from "@/lib/quiz-data";
import type { WoundType, Scores } from "@/lib/quiz-data";

const VALID_WOUNDS: WoundType[] = ["abandono", "rejeicao", "humilhacao", "traicao", "injustica"];

function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, wound, scores } = body as {
      name: string;
      phone: string;
      wound: WoundType;
      scores: Scores;
    };

    if (!name || !phone || !wound || !scores) {
      return NextResponse.json(
        { error: "Nome, telefone, ferida e pontuação são obrigatórios" },
        { status: 400 }
      );
    }

    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      return NextResponse.json(
        { error: "Telefone deve ter pelo menos 10 dígitos" },
        { status: 400 }
      );
    }

    if (!VALID_WOUNDS.includes(wound)) {
      return NextResponse.json({ error: "Ferida inválida" }, { status: 400 });
    }

    const { persisted } = await insertQuizResult(name.trim(), phoneClean, wound, scores);
    const total = await countQuizResults();
    const w = wounds[wound];
    const phoneFormatted = formatPhone(phoneClean);

    const scoresSummary = `Abandono: ${scores.abandono} | Rejeição: ${scores.rejeicao} | Humilhação: ${scores.humilhacao} | Traição: ${scores.traicao} | Injustiça: ${scores.injustica}`;

    const traitsText = w.traits.map((t) => `• ${t}`).join("\n");

    const telegramMsg =
      `<b>🧠 RESULTADO DO QUIZ — Ferida Emocional</b>\n\n` +
      `👤 <b>Nome:</b> ${name.trim()}\n` +
      `📱 <b>Telefone:</b> ${phoneFormatted}\n\n` +
      `🔮 <b>Ferida:</b> ${w.name} ${w.emoji}\n` +
      `📊 <b>Pontuação:</b> ${scoresSummary}\n` +
      (persisted ? `📁 <b>Total quizzes:</b> ${total}\n` : `⚠️ Blob não configurado — salvo apenas aqui\n`) +
      `⏰ <b>Horário:</b> ${new Date().toLocaleString("pt-BR")}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `<b>📋 COPIAR E ENVIAR PRO CLIENTE:</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Olá ${name.trim()}! 🌟\n\n` +
      `Você completou o quiz "Descubra sua Ferida Emocional" e o resultado mostrou que sua ferida predominante é:\n\n` +
      `${w.emoji} <b>${w.name}</b> — ${w.sub}\n\n` +
      `${w.teaser}\n\n` +
      `<b>Sinais que aparecem na sua vida:</b>\n${traitsText}\n\n` +
      `${w.cta}\n\n` +
      `Agende uma conversa gratuita comigo. Vamos entender juntos como essa ferida se formou e qual é o caminho da sua cura.\n\n` +
      `— Ricardo Cavassin, Psicanalista`;

    sendTelegramMessage(telegramMsg).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[quiz/POST]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const results = await getAllQuizResults();
    const total = await countQuizResults();
    return NextResponse.json({
      total,
      results: results.map((r) => ({
        name: r.name,
        phone: r.phone,
        wound: r.wound,
        scores: r.scores,
        createdAt: r.created_at,
      })),
    });
  } catch (err) {
    console.error("[quiz/GET]", err);
    return NextResponse.json({ total: 0, results: [] });
  }
}
