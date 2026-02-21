#!/usr/bin/env node
/**
 * Gera imagens de capa para cada capítulo do livro do Ricardo
 * usando a API Freepik (Flux Dev - text-to-image).
 *
 * Uso: node docs/Ricardo/generate-images.mjs
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

// Capítulos do livro com prompts personalizados
const chapters = [
  {
    id: "01",
    title: "Introdução - A Infância e a Formação da Psique",
    prompt: `A breathtaking surreal painting of a small child standing alone in a vast ethereal landscape. The child's silhouette is translucent, revealing an intricate root system growing from within — roots extending downward into dark soil filled with fragmented memories and faded faces, while branches grow upward from the child's head blooming with golden light and new leaves. The scene represents the formation of the human psyche during childhood. Dark stormy clouds on one side gradually transition to warm sunrise light on the other. Cinematic composition, hyper-detailed, dramatic lighting, emotional depth, painterly style with rich textures. No text.`
  },
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
    id: "05",
    title: "Os Falsos Profetas da Nossa Vida",
    prompt: `A dramatic surreal painting of a child standing at a crossroads surrounded by towering shadow figures — parents, teachers, mentors, friends — each casting long dark shadows that overlap and distort. Some figures hold masks of kindness while their shadows reveal manipulation and control. One figure extends a hand with a glowing gift that, upon closer look, contains chains. In the distance, a single beam of true light breaks through the darkness from above, representing divine truth cutting through false influence. Renaissance-inspired composition, dramatic lighting, rich symbolism. No text.`
  },
  {
    id: "06",
    title: "Modelagem e Aprendizagem Social",
    prompt: `A powerful conceptual painting depicting a hall of mirrors where a small child watches multiple reflections of adults around them — each mirror showing different behaviors being absorbed: aggression, kindness, fear, love. The child stands at the center, their own reflection showing fragments of all observed behaviors merging into their identity. Scattered on the floor are broken mirrors showing the Bobo doll experiment — a child imitating violence. Above, neural pathways connect like constellations. Deep rich colors, cinematic lighting, painterly realism with surreal elements. No text.`
  },
  {
    id: "07",
    title: "Quem é Você? - Identidade e Criação",
    prompt: `A majestic surreal painting showing a human figure standing before a cosmic mirror. In the mirror's reflection, instead of their wounded self, they see the original divine blueprint — a luminous being made of stardust and light, in the image of God. The figure is shedding layers of masks, costumes, and false identities that fall like autumn leaves around their feet. Above, hands of creation shape light into human form. Genesis creation symbolism — earth, stars, breath of life. A tree with deep roots and soaring branches grows from the figure's heart. Epic scale, cathedral-like lighting, oil painting mastery. No text.`
  },
  {
    id: "08",
    title: "O Papel da Figura Paterna",
    prompt: `An emotionally powerful painting of two scenes divided by a vertical beam of light. On the left, a father's large hand reaching down to a small child reaching up — their fingers almost touching like Michelangelo's Creation of Adam, but the father's hand is transparent, fading, representing absence. On the right, a strong father figure kneeling at eye level with his child, hands on shoulders, eyes locked in affirmation and love. Above both scenes, a dove descends with golden light — representing God the Father affirming Jesus at baptism. Rich emotional depth, warm and cool color contrast, painterly realism. No text.`
  },
  {
    id: "09",
    title: "Influência do Ambiente na Construção da Identidade",
    prompt: `A surreal panoramic painting of a child as a young tree growing in the center, with roots extending into different soil types representing different environments: rich fertile soil of a loving home, cracked dry earth of poverty, toxic polluted ground of dysfunction, and fresh tilled soil of school and community. Each section of soil feeds different branches — some flourishing with green leaves and fruit, others withered and dark. City buildings, schools, churches, and screens float as clouds above, each raining different colors onto the tree. Lush detailed nature meets urban landscape, cinematic wide composition. No text.`
  },
  {
    id: "10",
    title: "A Formação da Identidade Precede o Nascimento",
    prompt: `A tender and mystical painting of a luminous fetus floating in a cosmic womb, connected by an umbilical cord that branches into roots reaching through layers of family history — generations of ancestors visible as ethereal silhouettes in geological-like strata below. The mother's emotional state radiates as colored auras surrounding the womb: anxiety as stormy blue, love as warm gold, fear as cold gray. Above, a divine hand gently touches the womb. The whole scene is nested within the shape of a heart. Soft bioluminescent lighting, deeply intimate, sacred and scientific beauty merged. No text.`
  },
  {
    id: "11",
    title: "Compreendendo o Trauma Emocional",
    prompt: `A visceral surreal painting of a human figure whose chest is open, revealing not organs but a shattered mirror inside — each fragment reflecting a different painful memory from childhood. From the cracks, dark smoke rises that transforms into chains wrapping around the limbs. But at the very center of the shattered chest, a small inextinguishable flame burns golden. Around the figure, a frozen landscape represents emotional numbness, while beneath the ice, a river of emotions still flows. The metaphor of an ingrown nail — small origin, immense pain. Dramatic theatrical lighting, emotionally raw, hyperrealistic painterly style. No text.`
  },
  {
    id: "12",
    title: "Adão, Eva e a Serpente - Mecanismos de Defesa",
    prompt: `A grand mythological painting of the Garden of Eden at the exact moment of the fall — but reimagined through a psychological lens. Adam and Eve stand before the tree of knowledge, but the tree's branches form neural pathways of the brain. The serpent coils around the trunk, whispering, its scales reflecting modern temptations. As Eve reaches for the fruit, her shadow begins to fragment into multiple personas — masks forming around her. Fig leaves are already materializing as the first defense mechanisms. The garden behind them glows with paradise light while ahead, the landscape darkens. Renaissance master composition, rich Biblical symbolism, epic dramatic lighting. No text.`
  },
  {
    id: "13",
    title: "Traumas Geracionais",
    prompt: `A profound multigenerational painting showing a vertical family tree — but inverted, with roots at the top growing downward through four generations. Each generation is represented by a translucent figure, and through their bodies you can see the same wound, the same crack, passing from grandparent to parent to child to grandchild — but slightly different each time, sometimes larger, sometimes healing. Dark chains connect them through the generations, but golden threads also weave through, representing potential for healing. DNA helix spirals around the tree trunk. At the bottom, the youngest figure begins to glow, breaking the cycle. Deep rich earth tones with golden highlights, emotionally layered. No text.`
  },
  {
    id: "14",
    title: "Consequências Comportamentais das Feridas Emocionais",
    prompt: `A haunting surreal painting of a human figure standing in the center of a storm, wearing multiple translucent masks layered over their face — each mask representing a different defense mechanism: aggression (red), withdrawal (gray), people-pleasing (pink), perfectionism (white), addiction (dark purple), dissociation (transparent/ghostly). Their body shows visible cracks with different emotions leaking out as colored light. Around their feet, broken relationships, shattered achievements, and wilted connections scatter like autumn debris. One hand clutches their chest where the inner child glows faintly. Moody atmospheric lighting, emotionally complex, dark romanticism style. No text.`
  },
  {
    id: "15",
    title: "Reconexão com Meu Eu",
    prompt: `A triumphant and healing painting of a person standing at the edge of a still lake at golden hour, looking at their true reflection in the water — but the reflection shows their whole, healed self: luminous, confident, at peace. Behind the person, scattered on the shore, lie discarded masks, broken chains, and wilted costumes they no longer need. The person extends their hand toward the reflection, and where their fingers touch the water, golden ripples expand outward, transforming the dark water into crystal clarity. A sunrise breaks behind mountains, casting the first rays of a new day. Warm hopeful palette, breathtaking landscape, emotionally uplifting, painterly photorealism. No text.`
  },
  {
    id: "16",
    title: "Hábitos, Lugares e Pessoas - O Processo de Mudança",
    prompt: `A dynamic surreal painting showing three doorways standing in an open field. The first door (HABITS) opens to reveal a clockwork mechanism with gears transforming from rusty old patterns to gleaming new ones. The second door (PLACES) shows a landscape transitioning from a dark confined room to a vast open horizon. The third door (PEOPLE) reveals silhouettes — toxic shadows retreating while luminous supportive figures step forward. A person walks through all three doors simultaneously, leaving footprints that bloom into flowers. Neural pathways in the sky reshape like constellations. Vibrant transformative energy, cinematic wide shot, painterly realism with magical elements. No text.`
  },
  {
    id: "17",
    title: "A Mudança Começa no Enfrentamento",
    prompt: `A powerful dramatic painting of a person standing face-to-face with their own enormous shadow on a wall — but instead of cowering, they step forward with a lantern raised high. The shadow, representing all their fears and traumas, begins to crack and fragment as light touches it, revealing that behind the shadow was actually a door. The door is slightly ajar, showing warm golden light and a peaceful garden beyond. At the person's feet, pieces of a broken mirror reassemble themselves into a new, whole reflection. A dramatic beam of light from above represents divine revelation. Jacob wrestling with the angel subtly referenced in composition. Intense chiaroscuro, emotionally powerful, baroque-inspired drama. No text.`
  },
  {
    id: "18",
    title: "Há Esperança",
    prompt: `A breathtaking grand finale painting showing a massive ancient tree with impossibly deep roots and soaring branches that touch the clouds. The tree grows from cracked, wounded earth but transforms everything it touches into life. In the roots, you can see small scenes of childhood pain dissolving into compost that feeds the tree. The trunk shows the rings of generations — each ring a different era of a family's story. The branches burst with golden leaves, fruit, birds, and light. At the base of the tree, a parent and child sit together, faces turned toward each other, hands touching — the conversion of hearts from Malachi 4:6. A sunrise bathes everything in warm hope. Tears on the ground sprout into wildflowers. The most beautiful, emotionally overwhelming, hope-filled image imaginable. Grand scale, cathedral-like composition, golden hour lighting, masterpiece quality. No text.`
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
      aspect_ratio: "social_story_9_16", // Vertical full-page format
    }),
  });

  const json = await res.json();
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
  const json = await res.json();
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

  console.log("🎨 Gerador de Imagens - Livro do Ricardo");
  console.log(`📁 Saída: docs/Ricardo/imagens/`);
  console.log(`📚 Capítulos: ${chapters.length}`);
  console.log(`📐 Formato: 9:16 (vertical full-page)`);
  console.log(`🤖 Modelo: Flux Dev (Freepik API)\n`);

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
  console.log("📊 RESUMO DA GERAÇÃO");
  console.log("=".repeat(60));

  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  for (const r of results) {
    console.log(`   Cap ${r.chapter}: ${r.success ? "✅" : "❌"} ${r.title}`);
  }

  console.log(`\n📈 Total: ${success} sucessos | ${failed} falhas`);
  console.log(`📁 Imagens em: docs/Ricardo/imagens/`);

  // Salvar metadata
  const metaPath = join(OUTPUT_DIR, "_metadata.json");
  await writeFile(metaPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    model: "flux-dev",
    aspect_ratio: "9:16",
    chapters: results
  }, null, 2), "utf8");
}

main().catch((e) => {
  console.error("\n❌ Erro fatal:", e);
  process.exit(1);
});
