#!/usr/bin/env node
/**
 * Gera múltiplas variações de capa do livro "Transforme sua Mente"
 * usando diferentes modelos Freepik para variedade visual.
 *
 * Conceito central: rosto de criança dividido — metade se estilhaçando
 * como vidro (chorando/dor) e metade inteira (alegre/esperança).
 *
 * Uso: node docs/Ricardo/generate-capas.mjs
 */

import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "imagens", "capas");

const API_KEY = "FPSX2cd230f6852fadc2588641d6f63a9438";
const BASE_URL = "https://api.freepik.com/v1/ai/text-to-image";
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 80;
const DELAY_BETWEEN_REQUESTS = 6000;

// ── Modelos e suas configs ──────────────────────────────────────────
const MODELS = {
  "flux-dev": {
    url: `${BASE_URL}/flux-dev`,
    params: { aspect_ratio: "traditional_3_4" },
    async: true,
  },
  "flux-2-pro": {
    url: `${BASE_URL}/flux-2-pro`,
    params: { aspect_ratio: "traditional_3_4" },
    async: true,
  },
  "flux-2-turbo": {
    url: `${BASE_URL}/flux-2-turbo`,
    params: { aspect_ratio: "traditional_3_4" },
    async: true,
  },
  "flux-pro-v1-1": {
    url: `${BASE_URL}/flux-pro-v1-1`,
    params: { aspect_ratio: "traditional_3_4" },
    async: true,
  },
  "seedream-v4-5": {
    url: `${BASE_URL}/seedream-v4-5`,
    params: { ratio: "3:4" },
    async: true,
  },
  runway: {
    url: `${BASE_URL}/runway`,
    params: { ratio: "768:1024" },
    async: true,
  },
};

// ── Prompts de capa (cada um com abordagem diferente) ───────────────
const COVERS = [
  {
    id: "capa-01-realista",
    model: "flux-2-pro",
    prompt: `Photorealistic book cover portrait. A child's face split vertically in half. The left half is shattering into pieces like broken glass, fragments flying away, tears streaming down — raw pain and trauma visible. The right half is whole, radiant, joyful, with a genuine warm smile and bright hopeful eyes. Golden-amber light illuminates the joyful side while the shattered side fades into deep navy darkness. A faint silhouette of a tree with deep roots is visible in the background. Cinematic lighting, ultra-detailed, emotional, dramatic contrast. Dark navy and gold color palette. Book cover composition with space at top for title text.`,
  },
  {
    id: "capa-02-simbolica",
    model: "flux-dev",
    prompt: `Symbolic book cover art. Close-up of a young child's face, vertically divided. Left side: the face is cracking and breaking apart like shattered porcelain or glass, pieces falling away revealing darkness beneath, a single tear frozen mid-fall. Right side: the face is perfect, glowing with warm golden light, eyes full of hope and peace, a gentle smile. Behind the child, a majestic tree grows — its roots descend into dark soil on the broken side, while its branches reach toward golden sunlight on the whole side. Rich navy blue and warm amber-gold tones. Dramatic studio lighting. Space at top for book title. Editorial quality.`,
  },
  {
    id: "capa-03-dramatica",
    model: "flux-pro-v1-1",
    prompt: `Dramatic cinematic book cover. Extreme close-up of a child's face split down the middle. The left half is fragmenting like exploding glass shards, frozen in time, with tears and anguish — the pieces dissolve into darkness. The right half radiates warmth, wholeness, and joy — golden light wraps around healthy skin, bright eyes full of life. The transition line between both halves glows with intense white-gold light, suggesting transformation and healing. Background transitions from stormy dark navy to warm sunrise gold. Hyper-realistic, 8K detail, emotional impact. Vertical book cover format with negative space at top.`,
  },
  {
    id: "capa-04-editorial",
    model: "seedream-v4-5",
    prompt: `Editorial book cover design. A child approximately 7 years old, face shown in dramatic split composition. One vertical half shows the face shattering into glass-like fragments with visible pain and tears, pieces dispersing into deep navy blue void. The other half shows the same child whole, healed, smiling with genuine joy, bathed in warm golden amber light. A large tree silhouette in the background connects both halves — broken roots on the dark side, flourishing branches on the light side. Professional photography quality, strong emotional contrast, deep shadows and warm highlights. Clean composition suitable for book cover with title space at top.`,
  },
  {
    id: "capa-05-minimalista",
    model: "flux-2-turbo",
    prompt: `Minimalist powerful book cover. A child's portrait face against pure black background, split vertically. Left half: the face dissolves and shatters into geometric glass fragments drifting into darkness, one visible tear. Right half: intact, serene, peaceful expression with closed eyes and slight smile, illuminated by soft golden glow. The dividing line between halves emits delicate golden particles like fireflies or sparks of transformation. Extremely clean composition, lots of negative space at top and bottom for text. High contrast, navy and gold only. Fine art photography aesthetic.`,
  },
  {
    id: "capa-06-cinematica",
    model: "runway",
    prompt: `Cinematic movie-poster style book cover. A young child's face in dramatic split lighting. The left side of the face is cracking and shattering like broken mirror glass, shards reflecting painful memories, tears visible on the fragmenting cheek. The right side is luminous, whole, healed — warm golden light reveals a hopeful, joyful expression. Behind the child, ethereal imagery: dark stormy clouds on the broken side transitioning to golden sunrise on the healed side. A subtle tree of life motif connects earth to sky. Ultra-wide color grading: deep teals and navy contrasting warm golds and ambers. Professional film quality. Vertical poster composition.`,
  },
  {
    id: "capa-07-conceitual",
    model: "flux-2-pro",
    prompt: `Conceptual art book cover. Profile view of a child's head, split in two. The back half is made of shattered dark glass, fragments suspended in air, revealing emptiness and pain inside — neural pathways visible like broken circuits in the darkness. The front half is solid, alive, with warm skin tones, flowing hair catching golden light, and a peaceful expression looking forward toward light. From the crack between both halves, a small golden tree grows upward, its roots reaching into the broken past, its branches blooming into the bright future. Surreal photorealistic style. Deep navy and rich gold palette. Vertical book cover with generous negative space for typography.`,
  },
  {
    id: "capa-08-emocional",
    model: "flux-dev",
    prompt: `Emotionally powerful book cover photograph. A real-looking child around age 6, face filling most of the frame, split vertically by a line of brilliant golden light. On the left: the child's face is fractured like broken stained glass, tears streaming, mouth slightly open in silent cry, darkness and deep navy shadows consuming the fragments. On the right: the same child is radiant, whole, eyes bright with joy, genuine smile, skin glowing with warm amber light, looking directly at the viewer with hope. The golden dividing line between them pulses with energy — transformation made visible. Shallow depth of field, studio-quality portrait lighting. Top third left open for title placement.`,
  },
];

