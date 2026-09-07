import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const outputDir = path.join(projectRoot, "public", "covers");

mkdirSync(outputDir, { recursive: true });

const normalizeXml = (value) => `${value.replace(/[ \t]+$/gm, "").trimEnd()}\n`;

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const textBlock = ({ x, y, lines, size, lineHeight, anchor = "start", className = "body" }) => `
  <text x="${x}" y="${y}" class="${className}" font-size="${size}" text-anchor="${anchor}">
    ${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join("\n    ")}
  </text>`;

function ean13Bits(value) {
  if (!/^\d{13}$/.test(value)) throw new Error("EAN-13 must contain exactly 13 digits");

  const leftOdd = {
    0: "0001101", 1: "0011001", 2: "0010011", 3: "0111101", 4: "0100011",
    5: "0110001", 6: "0101111", 7: "0111011", 8: "0110111", 9: "0001011",
  };
  const leftEven = {
    0: "0100111", 1: "0110011", 2: "0011011", 3: "0100001", 4: "0011101",
    5: "0111001", 6: "0000101", 7: "0010001", 8: "0001001", 9: "0010111",
  };
  const right = {
    0: "1110010", 1: "1100110", 2: "1101100", 3: "1000010", 4: "1011100",
    5: "1001110", 6: "1010000", 7: "1000100", 8: "1001000", 9: "1110100",
  };
  const parity = [
    "OOOOOO", "OOEOEE", "OOEEOE", "OOEEEO", "OEOOEE",
    "OEEOOE", "OEEEOO", "OEOEOE", "OEOEEO", "OEEOEO",
  ];

  const digits = value.split("").map(Number);
  let bits = "101";
  for (let i = 1; i <= 6; i += 1) {
    bits += parity[digits[0]][i - 1] === "O" ? leftOdd[digits[i]] : leftEven[digits[i]];
  }
  bits += "01010";
  for (let i = 7; i <= 12; i += 1) bits += right[digits[i]];
  bits += "101";
  return bits;
}

function barcodeSvg(value, x, y, width, height) {
  const bits = ean13Bits(value);
  const quiet = 4;
  const module = (width - quiet * 2) / bits.length;
  const bars = [...bits]
    .map((bit, index) => bit === "1"
      ? `<rect x="${(x + quiet + index * module).toFixed(3)}" y="${y}" width="${(module + 0.02).toFixed(3)}" height="${height - 4}" fill="#111"/>`
      : "")
    .join("");

  return `
    <g aria-label="ISBN 978-65-88908-87-7">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="0.8" fill="#fff"/>
      <text x="${x + width / 2}" y="${y + 2.7}" text-anchor="middle" font-family="Courier New, monospace" font-size="2.2" fill="#111">ISBN 978-65-88908-87-7</text>
      ${bars}
      <text x="${x + width / 2}" y="${y + height - 0.9}" text-anchor="middle" font-family="Courier New, monospace" font-size="2.4" letter-spacing="1.15" fill="#111">9 786588 908877</text>
    </g>`;
}

const commonDefs = `
  <defs>
    <filter id="titleShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="1.2" stdDeviation="1.1" flood-color="#000" flood-opacity="0.85"/>
    </filter>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="0.65" stdDeviation="0.7" flood-color="#000" flood-opacity="0.75"/>
    </filter>
    <clipPath id="authorPhotoClip">
      <rect x="32" y="199" width="20" height="35" rx="1.7"/>
    </clipPath>
    <style>
      .title { font-family: "DIN Condensed", Impact, sans-serif; font-weight: 700; letter-spacing: 0.55mm; }
      .sans { font-family: "Avenir Next", "Open Sans", sans-serif; }
      .body { font-family: "Palatino", "Palatino Linotype", serif; fill: #f3eee7; }
      .gold { fill: #f9bf3c; }
      .cream { fill: #f2dab8; }
      .muted { fill: #c9c2b8; }
    </style>
  </defs>`;

