---
name: pixel-perfect-replication
description: Image-to-code replication pipeline. When the user provides a screenshot or design reference, this skill runs a structured extraction across seven layers (grid, type, color, spacing, components, atmosphere, interaction), builds an Extraction Sheet before any code is written, implements with exact fidelity to the reference, and verifies through inline Quality Gates and a final Visual Diff. The reference image is the spec. The code is a translation, not an interpretation.
---

# Pixel-Perfect Design Replication

> This skill fires when the user provides a screenshot, mockup, Figma export, or any design image and asks you to replicate it in code. The reference image is the specification. Your role is translator, not designer. Every visual decision — font size, spacing, color, radius, shadow, layout proportion — comes from the image, not from your preferences.

---

## The Pipeline

Every replication job follows this flow. No phase can be skipped. No phase can start before the previous one completes.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   IMAGE IN ──→ Phase 1: Intake ──→ Phase 2: Deep Extraction        │
│                  (classify)          (7 layers, fill sheets)        │
│                                                                     │
│                                 ──→ Phase 3: Build                  │
│                                      (structure-first, exact CSS)   │
│                                                                     │
│                                 ──→ Phase 4: Visual Diff            │
│                                      (verify against reference)     │
│                                                                     │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Image Intake

Receive the reference image. Before doing anything else, classify what you are looking at.

### → Classify the image

Fill in this table for every reference image:

| Field | Your answer |
|---|---|
| **Image type** | Full-page screenshot / single section / component detail / mobile view / desktop view / Figma frame / design tool export / live site screenshot |
| **Sections visible** | List top-to-bottom, e.g. "Nav → Hero → Features → Testimonials → Footer" |
| **Target viewport** | Estimated width: 1440px (desktop), 1280px (laptop), 768px (tablet), 375px (mobile) |
| **Fidelity** | High-res export (sub-pixel details are intentional) / compressed screenshot (some lossy artifacts) |
| **Theme** | Light / Dark / Mixed |

### → Output the Extraction Summary

Before any code, state what you see in structured natural language. This anchors every decision that follows.

Example:

> *Light mode, 1440px desktop. Five sections: sticky frosted nav with logo left / links center / CTA right, hero with massive serif heading left-aligned over full-bleed photography, 3-col feature grid with icon-top cards, testimonial carousel with large quotation marks, minimal footer with 4-col link grid. Palette: warm cream base, near-black text, terracotta accent on CTAs. Typography: serif display heading (likely Playfair Display), geometric sans body (likely Outfit). Cards are sharp-cornered, buttons are pill-shaped. No visible shadows — flat design with subtle border separators.*

### → If the image is unclear

Do not guess. Ask specifically:

> *"The nav links are too compressed to read at this resolution. The body font could be Outfit or Satoshi — they share near-identical geometry at this size. Can you provide a closer crop of the nav, or confirm the font stack?"*

### ✓ Quality Gate: Intake

Before moving to Phase 2, confirm:
- You have classified the image type, section count, viewport, and fidelity
- You have written the Extraction Summary
- You have flagged any unclear areas and asked for clarification (or confirmed everything is readable)

---

## Phase 2: Deep Extraction

Run all seven extraction layers on the reference image. Each layer focuses on one dimension of the design. Fill in the Extraction Sheet for each. Skipping a layer causes drift — small errors here compound into "it looks off" in the final build.

---

### Layer 1: Layout Grid

Extract the spatial skeleton.

**Extraction Sheet:**

| Property | Measured value |
|---|---|
| Container max-width | e.g. `1280px`, `1440px` — measure by proportion against viewport edges |
| Column system | e.g. `grid-cols-[1.15fr_1fr]`, `grid-cols-3`, `single column centered` |
| Horizontal padding | e.g. `px-6 md:px-12 lg:px-20` — measure the gap between content edge and viewport edge |
| Section heights | `min-h-[100dvh]` for full-viewport, `auto` for content-driven |
| Section spacing | Vertical gap between sections, e.g. `py-24 lg:py-32` |
| Alignment | Per-section: left / center / right / mixed |
| Z-axis layering | Any overlaps? Elements stacked on top of others? |

