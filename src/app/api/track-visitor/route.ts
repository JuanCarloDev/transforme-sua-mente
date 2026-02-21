import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const data = rateLimitMap.get(ip);

  if (!data || now - data.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  data.count++;
  return data.count > MAX_REQUESTS;
}

async function getIPInfo(ip: string) {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,isp,org,timezone`
    );
    const data = await res.json();
    if (data.status === "fail") return null;
    return {
      country: data.country || "N/A",
      countryCode: data.countryCode || "N/A",
      region: data.regionName || "N/A",
      city: data.city || "N/A",
      isp: data.isp || "N/A",
      org: data.org || "N/A",
      timezone: data.timezone || "N/A",
    };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "IP não disponível";

    if (isRateLimited(ip)) {
      return NextResponse.json({ success: true, message: "Rate limited" });
    }

    const ipInfo = await getIPInfo(ip);

    let message =
      `<b>👀 Novo Visitante - Transforme Sua Mente</b>\n\n` +
      `🌐 <b>IP:</b> ${ip}\n`;

    if (ipInfo) {
      message += `🏳️ <b>País:</b> ${ipInfo.country} (${ipInfo.countryCode})\n`;
      message += `📍 <b>Região:</b> ${ipInfo.region}\n`;
      message += `🏙️ <b>Cidade:</b> ${ipInfo.city}\n`;
      message += `🌐 <b>ISP:</b> ${ipInfo.isp}\n`;
      message += `🏢 <b>Organização:</b> ${ipInfo.org}\n`;
      message += `⏰ <b>Timezone:</b> ${ipInfo.timezone}\n`;
    }

    const ua = body.userAgent || "N/A";
    message += `📱 <b>Device:</b> ${ua.includes("Mobile") ? "Mobile" : "Desktop"}\n`;
    message += `🔗 <b>Referrer:</b> ${body.referrer || "Acesso direto"}\n`;
    message += `🌍 <b>Idioma:</b> ${body.language || "N/A"}\n`;

    if (body.screen) {
      message += `📺 <b>Tela:</b> ${body.screen.width}x${body.screen.height}\n`;
    }

    message += `⏰ <b>Horário:</b> ${new Date(body.timestamp || Date.now()).toLocaleString("pt-BR")}`;

    await sendTelegramMessage(message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no track-visitor:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
