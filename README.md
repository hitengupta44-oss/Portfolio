# Hiten Gupta — 3D Constellation Portfolio

A single-canvas, immersive portfolio built with Next.js (App Router), React Three Fiber, drei, postprocessing and Tailwind CSS v4. Every resume section is a glowing node in a rotating 3D network; selecting a node tweens the camera to it, collapses unrelated nodes toward the core, and slides a glass panel into view — no route changes, no page reloads.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires Node.js 20.9 or newer.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import it at vercel.com/new — the Next.js preset needs no changes.
3. Optional: add a `GITHUB_TOKEN` environment variable (a token with no scopes is enough) to raise the GitHub API limit from 60 to 5,000 requests per hour.

## Project structure

```
app/
  layout.js              Root layout, metadata, self-hosted fonts
  page.js                Orchestrator: active node, hover, URL hash, Escape key
  globals.css            Tailwind v4 theme, glass utilities, keyframes
  api/github/route.js    GitHub API loader with cached responses and mock fallback
components/canvas/
  Experience.js          <Canvas>, adaptive DPR/quality, WebGL fallback
  Scene.js               Lights, fog, particles, OrbitControls, Bloom + Vignette
  Network.js             Node layout, rotation, collapse animation, cursor ray
  NetworkNode.js         Neon node: HDR core, GLSL fresnel halo, orbit ring, label
  ConnectionLines.js     Subdivided edges with magnetic pull and data packets
  CameraRig.js           GSAP camera/target tweening that frames nodes beside the panel
  ParticleField.js       Star field and dust (maath random.inSphere)
  haloMaterial.js        Fresnel filament shader
components/ui/
  HUD.js                 Name, availability, resume download, social links, navigation
  OverlayPanel.js        Sliding glass panel (side panel on desktop, bottom sheet on mobile)
  panels/                About, Experience, Skills, Projects, ProjectTerminal, GitHub, LinkedIn
lib/
  resume.js              All resume content — edit this to update the site
  graph.js               Node positions, colours, edges and relationships
  github.js              GitHub response normaliser and sample data
  layout.js              Panel sizes shared by the CSS and the camera maths
```

## Editing content

- **Text:** everything shown on the site comes from `lib/resume.js`.
- **Project links:** each project in `lib/resume.js` has a `sourceUrl` and `liveUrl`.
- **Resume PDF:** replace `public/Hiten_Gupta_Resume.pdf` when you update your resume.
- **New nodes:** add an entry to `RAW_NODES` and connect it in `EDGES` in `lib/graph.js`. Set `panel` to the panel it should open and, for satellites, `focus` to the section it should highlight.

## Behaviour notes

- Deep links work: `/#projects`, `/#github`, `/#sales-chatbot` open that node on load.
- The GitHub panel shows a **Live API** badge when the API responds and **Sample data** when it falls back to the mock loader.
- Bloom is selective by brightness: nodes and data packets are rendered above 1.0 luminance, so only they glow.
- Performance: DPR and bloom quality drop automatically on slower devices; mobile uses fewer particles; `prefers-reduced-motion` stops rotation and shortens transitions.
