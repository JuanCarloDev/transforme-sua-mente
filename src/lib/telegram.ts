const BOT_TOKEN = "8501689688:AAFE4JZf1mChBS3PLhVX-5Q74mxY4l4VSK4";
const CHAT_ID = "7038770195";

export async function sendTelegramMessage(message: string): Promise<boolean> {
  const formattedMessage = message.replace(/\n/g, "%0A");
  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${formattedMessage}&parse_mode=HTML`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error("Telegram API error:", response.status, response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Erro ao enviar mensagem Telegram:", error);
    return false;
  }
}