**How to measure proportions from images:**
- If the hero heading occupies ~60% of viewport width, on a 1440px target that is roughly `max-w-[54rem]`
- If one column is visually 1.5x wider than the adjacent column, use `grid-cols-[1.5fr_1fr]`
- If empty space above a heading is roughly 2x the heading font size, the padding is approximately `2em` relative to the heading

⚠ **Drift Warning:** The most common layout error is getting the container max-width wrong. A design with `max-w-[1200px]` looks noticeably different from one with `max-w-[1440px]` — the whitespace proportions change completely. Measure carefully.

---

### Layer 2: Typography

This is the most critical extraction. Wrong typography is the #1 reason a replication "looks off."

**Extraction Sheet (fill for EVERY visible text element):**

| Element | Font family | Weight | Size | Line-height | Letter-spacing | Transform | Color |
|---|---|---|---|---|---|---|---|
| Nav links | | | | | | | |
| Eyebrow/label | | | | | | | |
| H1 (hero) | | | | | | | |
| H2 (section) | | | | | | | |
| H3 (card title) | | | | | | | |
| Body text | | | | | | | |
| Caption/meta | | | | | | | |
| CTA text | | | | | | | |
| Footer links | | | | | | | |

**Font identification — what to look for:**

Fonts reveal themselves through specific characters. Study these before guessing:

| Check this character | What it tells you |
|---|---|
| Lowercase `a` | Single-story (Geist, Helvetica) vs double-story (Outfit, Satoshi, DM Sans) |
| Lowercase `g` | Open-tail (most sans-serifs) vs closed-tail (Futura, some geometric) |
| Lowercase `t` | Curved crossbar (humanist: Manrope, Jakarta) vs straight (geometric: Outfit, Satoshi) |
| Capital `R` | Straight leg (Geist, Helvetica) vs curved leg (Outfit, Satoshi) |
| Capital `Q` | Tail style varies dramatically between fonts — strong identifier |
| Lowercase `e` | High crossbar (geometric) vs centered (humanist) |
| Numbers `1, 4, 6, 9` | Highly distinctive shapes across fonts |

**Common web font quick-reference:**

| Visual character | Strong candidates |
|---|---|
| Geometric, double-story `a`, round counters | Outfit, Satoshi, DM Sans, Plus Jakarta Sans |
| Grotesque, single-story `a`, flat terminals | Geist, Suisse Intl, Helvetica Neue |
| Humanist, open counters, calligraphic stress | Manrope, Plus Jakarta Sans, Nunito Sans |
| Condensed, tall x-height | Barlow Condensed, Oswald, Archivo Narrow |
| Modern serif, high contrast, sharp serifs | Playfair Display, Bodoni Moda |
| Transitional serif, moderate contrast | Lora, Merriweather, Source Serif Pro |
| Display sans, wide, heavy | Cabinet Grotesk, Clash Display, Monument Extended |
| Monospace | JetBrains Mono, Fira Code, IBM Plex Mono, Geist Mono, Space Mono |

If you cannot confidently identify the font, state your top 2-3 candidates with the distinguishing character that makes you lean one way. Example: *"The double-story 'a' and round 'o' suggest Outfit, but the slightly squared terminals could indicate Satoshi. Defaulting to Outfit — swap by changing `--font-display` if incorrect."*

⚠ **Drift Warning:** Never assume a heading is `font-weight: 700` because "headings are bold." Many premium designs use `500` or `600` for headings with a heavier font face. Look at stem thickness relative to the counter space.

---

### Layer 3: Color Palette

Extract every distinct color. Not "it uses blue" — extract the hex.

**Extraction Sheet:**

| Role | Hex value | Notes |
|---|---|---|
| Background (primary) | | e.g. `#F5F0EB` warm cream, not plain `#FFFFFF` |
| Background (secondary) | | Alternate section BG, card BG |
| Background (dark section) | | If any sections flip to dark |
| Text (primary) | | Heading + body text on primary BG |
| Text (secondary) | | Muted descriptions, metadata |
| Text (tertiary) | | Placeholders, disabled states |
| Accent | | CTAs, active indicators, links |
| Accent (hover) | | Darker/lighter variant on interaction |
| Border | | Card borders, dividers, input borders |
| Shadow | | If tinted, note the hue |

**Extracting colors from compressed screenshots:**

