# Portfolio — Roadmap

Things worth doing next, ordered by impact for the job-search goal.

## Content (highest impact for hiring)

- [ ] **CV PDF** in `public/` and wired through `siteConfig.resume` so the
      "Download CV" link works.
- [ ] **Project demo + repo links** for each entry in `lib/site.ts.projects`.
      Most are still empty or placeholder. Even one or two real demos lifts
      the whole portfolio.
- [ ] **MBA institution** name (commented template in `lib/site.ts`).
- [ ] **Branded OG image** for LinkedIn / WhatsApp previews. The current
      `/-/opengraph-image` route is generic. A card with name + tagline +
      orb screenshot would convert better.
- [ ] **Testimonials / recommendations** block. Easy to fill from LinkedIn.

## Hero / 3D polish (optional, current state is good)

- [ ] **Selective bloom** via MRT (`scenePass.setMRT({ output, emissive })`)
      so only the orb's emissive blooms and the rest of the scene stays clean.
      The pattern is in the installed `BloomNode.js` docs at
      `node_modules/three/examples/jsm/tsl/display/BloomNode.js`.
- [ ] **Lenis smooth scroll** for a more premium feel through the page.
- [ ] **Scroll-driven 3D**: subtle camera move or material shift as you scroll
      past the hero (R3F + a manual scroll listener feeding `useFrame`).
- [ ] **Easter egg**: a small interaction (konami code, click-and-hold) that
      reacts in 3D. Adds personality without hurting accessibility.

## Performance / quality

- [ ] **Lighthouse pass** on the live site. Specifically check CLS for the
      hero and LCP (the WebGPU canvas must not block first paint; the SSR
      fallback already handles that, but verify).
- [ ] **Bundle analyzer** (`@next/bundle-analyzer`) to confirm R3F / three is
      not hot-shipping more than needed.
- [ ] **Analytics**: Vercel Analytics or Plausible, so we know who reads it.
- [ ] **WebGL2 fallback check**: open the site in a browser without WebGPU
      (Firefox today) and confirm the bloom + TSL material still degrade
      cleanly. The renderer falls back automatically; verify the output.

## SEO / discoverability

- [ ] Verify **`sitemap.xml` and `robots.txt`** point to the live domain
      (Next 16 generates both from `app/sitemap.ts` / `app/robots.ts`).
- [ ] **JSON-LD `Person` schema** in the layout for richer search results.
- [ ] Submit to **Google Search Console** (Vercel has a domain-verification
      integration).
- [ ] Once polished, consider submitting to **Awwwards** / **CSS Design
      Awards** / **FWA** for portfolio visibility.

## Infra / DX

- [ ] Add **`.github/dependabot.yml`** for weekly dep PRs (Next, React, three,
      drei).
- [ ] Pin a **Node version** in `package.json` `engines` (currently 24.6.0
      locally) so Vercel and local stay in sync.
- [ ] Add a local **pre-push hook** that runs `npm run build` so we never push
      a broken commit (Vercel does it too, but locally saves a round-trip).

## Cleanup / housekeeping

- [ ] Delete the merged branch `feat/webgpu-hero` once it is no longer useful
      for comparison: `git push origin --delete feat/webgpu-hero`.
- [ ] Decide whether `github.com/jeancarrascodv/jeancarrascodv` (the GitHub
      **profile README** repo, separate from this one) should link to the
      live portfolio.

## v2 ideas (when there are real demos to show)

- [ ] **Per-project case-study pages** under `app/projects/[slug]/page.tsx`,
      with embedded interactive demos.
- [ ] **Theatre.js intro** — cinematic first-load animation. Overkill for a
      job-search portfolio; only worth it if we go all-in on the 3D angle.
- [ ] **Localized blog** (`app/[locale]/blog/`) for technical posts: would
      double as SEO surface and as a writing sample for hiring.
