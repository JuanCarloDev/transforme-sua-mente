const BOT_TOKEN = "8501689688:AAFE4JZf1mChBS3PLhVX-5Q74mxY4l4VSK4";
const CHAT_ID = "7038770195";

export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      console.error("Telegram API error:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao enviar mensagem Telegram:", error);
    return false;
  }
}
