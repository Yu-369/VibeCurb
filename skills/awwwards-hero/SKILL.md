---
name: awwwards-hero-section
description: Hero-section pipeline for building Awwwards/FWA-tier hero sections. Extracts design direction from reference images, provides six hero architectures with implementation blueprints, and enforces the fundamentals that separate award-winning heroes from generic AI output — viewport-scale typography, single focal point, extreme whitespace, tight palette. Hero-only. Pair with other skills for full pages.
---

# Awwwards-Tier Hero Section

> This skill is HERO-SECTION ONLY. It does not govern full pages, navigation systems, footers, or feature sections. It fires when the user asks for a hero, a landing header, an above-the-fold section, or provides reference screenshots of hero designs.

---

## The Pipeline

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   BRIEF IN ──→ Phase 1: Read ──→ Phase 2: Architecture              │
│                  (extract signals)  (pick one, commit)               │
│                                                                      │
│                              ──→ Phase 3: Build                      │
│                                   (type, palette, atmosphere,        │
│                                    motion, mobile)                   │
│                                                                      │
│                              ──→ Phase 4: Verify                     │
│                                   (visual diff against reference)    │
│                                                                      │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Read the Reference

Before writing any code, extract design signals from the user's reference images (or infer from their brief). Do not project your own aesthetic onto the reference. Read what is actually there.

### → Extract these signals from each image

| Signal | What to look for |
|---|---|
| **Mode** | Light or Dark background |
| **Focal element** | What dominates the viewport? Massive typography, 3D object, full-bleed photography, product mockup, abstract shape, video, scattered floating elements |
| **Typography style** | Serif, sans-serif, or mixed. Massive or restrained. Uppercase or mixed-case. Tight-tracked or normal. Italic presence |
| **Text-to-image relationship** | Text sits ABOVE image (layered)? BESIDE it (split)? BEHIND a subject (masked)? INSIDE it (clipped)? INTERTWINED with inline images between words? |
| **Layout gravity** | Where does visual weight sit? Center? Bottom-left? Split across edges? Full-bleed? |
| **Color count** | Count distinct hues — award-winning heroes almost always use 2-3 max |
| **Navigation style** | Floating pill? Flat horizontal? Split (logo left, links right)? Minimal (logo + menu only)? |
| **Micro-details** | Rotating text badges, monospace metadata labels, glassmorphic cards, showreel links, CTA pill style |

### → Output a Hero Extraction before generating code

State in 2-3 lines exactly what you extracted:

> *"Hero Extraction: Dark mode, centered 3D card carousel with CSS perspective as focal element, massive sans-serif heading below in mixed-case, monospace micro-label above, single ghost CTA, floating pill nav. Palette: off-black + white + one muted accent. Feels like: dark cinematic agency with depth-layered cards."*

### → If no reference images are provided

Ask exactly ONE question: *"Do you want this hero closer to [dark cinematic] or [light editorial]? And what's the brand name + one-line value prop?"*

If you can infer from context (e.g., user said "AI startup" or "luxury agency"), skip the question and declare your Hero Extraction.

### ✓ Quality Gate: Read

Before moving to Phase 2, confirm:
- You have extracted all 8 signals from the reference (or inferred them from the brief)
- You have written the Hero Extraction summary
- You know the mode (light/dark), the focal element, and the palette direction

---

## Phase 2: Pick an Architecture

Select ONE architecture from the six below that best matches the reference. Do not blend two architectures. Commit fully to one.

---

### Architecture A: The Cinematic Center

*Best for: dark cinematic agency sites, immersive product launches, atmospheric brand pages*

The heading sits centered in the viewport. A cinematic visual (3D render, product shot, atmospheric photography) fills the background or floats behind/around the text. The CTA is a single centered pill or ghost button below the heading.

