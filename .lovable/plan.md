## Goal
Upgrade the Flamecraft site from procedural 3D primitives to **photoreal, pitch-ready visuals** so it can be shown to investors / clients without looking like a tech demo.

## What's weak right now (visually)
- Hero burger is built from cylinders + spheres — reads as "geometry," not food.
- Grill section is bars + particles — abstract, not appetizing.
- Product cards use radial-gradient blobs instead of actual burger photos.
- Ingredient orbit uses colored icosahedrons — no real lettuce, tomato, cheese.
- No brand photography, no human/lifestyle shots, no environment.

For a pitch, food sites live or die on **mouth-watering imagery**. We need to lead with photography and use 3D as accent, not as the main subject.

## Plan (visual upgrade, frontend-only)

### 1. Replace hero with cinematic photoreal burger
- Generate a premium hero image: dramatic flame-lit burger on dark backdrop, shallow depth of field, glistening cheese, smoke wisps, sesame bun (premium quality tier for fidelity).
- Keep the 3D burger as a **secondary floating accent** in a corner (smaller, with bloom), OR drop it entirely in favor of the photo + subtle parallax. Recommend: photo hero + Ken Burns slow zoom + Framer Motion parallax on scroll.
- Add ember/smoke particle overlay (already have Particles component) layered over photo.

### 2. Product lineup → real burger photography
- Generate 5 distinct burger photos matching each menu item (Inferno, Smoke Stack, Classic, Truffle Royale, Green Beast). Each on a moody dark surface, top-3/4 angle, consistent lighting so they feel like a series.
- Replace the radial-gradient blob in `ProductCard` with the actual image. Keep the flip-card nutrition back.

### 3. Story section → atmosphere photo + 3D grill as accent
- Generate a "back-alley grill at night, sparks flying, chef's hands" image.
- Use it as a full-bleed background with the GSAP word-by-word text overlaid. Move the 3D `Grill3D` to a small corner inset or remove (it's the weakest 3D asset).

### 4. Ingredients section → real ingredient macros
- Generate 5 macro shots: aged beef patty, melted cheddar, vine tomato, butter lettuce, brioche bun — each isolated on dark background.
- Replace `Orbit3D` icosahedrons with a circular layout of these photos that rotate / respond to hover. Keep the click-to-detail interaction.

### 5. Add an "Atmosphere" / Locations strip
- 3–4 wide lifestyle shots: interior of restaurant (warm neon, exposed brick), customer eating, chef at grill, takeaway bag in hand. Marquee or grid layout. Sells the brand as a real business, which matters for proposals.

### 6. Footer & misc polish
- Real logo mark (generate a flame/burger emblem) replacing the SVG mini burger.
- OG/social share image (16:9 hero) so the link previews well in pitch decks / Slack.
- Favicon from the logo.

## How visuals will be generated (technique)
- **`imagegen` premium tier** for the hero, OG image, and logo — text legibility + fidelity matter there.
- **`imagegen` standard tier** for the 5 product shots and 5 ingredient macros — consistent series, good detail, cheaper.
- **`imagegen` fast** for atmosphere strip — speed over perfection, they're decorative.
- All stored under `src/assets/` and externalized via `lovable-assets` so the repo stays light.
- Lazy-load via `loading="lazy"` and use `<img srcset>` for hero.
- Keep `framer-motion` parallax + GSAP scroll reveals already in place — they'll feel much better over real photos.

## Treatment direction (recommended)
**"Editorial steakhouse meets streetwear lookbook."** Dark, high-contrast, single warm light source, deep shadows, occasional flame flare. Think *Eater* feature photography crossed with a Nike launch page. Consistent across all generated images: same color temperature (~3200K), same plate/surface (matte black slate), same vignette.

## Out of scope (this pass)
- No backend, no ordering logic, no CMS — purely the visual layer.
- 3D files (GLTF) — sticking with photography is faster and looks better for a pitch than rigging real models.

## Deliverable
After implementation: a homepage that opens with a hero you'd put on a billboard, a menu that looks like a real restaurant's site, and a story/atmosphere section that makes the brand feel like it already exists.

---

**Two quick questions before I build:**
1. Should I **keep the 3D burger** as a secondary accent, or fully replace with photography? (My rec: replace — pitches look more credible with photos.)
2. Real brand name "Flamecraft Burgers" stays, or do you want a different name on the imagery/logo?