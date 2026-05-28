# Portfolio — Current State

Snapshot of what is live and how it is wired. Update this when the production
shape of the project changes.

## Production

- **Live URL:** https://www.jeancarrasco.com (apex `jeancarrasco.com` 307-redirects to www)
- **HTTPS:** active (Let's Encrypt via Vercel, auto-renewed)
- **Hosting:** Vercel, project `portfolio`, scope `jean-carrascos-projects`
- **Repo:** https://github.com/jeancarrascodv/portfolio (public, default branch `master` = production)
- **Auto-deploy:** every push to `master` deploys to production; pushes to any other branch get a Vercel preview at
  `https://portfolio-git-<branch-dashes>-jean-carrascos-projects.vercel.app`
  (protected by Vercel auth, opens fine while logged in as the project owner)

## DNS (Namecheap → Vercel)

Records configured under `jeancarrasco.com` → Advanced DNS. The default Namecheap
parking records (CNAME `www` to parkingpage, URL Redirect `@`) were removed.

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | `@`  | `216.198.79.1`         |
| CNAME | `www`| `cname.vercel-dns.com` |

## Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack). Middleware is in `proxy.ts`
  (Next 16 renamed `middleware` → `proxy`; `params` is async, nodejs runtime).
- **UI:** React 19.2.4, Tailwind v4, Framer Motion.
- **3D hero:** React Three Fiber 9.6.1 + drei on top of three r184 (`three/webgpu` + TSL).
- **i18n:** native bilingual via `app/[locale]` + `i18n/dictionaries/{en,es}.json`.
- **Identity content:** `lib/site.ts` is the source of truth for name, location,
  email, socials, work history, projects, etc.
- **Icons:** `app/icon.svg` (primary, modern browsers) + `app/favicon.ico` (legacy)
  + `app/apple-icon.png`. All three are the JC monogram with the brand cyan→violet
  gradient on a dark rounded square. Generated from one SVG via a one-off `sharp`
  script (not kept in the repo).

## Hero 3D — WebGPU + TSL

The hero background canvas (`components/scene/hero-canvas.tsx` +
`components/scene/hero-scene.tsx`) runs on the modern Three.js WebGPU stack with
automatic WebGL2 fallback.

**Renderer**
`WebGPURenderer` from `three/webgpu`, built in an async `gl` factory inside the
R3F `<Canvas>` after `extend(THREE)`. The renderer falls back to WebGL2 by itself
when WebGPU is unavailable. Canvas is `pointerEvents: none`, `-z-10`, so it never
blocks the DOM hero.

**Blob (the orb)**
- High-res sphere `sphereGeometry [1, 96, 96]` for a perfectly circular silhouette.
- `MeshPhysicalNodeMaterial`:
  - `metalness 0.95`, `roughness 0.14`
  - `clearcoat 1.0`, `clearcoatRoughness 0.12` (glass-over-metal = liquid mercury)
  - `positionNode` displaces vertices along `normalLocal` by
    `mx_fractal_noise_vec3(noiseCoord, 2, 1.8, 0.55).x.mul(0.22)` for a viscous undulation
  - `colorNode` mixes brand indigo `#3b3a8f` → violet `#8b5cf6` by a noise tint
  - `emissiveNode` mixes `#1b1b4d` → cyan `#22d3ee` by noise, **plus** a cyan
    fresnel rim: `normalView.z.oneMinus().pow(2.0).mul(0.8)` (halo around the silhouette)
- Scale `1.1`, group base offset `+2.3` on X so it sits right of the hero copy.
- Auto-rotation Y `0.05 rad/s` plus eased pointer parallax.

**Geodesic shell**
`icosahedronGeometry [1, 5]` + `meshBasicMaterial wireframe`, cyan `#22d3ee` at
opacity `0.1`, scale `1.45`. The geodesic pattern reads as a fine hex/triangle
dome instead of chunky triangles (the detail bump was the fix).

**Particles**
120 points in a `Points` + `PointsNodeMaterial`, brand cyan `#7dd3fc`, size `8`,
opacity `0.7`, with a TSL `time`-driven Y drift. This replaces drei `Sparkles`
(whose GLSL `ShaderMaterial` does not run under WebGPU).

**Reflections**
drei `Environment` at resolution 256 with three `Lightformer`s (cyan / violet /
white) feeding the metallic reflections via WebGPU PMREM.

**Post-processing**
Whole-scene bloom only: `THREE.PostProcessing` + `bloom(scenePass.getTextureNode("output"), 0.42, 0.5, 0.28)` (strength / radius / threshold).
Driven by `pipeline.renderAsync()` inside a priority-1 `useFrame` so R3F yields
its automatic render.

**Fallbacks (kept)**
- SSR → static CSS gradient.
- `prefers-reduced-motion` → static CSS gradient.
- Browser without WebGPU → WebGPURenderer's own WebGL2 backend (transparent).

## Hero parameter cheat sheet

All of these live in `components/scene/hero-scene.tsx`. Tune at will.

| What | Where | Value |
|------|-------|-------|
| Orb size | `scale={1.1}` on the blob mesh | 1.1 |
| Orb position X | `+ 2.3` in the group rotation/position useFrame line | 2.3 |
| Distortion amplitude | `.mul(0.22)` on the displacement | 0.22 |
| Distortion smoothness | octaves `2`, lacunarity `1.8` in `mx_fractal_noise_vec3` | 2, 1.8 |
| Animation speed | `time.mul(0.6)` for `t` | 0.6 |
| Metallic feel | `metalness`, `roughness`, `clearcoat`, `clearcoatRoughness` | 0.95 / 0.14 / 1.0 / 0.12 |
| Rim light intensity | `.mul(0.8)` on the cyan rim add | 0.8 |
| Rim light tightness | `.pow(2.0)` on the fresnel | 2.0 |
| Bloom (strength, radius, threshold) | args of `bloom(...)` | 0.42 / 0.5 / 0.28 |
| Auto-rotation Y | `delta * 0.05` in useFrame | 0.05 |
| Particles (count, size, opacity) | `COUNT`, `material.size`, `material.opacity` in `makeParticles` | 120 / 8 / 0.7 |
| Shell visibility | `opacity={0.1}` on the geodesic shell | 0.1 |
| Shell size | `scale={1.45}` on the geodesic shell | 1.45 |
| Shell density | `args={[1, 5]}` on the icosahedron | detail 5 |

## Lessons learned (WebGPU/TSL gotchas, the hard way)

- Sync `PostProcessing.render()` leaves the canvas completely blank under WebGPU.
  Use `renderAsync()`.
- `pass(scene, camera)` cannot be fed directly into `bloom()`. Wrap it with
  `scenePass.getTextureNode("output")` per the installed `BloomNode.js` docs.
- drei `Sparkles` is GLSL-only. Replace with a `Points` + `PointsNodeMaterial`
  under WebGPU.
- TSL `chromaticAberration` and `film` have fragile typing (params typed as
  `Node` but factories also accept numbers). Add only with care.
- **Build green does not mean it renders.** Always preview-deploy WebGPU changes
  to a branch first; Vercel auto-creates a preview for every branch push.

## Deploy workflow

1. **Risky change** (anything 3D, anything new in the renderer pipeline):
   `git checkout -b feat/<name>` → push → open the Vercel preview URL → check
   in Chrome/Edge + DevTools console → fast-forward merge to `master`.
2. **Low-risk tweak** (copy, CSS, hero parameter): push straight to `master`.
3. The `Bash(git push:*)` allow rule in `~/.claude/settings.json` lets Claude
   push without prompting. Claude cannot self-edit that file (security boundary).

## Where to edit what

- Identity / copy → `lib/site.ts`
- Bilingual strings → `i18n/dictionaries/{en,es}.json`
- Hero 3D → `components/scene/hero-scene.tsx` (everything visual lives here)
- Sections (about, projects, contact) → `components/sections/*`
- Global styles / tokens → `app/globals.css`
- Layout / metadata → `app/[locale]/layout.tsx`

## Style rules

- **No em-dashes** ("—") in visible portfolio copy (Jean reads them as an AI tell).
  Internal docs (this file, commit messages, code comments) are fine.
- Project descriptions in `lib/site.ts` were intentionally embellished; keep them
  plausible.