```
[viewport container: relative, min-h-[100dvh], overflow-hidden]
  [background visual: absolute inset-0, object-cover or positioned 3D element]
  [content overlay: relative z-10, flex flex-col items-center justify-center text-center]
    [optional eyebrow: small mono label]
    [H1: massive centered, max 2-3 lines]
    [optional subtext: max 20 words, muted color]
    [CTA: single pill button]
```

The background visual uses `position: absolute; inset: 0` with `object-fit: cover` (for images) or centered absolute positioning (for 3D/illustrations). Text sits on top via `position: relative; z-index: 10`. If text readability suffers, add a scrim gradient overlay between the image and text layers (`bg-gradient-to-t from-black/60 via-black/20 to-transparent`).

---

### Architecture B: The Asymmetric Split

*Best for: bold agency homepages, AI/tech product launches, statement brand pages*

Massive heading on one side (usually left, occupying 55-65% width). Supporting content (subtext, CTA, or a visual asset) on the other side, vertically offset. The two halves do NOT align to the same baseline — deliberate vertical tension.

```
[viewport container: min-h-[100dvh], grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-end lg:items-center gap-8 lg:gap-0]
  [left: H1, massive, left-aligned, takes up most of the width]
  [right: subtext + CTA OR visual asset, vertically offset from the H1 baseline]
```

Use `items-end` on the left column and `items-start` on the right (or vice versa) to create vertical tension. The heading should feel like it anchors the page to one side. On mobile (`< 768px`), collapse to single column, full-width.

---

### Architecture C: The Full-Bleed Subject

*Best for: athlete/personal brand sites, product photography heroes, editorial fashion or lifestyle*

A full-viewport photograph or 3D render IS the hero. Typography is overlaid directly on the image — either at the top-left, bottom-left, or bleeding across the bottom edge. No separate "text area" — the image and text coexist in the same spatial plane.

```
[viewport container: relative, min-h-[100dvh], overflow-hidden]
  [full-bleed image: absolute inset-0, object-cover]
  [gradient scrim: absolute inset-0, bg-gradient-to-t from-black/70 via-transparent to-black/20]
  [content: absolute bottom-0 left-0 p-12 lg:p-20, z-10]
    [H1: massive, white, mix-blend-mode: difference OR on top of scrim]
    [optional CTA]
```

The text MUST be readable against the photo. Use either a gradient scrim layer OR `mix-blend-mode: difference` on the text (which inverts text color against the background). Scrim is safer, blend mode is bolder. On mobile, increase scrim opacity.

---

### Architecture D: The Typographic Poster

*Best for: creative studio portfolios, personal brand statements, typography-led editorial*

Typography IS the visual. There is no hero image. The heading itself, at viewport-bleeding scale, IS the graphic element. Words may be split across the viewport edges. Different weights, sizes, or italics within the same heading create visual texture.

```
[viewport container: min-h-[100dvh], flex flex-col justify-between p-8 lg:p-16]
  [top: nav or micro-label]
  [center: H1 at viewport-scale (10vw-15vw), possibly split into multiple positioned lines]
  [bottom: CTA or micro-metadata strip]
```

Use `font-size: clamp(4rem, 12vw, 16rem)`. Words can be positioned with `text-align: left` on line 1, `text-align: right` on line 2, creating diagonal visual flow. Mix `font-weight: 900` with `font-weight: 300` or `font-style: italic` within the same heading using `<span>` wrappers.

---

### Architecture E: The Inline-Image Typography

*Best for: creative agency hero sections, brand pages with personality, editorial homepages*

Massive typography with small, rounded images embedded BETWEEN words in the headline. The images sit inline at type-height, acting as visual punctuation. The heading reads as a sentence with tiny photo interruptions.

```
[viewport container: min-h-[100dvh], flex items-center justify-center]
  [H1: massive, contains <span> wrappers for inline images]
    "Build " [inline-image: w-16 h-10 rounded-full object-cover align-middle mx-1] " a quieter, " [inline-image] " smarter AI agency presence."
```

