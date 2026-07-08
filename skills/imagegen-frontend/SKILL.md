---
name: imagegen-frontend-web
description: Elite frontend image-direction skill for generating premium, conversion-aware website design reference images via ChatGPT image generation. Fires when the user asks to generate website mockups, landing page concepts, section design references, or UI comp images. Enforces ONE separate horizontal image PER section, composition variety (bans the default left-text/right-image on every section), background-image freedom, varied CTAs, varied hero scales, narrative concept spine, second-read moments, and a single consistent palette across all images. Outputs structured prompt blueprints that produce Awwwards-tier visual references a developer or coding model can accurately recreate. Image generation only — does not write code.
---

# Elite Frontend Image Art Direction

> This skill fires when the user asks to generate website design reference images, landing page mockups, section comp images, UI concept visuals, or any image that will serve as a frontend design reference. You are an art director, not an illustrator. Every image you generate must be a structured, premium, implementation-friendly website section that a developer could look at and code. This skill does NOT write code — it produces the visual references that feed into the pixel-perfect, hero, and motion skills.

---

## The Hard Output Rule — Read First

**Generate ONE separate horizontal image PER section. Always. No exceptions.**

```
 1 section requested  →  1 image
 4 sections requested →  4 images
 8 sections requested →  8 images
12 sections requested → 12 images
"landing page" (no count) → default 6 sections → 6 images
"full website template"   → default 8 sections → 8 images
```

Each image is one section, generated as its own image call. Never combine multiple sections into one tall frame. Never return a single image containing the whole page.

If you can only render one image at a time, output them sequentially — announce each one: *"Section 1 of 8: Hero"*, *"Section 2 of 8: Trust bar"*, etc.

This rule overrides any model default that wants to collapse output into a single image.

---

## The Pipeline

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   BRIEF IN ──→ Phase 1: Read the Brief                                  │
│                  (extract brand signals, classify style,                 │
│                   map brief to direction dials)                          │
│                                                                          │
│              ──→ Phase 2: Art Direction                                  │
│                   (commit to combinatorial picks:                        │
│                    theme, typography, hero, sections,                    │
│                    composition anchors, backgrounds,                     │
│                    CTAs, narrative spine, second-read)                   │
│                                                                          │
│              ──→ Phase 3: Prompt Engineering                             │
│                   (build structured prompt per section                   │
│                    using the blueprint templates)                        │
│                                                                          │
│              ──→ Phase 4: Generate                                       │
│                   (one image per section, announce each)                 │
│                                                                          │
│              ──→ Phase 5: Visual Diff                                    │
│                   (verify against brief, check for                      │
│                    AI default drift, composition variety)                │
│                                                                          │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## The Core Doctrine

Before generating any image, internalize these. They override every aesthetic preference. The quality bar is **Awwwards SOTD winners, Apple product pages, Linear marketing, Stripe homepage, Vercel brand.** If your generated image would look generic next to these, it is not good enough.

> **You are an art director, not a prompt monkey.** Standard AI image generation collapses into the same 5 defaults: centered dark hero, purple/blue AI glow, floating meaningless blobs, generic dashboard cards, and weak typography hierarchy. Your job is to aggressively break these defaults with intentional, structured, premium compositions.

> **Every image is a frontend reference.** The output must communicate layout, section hierarchy, spacing, typography scale, and color palette clearly enough that a developer can look at it and code it. Random mood art is not acceptable unless the user explicitly asks for it.

> **Composition variety is mandatory.** The left-text / right-image split is the most overused AI layout pattern. It is allowed, but never as the default, and never twice in a row. Across a multi-section page, at least 3 different composition anchors must appear.

> **One palette, threaded consistently.** All sections of a page share the same palette. The palette is chosen once in Phase 2 and applied to every section. Sections can vary in background mode (solid, image, gradient) but the hues must be consistent. A page where the hero is warm cream and the features section is cool blue-gray is a broken design system.

> **Whitespace is a design material.** Sections must breathe. The default AI instinct is to pack every pixel with content. Fight it. Generous negative space between elements is what separates premium from busy. Bias toward slightly more whitespace than you think is necessary.

> **Conversion awareness.** Every section has a job — hook, prove, educate, or convert. The page must flow as a persuasion sequence, not a random collection of pretty sections. Even purely visual references should imply where the user's eye goes and what action they should take.

---

## Phase 1: Read the Brief

Before generating anything, extract design signals from the user's request. Do not project your own aesthetic onto the brief. Read what is actually there.

