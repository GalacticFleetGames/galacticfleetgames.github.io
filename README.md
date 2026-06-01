# Galactic Fleet

The Galactic Fleet website, built with [Next.js](https://nextjs.org) (App Router) and
deployed as a static site to GitHub Pages at **www.galactic-fleet.com**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages live in
`app/`, shared UI in `components/`, and data/helpers in `lib/`.

## Building

```bash
npm run build
```

`next.config.ts` sets `output: "export"`, so the build produces a fully static site
in the `out/` folder that can be served by any static host.

## Deployment

Pushing to the `main` branch triggers `.github/workflows/deploy.yml`, which builds the
static export and publishes `out/` to GitHub Pages. The custom domain is configured via
the `CNAME` file (also mirrored in `public/` so it is included in the export).