const frontArtwork = ({ x = 0, y = 0, width = 140, height = 215, contentWidth = width }) => `
  <image href="transform-your-mind-background.png" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
  <g filter="url(#titleShadow)">
    <text x="${x + contentWidth / 2}" y="${y + 75}" class="title cream" font-size="24" stroke="#f2dab8" stroke-width="0.7" paint-order="stroke fill" text-anchor="middle" textLength="112" lengthAdjust="spacingAndGlyphs">TRANSFORM</text>
    <text x="${x + contentWidth / 2}" y="${y + 97}" class="title gold" font-size="22.5" stroke="#f9bf3c" stroke-width="0.7" paint-order="stroke fill" text-anchor="middle" textLength="96" lengthAdjust="spacingAndGlyphs">YOUR MIND</text>
  </g>
  <line x1="${x + 34}" y1="${y + 104}" x2="${x + contentWidth - 34}" y2="${y + 104}" stroke="#a8772b" stroke-width="0.45" opacity="0.8"/>
  <text x="${x + contentWidth / 2}" y="${y + 112}" class="sans cream" font-size="4.3" font-weight="700" text-anchor="middle" filter="url(#softShadow)">A PRACTICAL GUIDE TO HEALING EMOTIONAL TRAUMA</text>
  <line x1="${x + 42}" y1="${y + 117}" x2="${x + contentWidth - 42}" y2="${y + 117}" stroke="#a8772b" stroke-width="0.42" opacity="0.8"/>
  <text x="${x + contentWidth / 2}" y="${y + height - 10}" class="sans cream" font-size="7.1" font-weight="700" text-anchor="middle" filter="url(#softShadow)">Ricardo Batista Cavassin</text>`;

const frontSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="140mm" height="210mm" viewBox="0 0 140 210" role="img" aria-labelledby="title desc">
  <title id="title">Transform Your Mind</title>
  <desc id="desc">English front cover for Ricardo Batista Cavassin's book</desc>
  ${commonDefs}
  ${frontArtwork({ x: 0, y: -2.5, width: 140, height: 215 })}
