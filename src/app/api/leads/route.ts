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

    // Check duplicata (se blob disponível)
    const existing = await findLeadByEmail(email.trim().toLowerCase());
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Você já está na fila de espera!",
      });
    }

    // Salva no blob (se disponível)
    const { persisted } = await insertLead(
      name.trim(),
      email.trim().toLowerCase(),
      phoneClean,
      source || "landing-page"
    );

    const total = await countLeads();

    // Telegram sempre funciona — é o backup se blob não estiver configurado
    const telegramMsg =
      `<b>🔔 Nova inscrição - Fila de Espera</b>\n` +
      `<b>📖 Transforme Sua Mente</b>\n\n` +
      `👤 <b>Nome:</b> ${name.trim()}\n` +
      `📧 <b>Email:</b> ${email.trim().toLowerCase()}\n` +
      `📱 <b>Telefone:</b> ${phoneClean}\n` +
      (persisted ? `📊 <b>Total na fila:</b> ${total}\n` : `⚠️ <b>Blob não configurado</b> — lead salvo apenas no Telegram\n`) +
      `⏰ <b>Horário:</b> ${new Date().toLocaleString("pt-BR")}`;

    sendTelegramMessage(telegramMsg).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Você está na fila de espera!",
    });
  } catch (err) {
    console.error("[leads/POST]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  try {
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
  } catch (err) {
    console.error("[leads/GET]", err);
    return NextResponse.json({ total: 0, leads: [] });
  }
}
