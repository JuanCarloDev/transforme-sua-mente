import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const sourceSvg = path.join(projectRoot, "public", "covers", "transform-your-mind-full-cover.svg");
const outputPdf = path.join(projectRoot, "public", "downloads", "transform-your-mind-cover-english.pdf");
const workDir = mkdtempSync(path.join(tmpdir(), "transform-your-mind-cover-"));
const wrapperPath = path.join(workDir, "cover.html");

const html = `<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta name="author" content="Ricardo Batista Cavassin" />
    <meta name="description" content="Full English print cover with back cover, spine, bleed, and crop marks" />
    <title>Transform Your Mind: Full English Cover</title>
    <style>
      @page { size: 342.5mm 260mm; margin: 0; }
      html, body { margin: 0; width: 342.5mm; height: 260mm; overflow: hidden; }
      img { display: block; width: 342.5mm; height: 260mm; }
    </style>
  </head>
  <body><img src="${pathToFileURL(sourceSvg).href}" alt="Transform Your Mind full English cover" /></body>
</html>`;

try {
  writeFileSync(wrapperPath, html);
  execFileSync("weasyprint", [wrapperPath, outputPdf], { stdio: "inherit" });
  console.log(`English cover PDF generated at ${path.relative(projectRoot, outputPdf)}`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
