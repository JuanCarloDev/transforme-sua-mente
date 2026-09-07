import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const englishDir = path.join(projectRoot, "docs", "english");
const outputDir = path.join(projectRoot, "public", "downloads");
const chapterFiles = [
  "chapters-01-04.md",
  "chapters-05-08.md",
  "chapters-09-12.md",
];

const title = "Transform Your Mind";
const subtitle = "A Practical Guide to Healing Emotional Trauma";
const author = "Ricardo Batista Cavassin";
const combinedMarkdownPath = path.join(englishDir, "transform-your-mind.md");
const outputPdf = path.join(outputDir, "transform-your-mind-english.pdf");
const stylesheet = path.join(englishDir, "book-print.css");
const cover = path.join(projectRoot, "public", "covers", "transform-your-mind-cover.svg");

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const chaptersSource = chapterFiles
  .map((filename) => readFileSync(path.join(englishDir, filename), "utf8").trim())
  .join("\n\n");

const chapterMatches = [...chaptersSource.matchAll(/^# Chapter (\d+): (.+)$/gm)];
if (chapterMatches.length !== 12) {
  throw new Error(`Expected 12 chapter headings, found ${chapterMatches.length}`);
}

chapterMatches.forEach((match, index) => {
  const chapterNumber = Number(match[1]);
  if (chapterNumber !== index + 1) {
    throw new Error(`Expected Chapter ${index + 1}, found Chapter ${chapterNumber}`);
  }
});

if (/[\u2013\u2014]/u.test(chaptersSource)) {
  throw new Error("The English manuscript contains an en dash or em dash. Resolve it before rendering.");
}

const metadata = `---
title: "${title}"
subtitle: "${subtitle}"
author: "${author}"
lang: en-US
date: 2026
---`;

const combinedMarkdown = `${metadata}\n\n${chaptersSource}\n`;
writeFileSync(combinedMarkdownPath, combinedMarkdown);

const attributedMarkdown = chaptersSource.replace(
  /^# Chapter (\d+): (.+)$/gm,
  (_heading, number, chapterTitle) => `# Chapter ${number}: ${chapterTitle} {#chapter-${number}}`,
);

const bodyHtml = execFileSync(
  "pandoc",
  ["--from=markdown+smart+header_attributes", "--to=html5", "--wrap=none"],
  { input: attributedMarkdown, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
);

const tocHtml = chapterMatches
  .map((match) => `<li><a href="#chapter-${match[1]}">Chapter ${match[1]}: ${escapeHtml(match[2])}</a></li>`)
  .join("\n");

const html = `<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="author" content="${author}" />
    <meta name="description" content="${subtitle}" />
    <title>${title}: ${subtitle}</title>
    <link rel="stylesheet" href="${pathToFileURL(stylesheet).href}" />
  </head>
  <body>
    <section class="cover-page">
      <img src="${pathToFileURL(cover).href}" alt="${title} book cover" />
    </section>

    <section class="front-page title-page">
      <p class="author">${author}</p>
      <h1>${title}</h1>
      <p class="subtitle">${subtitle}</p>
      <blockquote>
        “Do not be conformed to this world, but be transformed by the renewing of your mind, so that you may discern what is the good, pleasing, and perfect will of God.”
        <br />Romans 12:2
      </blockquote>
      <p class="edition">First English Digital Edition · 2026</p>
    </section>

    <section class="front-page cip-page">
      <h2>Cataloging-in-Publication Data</h2>
      <div class="cip-card">
        <p>Cavassin, Ricardo Batista</p>
        <p><strong>${title}: ${subtitle}</strong> / Ricardo Batista Cavassin. First edition. Almirante Tamandaré, PR: Editora Jocum, 2025.</p>
        <p><strong>ISBN 978-65-88908-87-7</strong></p>
        <p>1. Self-knowledge 2. Spirituality 3. Christian theology 4. Trauma: Religious aspects: Christianity 5. Christian life I. Title.</p>
        <p>26-347077.0 · CDD 248.4</p>
        <p><strong>Systematic catalog index:</strong><br />1. Christian life: Spirituality: Christianity · 248.4</p>
        <p>Lívia Dias Vaz, Librarian · CRB-8/9638</p>
      </div>
      <p class="cip-note">English translation of the original Portuguese cataloging record. This is not a new cataloging record.</p>
    </section>

    <section class="front-page dedication-page">
      <p>To all who carry wounds they did not choose to receive, yet choose, each day, the path of healing and renewal.</p>
    </section>

    <section class="front-page toc-page">
      <h2>Contents</h2>
      <ol>${tocHtml}</ol>
    </section>

    <main class="book-body">${bodyHtml}</main>
  </body>
</html>`;

const workDir = mkdtempSync(path.join(tmpdir(), "transform-your-mind-book-"));
const htmlPath = path.join(workDir, "book.html");

mkdirSync(outputDir, { recursive: true });

try {
  writeFileSync(htmlPath, html);
  execFileSync("weasyprint", [htmlPath, outputPdf], { stdio: "inherit" });
  console.log(`English manuscript generated at ${path.relative(projectRoot, combinedMarkdownPath)}`);
  console.log(`English book PDF generated at ${path.relative(projectRoot, outputPdf)}`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
