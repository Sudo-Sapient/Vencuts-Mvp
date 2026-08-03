# Vencuts

Cinematic website for Vencuts Media, built with React, Vite, GSAP, and selective React Three Fiber.

## Routes

- `/` — Home
- `/showreel` — Full-screen official showreel
- `/work` — Work category index
- `/work/brand-film`
- `/work/launch-explainer`
- `/work/product-videos`
- `/work/motion-graphics`
- `/work/podcasts`
- `/work/talking-head`
- `/work/video-production`
- `/work/content-series`
- `/team` — Team
- `/contact` — Project brief form
- `/about` and `/about-us` — Team aliases

## Project structure

```text
src/
├── components/
│   ├── Intro.jsx          # Loader and CUT transition
│   └── Logo.jsx           # Shared Vencuts logo link
├── data/
│   └── site.js            # Navigation, media paths, logos, team, services
├── pages/
│   ├── ContactPage.jsx
│   ├── HomePage.jsx
│   ├── ShowreelPage.jsx
│   ├── TeamPage.jsx
│   ├── WorkCategoryPage.jsx
│   └── WorkPage.jsx
├── App.jsx                # Lightweight pathname router
├── App.css                # Site styles and responsive rules
└── main.jsx               # React entry point
```

Public media is organised under:

```text
public/
├── assets/
│   └── clients/           # Approved client logo artwork
└── media/
    ├── showreel/          # Official showreel and poster
    ├── studio/            # Temporary studio clips
    └── team/              # Approved team media
```

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run format:check
npm run lint
npm run build
```

To automatically format supported files:

```bash
npm run format
```

## Production preview

```bash
npm run build
npm run preview -- --port 3000 --host 0.0.0.0
```

## Responsive targets

The primary routes are audited at:

- Desktop: `1440 × 900`
- iPad Pro: `1024 × 1366`
- iPad: `768 × 1024`
- Phone: `390 × 844`
- Small phone: `360 × 800`

## Deployment

The repository is connected to GitHub at:

```text
https://github.com/Sudo-Sapient/Vencuts-Mvp.git
```

`vercel.json` rewrites direct route requests to `index.html` so the pathname router works on Vercel. A push to `main` triggers a production deployment when Vercel Git integration is enabled.