Screenshots compress colors. To get accurate values:
- Sample from the **largest flat area** of the color, not from edges or JPEG artifacts
- Cross-reference with common web values — if you measure `#0b0b0b`, it is almost certainly `#0a0a0a` (standard off-black). If you measure `#f4f3f1`, it is likely `#f5f4f2` (common warm cream)
- After extracting, verify WCAG AA contrast between text and background colors to confirm the values are reasonable

⚠ **Drift Warning:** The difference between `#FFFFFF` (pure white) and `#F5F0EB` (warm cream) completely changes the feel of a page. Do not default to `#FFFFFF` or `#000000` unless the reference genuinely shows pure values — most premium designs use off-white and off-black.

---

### Layer 4: Spacing System

Spacing is what separates "looks close" from "looks identical."

**Extraction Sheet:**

| Measurement | Value | How to verify |
|---|---|---|
| Base unit | `4px` or `8px` | Measure the smallest repeated gap |
| Button padding (H) | e.g. `24px` / `px-6` | Horizontal space between text edge and button edge |
| Button padding (V) | e.g. `12px` / `py-3` | Vertical space |
| Card internal padding | e.g. `32px` / `p-8` | Space from card edge to card content |
| Grid gap | e.g. `24px` / `gap-6` | Space between cards/columns |
| Heading → subtext | e.g. `16px` / `mt-4` | Gap between heading baseline and subtext top |
| Subtext → CTA | e.g. `32px` / `mt-8` | Gap between subtext and button |
| Section padding (top) | e.g. `96px` / `pt-24` | Space from section top to first element |
| Section padding (bottom) | e.g. `128px` / `pb-32` | Space from last element to section bottom |
| Nav height | e.g. `64px` / `h-16` | Total nav bar height |
| Nav link gap | e.g. `32px` / `gap-8` | Space between nav links |

⚠ **Drift Warning:** Top and bottom section padding are often **not** equal. Many designs use more bottom padding than top (or vice versa) for optical balance. Do not assume `py-24` when the reference shows `pt-20 pb-28`. Measure each side independently.

---

### Layer 5: Component Inventory

Catalog every distinct UI component visible in the image.

**For each component, fill in:**

| Component | Shape (radius) | Border | Shadow | Background | States visible | Icon style |
|---|---|---|---|---|---|---|
| Primary button | | | | | | |
| Secondary button | | | | | | |
| Card | | | | | | |
| Input field | | | | | | |
| Badge/pill | | | | | | |
| Avatar | | | | | | |
| Navigation | | | | | | |
| Divider | | | | | | |

**Border-radius consistency check:** Most designs commit to one radius language. Check whether the design uses:
- **Sharp** — `0px` everywhere (brutalist, editorial)
- **Subtle** — `4-8px` everywhere (SaaS, product)
- **Rounded** — `12-16px` everywhere (modern, friendly)
- **Pill** — `9999px` on buttons, rounded on cards (premium, polished)
- **Mixed** — different radii for different components (verify each one)

⚠ **Drift Warning:** If buttons are pill-shaped (`rounded-full`) in the reference, they cannot be `rounded-lg` in the code. Radius mismatches are immediately visible — the eye detects them faster than color or spacing errors.

---

### Layer 6: Atmosphere and Texture

Extract the subtle details that make a design feel alive vs flat.

**Extraction Sheet:**

| Property | Present? | Details |
|---|---|---|
| Noise/grain overlay | yes/no | Opacity level (typically `0.03-0.06`) |
| Radial ambient glow | yes/no | Position, color, spread |
| Frosted glass (backdrop-blur) | yes/no | On what elements, blur amount |
| Gradient backgrounds | yes/no | Direction, stops, colors |
| Tinted shadows | yes/no | Shadow hue, not just black |
| Image overlays/scrims | yes/no | Gradient direction, opacity |
| Background images/patterns | yes/no | Subtle texture, dots, lines |
| Depth/layering feel | flat / subtle / heavy | Overall shadow usage |

---

### Layer 7: Responsive Cues and Interaction Inference

Even from a static image, extract clues about behavior.

**Extraction Sheet:**

