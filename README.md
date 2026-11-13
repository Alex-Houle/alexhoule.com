# Alex Houle — Terminal / Network Lab

A single-page personal portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**,
styled as a dark CRT terminal / network lab.

Every fact on the page is transcribed from the resume in `../resume.latex`
(`resume.latex` in the parent directory) and lives in one typed file:
[`data/resume.ts`](data/resume.ts). Nothing is invented — the `about` section
recombines verbatim resume facts (degree, employer, dates) and nothing more.

## Run it

```bash
npm install
npm run dev        # dev server on http://localhost:20002/newSite/
# or
npm run build && npm start   # static export -> serve out/ -> http://localhost:20002/newSite/
```

- Port **20002** is wired into the `dev` / `start` npm scripts.
- Because the site deploys to GitHub Pages under the `/newSite` base path
  (see [Deploy](#deploy---github-pages)), local URLs carry that prefix too.

## Deploy — GitHub Pages

The site is a **static export** (`output: "export"` in `next.config.ts`) and ships
with a GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

- On every push to `main` (or manual dispatch), the workflow runs `npm ci && npm run build`
  and deploys the `out/` folder to GitHub Pages.
- Live URL: <https://alex-houle.github.io/newSite/>

To point the site at a custom domain later (e.g. `alexhoule.com`), set the GitHub Pages
custom domain, then adjust `basePath` in `next.config.ts` accordingly (empty string for a
domain-root deployment).

## Design

**Terminal / Network Lab**

| Element | Where |
| --- | --- |
| Near-black `#0a0e14` background, phosphor green `#39ff14`, amber `#ffb000`, cyan `#4fd6e3` accents | `app/globals.css` (`@theme` tokens) |
| JetBrains Mono via `next/font` for all typography | `app/layout.tsx` |
| Hero terminal window with a `$ whoami` prompt and blinking cursor | `components/TerminalWindow.tsx`, `components/Section.tsx` |
| Each section framed as command output (`$ cat experience.log`, `$ ls -la ~/projects`) | `components/Section.tsx` |
| Skills as a faux packet-capture / `ss` status table | `components/SkillsTable.tsx` |
| Blinking block cursor, scanlines/refresh/vignette | `.cursor-block` / `.window` etc. in `app/globals.css` |
| tmux-style status bar with section nav + local clock | `components/StatusBar.tsx` |
| Smooth scroll single page | `html { scroll-behavior: smooth }` + `scroll-padding-top` |

### Sections

`whoami` (identity + contact endpoints) → `cat education.txt` → `cat experience.log` →
`ls -la ~/projects` → `ss -tunap --skills` → `cat achievements.txt` → `logout`.

### Keyboard

- `Tab` / `Enter` navigate the keycap nav; focus rings are amber and never removed

## Accessibility

- **`prefers-reduced-motion: reduce`** is honoured in two places: a global CSS block that
  neutralises every animation/transition/scroll, and the typewriter, which renders the whole
  hero instantly instead of typing it.
- The typewriter's full text is always present in the DOM (`sr-only`), so screen readers and
  no-JS users get the complete hero.
- Semantic `section`/`h1`–`h3` structure, `aria-labelledby` on each section, a skip link, and a
  `caption`/`scope` table for the skills readout.
- Palette is checked for readable contrast on `#0a0e14` (green, amber, cyan, and the muted
  text tones all stay above 4.5:1 for body copy).
- Decorative-only material (scanlines, window dots, the packet table's `proto`/`port`/`state`
  columns) is marked `aria-hidden` or labelled as decorative.
- A `@media print` block drops the CRT overlay and inverts to plain black-on-white.

## The resume PDF

`public/Alex_Houle_Resume.pdf` (1 page, pdfTeX) is the **verbatim** output of `resume.latex` —
the source was compiled unmodified. The download button serves this PDF and also links the
LaTeX source (`public/resume.latex`).

Regenerate it with:

```bash
./scripts/compile-resume.sh
```

The script picks the best available engine: local `pdflatex`/`latexmk`, else
`podman`/`docker` running `texlive/texlive:latest` (both compile the source verbatim), else
`tectonic`, which needs a small harness because `resume.latex` uses two pdfTeX-only primitives
(`\input{glyphtounicode}`, `\pdfgentounicode=1`). Tectonic uses the XeTeX engine, so the harness
defines that primitive away and stubs the glyph-to-unicode map — no document content is
changed.

If no engine is available at all, the site still works: point `resumeDownload.href` in
`data/resume.ts` at `/newSite/resume.latex`.

## Project layout

```
site-terminal/
├── app/
│   ├── globals.css        # design tokens, CRT effects, reduced-motion + print rules
│   ├── layout.tsx         # font, metadata
│   ├── page.tsx           # single-page layout, all sections
│   └── projects/
│       └── page.tsx       # /projects — one terminal window per project
├── components/
│   ├── ProjectWindow.tsx # full-size window framing a project README
│   ├── Section.tsx        # "command output" window + Entry/OutputList/Prompt primitives
│   ├── SkillsTable.tsx    # faux packet capture
│   ├── StatusBar.tsx      # tmux-style status bar, scroll-spy nav, clock
│   └── TerminalWindow.tsx # window chrome (title bar, scroll area, footer)
├── data/
│   └── resume.ts          # ← all resume content, typed
├── public/
│   ├── Alex_Houle_Resume.pdf
│   └── resume.latex
├── scripts/
│   └── compile-resume.sh
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages deploy (static export -> out/)
├── next.config.ts          # output: "export", basePath: /newSite
└── start.sh               # build + serve the static export
```

## Updating content

Edit `data/resume.ts` only. Adding a nav entry means adding to `navItems` (the `id` must match
the matching `<Section id>` in `app/page.tsx`).