```css
/* BLUEPRINT: Inline hero images
   WHY: The images must match the x-height of the surrounding text.
   They are punctuation, not focal elements. Making them too large
   turns the heading into a gallery instead of a sentence. */
.inline-hero-img {
  display: inline-block;
  width: clamp(3rem, 5vw, 5rem);
  height: clamp(2rem, 3.5vw, 3.5rem);
  border-radius: 9999px;       /* pill shape */
  object-fit: cover;
  vertical-align: middle;
  margin-inline: 0.25em;
}
```

On mobile, the inline images can either scale down with the text or stack below the heading (`hidden md:inline-block`).

---

### Architecture F: The Layered Depth (Z-Axis Composition)

*Best for: portfolio showcases, SaaS product demos, multi-project agency displays*

Multiple visual elements (cards, images, UI mockups) are arranged at different depths using CSS `perspective` and `transform: rotateY() rotateX()`. A single element is "closest" (largest, front-center). Others recede into the background (smaller, rotated, lower opacity). Typography anchors the composition above or below.

```
[viewport container: min-h-[100dvh], relative, perspective: 1200px on parent]
  [card layer: absolute, multiple cards with varying transform: rotateY(Xdeg) translateZ(Ypx)]
    [front card: scale(1), translateZ(0), centered]
    [left card: rotateY(25deg), translateZ(-200px), scale(0.85), opacity-70]
    [right card: rotateY(-25deg), translateZ(-200px), scale(0.85), opacity-70]
  [text layer: relative z-10, positioned below or overlapping the card cluster]
    [H1]
    [CTA]
```

```css
/* BLUEPRINT: Perspective card shelf
   WHY: perspective-origin centers the vanishing point. 
   preserve-3d lets child transforms create real depth.
   backface-visibility prevents render flicker on rotation. */
.perspective-container {
  perspective: 1200px;
  perspective-origin: center center;
}
.depth-card {
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  backface-visibility: hidden;
}
```

⚠ **Drift Warning:** The #1 AI failure mode for this architecture is scattering 8-10 cards randomly across the screen at random rotations. The layout MUST have a clear focal card (front-center, full opacity, largest) with 2-4 supporting cards receding symmetrically into depth. Think Apple TV app shelf, not a card explosion.

---

### ✓ Quality Gate: Architecture

Before moving to Phase 3, confirm:
- You selected ONE architecture from A-F
- Your selection matches the Hero Extraction from Phase 1
- You are not blending two architectures

---

## Phase 3: Build the Hero

### → Typography

Hero headings are not "big text." They are architectural elements that structure the entire viewport.

**Font selection — pick ONE from the appropriate row:**

| Vibe | Strong candidates (pick one) |
|---|---|
| Clean modern / tech / SaaS | `Geist`, `Satoshi`, `Cabinet Grotesk`, `Outfit`, `PP Neue Montreal` |
| Bold statement / agency | `Clash Display`, `Cabinet Grotesk`, `Monument Extended`, `Sohne Breit` |
| Editorial / luxury | `PP Editorial New`, `GT Sectra Display`, `Canela`, `Reckless Neue` (serif only when reference shows serif) |
| Condensed / industrial | `Bebas Neue`, `Oswald`, `Barlow Condensed`, `Archivo Black` |

⚠ **Drift Warning:** `Inter`, `Roboto`, `Open Sans`, `Poppins`, `Arial`, and `Helvetica` are body fonts, not display fonts. Using them as a hero heading font produces generic output regardless of how good the layout is. If the reference uses one of these, verify carefully — at hero scale, Inter and Geist look nearly identical, and Geist is the display-grade choice.

**Heading CSS blueprint:**