| Signal | Inference |
|---|---|
| Multi-column layout | Will collapse to single column below 768px |
| Horizontal nav bar | Will need mobile menu below 768px |
| Sticky-looking nav | `position: fixed; top: 0` with backdrop-blur likely |
| Elements positioned as if "just landed" | Entry animation implied (fade-up with stagger) |
| Buttons with visual depth | Lift on hover (`translateY(-1px)`, shadow increase) |
| Cards with borders | Border color change or subtle background shift on hover |
| Dot indicators near images | Carousel/slider component |
| Active/selected tab styling | Tab component with state management |
| Form inputs visible | Focus ring, validation states needed |

---

### ✓ Quality Gate: Extraction

Before moving to Phase 3, confirm:
- All seven Extraction Sheets are filled in
- Font candidates are identified with reasoning
- Every distinct color has a hex value
- Spacing values are measured, not assumed
- Component inventory is complete with radius, border, shadow noted per component
- Anything unclear has been flagged to the user

---

## Phase 3: Build

Implementation starts here. Follow this exact build order — each step depends on the one before it.

### → Step 1: Global Foundation

Set the design tokens first. Everything else references these.

```css
/* BLUEPRINT: Global tokens
   WHY: Setting these first means every component inherits 
   the correct base values. Changing a token here updates 
   the entire page. */

@import url('https://fonts.googleapis.com/css2?family=FONT_NAME:wght@300;400;500;600;700&display=swap');

:root {
  /* Colors — from Extraction Sheet Layer 3 */
  --color-bg: #____;
  --color-surface: #____;
  --color-text: #____;
  --color-text-2: #____;
  --color-text-3: #____;
  --color-accent: #____;
  --color-accent-hover: #____;
  --color-border: rgba(_, _, _, _);

  /* Typography — from Extraction Sheet Layer 2 */
  --font-display: 'FONT_NAME', Georgia, serif;
  --font-body: 'FONT_NAME', system-ui, sans-serif;
  --font-mono: 'FONT_NAME', monospace;

  /* Spacing — from Extraction Sheet Layer 4 */
  --space-section: clamp(5rem, 10vw, 8rem);
  --space-component: 2rem;
  --space-element: 1rem;

  /* Radius — from Extraction Sheet Layer 5 */
  --radius-card: __px;
  --radius-button: __px;
  --radius-input: __px;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  font-size: 1rem; /* Adjust if reference base is not 16px */
  line-height: 1.6; /* From extraction */
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### → Step 2: Layout Skeleton

Build the section containers with correct dimensions. No content yet — just the boxes.

```css
/* BLUEPRINT: Section containers
   WHY: Getting the spatial structure right first prevents 
   cascading spacing errors when content is added. */

.section {
  width: 100%;
  max-width: ____px; /* From Layer 1 extraction */
  margin: 0 auto;
  padding: var(--space-section) clamp(1.5rem, 5vw, 5rem);
}