// ── Funções de API ──────────────────────────────────────────────────
async function createTask(modelKey, prompt) {
  const model = MODELS[modelKey];
  const headers = {
    "Content-Type": "application/json",
    "x-freepik-api-key": API_KEY,
  };

  const body = { prompt, ...model.params };

  const res = await fetch(model.url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `API retornou HTML (rate limit). Status: ${res.status}. Body: ${text.slice(0, 200)}`
    );
  }

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}: ${JSON.stringify(json)}`);
  }

  const taskId = json.data?.task_id ?? json.task_id;
  if (!taskId) throw new Error("Sem task_id: " + JSON.stringify(json));
  return taskId;
}

async function getTaskStatus(modelKey, taskId) {
  const model = MODELS[modelKey];
  const res = await fetch(`${model.url}/${taskId}`, {
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

async function waitForCompleted(modelKey, taskId) {
  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    try {
      const { status, generated } = await getTaskStatus(modelKey, taskId);
      if (status === "COMPLETED" && generated?.length) return generated;
      if (status === "FAILED") throw new Error("Tarefa falhou no servidor.");
    } catch (e) {
      if (e.message.includes("Poll retornou HTML") && i < MAX_POLL_ATTEMPTS - 1) {
        // Rate limit no poll, tentar de novo
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS * 2));
        continue;
      }
      throw e;
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error("Timeout aguardando geração.");
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Download falhou: HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  await writeFile(filepath, Buffer.from(buf));
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log("🎨 GERADOR DE CAPAS — Transforme sua Mente");
  console.log("═".repeat(55));
  console.log(`📁 Saída: docs/Ricardo/imagens/capas/`);
  console.log(`📊 Variações: ${COVERS.length}`);
  console.log(`🤖 Modelos: ${[...new Set(COVERS.map((c) => c.model))].join(", ")}`);
  console.log();

  await mkdir(OUTPUT_DIR, { recursive: true });

  const results = [];

  for (let i = 0; i < COVERS.length; i++) {
    const cover = COVERS[i];
    const filename = `${cover.id}_${cover.model}.png`;
    const filepath = join(OUTPUT_DIR, filename);

    console.log(
      `\n[${i + 1}/${COVERS.length}] ${cover.id} (${cover.model})`
    );
    console.log(`   Prompt: ${cover.prompt.slice(0, 80)}...`);

    try {
      console.log("   ⏳ Criando tarefa...");
      const taskId = await createTask(cover.model, cover.prompt);
      console.log(`   📋 task_id: ${taskId}`);

      console.log("   ⏳ Aguardando geração...");
      const urls = await waitForCompleted(cover.model, taskId);

      await downloadImage(urls[0], filepath);
      console.log(`   ✅ Salvo: ${filename}`);
      results.push({ id: cover.id, model: cover.model, success: true, file: filename });
    } catch (e) {
      console.error(`   ❌ Erro: ${e.message}`);
      results.push({
        id: cover.id,
        model: cover.model,
        success: false,
        error: e.message,
      });
    }

    // Delay entre requests para evitar rate limit
    if (i < COVERS.length - 1) {
      console.log(`   ⏱️  Aguardando ${DELAY_BETWEEN_REQUESTS / 1000}s...`);
      await delay(DELAY_BETWEEN_REQUESTS);
    }
  }

  // ── Resumo ──
  console.log("\n" + "═".repeat(55));
  console.log("📊 RESUMO DA GERAÇÃO DE CAPAS");
  console.log("═".repeat(55));

  const ok = results.filter((r) => r.success).length;
  const fail = results.filter((r) => !r.success).length;

  for (const r of results) {
    const icon = r.success ? "✅" : "❌";
    console.log(`   ${icon} ${r.id} (${r.model}) ${r.success ? r.file : r.error}`);
  }

  console.log(`\n📈 Total: ${ok} sucessos | ${fail} falhas`);
  console.log(`📁 Capas em: ${OUTPUT_DIR}`);

  // Salvar metadata
  const meta = {
    timestamp: new Date().toISOString(),
    book: "Transforme sua Mente – Ciência, Fé e a Superação dos Traumas",
    concept: "Rosto de criança dividido: metade estilhaçando (dor/trauma) + metade inteira (alegria/cura)",
    results,
  };
  await writeFile(join(OUTPUT_DIR, "_metadata.json"), JSON.stringify(meta, null, 2));
}

main().catch((e) => {
  console.error("\n❌ Erro fatal:", e);
  process.exit(1);
});
