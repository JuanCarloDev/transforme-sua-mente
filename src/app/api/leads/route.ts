import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { insertLead, findLeadByEmail, getAllLeads, countLeads } from "@/lib/db";

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

    const existing = await findLeadByEmail(email.trim().toLowerCase());
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Você já está na fila de espera!",
      });
    }

    await insertLead(
      name.trim(),
      email.trim().toLowerCase(),
      phoneClean,
      source || "landing-page"
    );

    const total = await countLeads();

    const telegramMsg =
      `<b>🔔 Nova inscrição - Fila de Espera</b>\n` +
      `<b>📖 Transforme Sua Mente</b>\n\n` +
      `👤 <b>Nome:</b> ${name.trim()}\n` +
      `📧 <b>Email:</b> ${email.trim().toLowerCase()}\n` +
      `📱 <b>Telefone:</b> ${phoneClean}\n` +
      `📊 <b>Total na fila:</b> ${total}\n` +
      `⏰ <b>Horário:</b> ${new Date().toLocaleString("pt-BR")}`;

    sendTelegramMessage(telegramMsg).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Você está na fila de espera!",
    });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  const leads = await getAllLeads();
  const total = await countLeads();

  return NextResponse.json({
    total,
    leads: leads.map((l) => ({
      name: l.name,
      email: l.email,
      phone: l.phone,
      createdAt: l.created_at,
    })),
  });
}
