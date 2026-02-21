import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendTelegramMessage } from "@/lib/telegram";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

interface Lead {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  source: string;
}

function getLeads(): Lead[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function saveLeads(leads: Lead[]) {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

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

    const leads = getLeads();

    const duplicate = leads.find(
      (l) => l.email.toLowerCase() === email.toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json({
        success: true,
        message: "Você já está na fila de espera!",
      });
    }

    leads.push({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneClean,
      createdAt: new Date().toISOString(),
      source: source || "landing-page",
    });

    saveLeads(leads);

    const telegramMsg =
      `<b>📥 Novo Lead - Transforme Sua Mente</b>\n\n` +
      `👤 <b>Nome:</b> ${name.trim()}\n` +
      `📧 <b>Email:</b> ${email.trim().toLowerCase()}\n` +
      `📱 <b>Telefone:</b> ${phoneClean}\n` +
      `📊 <b>Total de Leads:</b> ${leads.length}\n` +
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
  const leads = getLeads();
  return NextResponse.json({
    total: leads.length,
    leads: leads.map((l) => ({
      name: l.name,
      email: l.email,
      phone: l.phone,
      createdAt: l.createdAt,
    })),
  });
}
