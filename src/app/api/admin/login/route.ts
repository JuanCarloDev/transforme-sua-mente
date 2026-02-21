import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";

const ADMIN_USER = "Ricardo";
const ADMIN_PASS = "Cavassin123";
const SECRET = "tsm-admin-2026";

export async function POST(req: NextRequest) {
  try {
    const { user, password } = await req.json();

    if (user !== ADMIN_USER || password !== ADMIN_PASS) {
      return NextResponse.json(
        { error: "Usuário ou senha incorretos" },
        { status: 401 }
      );
    }

    const token = createHash("sha256")
      .update(`${SECRET}-${randomBytes(16).toString("hex")}-${Date.now()}`)
      .digest("hex");

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin-session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
