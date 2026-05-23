#!/bin/bash
# Build do livro "Transforme Sua Mente" - PDF pronto para impressao
# Formato: 14x21cm, normas ABNT (NBR 6029), XeLaTeX

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TINYTEX="$HOME/Library/TinyTeX/bin/universal-darwin"
LIVRO="$SCRIPT_DIR/../revisado/livro-revisado.md"
OUTPUT="$SCRIPT_DIR/transforme-sua-mente.pdf"

echo "=== Construindo livro: Transforme Sua Mente ==="
echo "Fonte: $LIVRO"
echo "Saida: $OUTPUT"
echo ""

# Gerar PDF com Pandoc + XeLaTeX
pandoc "$LIVRO" \
  --metadata-file="$SCRIPT_DIR/metadata.yaml" \
  --pdf-engine="$TINYTEX/xelatex" \
  --include-in-header="$SCRIPT_DIR/header.tex" \
  --include-before-body="$SCRIPT_DIR/capa.tex" \
  --include-before-body="$SCRIPT_DIR/ficha-catalografica.tex" \
  --include-before-body="$SCRIPT_DIR/dedicatoria.tex" \
  --include-after-body="$SCRIPT_DIR/contracapa.tex" \
  --resource-path="$SCRIPT_DIR:$SCRIPT_DIR/.." \
  --top-level-division=chapter \
  -o "$OUTPUT" \
  2>&1

echo ""
echo "=== PDF gerado com sucesso! ==="
echo "Arquivo: $OUTPUT"
echo "Tamanho: $(du -h "$OUTPUT" | cut -f1)"
echo ""
echo "Especificacoes:"
echo "  - Formato: 14 x 21 cm"
echo "  - Margens: sup 2.5cm, inf 2cm, int 2.5cm, ext 1.8cm"
echo "  - Fonte: Palatino 11pt"
echo "  - Entrelinhas: 1.4"
echo "  - Binding offset: 0.5cm"
