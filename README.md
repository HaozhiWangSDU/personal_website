# Haozhi Wang — Personal Academic Website

> Personal academic homepage of Haozhi Wang — First Clinical College, Shandong University.

This repository hosts a **dependency-free, static** personal academic website — including a homepage, a collection of study presentations and review decks, and an archive of the Shandong University daily info feed. It is served as static assets via [Cloudflare Workers](https://developers.cloudflare.com/workers/).

Live site: **https://72092035.xyz**

---

## Features

- **Bilingual (CN / EN)** — Marks language blocks with `class="lang-cn"` and `class="lang-en"`, auto-detects browser language preferences, supports manual toggling, and persists the choice in `localStorage`.
- **Dark & Light Theme** — Follows system color-scheme preference by default with manual toggle and persistent `localStorage` state.
- **Glassmorphic UI** — Translucent cards and soft shadows with a clinical/life-science palette (navy blue and mint green).
- **Responsive Layout** — Sticky profile sidebar paired with main content cards, adapting cleanly to mobile viewports.
- **Scroll Reveal** — Entry animations powered by `IntersectionObserver` with zero external libraries.
- **Zero Build** — Plain HTML, CSS, and JavaScript with no `npm install` or bundler required.
- **Cloudflare Workers Deploy** — Deployed directly via `wrangler`.

---

## Project Structure

```text
personal-website/
├── index.html              # Homepage (About / Education / Research Experience / Contact)
├── presentations.html      # Portal index for study presentations and review decks
├── 404.html                # Custom 404 page matching the global theme
├── styles.css              # Global stylesheet, theme variables, and responsive layout
├── script.js               # Theme toggle, language switch, and scroll-reveal logic
├── avatar.png              # Profile portrait
├── favicon.svg             # Site favicon (Neuro-Pulse Squircle)
├── wrangler.jsonc          # Cloudflare Workers static-assets configuration
├── .gitignore
├── CONTRIBUTING.md         # Contribution guide (for human contributors and AI agents)
│
├── daily/                  # Shandong University daily info archive
│   ├── index.html          #   Archive index page
│   ├── latest.html         #   Latest daily digest
│   ├── page/               #   Paginated archive pages
│   └── YYYY-MM-DD.html     #   Individual daily digests
│
└── presentations/          # Study presentations and review decks
    ├── *.html              #   Standalone presentation and medical review pages
    ├── assets/             #   Shared presentation assets
    ├── images/             #   Presentation images
    ├── infectious-diseases-site/   # Infectious diseases study sub-site
    ├── internal-medicine-review/   # Internal medicine review sub-site
    └── parasite-site/              # Parasitology study sub-site
```

---

## Tech Stack

| Layer     | Technology |
| --------- | ---------- |
| Markup    | Vanilla HTML5 |
| Styling   | Vanilla CSS3 (CSS custom properties, `@media` queries) |
| Scripting | Vanilla JavaScript (ES6+, `IntersectionObserver`, `localStorage`) |
| Fonts     | Google Fonts (`Inter` + `Outfit`) |
| Hosting   | Cloudflare Workers (Static Assets) |

---

## Local Preview

No build step is required — pick either option:

**Option 1 — Open directly**

Double-click `index.html` to view it in your browser.

**Option 2 — Local static server (recommended)**

```bash
# Python
python -m http.server 8000

# Or Node
npx serve .
```

Then visit: `http://localhost:8000`

---

## Deployment

This project is hosted with [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/), configured in `wrangler.jsonc`:

```jsonc
{
  "name": "wanghaozhi",
  "compatibility_date": "2026-07-14",
  "assets": { "directory": "." },
  "compatibility_flags": ["nodejs_compat"]
}
```

To deploy:

```bash
# 1. Install wrangler if not already installed
npm install -g wrangler

# 2. Authenticate with Cloudflare
wrangler login

# 3. Deploy from the repository root
wrangler deploy
```

---

## Contributing

Contributions of new presentations or review materials are welcome via Pull Request. Please read the submission workflow (written for both human contributors and AI assistants) in:

**[CONTRIBUTING.md](./CONTRIBUTING.md)**

Workflow overview:

```text
Create page -> Open PR -> Review by Haozhi Wang -> Merge -> Site goes live
```

---

## Contact

- **Email:** `wanghaozhi@mail.sdu.edu.cn`
- **Affiliation:** First Clinical College, Shandong University

---

## License

Source code, design, and configuration are licensed under the [MIT License](./LICENSE). The medical study materials, review decks, and daily archives under `presentations/` and `daily/` are authored content; please contact the author before reproducing them.
