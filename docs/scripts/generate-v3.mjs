#!/usr/bin/env node
/**
 * V3 — Ilustrações conceituais por TRECHO/METÁFORA do livro.
 * Não é uma imagem por capítulo, mas por conceito-chave que precisa de visualização.
 * Estilo: fotorrealismo dramático, impacto emocional visceral, árvore/raízes como fio.
 */

import { mkdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "imagens", "V3");

const API_KEY = "FPSX2cd230f6852fadc2588641d6f63a9438";
const FLUX_DEV_URL = "https://api.freepik.com/v1/ai/text-to-image/flux-dev";
const POLL_INTERVAL_MS = 5000;
const MAX_POLL_ATTEMPTS = 80;
const DELAY_BETWEEN = 4000;

// Cada ilustração referencia um trecho/conceito específico do livro
const illustrations = [
  {
    id: "01",
    title: "Cimento Fresco — Haim Ginott",
    context: "\"A criança é como cimento fresco, tudo que cai sobre ela deixa marcas.\" A criança ainda sem filtros recebe tudo: palavras, gestos, silêncios.",
    prompt: `Ultra-realistic dramatic close-up photograph of fresh wet concrete on a sidewalk, still setting. In the concrete surface, deeply imprinted, are chaotic overlapping handprints of different adult-sized hands — some pressed hard and aggressively, some lighter, some dragging across the surface leaving scars. In the center, one tiny child's handprint, small and delicate, barely visible beneath all the adult impressions that have been pressed over it, almost erased. The concrete is beginning to harden, capturing these marks forever. Golden sunset light rakes across the surface at a low angle, dramatically highlighting every texture and impression. Water droplets sit in some of the deeper prints. At the edge of the frame, a single blade of grass pushes through a crack in the concrete. Shot on Hasselblad, 80mm macro, extreme detail, every grain of concrete visible, Rembrandt lighting. Raw, devastating simplicity. No text, no watermarks.`
  },
  {
    id: "02",
    title: "Os Dois Caminhos na Floresta — Vias Neurais",
    context: "\"Imagine que sua mente funciona como um caminho em uma floresta. Quanto mais você percorre, mais claro ele fica. Mudar é criar um novo caminho.\" A metáfora das vias neurais como trilhas.",
    prompt: `Ultra-realistic dramatic photograph taken from a person's point of view standing at a fork in a dense dark forest. To the left: a wide, well-worn, deeply rutted path — the soil is packed hard from years of walking, the trees along it are dead or dying, the path leads downward into fog and shadow. The grooves in the earth look almost like scars. To the right: a barely visible narrow trail, overgrown with wild grass and young saplings, dappled with small patches of golden sunlight breaking through the canopy above. A few tentative fresh footprints mark the beginning of this new path. The person's worn boots are visible at the bottom of the frame, standing at the exact decision point. The contrast between the two paths is stark and dramatic. Early morning forest light, mist hanging between trees. Shot on Canon R5, 16mm ultra-wide, f/5.6, hyper-realistic forest detail, moss on bark, dew on leaves. Cinematic color grading — cold blue on left path, warm gold on right. No text, no watermarks.`
  },
  {
    id: "03",
    title: "A Criança Abandonada em Casa — Gênese do Trauma",
    context: "\"Imaginemos uma criança de 2-3 anos deixada sozinha em casa... Para um adulto é descuido. Para a criança, é uma experiência devastadora. A dor torna-se excessiva.\"",
    prompt: `Ultra-realistic dramatic photograph of a toddler, approximately 2-3 years old, sitting alone on a bare wooden floor in the hallway of an empty house. The child sits with their back against the wall, small legs stretched out, looking toward a closed front door with light seeping through the cracks around it. A pair of adult shoes is missing from the shoe rack by the door — the empty space where they should be is conspicuous. The hallway is dim, only the light from the door cracks and a small window creating harsh shadows. The child's face shows not crying, but something worse — a blank stillness, the beginning of emotional shutdown. A forgotten stuffed animal lies face-down a meter away, as if it too was dropped. The walls feel too tall, the space too vast for someone so small. Shot at child's eye level, 35mm, f/2, natural available light only, documentary-style rawness, devastating quietness. The image should feel suffocatingly still and lonely. No text, no watermarks.`
  },
  {
    id: "04",
    title: "Os Óculos Invisíveis — Esquemas Cognitivos",
    context: "\"Podemos imaginar como óculos invisíveis através dos quais passamos a enxergar o mundo. Um silêncio é entendido como rejeição, uma correção soa como humilhação, um limite é vivido como abandono.\"",
    prompt: `Ultra-realistic dramatic photograph of a person looking through a cracked, dirty window at a scene outside. Through the window, a normal everyday scene: a group of friends laughing together in a park, sun shining, warmth and connection visible in their body language. But the window glass is old, cracked, warped, and stained — it distorts the scene, making the laughing faces look mocking, the gestures look threatening, the warmth look like exclusion. The person inside is seen from behind, their hand pressed flat against the glass, forehead almost touching it. Their reflection in the glass is faint but shows a child's face overlaid on the adult figure. The window frame is like a cage around the view. Inside the room it is dark and cold; outside is vibrant and alive. The glass itself is the barrier — the distorted lens. Shot on 50mm, f/1.8, shallow depth of field with the glass distortions in sharp focus, dramatic contrast between dark interior and bright exterior. Claustrophobic, aching. No text, no watermarks.`
  },
  {
    id: "05",
    title: "O Homem que Sabotava Relacionamentos — Caso Clínico",
    context: "\"Abandonado pela mãe aos 4 anos. Avó alcoólatra. Pai distante. Aprendeu que amar era perigoso demais. Na eminência de um rompimento, ele se antecipava, sabotando o relacionamento.\"",
    prompt: `Ultra-realistic dramatic photograph of a man sitting alone at a small kitchen table in a sparse apartment. Two coffee cups on the table — one in front of him, one across the table in front of an empty chair. The empty chair is slightly pulled back, as if someone just left. The man stares at the empty chair, one hand wrapped around his mug, the other hand resting on the table where it was clearly just holding another person's hand — the warmth impression still visible on the wooden surface. On the wall behind him, a single framed photo lies face-down. Through the apartment window, the blurred lights of a city at night create bokeh. His face shows not sadness but the exhausted resignation of someone who has been through this exact moment dozens of times — the self-fulfilling prophecy of abandonment. The roots of a neglected houseplant on the windowsill have grown out of its pot, searching desperately for water. Shot on 85mm, f/1.4, warm tungsten apartment light, film grain, intimate and private. Loneliness as a physical presence. No text, no watermarks.`
  },
  {
    id: "06",
    title: "O Experimento do Boneco Bobo — Bandura",
    context: "\"As crianças que viram o modelo agressivo foram muito mais propensas a imitar a violência. Não só copiaram, mas criaram NOVOS comportamentos agressivos.\"",
    prompt: `Ultra-realistic dramatic photograph showing a powerful split composition. In the foreground, sharp focus: a small child, maybe 4-5 years old, standing with fists raised and an angry expression, mimicking a fighting stance — their small body tense with learned aggression. Behind them, slightly out of focus but clearly visible: the silhouette of an adult in the exact same aggressive posture, casting a long shadow that perfectly overlaps with the child's body, as if the shadow IS the child's programming. On the floor between them, a knocked-over inflatable toy (subtle Bobo doll reference). The child's eyes are intense but also confused — they're performing something they don't fully understand but have absorbed completely. Clinical white room lighting mixed with dramatic shadows. Shot at the child's height, 50mm, f/2.8, documentary-style but with cinematic gravity. The image should make you feel the weight of learned behavior. No text, no watermarks.`
  },
  {
    id: "07",
    title: "\"Quando a Dor de Não Estar Vivendo For Maior que o Medo da Mudança\" — Freud",
    context: "A frase de Freud que é o ponto de virada do livro. O momento exato em que a pessoa decide: ou mudo, ou morro por dentro.",
    prompt: `Ultra-realistic dramatic photograph of a person standing at the very edge of a cliff at dawn, toes at the precipice, looking out over a vast valley shrouded in morning mist. They are not jumping — they are making a decision. Behind them, the path they came from is scorched earth: dried, cracked, leafless trees, ash-colored ground representing the dead life they've been living. Before them, the valley below is invisible beneath clouds, terrifying in its unknown. But the first rays of sunlight are piercing through the mist from the east, turning the clouds gold, hinting at something beautiful below that can't yet be seen. The person stands in the exact liminal space between the known pain behind and the unknown possibility ahead. Wind catches their clothes and hair. Their posture is on the tipping point between retreat and leap. Shot on 24mm, f/8, epic landscape scale, the human figure small against nature's vastness, golden hour light just breaking, breathtaking and terrifying simultaneously. No text, no watermarks.`
  },
  {
    id: "08",
    title: "A Dissociação — A Criança que se Desliga",
    context: "\"O adulto grita, o tom de voz sobe. O corpo da criança permanece ali, sentado, olhando para um ponto fixo. Os sons ficam distantes, o tempo desacelera. A mente se afasta.\"",
    prompt: `Ultra-realistic dramatic photograph with an intentional visual effect: a child sitting on the floor of a kitchen, knees pulled to chest, staring at a fixed point. The image has a radical split in focus and tone — the child's immediate space (50cm radius) is crystal clear, still, almost frozen in time, with muted desaturated colors representing the dissociative bubble. Everything OUTSIDE that radius is violently blurred with motion blur, warm aggressive colors — the suggestion of an adult figure looming and gesturing angrily, a hand slamming a table, a mouth open in shouting. The contrast between the frozen stillness of the child's protective bubble and the chaos of the world around them is jarring. The child's eyes are open but unfocused, looking at nothing — present but absent. A single tear track on one cheek is the only evidence of emotion. Shot from slightly above, 35mm, mixed focus technique. The technical execution should MAKE THE VIEWER FEEL the dissociation. No text, no watermarks.`
  },
  {
    id: "09",
    title: "O Ciclo de Adão e Eva — Vergonha, Medo, Culpa, Fuga, Acusação",
    context: "\"A queda inaugura o ciclo emocional que atravessa a humanidade: vergonha → medo → culpa → fuga → acusação. Nasce ali o primeiro sintoma psicológico da queda: a fragmentação interna.\"",
    prompt: `Ultra-realistic dramatic photograph of a person standing in a circular room of mirrors, but each mirror shows a different stage of the emotional cycle. First mirror: the person covering their body with their arms (SHAME). Second mirror: the person hiding behind a pillar, eyes wide (FEAR). Third mirror: the person on their knees, head bowed, hands pressed together (GUILT). Fourth mirror: the person running away, back turned (FLIGHT). Fifth mirror: the person pointing an accusing finger outward at the viewer (ACCUSATION). The person in the center stands still, caught between all these reflections, each one pulling them in a different direction. The mirrors are arranged in a circle, creating an infinite loop — the cycle that never ends. The floor is cracked earth, and through one crack, a single tree root is visible. Dramatic circular lighting from above like a spotlight, dark edges. Shot on 28mm, f/4, complex mirror reflections all in focus, deeply symbolic and visually arresting. No text, no watermarks.`
  },
  {
    id: "10",
    title: "As Raízes Geracionais — 4 Gerações, Mesma Ferida",
    context: "\"Os traumas geracionais se perpetuam... As escolhas geram consequências que se prolongam na história familiar. Abraão mente, Isaque repete, Jacó intensifica.\"",
    prompt: `Ultra-realistic dramatic photograph showing the cross-section of earth with a massive old tree growing on the surface. Underground, the root system is dramatically exposed in the cross-section, and embedded within the roots at four different depth levels are four male figures from different eras — deepest and oldest: an elderly man in simple old clothing, curled in fetal position among the deepest roots; above him: a middle-aged man in slightly newer clothes, same posture, same wound location on the chest visible as a dark mark; above: a younger father, same mark now bleeding; at the surface level, sitting against the trunk: a young boy, looking at a small scratch on his chest in the exact same location, just beginning. The roots physically connect all four figures, carrying the trauma like sap through the system. But the tree above is beginning to bloom despite everything — life persisting through generational pain. Late afternoon warm light on the surface contrasting with cool earth tones underground. Shot as a clean cross-section illustration but photorealistic, dramatic, National Geographic archaeological dig quality. No text, no watermarks.`
  },
  {
    id: "11",
    title: "A Síndrome do Impostor — Fazer vs. Ser",
    context: "\"A pessoa se reconhece eficiente no que FAZ, mas não se percebe valiosa em quem É. O mérito é atribuído à sorte, ao esforço, nunca à própria capacidade.\"",
    prompt: `Ultra-realistic dramatic photograph of a person in professional attire standing on a stage or podium, having just received an award or recognition — trophy or certificate in hand, spotlight on them, audience clapping (blurred). But the person's face tells a completely different story from the celebration: their eyes are downcast, jaw tight, one hand gripping the award while the other hand unconsciously touches their chest where the heart is, as if checking if they deserve to be there. Their shadow on the stage floor doesn't match their posture — the shadow shows a small child sitting cross-legged, looking up, uncertain. On the polished stage floor near their feet, barely visible: a cracked mirror fragment reflecting not the confident professional but a frightened face. The contrast between external success and internal desolation is the entire image. Shot on 85mm, f/2, dramatic stage lighting with deep shadows, capturing that specific private moment of feeling like a fraud in public triumph. No text, no watermarks.`
  },
  {
    id: "12",
    title: "\"Eu Não Sou Você, Papai\" — O Despertar do Ricardo",
    context: "O momento mais pessoal do livro. Ricardo repreende seu filho de 5 anos com exagero. À noite, pede perdão. O filho diz: \"Eu te perdoo, papai. Mas saiba que eu não sou você.\"",
    prompt: `Ultra-realistic dramatic intimate photograph of a father kneeling on the floor of a child's bedroom at night, face-to-face with his small son who sits on the edge of the bed. The father's head is slightly bowed, one hand holding the child's small hand. The child's other hand is gently placed on the father's cheek — a gesture of forgiveness that is somehow more mature than his age. The child's eyes are clear, direct, truthful — no fear, no resentment, just honest truth. The father's eyes glisten with tears of recognition, the moment of awakening visible on his face. A bedside lamp provides the only warm light, creating an intimate golden circle around them in the dark room. On the nightstand: a children's book and a small plant in a cup — the child's own growing thing. The bedroom wall has children's drawings. This is the most tender, vulnerable, life-changing moment between father and son. Shot on 50mm, f/1.4, extreme shallow depth of field centered on their touching hands and faces, warm intimate Rembrandt lighting. The image should make you cry. No text, no watermarks.`
  },
  {
    id: "13",
    title: "\"Sem Cera\" — A Autenticidade",
    context: "\"Artesãos preenchiam rachaduras com cera para esconder defeitos. 'Sincero' vem de 'sem cera' — ser autêntico, sem disfarçar as rachaduras.\"",
    prompt: `Ultra-realistic dramatic close-up photograph of two ceramic vessels side by side on a rough wooden table. The left vessel is externally beautiful, smooth, perfect-looking — but a close look reveals thick wax filling deep cracks, disguising fundamental breaks. The wax is beginning to melt from the warmth of sunlight hitting it, revealing the ugly fractures beneath the fake perfection. The right vessel is openly broken, cracked, imperfect — but the cracks have been filled with real gold (kintsugi style), making no attempt to hide the damage. Instead, the golden repairs make the vessel MORE beautiful than if it had never been broken. The golden lines catch the sunlight and glow. Both vessels hold water, but the wax-filled one is leaking slightly where the wax melts, while the gold-repaired one holds firm. A single wildflower sits in the golden vessel. Macro close-up, 90mm, f/2.8, dramatic directional sunlight, every texture of ceramic, wax, and gold visible. Simple but profound metaphor rendered in stunning photographic detail. No text, no watermarks.`
  },
  {
    id: "14",
    title: "Jacó no Vau do Jaboque — Enfrentar a Própria Sombra",
    context: "\"Jacó, ao lutar no vau do Jaboque, é forçado a encarar sua sombra, sua história, suas dores. Somente após esse enfrentamento recebe um novo nome e um novo destino.\"",
    prompt: `Ultra-realistic dramatic photograph shot at night by a river crossing. A man stands waist-deep in dark rushing water, locked in an intense physical struggle with a mysterious figure — but the figure he wrestles is his own shadow made somehow tangible, a darker version of himself. The water around them is turbulent, splashing, catching moonlight. The man's face shows exhaustion, determination, and the agony of confronting everything he's avoided. His clothes are torn. One hand grips the shadow-figure's arm; the other pushes against its chest. Despite the violence of the struggle, there's something almost like an embrace in their locked postures — you can't quite tell if they're fighting or holding each other. On the riverbank, the first hint of dawn light appears on the horizon — the struggle is nearing its end. The man's hip area shows strain (referencing the biblical wound). Above them, the ancient tree line creates a cathedral-like canopy. Shot on 35mm, f/2, moonlight and water splashes creating dramatic highlights, chiaroscuro like a Caravaggio brought to life. Epic, primal, transformative. No text, no watermarks.`
  },
  {
    id: "15",
    title: "Malaquias 4:6 — A Conversão dos Corações",
    context: "\"E ele converterá o coração dos pais aos filhos, e o coração dos filhos a seus pais.\" O último versículo do AT. A cura começa dentro de casa. A última imagem do livro.",
    prompt: `Ultra-realistic dramatic photograph taken at golden hour in an open field. An elderly grandfather, a middle-aged father, and a young boy — three generations — walking together toward the camera through tall golden grass. They walk in a line but closely together, the grandfather's hand on the father's shoulder, the father's hand holding the boy's hand. All three faces show different stages of the same emotion: recognition, reconciliation, peace. Behind them, their combined shadows on the ground form the silhouette of a single massive tree — the three separate figures creating trunk, branches, and roots when their shadows merge. The field is endless, the sky enormous, the sunset light is the warmest, most hope-filled golden light imaginable. Wildflowers bloom in the grass around their feet. In the far background, barely visible, a small house with lit windows waits for them — home. This is the image of generational healing, of hearts turning toward each other, of the cycle finally breaking. Shot on 35mm, f/4, epic landscape with intimate human connection, the most hopeful photograph ever taken. Golden hour perfection. No text, no watermarks.`
  }
];