### → Extract these signals

| Signal | What to look for |
|---|---|
| **Brand type** | SaaS / Agency / E-commerce / Portfolio / Editorial / Fintech / Health / AI / Crypto / Personal brand / Nonprofit |
| **Mood keywords** | Clean, bold, cinematic, minimal, editorial, premium, luxury, playful, dark, light, warm, cold, technical, organic |
| **Density preference** | Airy / balanced / packed — infer from "minimal" vs "feature-rich" vs "content-heavy" |
| **Image preference** | Photography-led / illustration-led / typography-led / product-focused / abstract |
| **Target audience** | Developer tools / Consumer / Enterprise / Creative professional / Luxury consumer |
| **Explicit constraints** | Specific colors mentioned, specific fonts mentioned, dark/light mode specified, specific section requests |
| **Reference links** | Any URLs, screenshots, or brand names the user mentions as inspiration |
| **Section count** | Explicit count or inferred from "landing page" (6), "full site" (8), "one-pager" (5-7) |

### → Output the Direction Brief

State in 2-3 lines the art direction you are committing to:

> *"Direction Brief: Dark cinematic SaaS landing page for an AI infrastructure product. 7 sections. Palette: deep charcoal base + warm off-white text + single amber accent. Typography: compressed display grotesk (Monument Extended energy). Giant statement hero with product screenshot as focal. Photography-led backgrounds with tonal color grading. Conversion-driven AIDA flow. Feels like: Linear meets Vercel with a warmer accent."*

### → Brief-to-Direction Mapping

Read the brief. Then bias your picks:

| If the user says... | Bias toward... |
|---|---|
| **"minimalist" / "clean" / "swiss" / "ultra simple"** | Mini Minimalist hero, solid surfaces, stacked center compositions, generous negative space, skip full-bleed images |
| **"editorial" / "magazine" / "art-directed" / "fashion"** | Mid Editorial or Giant Statement hero, editorial side-image backgrounds, off-grid compositions, strong typography contrast, duotone image treatments |
| **"cinematic" / "atmospheric" / "premium" / "luxury" / "bold"** | Giant Statement hero, full-bleed image backgrounds with tonal overlay, soft radial vignettes, bottom-left/centered-low text placement |
| **"SaaS" / "product" / "dashboard" / "fintech" / "infra"** | Mid Editorial hero, solid + inline asset backgrounds, clear product framing, trust-driven anchors, higher implementation clarity |
| **"agency" / "creative studio" / "portfolio"** | Giant Statement OR Mini Minimalist hero (commit to one), bold background variety, off-grid poster-like compositions |
| **"e-commerce" / "shop" / "store" / "product page"** | Mid Editorial hero with strong product focus, full-bleed product photography, product-led compositions, unmistakable CTAs |
| *Brief is silent on style* | Use defaults from the Configuration Baseline, pick decisively, do not split the difference |

### → If the brief is vague

Ask exactly ONE question: *"What's the brand name, one-line value prop, and preferred mood — closer to [dark cinematic] or [light editorial]?"*

If you can infer from context (e.g., user said "AI startup" or "luxury agency"), skip the question and declare your Direction Brief.

### ✓ Quality Gate: Brief

Before moving to Phase 2, confirm:
- All 8 signals are extracted (or inferred)
- Direction Brief is written
- You know the mood, palette direction, hero scale, and section count
- You have NOT started generating any images yet

---

## Phase 2: Art Direction (The Combinatorial Variation Engine)

This is the engine that prevents repetitive AI output. For each category below, commit to ONE option based on the brief. Do not blend. Do not hedge. Pick and commit.

The picks must be internally consistent — a "Quiet Premium Neutral" theme with "Monument-like compressed statement typography" is a valid pairing. A "Pristine Light Mode" theme with a "Deep Dark Mode" background character is not.

---

### → Theme Paradigm (pick 1)

| # | Theme | When to use |
|---|---|---|
| 1 | **Pristine Light Mode** — Off-white / cream / paper tones, sharp dark text, editorial confidence | Clean SaaS, editorial, health, lifestyle |
| 2 | **Deep Dark Mode** — Charcoal / graphite / zinc, elegant glow only when justified | Dev tools, AI/ML, gaming, cinematic |
| 3 | **Bold Studio Solid** — Strong controlled color fields (oxblood, royal blue, forest, vermilion, emerald) with crisp contrasting UI | Agency, creative studio, brand-forward |
| 4 | **Quiet Premium Neutral** — Bone, sand, taupe, stone, smoke, muted contrast, restrained luxury | Luxury, finance, architecture, fashion |

