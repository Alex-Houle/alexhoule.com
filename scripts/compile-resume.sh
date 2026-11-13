#!/usr/bin/env bash
#
# Compile the resume LaTeX source into public/Alex_Houle_Resume.pdf.
#
# Usage:  ./scripts/compile-resume.sh
#
# The source of truth is ../resume.latex (one directory above this project).
# Engine preference:
#   1. a local LaTeX install (pdflatex / latexmk)      -- source used verbatim
#   2. podman  + docker.io/texlive/texlive:latest      -- source used verbatim
#   3. docker  + docker.io/texlive/texlive:latest      -- source used verbatim
#   4. tectonic (XeTeX engine)                          -- needs a small harness
#      because resume.latex uses two pdfTeX-only primitives
#      (\input{glyphtounicode} and \pdfgentounicode=1). The harness defines the
#      primitive away and stubs the glyph-to-unicode map; no document content is
#      altered.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${RESUME_SRC:-$ROOT/../resume.latex}"
OUT="$ROOT/public/Alex_Houle_Resume.pdf"
TEXLIVE_IMAGE="${TEXLIVE_IMAGE:-docker.io/texlive/texlive:latest}"

if [[ ! -f "$SRC" ]]; then
  echo "error: resume source not found at $SRC" >&2
  exit 1
fi

BUILD="$(mktemp -d)"
trap 'rm -rf "$BUILD"' EXIT
cp "$SRC" "$BUILD/resume.latex"
cd "$BUILD"

echo ":: resume source : $SRC"
echo ":: build dir     : $BUILD"

if command -v latexmk >/dev/null 2>&1 || command -v pdflatex >/dev/null 2>&1; then
  echo ":: engine        : local pdflatex"
  if command -v latexmk >/dev/null 2>&1; then
    latexmk -pdf -interaction=nonstopmode -halt-on-error resume.latex >/dev/null
  else
    pdflatex -interaction=nonstopmode -halt-on-error resume.latex >/dev/null
    pdflatex -interaction=nonstopmode -halt-on-error resume.latex >/dev/null
  fi

elif command -v podman >/dev/null 2>&1 || command -v docker >/dev/null 2>&1; then
  RUNTIME="$(command -v podman || command -v docker)"
  echo ":: engine        : $RUNTIME ($TEXLIVE_IMAGE)"
  "$RUNTIME" run --rm --security-opt label=disable -v "$BUILD:/work" -w /work \
    "$TEXLIVE_IMAGE" sh -c \
    'pdflatex -interaction=nonstopmode -halt-on-error resume.latex >/dev/null && \
     pdflatex -interaction=nonstopmode -halt-on-error resume.latex >/dev/null'

elif command -v tectonic >/dev/null 2>&1; then
  echo ":: engine        : tectonic (XeTeX) with pdfTeX-compat harness"
  printf '%% stub: the real glyphtounicode.tex is pdfTeX-only\n' > glyphtounicode.tex
  printf '\\countdef\\pdfgentounicode=255\n\\input{resume.latex}\n' > main.tex
  tectonic -X compile main.tex
  mv main.pdf resume.pdf

else
  echo "error: no LaTeX toolchain found." >&2
  echo "       install texlive (pdflatex), or podman/docker, or tectonic." >&2
  echo "       The site keeps working with the .latex fallback link." >&2
  exit 1
fi

if [[ ! -f resume.pdf ]]; then
  echo "error: compilation did not produce resume.pdf" >&2
  exit 1
fi

mkdir -p "$ROOT/public"
cp resume.pdf "$OUT"

echo ":: output        : $OUT ($(wc -c <"$OUT" | tr -d ' ') bytes)"
if command -v pdfinfo >/dev/null 2>&1; then
  pdfinfo "$OUT" | grep -E '^(Pages|Producer):' | sed 's/^/::   /'
fi