async function createTask(prompt) {
  const res = await fetch(FLUX_DEV_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-freepik-api-key": API_KEY,
    },
    body: JSON.stringify({ prompt, aspect_ratio: "social_story_9_16" }),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch {
    throw new Error(`API retornou HTML (rate limit). Status: ${res.status}`);
  }
  if (!res.ok) throw new Error(json.message || `HTTP ${res.status}`);
  const taskId = json.data?.task_id ?? json.task_id;
  if (!taskId) throw new Error("Sem task_id");
  return taskId;
}

async function getTaskStatus(taskId) {
  const res = await fetch(`${FLUX_DEV_URL}/${taskId}`, {
    headers: { "x-freepik-api-key": API_KEY },
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch {
    await new Promise(r => setTimeout(r, 3000));
    const r2 = await fetch(`${FLUX_DEV_URL}/${taskId}`, {
      headers: { "x-freepik-api-key": API_KEY },
    });
    json = await r2.json();
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
    }
    process.stdout.write(".");
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error("Timeout.");
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await writeFile(filepath, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("🎨 V3 — ILUSTRAÇÕES POR TRECHO/CONCEITO");
  console.log(`📁 Saída: docs/Ricardo/imagens/V3/`);
  console.log(`🖼️  Ilustrações: ${illustrations.length}`);
  console.log(`🎯 Estilo: Fotorrealismo dramático por metáfora\n`);

  const results = [];

  for (const ill of illustrations) {
    const filename = `${ill.id}-${ill.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 60)}.png`;

    const outPath = join(OUTPUT_DIR, filename);

    try {
      console.log(`\n🖼️  ${ill.id}: ${ill.title}`);
      console.log(`   📖 ${ill.context.substring(0, 100)}...`);

      await new Promise(r => setTimeout(r, DELAY_BETWEEN));

      console.log(`   Criando tarefa...`);
      const taskId = await createTask(ill.prompt);
      console.log(`   task_id: ${taskId}`);

      process.stdout.write(`   Aguardando`);
      const urls = await waitForCompleted(taskId);
      console.log();

      await downloadImage(urls[0], outPath);
      console.log(`   ✅ ${filename}`);
      results.push({ id: ill.id, title: ill.title, success: true, file: filename });
    } catch (e) {
      console.log();
      console.error(`   ❌ ${e.message}`);
      results.push({ id: ill.id, title: ill.title, success: false, error: e.message });
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMO V3 — ILUSTRAÇÕES CONCEITUAIS");
  console.log("=".repeat(60));

  const ok = results.filter(r => r.success).length;
  const fail = results.filter(r => !r.success).length;

  for (const r of results) {
    console.log(`   ${r.id}: ${r.success ? "✅" : "❌"} ${r.title}`);
  }

  console.log(`\n📈 Total: ${ok} ✅ | ${fail} ❌`);

  await writeFile(join(OUTPUT_DIR, "_metadata.json"), JSON.stringify({
    version: "V3",
    type: "conceptual-illustrations",
    style: "photorealistic-dramatic",
    timestamp: new Date().toISOString(),
    illustrations: illustrations.map((ill, i) => ({
      ...results[i],
      context: ill.context
    }))
  }, null, 2), "utf8");

  if (fail > 0) console.log(`\n⚠️  Rode novamente para regerar falhas.`);
}

main().catch(e => { console.error("\n❌ Fatal:", e); process.exit(1); });