### → Background Character (pick 1 global default)

| # | Background | Character |
|---|---|---|
| 1 | Subtle technical grid / dotted field | Precise, engineered, dev-tool feel |
| 2 | Pure solid field with soft ambient gradient depth | Clean, modern, lets content breathe |
| 3 | Full-bleed cinematic imagery with proper contrast control | Atmospheric, editorial, immersive |
| 4 | Quiet textured paper / material / tactile surface feel | Warm, craft-oriented, luxury print |

### → Typography Character (pick 1)

| # | Type | Energy |
|---|---|---|
| 1 | **Satoshi-like clean grotesk** | Modern, approachable, startup-friendly |
| 2 | **Neue-Montreal-like refined grotesk** | Polished, agency, premium tech |
| 3 | **Cabinet/Clash-like expressive display** | Bold, statement, creative |
| 4 | **Monument-like compressed statement** | Industrial, dramatic, high-impact |
| 5 | **Elegant editorial serif + sans pairing** | Editorial, luxury, magazine |
| 6 | **Swiss rational sans with very strong hierarchy** | Structured, systematic, enterprise |

⚠ **Drift Warning:** Never drift into default web typography energy. The heading must feel like an architectural element, not "big text." If the generated image shows a heading that could be from any WordPress template, the typography pick was wrong.

### → Hero Architecture (pick 1)

| # | Architecture | Best for |
|---|---|---|
| 1 | **Cinematic Centered Minimalist** — Heading centered, cinematic visual fills background or floats behind text | Dark cinematic, immersive product launches |
| 2 | **Asymmetric Split** — Massive heading one side, supporting content other side, deliberate vertical tension | Bold agency, AI/tech launches |
| 3 | **Full-Bleed Subject** — Full-viewport photograph IS the hero, typography overlaid directly | Athlete/personal brand, fashion, lifestyle |
| 4 | **Typographic Poster** — Typography IS the visual, no hero image, viewport-bleeding scale | Creative studio, personal brand, editorial |
| 5 | **Editorial Offset** — Off-grid composition, asymmetric pulls, text and image not conventionally aligned | Magazine, editorial, art-directed brand |
| 6 | **Massive Image-First** — Photograph dominates, restrained text anchors a corner or edge | Product photography, luxury, e-commerce |

⚠ **Drift Warning:** The left-text / right-image hero is the most overused AI image generation pattern. It is allowed but should NOT be your first instinct. Before reaching for it, consider: centered over background image, bottom-left over image, top-left lead, stacked center, image-as-canvas, off-grid editorial. Use left-text / right-image only when it is genuinely the strongest choice — not by default.

### → Hero Scale (pick 1)

| Scale | Character |
|---|---|
| **Giant Statement** — Massive type, large image, dominant first viewport | Cinematic, atmospheric, brand-forward |
| **Mid Editorial** — Balanced type/image, cinematic but not screen-filling | SaaS, product, professional |
| **Mini Minimalist** — Tiny logo + short statement + thin CTA, lots of negative space | Confident restraint, luxury, swiss |

Mini does not mean weak — it means confident restraint.

### → Section System (pick 1 dominant structure)

| # | System | Character |
|---|---|---|
| 1 | **Strict modular bento rhythm** | Dense, organized, data-rich |
| 2 | **Alternating editorial blocks** | Narrative, story-driven |
| 3 | **Poster-like stacked storytelling** | Cinematic, chapter-based |
| 4 | **Gallery-led visual cadence** | Image-forward, portfolio |
| 5 | **Swiss grid discipline** | Rational, structured, systematic |
| 6 | **Asymmetric premium marketing flow** | Dynamic, agency, conversion-led |

### → Composition Anchor (assign 1 per section)

Each section picks 1 anchor. Across the site, **at least 3 different anchors must appear.** Never use the same anchor twice in a row.

| Anchor | Description |
|---|---|
| **Centered statement** | All content centered, symmetrical, authoritative |
| **Top-left lead, support bottom-right** | Reading-order diagonal flow |
| **Bottom-left text over background image** | Cinematic, editorial overlap |
| **Bottom-right CTA cluster** | Conversion-focused terminal anchor |
| **Left-third caption + right-two-thirds visual** | Classic split — use sparingly, never twice in a row |
| **Right-third caption + left-two-thirds visual** | Inverted classic — same rules |
| **Centered low** | Text in lower 40% over hero image, dramatic negative space above |
| **Off-grid editorial offset** | Asymmetric pull, text and image deliberately misaligned |
| **Stacked center** | Label / headline / sub / CTA all centered, ultra minimalist |
| **Image-as-canvas with text in safe area** | Image IS the section, text sits in a clear zone |

