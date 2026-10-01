# alexhoule.com

Personal site, built with React and Vite. Content lives in `src/config.json`.

```sh
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Pages

- `/` — home (experience, skills, education)
- `/portfolio` — projects from `src/config.json`
- `/blog` — posts from `src/posts/`

## Writing a blog post

Add a Markdown file to `src/posts/`. The filename becomes the URL, so
`src/posts/my-first-post.md` is served at `/blog/my-first-post`.

```md
---
title: My first post
date: 2026-09-30
summary: One line shown on the blog index.
---

Post body in Markdown.
```
