#!/usr/bin/env node
/**
 * V2 - Imagens REALISTAS e DRAMÁTICAS para o livro do Ricardo.
 * Estilo: fotorrealismo cinematográfico, impacto emocional forte,
 * metáfora da árvore (raízes → frutos) como fio condutor.
 */

import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "imagens", "V2");

const API_KEY = "FPSX2cd230f6852fadc2588641d6f63a9438";
const FLUX_DEV_URL = "https://api.freepik.com/v1/ai/text-to-image/flux-dev";
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 80;
const DELAY_BETWEEN_REQUESTS = 4000;

const chapters = [
  {
    id: "01",
    title: "Introdução - A Infância e a Formação da Psique",
    prompt: `Ultra-realistic dramatic photograph of a small child, around 5 years old, standing alone in the middle of a vast barren field at golden hour. The child is seen from behind, wearing simple worn clothes, looking at the horizon where storm clouds clash with a breaking sunset. Growing from the cracked dry earth beneath the child's feet, the exposed root system of an enormous ancient tree is visible — the roots spread outward like veins in the soil, some broken, some reaching deep. Above, a single small sapling sprouts from the child's silhouette area, tiny green leaves catching the last golden light. Photorealistic, shot on Canon EOS R5, 85mm lens, f/1.4, cinematic color grading, hyper-detailed skin and fabric textures, volumetric god rays through clouds, raw emotional power. No text, no watermarks.`
  },
  {
    id: "02",
    title: "Mudanças Externas Começam com Transformações Internas",
    prompt: `Ultra-realistic dramatic photograph of a split scene: a massive ancient tree in the center of frame. The left half shows the tree in winter — bare branches, dark stormy sky, frozen cracked ground with exposed dying roots. The right half shows the exact same tree in full spring bloom — lush green canopy, warm golden sunlight, roots transforming into flowing streams of life. A single person stands at the base of the trunk, right at the dividing line between the two halves, one hand touching the bark, head tilted upward. The transition between dark and light is sharp and dramatic. Shot like a National Geographic cover photo, photorealistic, 24mm wide angle, f/8, HDR dramatic lighting, cinematic color grading. No text, no watermarks.`
  },
  {
    id: "03",
    title: "Criança Interior",
    prompt: `Ultra-realistic dramatic photograph of an adult man kneeling on a wooden floor in an empty dark room, arms wrapped around himself in a self-embrace. Dramatic single window light illuminates his face showing raw vulnerability — tears on cheeks, eyes closed. On the floor around him, scattered children's toys — a worn teddy bear, wooden blocks, a small shoe. His shadow on the wall behind him is cast as the silhouette of a small child reaching out. In the corner of the room, a single potted plant with roots growing through cracks in the pot, with one small white flower blooming. Photorealistic, shot on Sony A7R IV, 35mm, f/2, Rembrandt lighting, extreme emotional depth, cinematic film grain, warm amber tones. No text, no watermarks.`
  },
  {
    id: "04",
    title: "Formação de Crenças Limitantes",
    prompt: `Ultra-realistic dramatic photograph of a person standing in a hall of cracked mirrors, each mirror reflecting a distorted version of themselves — one mirror shows them tiny and insignificant, another shows them with chains on wrists, another shows them behind bars. The person in the center stands with hands pressed against the largest mirror, forehead touching the glass, eyes searching. The floor is littered with broken mirror fragments that reflect fragments of a childhood — a school desk, a parent's hand, a closed door. Through one crack in the wall, a thin beam of pure white light enters, and where it hits the floor, a small green seedling pushes through the shattered glass. Photorealistic, 28mm lens, dramatic chiaroscuro lighting, high contrast, cinematic atmosphere. No text, no watermarks.`
  },
  {
    id: "05",
    title: "Os Falsos Profetas da Nossa Vida",
    prompt: `Ultra-realistic dramatic photograph of a small child sitting on a wooden chair in the center of a dark room, looking up with wide innocent eyes. Surrounding the child in a circle are tall adult figures — but we only see them from the waist down, casting enormous shadows that converge on the child. Each pair of adult legs wears different clothing representing different authority figures: suit pants (corporate/authority), a dress (mother figure), work boots (father figure), formal shoes (teacher). The shadows of these figures on the walls are distorted and menacing, much larger than the actual people. The child clutches a small dying plant in a clay pot — the roots are exposed and strangled. One single beam of light from above illuminates only the child. Shot on Phase One, 50mm, dramatic lighting like a Caravaggio painting but photographic, hyper-detailed, emotionally devastating. No text, no watermarks.`
  },
  {
    id: "06",
    title: "Modelagem e Aprendizagem Social",
    prompt: `Ultra-realistic dramatic photograph of a child standing in front of a large window, watching adults interact outside. The child's posture perfectly mirrors the aggressive stance of one of the adults — fists slightly clenched, shoulders tense, jaw set — demonstrating unconscious modeling. The window acts as a frame within a frame. On the windowsill, two small plants: one growing straight and healthy toward the light, the other twisted and bent, growing in the shape of the shadow cast by the adult figures. The child's reflection in the glass is ghostly and overlaps with the adults' image. Late afternoon dramatic light, golden hour streaming through the window. Photorealistic, 50mm, f/2.8, documentary-style photography with cinematic grading, heavy emotional weight. No text, no watermarks.`
  },
  {
    id: "07",
    title: "Quem é Você? - Identidade e Criação",
    prompt: `Ultra-realistic dramatic photograph of a person standing at the edge of a perfectly still lake at dawn. They stare at their reflection in the water, but the reflection shows them differently — younger, more luminous, at peace, the way they were meant to be before life's wounds. Around the person on the shore, discarded masks, old coats, and worn shoes lay scattered like shed skin. In the water's reflection, a magnificent tree grows upside down from their heart — roots reaching up into the sky, branches and fruit hanging down into the earth, representing identity rooted in something higher. First light of dawn breaks behind mountains, casting the person in a golden silhouette. Shot on medium format, 80mm, f/4, mirror-still water, breathtaking landscape photography, National Geographic quality. No text, no watermarks.`
  },
  {
    id: "08",
    title: "O Papel da Figura Paterna",
    prompt: `Ultra-realistic dramatically lit photograph showing two hands reaching toward each other — a large weathered adult man's hand reaching down from above, and a small child's hand reaching up from below. The hands are almost touching but not quite — a gap of a few centimeters between their fingertips, representing the painful distance of emotional absence. The background is completely dark except for a single shaft of warm golden light illuminating the space between the hands. The adult hand casts a shadow that forms the shape of a protective tree canopy, while the child's hand casts a shadow showing exposed roots searching for ground. Extreme close-up, macro detail on skin texture, every line and pore visible. Shot on Hasselblad, 90mm macro, f/2.8, Rembrandt lighting. Devastatingly emotional. No text, no watermarks.`
  },
  {
    id: "09",
    title: "Influência do Ambiente na Construção da Identidade",
    prompt: `Ultra-realistic dramatic aerial photograph showing the same species of tree growing in four radically different environments, arranged in quadrants. Top-left: a tree thriving in rich dark soil beside a warm home with lit windows — full canopy, abundant fruit, deep healthy roots visible in cross-section. Top-right: a twisted stunted tree growing from cracked concrete in a gray urban wasteland — roots strangled by pipes and debris. Bottom-left: a tree barely surviving in toxic soil near industrial pollution — leaves yellowed, bark scarred. Bottom-right: a young tree being carefully tended in a garden, supported by stakes, beginning to flourish. The soil cross-sections reveal that the roots tell the real story of each tree. Photorealistic, drone-style top-down perspective mixed with cross-section view, National Geographic editorial quality, dramatic natural lighting. No text, no watermarks.`
  },
  {
    id: "10",
    title: "A Formação da Identidade Precede o Nascimento",
    prompt: `Ultra-realistic dramatic intimate photograph of a pregnant woman in profile, standing alone in a dark room, both hands cradling her belly. She's silhouetted against a large window where a storm rages outside — lightning illuminating her face showing deep worry and fear. But inside her belly area, warm bioluminescent amber light glows softly, as if the baby within is a source of light in the darkness. At her feet, exposed tree roots emerge from the wooden floor, connecting her to an unseen larger root system below — representing generational connection. Her shadow on the wall shows not just her silhouette but layers of female figures behind her — mother, grandmother, great-grandmother — each slightly more transparent. Photorealistic, 85mm, f/1.8, dramatic storm lighting contrast with warm belly glow, deeply intimate and emotional. No text, no watermarks.`
  },
  {
    id: "11",
    title: "Compreendendo o Trauma Emocional",
    prompt: `Ultra-realistic dramatic photograph of a massive ancient tree that has been struck by lightning — the trunk is split open, charred and smoking, bark peeled back revealing the raw wounded interior wood. But from the center of the devastating wound, impossibly, new green shoots are emerging — small bright leaves pushing through the blackened scar tissue. The tree's roots are exposed by erosion, showing how deep and vast the root system is despite the surface damage. A person sits at the base of the wounded tree, back against the trunk, knees drawn up, head down — dwarfed by the scale of the damage but physically connected to the tree. Storm clearing in the background, first rays of sun hitting the new green growth. Shot on Canon, 24mm, f/5.6, dramatic storm-clearing light, National Geographic quality, raw emotional devastation and hope coexisting. No text, no watermarks.`
  },
  {
    id: "12",
    title: "Adão, Eva e a Serpente - Mecanismos de Defesa",
    prompt: `Ultra-realistic dramatic photograph of a ancient massive fig tree in a dark primordial garden. The tree dominates the frame with an overwhelming presence. A large serpent coils around the main trunk — its scales catching what little light exists, eyes gleaming. Two human figures stand at the base, partially hidden behind leaves they hold to cover themselves — their body language shows shame, fear, avoidance. One figure points at the other. The ground beneath the tree shows a dramatic split — one side still lush paradise with flowers and golden grass, the other side already dying, turning to thorns and dry earth. The roots of the tree cross both sides. Overhead, storm clouds gather on one side while the last pure light remains on the other. Photorealistic, 35mm, dramatic biblical-scale lighting, like a Gustave Doré illustration brought to photographic life. No text, no watermarks.`
  },
  {
    id: "13",
    title: "Traumas Geracionais",
    prompt: `Ultra-realistic dramatic photograph showing four generations of the same family in a single frame — great-grandfather, grandfather, father, and young child — each standing behind the other in a receding line into darkness. Each person's chest has a visible scar in the same location — near the heart — but the scar changes with each generation: deep and raw on the eldest, slightly healed on the next, reopened on the father, and on the child, just a small mark beginning to form. They are all standing on the exposed root system of an ancient tree — the roots connect all four figures underground, showing how trauma travels through the root system of a family. The youngest child at the front holds a small green seedling with clean white roots. Dramatic side-lighting, photorealistic, 50mm, f/4, heavy shadows, documentary-style with cinematic grading. No text, no watermarks.`
  },
  {
    id: "14",
    title: "Consequências Comportamentais das Feridas Emocionais",
    prompt: `Ultra-realistic dramatic photograph of a person standing in the rain on an empty street at night, arms hanging at their sides, completely soaked, staring straight at the camera with an expression of profound emotional exhaustion — not sadness exactly, but the numbness that comes after too much pain. Multiple transparent overlapping exposures show ghost versions of the same person in different emotional states: one curled in fetal position, one with fists clenched in rage, one turned away in avoidance, one reaching out desperately. At their feet, puddles reflect not the night sky but fragments of childhood memories. A single dead tree stands behind them, its roots visible above the cracked asphalt, but one branch has a single bud — tiny, almost invisible, but there. Photorealistic, 35mm, f/2, rain-soaked night photography, neon-reflected puddles, devastating emotional weight. No text, no watermarks.`
  },
  {
    id: "15",
    title: "Reconexão com Meu Eu",
    prompt: `Ultra-realistic dramatic photograph of a person standing waist-deep in a crystal-clear river at sunrise, arms outstretched, face tilted toward the sky with eyes closed — an expression of release, of finally letting go. The water around them is golden from the sunrise, and floating away downstream are dark objects: broken chains, old masks, crumpled papers, wilted flowers — debris of the old self being carried away by the current. On the riverbank, the massive root system of an ancient tree extends into the water, and where the person stands, new green water plants grow among the roots, symbolizing new life rooted in truth. The sunrise behind is spectacular — golden, amber, pink — like the first dawn of a new life. Photorealistic, 35mm, f/4, golden hour perfection, water droplets catching light, cathartic emotional release, breathtaking landscape photography. No text, no watermarks.`
  },
  {
    id: "16",
    title: "Hábitos, Lugares e Pessoas - O Processo de Mudança",
    prompt: `Ultra-realistic dramatic photograph of a person walking on a dirt road that literally forks into three paths. They are at the exact intersection point, mid-stride, committed to the forward path. Behind them, the road they came from is dark, worn, and lined with dead trees with shallow roots pulled from the ground. The three paths ahead represent different changes: one path is lined with young saplings being carefully staked and supported (new habits), another leads through an open gate to a completely different landscape of rolling green hills (new places), the third shows silhouettes of people in warm light welcoming them forward (new people). The person casts a long shadow behind them that still reaches back to the dark road, but their body leans forward into the light. Drone-to-ground dramatic angle, golden hour, photorealistic, 24mm, epic landscape scale with intimate human figure. No text, no watermarks.`
  },
  {
    id: "17",
    title: "A Mudança Começa no Enfrentamento",
    prompt: `Ultra-realistic dramatic photograph of a person standing in a dark corridor, facing a massive closed wooden door. They have one hand on the door handle, the other hand holding a lit lantern. The corridor behind them is filled with darkness and shadowy forms — representing all the fears and traumas they've carried. But through the cracks around the door frame, intense warm golden light bleeds through, promising something on the other side. The person's posture shows determination mixed with fear — shoulders braced, jaw set, but hands trembling slightly on the handle. The floor beneath them shows tree roots growing through the stone, pushing toward the door, toward the light. The lantern flame reflects in their eyes. Photorealistic, 28mm, f/2, extreme dramatic lighting contrast between dark corridor and golden door-light, cinematic tension like a film still, deeply powerful. No text, no watermarks.`
  },
  {
    id: "18",
    title: "Há Esperança",
    prompt: `Ultra-realistic dramatic photograph of the most magnificent ancient tree imaginable — enormous, with a trunk you'd need ten people to hug around, roots that spread like a cathedral foundation visible above and below ground, and a canopy so vast it fills the entire sky of the frame with golden-green leaves catching the sunset. The tree is in full bloom and fruit — abundant, overflowing with life. At the base of the tree, sitting on the largest root, a father and his young child sit together — the father's arm around the child, both looking up at the canopy above them in wonder. The father's hand rests on a scar carved into the bark — an old wound in the tree that has completely healed over, now just a smooth mark. Sunset light streams through the canopy creating hundreds of golden light beams. In the foreground, wildflowers of every color bloom among the roots. This is the image of complete restoration. Photorealistic, 24mm, f/8, golden hour, the most beautiful tree photograph ever taken, overwhelming with hope and life, National Geographic cover quality. No text, no watermarks.`
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
    throw new Error(`API retornou HTML (rate limit). Status: ${res.status}`);
  }

  if (!res.ok) {
    throw new Error(json.message || `HTTP ${res.status}: ${JSON.stringify(json)}`);
  }

  const taskId = json.data?.task_id ?? json.task_id;
  if (!taskId) throw new Error("Sem task_id: " + JSON.stringify(json));
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
    // Retry once after delay
    await new Promise(r => setTimeout(r, 3000));
    const res2 = await fetch(`${FLUX_DEV_URL}/${taskId}`, {
      headers: { "x-freepik-api-key": API_KEY },
    });
    json = await res2.json();
  }
  const data = json.data ?? json;
  return { status: data.status, generated: data.generated || [] };
}