### → Background Mode (assign 1 per section)

Pick 1 per section. Vary across the page — never all the same mode. Backgrounds are a primary design tool, not a risk.

| Mode | Description |
|---|---|
| **Solid surface + inline asset** | Clean, safe, product-forward |
| **Subtle texture / paper / grid** | Tactile depth without imagery |
| **Full-bleed image + tonal overlay** | Cinematic, atmospheric, text must remain readable |
| **Editorial side-image (50/50, 60/40)** | Split composition, invertible |
| **Image-as-canvas + text overlay** | Image IS the background, text in safe area |
| **Flat color block + product crop accent** | Modernist, product-focused |
| **Cinematic tonal gradient** | Palette-matched, low chroma, professional |
| **Atmospheric photo with color grade** | Single-tone graded for brand mood |
| **Duotone treated image** | Two-color photo treatment, palette-locked |
| **Soft radial vignette + product crop** | Luxury / editorial feel |
| **Micro-noise gradient over solid** | Premium tactile depth, subtle not flashy |
| **Color-blocked diptych** | Two flat fields meeting, modernist |

### → CTA Variation (assign 1 per section)

Pick the CTA style that fits each section. Not a default pill every time. Across the site, vary CTA style at least once. The primary action stays unmistakable.

| CTA Style | When |
|---|---|
| **Classic primary pill** | Hero, pricing, final CTA |
| **Outline / ghost** | Secondary actions, subtle sections |
| **Underlined inline link with arrow** | Editorial, content sections |
| **Banner-style full-width CTA** | Conversion sections, urgency |
| **Oversized headline + tiny CTA hint** | Statement sections, confidence plays |
| **CTA as caption under a strong visual** | Image-led sections, galleries |

### → Signature Components (pick exactly 4)

| Component | Character |
|---|---|
| Diagonal Staggered Square Masonry | Dynamic, gallery-forward |
| 3D Cascading Card Deck | Depth, perspective, showcase |
| Hover-Accordion Slice Layout | Interactive, content-dense |
| Pristine Gapless Bento Grid | Organized, data-rich, modern |
| Infinite Brand Marquee Strip | Social proof, trust, motion |
| Turning Polaroid Arc | Playful, portfolio, scattered |
| Vertical Rhythm Lines | Editorial, structured, swiss |
| Off-Grid Editorial Layout | Magazine, art-directed |
| Product UI Panel Stack | SaaS, product demo, feature |
| Split Testimonial Quote Wall | Social proof, long-form |
| Oversized Metrics Strip | Authority, data-driven |
| Layered Image Crop Frames | Depth, editorial, cinematic |

### → Motion-Implied Language (pick exactly 2)

These are NOT code instructions. They are visual-direction cues that the generated image should visually imply through composition, blur, positioning, and element arrangement.

| Motion Language | What it implies visually |
|---|---|
| **Scrubbing text reveal energy** | Text elements at varying opacities, some faded, some sharp |
| **Pinned narrative section energy** | Sticky sidebar feel, content scrolling against a fixed element |
| **Staggered float-up energy** | Elements at slightly different vertical positions, cascade feel |
| **Parallax image drift energy** | Background and foreground at different scales, depth layers |
| **Smooth accordion expansion energy** | Horizontal or vertical slices, one expanded, others compressed |
| **Cinematic fade-through energy** | Overlapping transparency, elements dissolving into each other |

### → Narrative / Concept Spine (pick 1)

One conceptual thread that runs through the visual language of the entire page.

| Spine | Character |
|---|---|
| **Artifact / collectible** | Proof, specimen, treasured object framing |
| **Journey / pilgrimage** | Directional flow, waypoint sections, roadmap feeling |
| **Tool / precision instrument** | Machined detail, calibrated UI, tactile controls |
| **Living system / garden** | Organic growth, branching layout, nurtured tone |
| **Stage / spotlight** | Theatrical contrast, performer + audience framing |
| **Archive / dossier** | Indexed rows, captions, understated authority |

### → Second-Read Moment (pick exactly 1)

One unobvious but legible motif, placed deliberately once across the page. It rewards closer inspection without disrupting scan order.