/* Full-viewport section */
.section--full {
  min-height: 100dvh;
  /* WHY dvh not vh: vh causes a layout jump on iOS Safari 
     when the address bar collapses. dvh accounts for this. */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Grid layouts — adjust columns to match reference */
.grid-2-asymmetric {
  display: grid;
  grid-template-columns: 1.15fr 1fr; /* From Layer 1 */
  align-items: center;
  gap: 4rem;
}

.grid-3-equal {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; /* From Layer 4 */
}

@media (max-width: 768px) {
  .grid-2-asymmetric,
  .grid-3-equal {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

### → Step 3: Typography Pass

Apply all text styles from the Layer 2 Extraction Sheet.

```css
/* BLUEPRINT: Typography scale
   WHY: Every property is explicitly set from the extraction.
   Never rely on browser defaults — they will drift. */

.heading-display {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 5rem); /* From extraction */
  font-weight: 700;   /* Verified from stem thickness, not assumed */
  line-height: 0.95;  /* Tight — measured from baseline gap */
  letter-spacing: -0.03em; /* Negative — measured from character proximity */
  color: var(--color-text);
  text-wrap: balance;
  max-width: 18ch;    /* Prevents 4+ line wraps */
}

.heading-section {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.body-text {
  font-family: var(--font-body);
  font-size: clamp(0.9375rem, 1.1vw, 1.125rem);
  font-weight: 400;
  line-height: 1.65;
  color: var(--color-text-2);
  max-width: 55ch; /* Comfortable reading width */
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-3);
}

.caption {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-3);
}
```

⚠ **Drift Warning:** Do not round font sizes to convenient values. If the extraction shows `15px` body text, use `0.9375rem`, not `1rem`. If the heading looks like `72px`, use `4.5rem`, not `5rem`. Rounding accumulates across the page.

### → Step 4: Components Pass

Build each component from the Layer 5 Extraction Sheet.

```css
/* BLUEPRINT: Button — primary
   WHY: Padding, radius, and font-size are from the extraction.
   The transition easing (0.16, 1, 0.3, 1) gives a snappy 
   deceleration that feels physical. */

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;           /* From Layer 4 */
  font-family: var(--font-body);
  font-size: 0.875rem;               /* From Layer 2 */
  font-weight: 600;
  letter-spacing: 0.04em;            /* Only if extraction shows tracking */
  text-transform: uppercase;          /* Only if extraction shows uppercase */
  border-radius: var(--radius-button);
  background: var(--color-accent);
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
.btn-primary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* BLUEPRINT: Button — ghost/outline */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-button);
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-ghost:hover {
  border-color: var(--color-text);
  background: rgba(0, 0, 0, 0.03);
}

/* BLUEPRINT: Card */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  padding: var(--space-component);
  border: 1px solid var(--color-border);
  /* Shadow: only add if extraction shows shadow */
}

/* BLUEPRINT: Navigation */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 64px; /* From Layer 4 extraction */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.5rem, 5vw, 5rem);
  background: rgba(255, 255, 255, 0.85); /* Adjust to match */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: var(--color-text);
}
```

### → Step 5: Spacing Adjustments

Walk through every element gap and verify against the Layer 4 Extraction Sheet. This is where implementations most commonly drift.

### → Step 6: Atmosphere Pass

Add texture and depth from the Layer 6 Extraction Sheet. Only add what the reference shows.

```css
/* BLUEPRINT: Noise/grain overlay
   WHY: Breaks digital flatness. Only add if the reference 
   shows subtle texture on the background. 
   Uses position:fixed so the grain doesn't scroll. */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04; /* Adjust to match reference intensity */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* BLUEPRINT: Ambient radial glow
   WHY: Adds depth to flat dark backgrounds. Only use if the 
   reference shows a subtle light center. */
.ambient-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 50% at 50% 40%,
    rgba(255, 255, 255, 0.035) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* BLUEPRINT: Frosted glass surface
   WHY: For navs or overlays that show content blurring through.
   saturate(180%) makes colors pop through the blur layer. */
.surface-frosted {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}
```

⚠ **Drift Warning:** Do not add grain, glow, or blur if the reference does not show them. These are atmosphere details, not defaults. Adding texture the reference does not have is interpretation, not replication.

### → Step 7: Responsive Pass

If the reference is desktop-only, infer mobile behavior from the layout structure. If both desktop and mobile references are provided, match both exactly.

```css
/* BLUEPRINT: Mobile collapse
   WHY: Every multi-column layout must collapse to single-column.
   Touch targets must be minimum 44px for accessibility. */

@media (max-width: 768px) {
  .grid-2-asymmetric,
  .grid-3-equal {
    grid-template-columns: 1fr;
  }

  .heading-display {
    /* clamp() already handles this, but verify the minimum */
    max-width: 100%;
  }

  .nav {
    /* May need a hamburger menu implementation */
  }

  /* Touch targets */
  .btn-primary,
  .btn-ghost,
  .nav-link {
    min-height: 44px;
  }
}
```

### → Step 8: Interaction Pass

Add hover states and entry animations. Static images cannot show interaction, but every interactive element needs feedback.

```css
/* BLUEPRINT: Staggered entry animation
   WHY: Elements that fade+slide in feel intentional.
   The blur-to-sharp adds perceived quality.
   prefers-reduced-motion disables for accessibility. */

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(24px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-in {
  animation: enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.animate-in:nth-child(1) { animation-delay: 0.05s; }
.animate-in:nth-child(2) { animation-delay: 0.15s; }
.animate-in:nth-child(3) { animation-delay: 0.25s; }
.animate-in:nth-child(4) { animation-delay: 0.35s; }

@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }
}

/* Universal interactive transition */
a, button, [role="button"], input, select, textarea {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### ✓ Quality Gate: Build

Before moving to Phase 4, confirm:
- Global tokens are set from extraction values, not defaults
- Layout skeleton matches the reference section structure
- Typography uses explicit values for every property (no browser defaults)
- Components match extraction sheets for radius, border, shadow, and padding
- Spacing between elements is verified against the reference
- Atmosphere effects are only present if the reference shows them
- Responsive collapse is implemented
- Hover/focus states are present on all interactive elements

---

## Phase 4: Visual Diff

Compare your implementation against the reference image. This is the final verification. Walk through every category below. Mark each item PASS or FAIL. Any FAIL blocks delivery.

### Layout Diff

| Check | PASS/FAIL |
|---|---|
| Section count and order match | |
| Container max-width proportions match | |
| Horizontal padding matches | |
| Grid column counts and ratios match | |
| Section heights feel proportionally correct | |
| Vertical spacing between sections matches | |
| Element alignment (left/center/right) matches per section | |
| Z-axis layering matches (if present) | |

### Typography Diff

| Check | PASS/FAIL |
|---|---|
| Font family loaded and rendering correctly | |
| Heading size proportionally correct against viewport | |
| Heading weight matches (not too thin, not too heavy) | |
| Heading line-height matches (tight vs relaxed) | |
| Heading letter-spacing matches (tight vs wide) | |
| Body text size matches | |
| Body line-height and max-width match | |
| Eyebrow/label styling matches (size, case, tracking, font) | |
| Text colors match per element type | |

### Color Diff

| Check | PASS/FAIL |
|---|---|
| Primary background color matches (not #FFF when it should be #F5F0EB) | |
| Text colors match (primary and secondary) | |
| Accent color matches | |
| Border/divider colors match | |
| No unexpected color shifts between sections | |

### Component Diff

| Check | PASS/FAIL |
|---|---|
| Button radius matches (pill vs rounded vs sharp) | |
| Button padding matches | |
| Button text styling matches (size, weight, case, tracking) | |
| Card styling matches (radius, padding, border, shadow) | |
| Navigation matches (height, background treatment, link styling) | |
| Image treatment matches (radius, aspect ratio, object-fit) | |

### Spacing Diff

| Check | PASS/FAIL |
|---|---|
| Heading → subtext gap matches | |
| Subtext → CTA gap matches | |
| Card internal padding matches | |
| Grid gap between elements matches | |
| Section padding (top AND bottom independently) matches | |
| Overall breathing room / negative space feels correct | |

### Atmosphere Diff

| Check | PASS/FAIL |
|---|---|
| Background atmosphere matches (flat/grain/gradient/glow) | |
| Shadow presence and intensity match | |
| Frosted glass / blur effects present where reference shows them | |
| No atmosphere effects added that the reference does NOT show | |

### Technical Checks

| Check | PASS/FAIL |
|---|---|
| Zero console errors | |
| All fonts loaded (no FOUT/FOIT) | |
| All images loaded (no broken placeholders) | |
| No horizontal overflow at any viewport | |
| Hover states on all interactive elements | |
| Focus-visible states for keyboard navigation | |
| `min-h-[100dvh]` used, not `h-screen` | |
| `prefers-reduced-motion` respected | |

---

## Handling Artistic Assets (Photographs, Illustrations, Textures)

CSS can reproduce layout, typography, colors, and geometric shapes. It CANNOT reproduce photographs, hand-drawn illustrations, organic brush strokes, marble textures, or painterly effects. This is the #1 source of drift between reference and output.

### → Classify every visual element in the reference

Walk through the reference and tag each visual element:

| Element type | Can CSS reproduce it? | What to do instead |
|---|---|---|
| **Solid color blocks** | ✅ Yes | Use exact hex from extraction |
| **Linear/radial gradients** | ✅ Yes | Match direction, stops, and colors |
| **Geometric shapes** (circles, rectangles, lines) | ✅ Yes | Use CSS shapes or simple SVG |
| **Icons** (outlined/filled) | ✅ Yes | Use an icon library or inline SVG |
| **Photographs** | ❌ No | Generate a mood-matched image or use `picsum.photos/seed/{keyword}/{w}/{h}` |
| **Hand-drawn illustrations** | ❌ No | Generate a matching illustration with `generate_image` tool |
| **Organic brush strokes / paint textures** | ❌ No | Generate as an image asset — do NOT approximate with CSS gradients |
| **Marble / fluid / organic textures** | ❌ No | Generate as an image asset or use a high-quality stock match |
| **3D renders** | ❌ No | Generate a matching render or use a placeholder with similar lighting/angle |
| **Abstract art / mixed media** | ❌ No | Generate with `generate_image` describing the exact style, colors, and composition |

### → When the reference contains photographs

1. **First choice:** Use `generate_image` to create a photograph that matches the mood, color palette, subject, and composition of the reference
2. **Second choice:** Use `picsum.photos/seed/{descriptive-keyword}/{w}/{h}` with a keyword that matches the content (e.g., `picsum.photos/seed/ocean-waves/800/600` for ocean imagery)
3. **Never:** Use a CSS gradient, striped pattern, or solid color block as a stand-in for a photograph. This is the most visible form of drift

### → When the reference contains illustrations or brush strokes

1. **First choice:** Use `generate_image` with a detailed prompt describing the illustration style, colors, stroke quality, and composition. Include the mood: "organic hand-painted pink brush stroke with visible texture, diagonal across white background, coral/hot-pink color, similar to expressive abstract art"
2. **Second choice:** If `generate_image` is not available, find a stock illustration with matching style and color
3. **Never:** Approximate organic, hand-drawn artwork with CSS gradients or geometric shapes. A diagonal CSS gradient is NOT a brush stroke. A CSS `border-radius` blob is NOT an organic shape. The eye detects the difference instantly

### → When the reference contains textured surfaces

Marble, wood grain, concrete, fabric, water, clouds — these need real image assets:

1. Generate the texture with `generate_image` describing the specific surface
2. Apply as a `background-image` with appropriate `background-size`, `object-fit`, and positioning
3. Match the scale — a zoomed-in marble texture looks different from a zoomed-out one

### → Asset sizing and positioning

When placing generated image assets into the layout:

```css
/* BLUEPRINT: Image asset inside a card or container
   WHY: object-fit:cover ensures the image fills the space 
   without distortion. object-position lets you align the 
   focal point of the image to match the reference. */
.asset-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-card); /* match card radius */
}
.asset-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* adjust to match reference focal point */
}
```

⚠ **Drift Warning:** This is the most common replication failure. When the AI cannot reproduce an artistic element, it substitutes a CSS pattern (stripes, gradients, solid blocks). This ALWAYS looks wrong because geometric CSS patterns have a fundamentally different visual quality than photographs or hand-drawn art. Always generate an image asset instead — even an imperfect generated image is closer to the reference than a CSS approximation.

---

## Edge Cases

### When you cannot identify the font

1. State your top 2-3 candidates with the distinguishing character that makes you lean one way
2. Suggest the user inspect the live site via DevTools → Computed Styles → `font-family`
3. Default to the closest Google Font match
4. Structure your CSS so the font can be swapped by changing a single `--font-display` variable

### When the reference is low resolution

1. Extract what you can confidently determine (layout, palette, general typography)
2. Flag uncertain measurements explicitly
3. Ask for a higher-res image or a URL to the live site
4. Do not invent sub-pixel details from a blurry screenshot

### When the reference shows content you cannot reproduce

Some references show dynamic content (live chat, real user avatars, real-time data):
1. Reproduce the visual appearance with static placeholder data
2. Use realistic content — real-sounding names, organic numbers (not "John Doe" or "99.99%")
3. Note which elements are placeholder in your delivery

For artistic content (photographs, illustrations, textures), see the "Handling Artistic Assets" section above. Never approximate with CSS — always generate or source a real image.

### When multiple reference images are provided

1. Run the full extraction on each image independently
2. Confirm the design system is consistent across images (same fonts, colors, components)
3. If inconsistencies exist, ask the user which image is authoritative
4. Desktop + mobile pairs: use desktop for the design system, mobile for responsive breakpoints

### When the reference uses a recognizable component library

If you spot shadcn/ui, Radix, Material, or another library:
1. State which library you believe is in use
2. Ask if the user wants the library or manual reproduction
3. If using the library: install properly and theme to match
4. If reproducing manually: match the visual output without the dependency

---

## The Core Principle

> The reference image is the specification. The code is a translation. You are a translator, not a designer. Match the image, not your preferences. If the reference contradicts your aesthetic instincts, the reference wins. The only technical override allowed is `min-h-[100dvh]` over `h-screen`, because `h-screen` is a browser bug, not a design choice.