</svg>
`;

const fullCoverSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="342.5mm" height="260mm" viewBox="0 0 342.5 260" role="img" aria-labelledby="title desc">
  <title id="title">Transform Your Mind full English cover</title>
  <desc id="desc">Print cover spread with back cover, 12.5 millimeter spine, and front cover</desc>
  ${commonDefs}

  <rect width="342.5" height="260" fill="#fff"/>

  <rect x="20" y="20" width="157.5" height="220" fill="#03050b"/>
  <rect x="20" y="20" width="145" height="33" fill="#1f1009"/>
  <path d="M22 49 L24 47 L27 50 L32 49 L36 50 L41 47.8 L45 49 L49 46.8 L54 50 L59 47.5 L64 49.5 L69 48 L75 50 L82 46.9 L89 49.2 L96 46.7 L103 48.4 L108 46.6 L114 50 L121 48 L128 49.5 L135 47.2 L142 49 L148 47.5 L154 49.6 L162 48" fill="none" stroke="#f3eee7" stroke-width="0.55"/>

  <text x="92.5" y="38.5" class="body gold" font-size="3.65" font-style="italic" font-weight="700" text-anchor="middle">There are wounds that time cannot heal on its own.</text>
  <line x1="30" y1="59" x2="155" y2="59" stroke="#5d4522" stroke-width="0.3"/>
  <circle cx="92.5" cy="59" r="1.15" fill="#f9bf3c" transform="rotate(45 92.5 59)"/>

  ${textBlock({ x: 92.5, y: 68, anchor: "middle", size: 5.1, lineHeight: 5.2, className: "body gold", lines: [
    "What happens when a child grows up carrying", "pain that was never given a name?",
  ] })}

  ${textBlock({ x: 92.5, y: 82, anchor: "middle", size: 3.05, lineHeight: 4.35, className: "sans muted", lines: [
    "Childhood trauma does not stay in the past. It grows with us, shaping our choices,", "relationships, emotions, and even the way we see ourselves. But there is a path", "to freedom, and it begins with the courage to look within.",
  ] })}

  ${textBlock({ x: 92.5, y: 100, anchor: "middle", size: 3.45, lineHeight: 4.7, className: "body gold", lines: [
    "\"Do not be conformed to this world, but be transformed", "by the renewing of your mind.\" Romans 12:2",
  ] })}

  <line x1="41" y1="111" x2="144" y2="111" stroke="#4b371b" stroke-width="0.28"/>
  ${textBlock({ x: 92.5, y: 119, anchor: "middle", size: 3.05, lineHeight: 4.35, className: "sans muted", lines: [
    "Bringing together science, psychoanalysis, and faith, Ricardo Batista Cavassin", "guides the reader on a profound journey of self-knowledge. The result of nearly a", "decade of research and personal experience, this book offers answers where there", "were only questions, and hope where there was only pain.",
  ] })}

  <line x1="30" y1="140.5" x2="155" y2="140.5" stroke="#5d4522" stroke-width="0.3"/>
  <circle cx="92.5" cy="140.5" r="1.15" fill="#f9bf3c" transform="rotate(45 92.5 140.5)"/>
  <text x="92.5" y="149" class="sans gold" font-size="2.75" font-weight="700" letter-spacing="0.42" text-anchor="middle">WHAT YOU WILL FIND IN THIS BOOK</text>

  ${textBlock({ x: 35, y: 158, size: 2.95, lineHeight: 4.4, lines: [
    "The origins of childhood trauma", "and its invisible scars;", "Causes, patterns, and the psyche's", "defense mechanisms;", "Practical tools for renewing", "the mind;",
  ] })}
  ${textBlock({ x: 96, y: 158, size: 2.95, lineHeight: 4.4, lines: [
    "How the past appears in adult life;", "", "The path to healing: science and faith", "walking together;", "A true testimony: from pain", "to transformation.",
  ] })}
  <g fill="#f9bf3c">
    <circle cx="32.5" cy="157.1" r="0.7"/><circle cx="32.5" cy="165.9" r="0.7"/><circle cx="32.5" cy="174.7" r="0.7"/>
    <circle cx="93.5" cy="157.1" r="0.7"/><circle cx="93.5" cy="165.9" r="0.7"/><circle cx="93.5" cy="174.7" r="0.7"/>
  </g>

  <line x1="30" y1="189" x2="155" y2="189" stroke="#5d4522" stroke-width="0.3"/>
  <circle cx="92.5" cy="189" r="1.15" fill="#f9bf3c" transform="rotate(45 92.5 189)"/>

  <image href="../ricardo.jpeg" x="32" y="199" width="20" height="35" preserveAspectRatio="xMidYMin slice" clip-path="url(#authorPhotoClip)"/>
  <text x="57" y="201.5" class="sans gold" font-size="2.35" font-weight="700" letter-spacing="0.25">ABOUT THE AUTHOR</text>
  <text x="57" y="207" class="body gold" font-size="4.6" font-weight="700">Ricardo Batista Cavassin</text>
  <text x="57" y="212" class="sans gold" font-size="2.35" font-weight="700" letter-spacing="0.13">PROFESSOR | HISTORIAN | PSYCHOANALYST | WRITER</text>
  ${textBlock({ x: 57, y: 217.2, size: 2.35, lineHeight: 3.45, className: "sans muted", lines: [
    "Since 2016, Ricardo has devoted himself to the in-depth study", "of trauma and the human mind. His research grew from his own", "healing journey, becoming a reference at the intersection of", "science and biblical faith. With sensitivity and rigor, he guides", "people toward real transformation.",
  ] })}

  ${barcodeSvg("9786588908877", 129, 216, 30, 18)}

  <rect x="165" y="20" width="12.5" height="220" fill="#000014"/>
  <text class="sans" fill="#f7f4ed" font-size="5.2" font-weight="700" letter-spacing="0.35" text-anchor="middle" transform="translate(171.6 81) rotate(90)">TRANSFORM YOUR MIND</text>
  <text class="sans gold" font-size="3.7" font-weight="700" letter-spacing="0.18" text-anchor="middle" transform="translate(171.6 205) rotate(90)">RICARDO BATISTA CAVASSIN</text>

  ${frontArtwork({ x: 177.5, y: 20, width: 145, height: 220, contentWidth: 140 })}

  <g fill="none" stroke="#222" stroke-width="0.28">
    <path d="M25 5 V18 M5 25 H18 M317.5 5 V18 M324.5 25 H337.5 M25 242 V255 M5 235 H18 M317.5 242 V255 M324.5 235 H337.5"/>
  </g>
  <g fill="none" stroke="#666" stroke-width="0.22" stroke-dasharray="2 2">
    <path d="M165 5 V18 M165 242 V255 M177.5 5 V18 M177.5 242 V255"/>
  </g>
</svg>
`;

writeFileSync(path.join(outputDir, "transform-your-mind-cover.svg"), normalizeXml(frontSvg));
writeFileSync(path.join(outputDir, "transform-your-mind-full-cover.svg"), normalizeXml(fullCoverSvg));

console.log("English cover SVGs generated in public/covers");