| Moment | Description |
|---|---|
| **Asymmetric bleed** | One element deliberately breaks the grid but respects hierarchy |
| **Oversized punctuation/numeral** | A single massive character serves structural purpose |
| **Unexpected material switch** | Paper vs gloss vs metal accent — one section shifts texture |
| **Narrow vertical side-rail** | Editorial note style, a column of secondary info |
| **Macro crop** | A detail crop carries brand color naturally, not a full image |

Avoid gimmick-for-gimmick. The moment must aid scan order or brand recall.

### ✓ Quality Gate: Art Direction

Before moving to Phase 3, confirm:
- ONE option selected from each category (no blending, no hedging)
- Picks are internally consistent (theme + typography + hero make sense together)
- At least 3 different composition anchors assigned across sections
- Background modes vary across sections (not all the same)
- CTA style varies at least once across sections
- Exactly 4 signature components selected
- Exactly 2 motion languages selected
- Exactly 1 narrative spine selected
- Exactly 1 second-read moment selected
- No left-text / right-image used as the default hero composition

---

## Phase 3: Prompt Engineering

Each section gets its own structured prompt built from the Phase 2 picks. This is where art direction becomes generation-ready instructions.

### → The Prompt Blueprint

Every section prompt follows this structure. Fill in every field — skipping fields produces generic output.

```
PROMPT BLUEPRINT — Section [N] of [Total]: [Section Name]
─────────────────────────────────────────────────────────

FRAME:
  Format: horizontal website section, 16:9 aspect ratio
  Viewport: 1440×900 desktop browser frame
  Render style: [photorealistic UI mockup / flat design comp / editorial layout]

COMPOSITION:
  Anchor: [from Phase 2 — e.g., "centered statement" or "bottom-left over background"]
  Visual weight: [where the eye lands first — e.g., "center-left, massive heading"]
  Reading flow: [how the eye moves — e.g., "heading → subtext → CTA → background visual"]

TYPOGRAPHY:
  Heading: [exact description — e.g., "massive compressed sans-serif, all-caps,
            approximately 80pt equivalent, tight letter-spacing, 2 lines max"]
  Subtext: [e.g., "16pt equivalent, regular weight, muted color, max 20 words,
            1.5 line-height"]
  Eyebrow: [e.g., "11pt monospace, uppercase, wide letter-spacing, muted opacity"]
  CTA text: [e.g., "14pt, medium weight, uppercase, inside pill button"]

PALETTE:
  Background: [exact description — e.g., "#0a0a0a deep charcoal with subtle
               radial glow from center"]
  Text primary: [e.g., "#f5f5f5 warm off-white"]
  Text secondary: [e.g., "rgba(255,255,255,0.5) muted"]
  Accent: [e.g., "#E8A04A warm amber — used on CTA only"]

BACKGROUND MODE:
  [from Phase 2 — e.g., "full-bleed cinematic photograph of server rack room,
   cool blue-teal color grade, 40% dark overlay for text readability"]

CTA:
  Style: [from Phase 2 — e.g., "solid pill, amber background, dark text"]
  Placement: [e.g., "centered below subtext, 32px gap"]
  Count: [1 — never more in a hero]

ATMOSPHERE:
  [e.g., "subtle film grain overlay at 3% opacity, soft radial ambient glow
   from top-center, no hard shadows"]

CONTENT (placeholder text):
  Eyebrow: [e.g., "INFRASTRUCTURE"]
  Heading: [e.g., "Build without limits."]
  Subtext: [e.g., "The platform for teams who ship fast."]
  CTA: [e.g., "Get Started →"]

WHAT THIS IS NOT:
  [Explicit anti-patterns — e.g., "NOT a generic dark hero with purple AI glow.
   NOT a dashboard screenshot. NOT centered text over a gradient blob."]

MOTION IMPLIED:
  [from Phase 2 — e.g., "staggered float-up energy: the heading, subtext, and
   CTA appear at slightly different vertical offsets as if mid-cascade"]
```

### → Prompt Anti-Patterns (The Banned Defaults)

These are the patterns AI image generation collapses into. Every prompt must explicitly state what the image is NOT to counteract model defaults.

