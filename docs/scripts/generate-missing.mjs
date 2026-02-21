#!/usr/bin/env node
/**
 * Regera apenas os capítulos que falharam.
 */

import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "imagens");

const API_KEY = "FPSX2cd230f6852fadc2588641d6f63a9438";
const FLUX_DEV_URL = "https://api.freepik.com/v1/ai/text-to-image/flux-dev";
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 80;

const chapters = [
  {
    id: "02",
    title: "Mudanças Externas Começam com Transformações Internas",
    prompt: `A powerful surreal artwork of a human brain splitting open like a cocoon, with a magnificent butterfly emerging from within, made of golden light and sacred geometry patterns. One half of the brain shows dark tangled neural pathways representing old patterns, the other half glows with luminous new pathways of light. A narrow forest path below shows an old trail overgrown with thorns beside a new trail illuminated by soft golden light. Biblical scroll fragments float ethereally in the background. Romans 12:2 theme of mind renewal. Cinematic, dramatic volumetric lighting, painterly oil painting style, deeply emotional. No text.`
  },
  {
    id: "03",
    title: "Criança Interior",
    prompt: `A deeply emotional surreal painting of an adult figure kneeling, embracing their own inner child — a glowing, luminous small version of themselves. The inner child radiates soft warm light but shows visible cracks like broken porcelain, with golden light seeping through the cracks (kintsugi style). Around them, floating broken toys, faded photographs, and wilted flowers represent lost childhood. The background transitions from a dark abandoned room to a warm, safe garden of light. Tears become seeds that sprout flowers where they fall. Cinematic composition, rich emotional depth, painterly style. No text.`
  },
  {
    id: "04",
    title: "Formação de Crenças Limitantes",
    prompt: `A surreal conceptual painting of a person wearing invisible glasses made of dark cracked glass, distorting their view of the world. Through the glasses, a beautiful garden appears as a wasteland. Chains made of words and phrases like shadows wrap around the figure. Behind the person, a mirror shows a small frightened child while the reflection shows a powerful adult. Dark thorny vines grow from the ground, each thorn inscribed with shadowy symbols. One hand reaches toward light, beginning to remove the glasses. Dramatic chiaroscuro lighting, emotionally intense, painterly realism. No text.`
  },
  {
    id: "07",
    title: "Quem é Você? - Identidade e Criação",
    prompt: `A majestic surreal painting showing a human figure standing before a cosmic mirror. In the mirror's reflection, instead of their wounded self, they see the original divine blueprint — a luminous being made of stardust and light, in the image of God. The figure is shedding layers of masks, costumes, and false identities that fall like autumn leaves around their feet. Above, hands of creation shape light into human form. Genesis creation symbolism — earth, stars, breath of life. A tree with deep roots and soaring branches grows from the figure's heart. Epic scale, cathedral-like lighting, oil painting mastery. No text.`
  },
  {
    id: "09",
    title: "Influência do Ambiente na Construção da Identidade",
    prompt: `A surreal panoramic painting of a child as a young tree growing in the center, with roots extending into different soil types representing different environments: rich fertile soil of a loving home, cracked dry earth of poverty, toxic polluted ground of dysfunction, and fresh tilled soil of school and community. Each section of soil feeds different branches — some flourishing with green leaves and fruit, others withered and dark. City buildings, schools, churches, and screens float as clouds above, each raining different colors onto the tree. Lush detailed nature meets urban landscape, cinematic wide composition. No text.`
  }
];

async function createTask(prompt) {
  const res = await fetch(FLUX_DEV_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-freepik-api-key": API_KEY,
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: "social_story_9_16",
    }),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`API retornou HTML (provável rate limit). Status: ${res.status}`);
  }

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}: ${JSON.stringify(json)}`);
  }

  const taskId = json.data?.task_id ?? json.task_id;
  if (!taskId) throw new Error("Resposta sem task_id: " + JSON.stringify(json));
  return taskId;
}

async function getTaskStatus(taskId) {
  const res = await fetch(`${FLUX_DEV_URL}/${taskId}`, {
    headers: { "x-freepik-api-key": API_KEY },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Poll retornou HTML. Status: ${res.status}`);
  }
  if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
  const data = json.data ?? json;
  return { status: data.status, generated: data.generated || [] };
}

async function waitForCompleted(taskId) {
  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    const { status, generated } = await getTaskStatus(taskId);
    if (status === "COMPLETED" && generated?.length) return generated;
    if (status === "FAILED") throw new Error("Tarefa falhou.");
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error("Timeout aguardando geração.");
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  const buf = await res.arrayBuffer();
  await writeFile(filepath, Buffer.from(buf));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("🔄 Regerando capítulos que falharam...\n");

  for (const chapter of chapters) {
    const filename = `cap-${chapter.id}-${chapter.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 60)}.png`;

    const outPath = join(OUTPUT_DIR, filename);

    try {
      console.log(`📖 Cap ${chapter.id}: ${chapter.title}`);

      // Esperar 3s entre requests pra evitar rate limit
      await new Promise((r) => setTimeout(r, 3000));

      console.log(`   Criando tarefa...`);
      const taskId = await createTask(chapter.prompt);
      console.log(`   task_id: ${taskId}`);

      process.stdout.write(`   Aguardando`);
      const urls = await waitForCompleted(taskId);
      console.log();

      await downloadImage(urls[0], outPath);
      console.log(`   ✅ Salvo: ${filename}\n`);
    } catch (e) {
      console.log();
      console.error(`   ❌ Erro: ${e.message}\n`);
    }
  }

  console.log("✅ Concluído!");
}

main().catch((e) => {
  console.error("\n❌ Erro fatal:", e);
  process.exit(1);
});
