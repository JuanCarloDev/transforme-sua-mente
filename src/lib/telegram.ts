const BOT_TOKEN = "8501689688:AAFE4JZf1mChBS3PLhVX-5Q74mxY4l4VSK4";
const CHAT_ID = "7038770195";
const MAX_MESSAGE_LENGTH = 4096;

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function splitMessage(message: string): string[] {
  if (message.length <= MAX_MESSAGE_LENGTH) return [message];

  const chunks: string[] = [];
  let remaining = message;

  while (remaining.length > 0) {
    if (remaining.length <= MAX_MESSAGE_LENGTH) {
      chunks.push(remaining);
      break;
    }

    let splitIndex = remaining.lastIndexOf("\n", MAX_MESSAGE_LENGTH);
    if (splitIndex === -1 || splitIndex < MAX_MESSAGE_LENGTH * 0.5) {
      splitIndex = MAX_MESSAGE_LENGTH;
    }

    chunks.push(remaining.slice(0, splitIndex));
    remaining = remaining.slice(splitIndex);
  }

  return chunks;
}

export async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const chunks = splitMessage(message);

    for (const chunk of chunks) {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: chunk,
            parse_mode: "HTML",
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[Telegram] Erro ${response.status}:`, errorBody);

        // Se HTML inválido, tenta sem parse_mode
        if (response.status === 400 && errorBody.includes("can't parse")) {
          console.warn("[Telegram] Reenviando sem HTML parse_mode...");
          const fallback = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: CHAT_ID,
                text: chunk.replace(/<[^>]*>/g, ""),
              }),
            }
          );
          if (!fallback.ok) {
            console.error("[Telegram] Fallback também falhou:", await fallback.text());
            return false;
          }
        } else {
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("[Telegram] Erro de rede:", error);
    return false;
  }
}