| Banned Pattern | Why it's banned | What to say instead |
|---|---|---|
| **Purple/blue AI gradient hero** | Every AI-generated "tech" image defaults to this. It screams "generated." | Specify the exact palette from Phase 2. Add "no purple, no blue gradient backgrounds." |
| **Floating translucent blobs** | The AI's version of "atmosphere" — meaningless glass orbs floating in space | Specify concrete atmosphere: grain, radial glow, tonal gradient, or photographic background |
| **Generic dashboard card grid** | AI loves generating 6-8 identical cards with line charts | Specify the exact component from Phase 2's signature set. Describe its unique geometry |
| **Centered text over gradient** | Safe, generic, says nothing about the brand | Specify the exact composition anchor from Phase 2. Force an asymmetric or editorial layout |
| **"Luxury" = beige serif on cream** | The AI's entire luxury vocabulary | Specify the actual luxury signals: restrained spacing, tactile texture, considered typography weight |
| **"Creative" = messy and unreadable** | Chaos ≠ creativity | Specify structured asymmetry: deliberate off-grid placement with clear reading order |
| **Tiny illegible text** | AI generates decorative text that no one can read | Specify minimum type scale: "heading must be legible and dominant, minimum 60pt equivalent" |
| **Identical section layouts** | Every section looks the same — same split, same proportion | Use the composition anchor assignments from Phase 2 — each section has a different anchor |
| **Stock photo energy** | Generic business people shaking hands, laptop on desk | Specify the exact photographic direction: subject, color grade, mood, crop style |

⚠ **Drift Warning:** The single most impactful thing you can add to any prompt is the "WHAT THIS IS NOT" section. AI models are as responsive to negative constraints as positive ones. Telling the model "NOT a purple gradient hero, NOT floating blobs, NOT a generic dashboard" eliminates 80% of default AI output.

### → Section-Specific Prompt Guidance

Different sections have different jobs. Use these section blueprints to ensure each section serves its purpose in the conversion flow.

**Section: Hero**
```
PURPOSE: Hook — the first thing the user sees. Must create an instant
         emotional response and communicate the brand's energy in < 3 seconds.

MUST HAVE:
  - ONE dominant focal point (massive heading OR cinematic image, not both competing)
  - Brand name or product name visible
  - Single CTA (never two)
  - Breathing room — the hero must NOT feel packed

MUST NOT HAVE:
  - Trust logos / "used by" badges (save for trust bar)
  - Feature lists or bullet points
  - Multiple competing CTAs
  - Scroll indicators / bouncing chevrons
  - Version labels (v2.0, BETA) unless the brief is literally a product launch

PROMPT ADDITION:
  "This is a website hero section — the first viewport a user sees.
   It must feel premium, confident, and immediately communicate the brand.
   One focal point dominates. Generous whitespace. No clutter."
```

**Section: Trust Bar**
```
PURPOSE: Proof — immediately after the hero, establish credibility.

MUST HAVE:
  - Logo strip OR metric strip OR testimonial quote
  - Muted, understated styling (this section supports, not competes with hero)
  - Visually lighter than surrounding sections

PROMPT ADDITION:
  "This is a trust/social-proof bar. It should be visually quiet and
   supportive — a thin horizontal strip of logos or a single powerful
   metric. Not a full section, more like a divider with authority."
```

**Section: Features / Benefits**
```
PURPOSE: Interest — show what the product does and why it matters.

MUST HAVE:
  - Clear visual hierarchy (section heading → feature items)
  - Distinct feature blocks (cards, columns, or bento cells)
  - Icons or micro-illustrations per feature (not just text)

MUST NOT HAVE:
  - More than 6 feature items visible (3-4 is stronger)
  - Identical card layouts without visual variation
  - "FEATURE 01", "FEATURE 02" meta-labels

PROMPT ADDITION:
  "This is a features/benefits section. Each feature should be
   visually distinct with an icon or illustration. Cards should
   NOT all look identical. Hierarchy: section heading first, then
   feature grid below."
```

**Section: Social Proof / Testimonials**
```
PURPOSE: Desire — make the user want what others already have.

MUST HAVE:
  - Real-looking names and avatar-style photos
  - Quote text that feels authentic (not marketing copy)
  - Company/role attribution

PROMPT ADDITION:
  "This is a testimonial section. Show 1-3 quotes with avatar photos,
   names, and company roles. The quotes should feel human and authentic.
   Layout should feel editorial, not like a review aggregator."
```

**Section: CTA / Conversion**
```
PURPOSE: Action — the final push. High contrast, unmistakable action.

MUST HAVE:
  - High-contrast background (inverted from the page's dominant mode)
  - Single, dominant CTA button
  - Short, punchy heading (3-7 words)
  - Minimal supporting text

PROMPT ADDITION:
  "This is the final conversion section. It should feel like a
   decisive endpoint — high contrast, bold heading, unmistakable
   CTA button. If the page is light, this section goes dark (or
   uses the accent color as background). Maximum confidence."
```

