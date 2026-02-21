import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nome, email e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      return NextResponse.json(
        { error: "Telefone deve ter pelo menos 10 dígitos" },
        { status: 400 }
      );
    }

    const telegramMsg =
      `<b>📖 Novo lead - Transforme Sua Mente</b>\n\n` +
      `👤 <b>Nome:</b> ${name.trim()}\n` +
      `📧 <b>Email:</b> ${email.trim().toLowerCase()}\n` +
      `📱 <b>Telefone:</b> ${phoneClean}\n` +
      `🏷 <b>Fonte:</b> ${source || "landing-page"}\n` +
      `⏰ <b>Horário:</b> ${new Date().toLocaleString("pt-BR")}`;

    sendTelegramMessage(telegramMsg).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "E-book liberado!",
      downloadUrl: "/ebook.pdf",
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