async function waitForCompleted(taskId) {
  for (let i = 0; i < MAX_POLL_ATTEMPTS; i++) {
    try {
      const { status, generated } = await getTaskStatus(taskId);
      if (status === "COMPLETED" && generated?.length) return generated;
      if (status === "FAILED") throw new Error("Tarefa falhou.");
    } catch (e) {
      if (e.message === "Tarefa falhou.") throw e;
      // Network glitch, retry
    }
    process.stdout.write(".");
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error("Timeout.");
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  await writeFile(filepath, Buffer.from(buf));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("🎨 V2 — REALISTA + DRAMÁTICO — Livro do Ricardo");
  console.log(`📁 Saída: docs/Ricardo/imagens/V2/`);
  console.log(`📚 Capítulos: ${chapters.length}`);
  console.log(`📐 Formato: 9:16 (vertical full-page)`);
  console.log(`🎯 Estilo: Fotorrealismo cinematográfico + impacto emocional\n`);

  const results = [];

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
      console.log(`\n📖 Cap ${chapter.id}: ${chapter.title}`);

      // Delay entre requests pra evitar rate limit
      await new Promise(r => setTimeout(r, DELAY_BETWEEN_REQUESTS));

      console.log(`   Criando tarefa...`);
      const taskId = await createTask(chapter.prompt);
      console.log(`   task_id: ${taskId}`);

      process.stdout.write(`   Aguardando`);
      const urls = await waitForCompleted(taskId);
      console.log();

      await downloadImage(urls[0], outPath);
      console.log(`   ✅ Salvo: ${filename}`);
      results.push({ chapter: chapter.id, title: chapter.title, success: true, file: filename });
    } catch (e) {
      console.log();
      console.error(`   ❌ Erro: ${e.message}`);
      results.push({ chapter: chapter.id, title: chapter.title, success: false, error: e.message });
    }
  }

  // Resumo
  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMO V2 — REALISTA + DRAMÁTICO");
  console.log("=".repeat(60));

  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  for (const r of results) {
    console.log(`   Cap ${r.chapter}: ${r.success ? "✅" : "❌"} ${r.title}`);
  }

  console.log(`\n📈 Total: ${success} sucessos | ${failed} falhas`);

  await writeFile(join(OUTPUT_DIR, "_metadata.json"), JSON.stringify({
    version: "V2",
    style: "photorealistic-dramatic",
    timestamp: new Date().toISOString(),
    model: "flux-dev",
    aspect_ratio: "9:16",
    chapters: results
  }, null, 2), "utf8");

  if (failed > 0) {
    console.log(`\n⚠️  ${failed} falharam. Rode novamente para regerar.`);
  }
}

main().catch(e => {
  console.error("\n❌ Erro fatal:", e);
  process.exit(1);
});