```css
/* BLUEPRINT: Hero heading
   WHY: clamp() makes the heading responsive without breakpoints.
   Negative letter-spacing is critical at large sizes — positive
   tracking on massive text creates a loose, amateurish feel.
   line-height below 1.0 lets ascenders and descenders overlap
   slightly, which looks intentional at display scale. */
.hero-heading {
  font-size: clamp(2.5rem, 7vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.95;
  text-wrap: balance;
  max-width: 18ch; /* prevents 4+ line wraps */
}

/* For 1-3 word headings, go larger */
.hero-heading--short {
  font-size: clamp(4rem, 14vw, 18rem);
  letter-spacing: -0.05em;
  line-height: 0.85;
}
```

**Supporting text hierarchy:**

| Element | Specification |
|---|---|
| **Eyebrow** (above heading) | `font-size: 0.75rem`, `letter-spacing: 0.12em`, `text-transform: uppercase`, monospace or geometric sans. Muted color (`text-white/50` dark, `text-zinc-500` light) |
| **Subtext** (below heading) | `font-size: clamp(1rem, 1.25vw, 1.25rem)`, `max-width: 45ch`, `line-height: 1.6`, muted color. Never more than 20 words |
| **CTA button** | Solid pill (`rounded-full px-8 py-3.5`) OR ghost pill (`rounded-full px-8 py-3.5 border border-white/20`). `font-size: 0.875rem`, `letter-spacing: 0.05em`, uppercase. ONE CTA max. No secondary "Learn more" links |

---

### → Palette

Maximum 3 hues in the hero. This is not a suggestion — it is what separates award-winning heroes from busy ones.

**Dark hero palette:**
```css
/* BLUEPRINT: Dark hero atmosphere
   WHY: #0a0a0a reads as black but has enough data for 
   subtle gradients to register. Pure #000000 is a dead 
   flat surface that cannot hold atmospheric effects. */
.hero-dark {
  background: #0a0a0a;
  color: #f5f5f5;
  /* Accent: one muted hue, used on max 1-2 small elements */
}
```

**Light hero palette:**
```css
.hero-light {
  background: #FAFAF9; /* or #F5F5F0 or #FDFBF7 — warm cream, not pure white */
  color: #1a1a1a;      /* or #111111 — near-black, not pure black */
  /* Accent: one considered hue */
}
```

⚠ **Drift Warning:** More than one saturated accent in the hero guarantees a busy, unfocused feel. One accent on CTAs and active states. Everything else is the base palette (background + text + muted text).

---

### → Atmosphere

Do not use flat `bg-black` or flat `bg-white`. Heroes need depth.

**Dark mode — radial ambient glow:**
```css
/* BLUEPRINT: Ambient glow
   WHY: A barely-visible radial gradient centered slightly 
   above the midpoint creates the illusion of a light source,
   adding depth without any visible element. At 0.03 opacity 
   it's felt, not seen. */
.hero-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.03) 0%, transparent 70%);
  pointer-events: none;
}
```

**Noise grain overlay:**
```css
/* BLUEPRINT: Film grain
   WHY: Breaks the digital flatness of solid CSS backgrounds.
   position:fixed prevents the grain from scrolling with content.
   pointer-events:none makes it non-interactive.
   0.04 opacity is the threshold where grain is felt but 
   doesn't interfere with text readability. */
.hero-dark::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 50;
}
```

**Light mode — subtle warm radial:**
```css
.hero-light {
  background: radial-gradient(ellipse at 30% 20%, rgba(250,235,215,0.4) 0%, transparent 50%), #FAFAF9;
}
```

---

### → Motion

Every hero MUST have an entry animation. Static mount looks broken.

```tsx
/* BLUEPRINT: Staggered hero entry (Motion / motion-react)
   WHY: The stagger (0.12s between children) creates a 
   cascade effect. blur(8px)→blur(0) adds perceived quality 
   beyond simple fade-in. The custom cubic-bezier gives a 
   snappy deceleration that feels physical, not computed. */
const heroVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]  // custom ease-out
    }
  }
};

// Apply: <motion.div variants={heroVariants} initial="hidden" animate="visible">
//          <motion.h1 variants={itemVariants}>...</motion.h1>
//          <motion.p variants={itemVariants}>...</motion.p>
//          <motion.div variants={itemVariants}>CTA</motion.div>
//        </motion.div>
```