**Section: Footer**
```
PURPOSE: Navigation + trust — the page's foundation.

MUST HAVE:
  - Logo
  - Link columns (Product, Company, Resources, Legal)
  - Muted, structured, visually quiet
  - Copyright line

PROMPT ADDITION:
  "This is a website footer. Clean, organized link columns with
   a logo. Visually understated — it anchors the page without
   competing for attention. Dark or muted background."
```

### ✓ Quality Gate: Prompts

Before moving to Phase 4, confirm:
- Every section has a complete prompt following the blueprint structure
- Every prompt includes a WHAT THIS IS NOT section
- Palette is consistent across all section prompts
- Typography direction is consistent across all section prompts
- Composition anchors vary across sections (cross-reference Phase 2 assignments)
- Background modes vary across sections
- CTA styles vary at least once
- No prompt defaults to left-text / right-image without deliberate justification
- Placeholder content uses realistic text (no "Lorem ipsum", no "Company Name")

---

## Phase 4: Generate

Execute the prompts sequentially. One image per section.

### → Generation Rules

| Rule | Why |
|---|---|
| **Announce each section** before generating | *"Section 3 of 7: Features — Pristine Gapless Bento Grid with staggered float-up energy"* |
| **Horizontal format, 16:9** | Website sections are landscape, not portrait |
| **One section per image** | The Hard Output Rule — no exceptions |
| **Include the full prompt blueprint** in the generation call | Do not summarize — the model needs every field |
| **Verify palette consistency** before each generation | The accent color from section 1 must appear in section 5 |
| **Adjust prompt if a generation drifts** | If image 3 comes back with a purple gradient, re-generate with stronger anti-pattern language |

### → Section Sequencing

For a default landing page (6 sections), generate in this order:

```
Section 1: Hero          — [Hook]
Section 2: Trust Bar     — [Proof]
Section 3: Features      — [Interest]
Section 4: How It Works  — [Education]
Section 5: Testimonials  — [Desire]
Section 6: CTA + Footer  — [Action]
```

For a full website template (8 sections):

```
Section 1: Hero          — [Hook]
Section 2: Trust Bar     — [Proof]
Section 3: Features      — [Interest]
Section 4: How It Works  — [Education]
Section 5: Showcase/Demo — [Demonstration]
Section 6: Testimonials  — [Desire]
Section 7: Pricing       — [Decision]
Section 8: CTA + Footer  — [Action]
```

Each section maps to a conversion stage. This is not arbitrary — the sequence follows AIDA (Attention → Interest → Desire → Action) with proof and education layers inserted for credibility.

### ✓ Quality Gate: Generation

After generating all images, confirm:
- Total image count matches section count (no missing sections)
- Each image is a separate horizontal image (no combined frames)
- Palette is visually consistent across all images (same accent, same base tones)
- No two adjacent sections use the same composition anchor
- At least 3 different composition anchors appear across all sections
- The hero is NOT a default left-text / right-image split (unless deliberately chosen)
- No purple/blue AI gradient backgrounds appear (unless the palette specifically calls for it)
- Typography scale is consistent (headings feel the same weight/family across sections)

---

## Phase 5: Visual Diff

Compare the generated images against the Direction Brief from Phase 1 and the Art Direction picks from Phase 2. Walk through every check. Any FAIL means re-generating that section with a corrected prompt.

### Composition Diff

| Check | PASS/FAIL |
|---|---|
| At least 3 different composition anchors appear across all sections | |
| No two adjacent sections use the same anchor | |
| The hero uses the assigned hero architecture (not a generic split) | |
| No section feels "empty" or "packed" — whitespace is intentional | |
| Each section has a clear visual hierarchy (primary → secondary → tertiary) | |
| Reading flow within each section is intuitive (eye knows where to go) | |

### Palette Diff

