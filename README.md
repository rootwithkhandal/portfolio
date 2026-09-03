# Priyansh Khandal — Cybersecurity Portfolio

Personal portfolio built with [Astro](https://astro.build). Fully static, no server required.

## Stack

- **Astro** — static site generator
- **TypeScript** — type-safe data files
- **marked** — markdown to HTML for blog/project pages
- Fonts: Bebas Neue · Rajdhani · Space Grotesk

## Project Structure

```
src/
├── components/       # Nav, Hero, Profile, Projects, Blogs, Contact
├── data/
│   ├── blogs/        # Blog post markdown files
│   ├── projects/     # Project readme markdown files
│   ├── blogs.ts      # Blog metadata
│   └── projects.ts   # Project metadata
├── layouts/
│   ├── Layout.astro        # Global layout + SEO
│   ├── ContentLayout.astro # Blog/project detail page layout
│   └── ErrorLayout.astro   # Error page layout
└── pages/
    ├── index.astro          # Home
    ├── blogs/
    │   ├── index.astro      # /blogs
    │   └── [slug].astro     # /blogs/:slug
    ├── projects/
    │   ├── index.astro      # /projects
    │   └── [slug].astro     # /projects/:slug
    └── 401/402/403/404/405  # Error pages
public/
├── profile.png
├── favicon.svg
└── apple-touch-icon.svg
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# Output → dist/
```

## Environment Variables (optional)

Copy `.env.example` to `.env` and fill in if needed:

```bash
cp .env.example .env
```

| Variable | Purpose |
|----------|---------|
| `GITBOOK_TOKEN` | Fetch blog content from GitBook API at build time |
| `GITHUB_TOKEN` | Access private GitHub repos for project READMEs |

Both are optional — local markdown files in `src/data/blogs/` and `src/data/projects/` are used by default.

## Deployment

Any static host works. Recommended:

**Vercel / Netlify**
- Connect repo → build command: `npm run build` → output dir: `dist`

**GitHub Pages**
```bash
npm run build
# Push dist/ to gh-pages branch
```

**Cloudflare Pages**
- Connect repo → build command: `npm run build` → output dir: `dist`

## Adding Content

**New blog post:**
1. Add entry to `src/data/blogs.ts`
2. Create `src/data/blogs/<slug>.md`

**New project:**
1. Add entry to `src/data/projects.ts`
2. Create `src/data/projects/<slug>.md`