**Sequence:** Background fades in first (0ms) → heading slides up + deblurs (100ms) → subtext slides up (220ms) → CTA slides up (340ms). Total reveal under 800ms.

**CTA hover physics:**
```css
/* BLUEPRINT: CTA hover
   WHY: translateY(-2px) creates a subtle lift. The custom 
   cubic-bezier makes the return-to-rest feel weighted, not 
   springy. scale(0.98) on active gives tactile press feedback. */
.hero-cta {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}
.hero-cta:active {
  transform: translateY(0) scale(0.98);
}
```

**Parallax structure (if reference implies it):**
```html
<!-- BLUEPRINT: Parallax-ready DOM
     WHY: Separate layers let you apply different scroll 
     speeds via JS transform. will-change hints the GPU 
     to prepare for animation. The actual parallax offset 
     uses useScroll + useTransform from Motion, NOT 
     window.addEventListener('scroll'). -->
<section class="hero relative min-h-[100dvh] overflow-hidden">
  <div class="hero-bg absolute inset-0 will-change-transform">
    <img ... class="w-full h-full object-cover" />
  </div>
  <div class="hero-content relative z-10">
    ...
  </div>
</section>
```

**Rotating text badge (if reference shows it):**
```css
/* BLUEPRINT: Rotating badge
   WHY: 12s is slow enough to be ambient, not distracting.
   Use SVG textPath along a circle for curved text.
   Place in a bottom corner (absolute bottom-8 left-8), 
   not floating randomly. */
.rotating-badge {
  width: 100px;
  height: 100px;
  animation: spin 12s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .rotating-badge { animation: none; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

### → Mobile Collapse

Every architecture MUST degrade cleanly below `768px`.

| Element | Mobile behavior |
|---|---|
| **Heading** | Scale down via `clamp()`. Never smaller than `2rem` on mobile |
| **Layout** | All multi-column splits collapse to `flex-col` or `grid-cols-1` |
| **Inline images** (Architecture E) | Either scale proportionally with text or hide (`hidden md:inline-block`) |
| **3D perspective cards** (Architecture F) | Remove all `rotateY`/`rotateX` transforms below `md`. Stack vertically or show only the focal card |
| **Full-bleed images** (Architecture C) | Increase scrim gradient opacity for text readability |
| **Touch targets** | All CTAs minimum `44px` tap target height |
| **Horizontal overflow** | Wrap hero in `overflow-x-hidden` to prevent 3D-transformed elements from creating scrollbars |

---

### → Performance

| Rule | Why |
|---|---|
| Animate ONLY `transform` and `opacity` | These are GPU-composited. Animating `top`, `left`, `width`, `height` triggers layout recalculation on every frame |
| `will-change: transform` only on actively animating elements | Overusing `will-change` wastes GPU memory. Remove after animation completes |
| `backdrop-filter: blur()` only on fixed/sticky elements | Applying blur to scrolling hero backgrounds tanks frame rate |
| Hero image uses `loading="eager"` (or `priority` in Next.js) | The hero image is above-the-fold — lazy loading causes LCP failure |
| Noise/grain on `position: fixed` pseudo-element | Never on a scrolling container — it repaints on every frame |
| Gate ALL animations behind `prefers-reduced-motion` | Use Motion's `useReducedMotion()` or CSS `@media (prefers-reduced-motion: reduce)` |

---

### ✓ Quality Gate: Build

Before moving to Phase 4, confirm:
- Architecture from Phase 2 was followed without blending
- Heading font is a display font, not a body font
- Heading uses fluid `clamp()` and is minimum `text-5xl` equivalent at desktop
- Heading wraps to max 2-3 lines on 1440px desktop
- Letter-spacing is tightened (negative tracking) on the heading
- Line-height is compressed (< 1.1) on the heading
- Color palette uses max 3 hues
- Hero uses `min-h-[100dvh]`, not `h-screen`
- Entry animation is present (staggered fade-up-deblur)
- All animations use only `transform` and `opacity`
- Mobile collapse is explicit

---

## Phase 4: Verify

Compare your hero against the reference (or against the Hero Extraction if no reference was provided). Walk through every category. Any FAIL blocks delivery.

### Composition Diff

| Check | PASS/FAIL |
|---|---|
| ONE focal point dominates the viewport (not 3+ competing elements) | |
| Hero fits in one viewport on 1440x900 without scrolling to find CTA | |
| Heading wraps to max 2-3 lines on desktop | |
| Content is vertically centered or intentionally anchored (not shoved to the top) | |
| Whitespace feels extreme and intentional (not cramped, not accidental) | |

### Typography Diff

| Check | PASS/FAIL |
|---|---|
| Heading font is NOT Inter, Roboto, Open Sans, Poppins, or Arial | |
| Heading font-size uses fluid `clamp()` | |
| Letter-spacing on heading is negative | |
| Line-height on heading is below 1.1 | |
| Subtext is max 20 words, muted color, constrained width | |

### Color Diff

| Check | PASS/FAIL |
|---|---|
| Max 3 distinct hues in the entire hero | |
| Background has atmosphere (grain, glow, warm tint) — not flat `bg-black` or `bg-white` | |
| No AI-purple/blue gradient backgrounds | |
| No neon accents, no mesh blobs, no rainbow | |

### Component Diff

| Check | PASS/FAIL |
|---|---|
| Maximum ONE CTA in the hero (no secondary "Learn more" links) | |
| CTA has hover + active states with custom easing | |
| No "Scroll to explore" / bouncing chevron / scroll indicators | |
| No trust logos / "Used by" badges inside the hero | |
| No version labels (v0.6, BETA) unless the brief is literally a product launch | |
| No emojis anywhere | |

### Motion Diff

| Check | PASS/FAIL |
|---|---|
| Entry animation is present (not instant static mount) | |
| Total entry reveal completes in under 800ms | |
| `prefers-reduced-motion` is respected | |
| No animation on `top`, `left`, `width`, or `height` | |

### Mobile Diff

| Check | PASS/FAIL |
|---|---|
| Layout collapses cleanly below 768px | |
| No horizontal overflow | |
| Touch targets minimum 44px | |
| Heading minimum 2rem on mobile | |
| Text is readable over images (scrim opacity increased if needed) | |

### Content Diff

| Check | PASS/FAIL |
|---|---|
| No AI copywriting cliches ("Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize") | |
| No em-dashes — use periods, commas, or colons | |
| No placeholder images using generic stock (use `picsum.photos/seed/{keyword}/{w}/{h}`) | |
| The hero would not look out of place on awwwards.com | |

---

## The Core Principles

These are the fundamentals that separate award-winning heroes from generic AI output. They apply regardless of which architecture you pick.

> **One focal point.** The hero has ONE dominant visual element. Count elements competing for attention at the same scale. If the count exceeds 2, reduce until one clearly dominates.

> **Viewport-scale typography.** Hero headings are architectural elements, not "big text." Minimum `clamp(2.5rem, 7vw, 8rem)`. For 1-3 word headings: `clamp(4rem, 12vw, 15rem)`. Tight tracking. Compressed line-height.

> **Extreme whitespace.** The background is not wasted space — it IS the design. Content vertically centered via flex/grid, not pushed to the top with excessive padding.

> **Tight palette.** Max 3 hues. Dark heroes: off-black + white + one accent. Light heroes: warm cream + near-black + one accent. More than one saturated accent destroys focus.

> **Fits one viewport.** The entire composition (nav + heading + subtext + CTA + focal visual) must be visible without scrolling on 1440x900.