| Check | PASS/FAIL |
|---|---|
| All sections share the same base palette | |
| Accent color is consistent (same hue) across all sections | |
| No rogue colors appear that were not in the Direction Brief | |
| No AI-default purple/blue gradients unless explicitly chosen | |
| Dark sections use off-black (#0a0a0a), not pure black (#000000) | |
| Light sections use warm cream/off-white, not pure white (#FFFFFF) | |

### Typography Diff

| Check | PASS/FAIL |
|---|---|
| Heading typography feels consistent across all sections (same weight/family vibe) | |
| Heading scale is viewport-dominant (not "big text" — architectural) | |
| No section has headings wrapping beyond 3 lines | |
| Subtext is visually secondary (smaller, muted, constrained width) | |
| No illegible text (everything is readable at the generated resolution) | |
| Eyebrow/label text is present where assigned and visually consistent | |

### Section Purpose Diff

| Check | PASS/FAIL |
|---|---|
| Hero hooks — creates immediate emotional response | |
| Trust bar proves — quiet authority, not competing with hero | |
| Features inform — clear hierarchy, distinct items | |
| Testimonials persuade — human, authentic, editorial | |
| CTA converts — high contrast, unmistakable action | |
| Footer grounds — structured, quiet, anchoring | |
| The page flows as a persuasion sequence, not random sections | |

### AI Default Drift Diff

| Check | PASS/FAIL |
|---|---|
| No purple/blue AI gradient backgrounds (unless palette specifies) | |
| No floating translucent blobs | |
| No generic dashboard card spam | |
| No "luxury = beige serif" cliché | |
| No "creative = messy chaos" cliché | |
| No identical section layouts repeating | |
| No stock photo energy (generic business imagery) | |
| No meta-labels ("SECTION 01", "FEATURE 03") | |
| No em-dashes in copy | |
| No AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize") | |

### Implementation Readiness Diff

| Check | PASS/FAIL |
|---|---|
| Each image clearly communicates layout structure (a developer could grid this) | |
| Spacing is visible and measurable (not ambiguous overlap) | |
| Component boundaries are clear (cards have edges, sections have gaps) | |
| CTA buttons are clearly delineated (not text that might be a button) | |
| Image areas are distinguishable from background (clear boundaries) | |
| The image could be handed to the pixel-perfect skill and coded accurately | |

---

## Active Baseline Configuration

These are the global default dials. They calibrate the engine's output toward premium, conversion-aware, implementation-friendly design references.

```
DESIGN_VARIANCE:        8   (1=rigid/symmetrical, 10=artsy/asymmetric)
VISUAL_DENSITY:         4   (1=airy/gallery-like, 10=packed/intense)
ART_DIRECTION:          8   (1=safe commercial, 10=bold creative statement)
IMPLEMENTATION_CLARITY: 9   (1=loose moodboard, 10=very codeable UI reference)
IMAGE_USAGE_PRIORITY:   9   (1=mostly typographic, 10=strongly image-led)
SPACING_GENEROSITY:     8   (1=compact/tight, 10=very spacious/breathable)
LAYOUT_VARIATION:       8   (1=same anchor repeats, 10=bold composition variety)
CONVERSION_DISCIPLINE:  8   (1=pure art moodboard, 10=clear funnel + design balance)
```

These are defaults. Adapt dynamically from the brief:
- "Clean" → reduce density, increase spacing generosity
- "Crazy creative" → increase variance and art direction
- "Premium SaaS" → keep clarity high, art direction controlled
- "Editorial" → allow stronger type and more asymmetry
- The user's brief always overrides defaults

---

## The Core Principles

These are the fundamentals that separate premium design references from generic AI images. They apply regardless of which combinatorial picks you make.

> **One focal point per section.** Every section has ONE dominant visual element. Count elements competing for attention at the same scale. If the count exceeds 2, reduce until one clearly dominates.

> **Viewport-scale typography.** Headings are architectural elements, not "big text." They should feel like they command the section. Minimum 60pt equivalent on desktop. For 1-3 word headings, go massive — 100pt+. Tight tracking. Compressed line-height.

> **Extreme whitespace.** The background is not wasted space — it IS the design. Content lives in considered islands surrounded by intentional breathing room. If a section feels cramped, the spacing is wrong.

> **Tight palette, threaded consistently.** Maximum 3 hues across the entire page. Dark pages: off-black + warm white + one accent. Light pages: warm cream + near-black + one accent. The accent appears in CTAs and active states. Everything else is the base palette. More than one saturated accent across a page destroys visual cohesion.

> **Every section has a job.** Hero hooks. Trust bar proves. Features inform. Testimonials persuade. CTA converts. No section exists for decoration. Every section advances the user toward action.

> **The image is the spec.** The generated image must be clear enough that a developer can look at it and code it using the pixel-perfect skill. If the layout, spacing, typography, or component boundaries are ambiguous in the image, it has failed as a reference.
