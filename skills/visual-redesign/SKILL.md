---
name: visual-redesign
description: Surgical aesthetic upgrade pipeline for existing React codebases. Takes ugly, functional code (Bootstrap defaults, generic Tailwind, amateur CSS) and transforms it to Awwwards-tier quality WITHOUT touching or breaking the underlying JavaScript logic — states, effects, API calls, event handlers, routing, and data flow are sacred and untouchable. Audits the existing code across 7 layers (tokens, typography, spacing, color, components, atmosphere, motion), classifies every element as Sacred (JS logic — do not touch) or Slop (visual cruft — upgrade), then executes precise CSS-only surgery layer by layer. The skill that turns a developer's "make this look better" into a controlled, non-destructive visual transformation.
---

# Visual Redesign: Surgical Aesthetic Upgrade

> This skill fires when the user provides existing React/HTML/CSS code and asks to make it look better, upgrade the design, improve the aesthetics, make it premium, give it an Awwwards feel, or any variation of "this works but looks terrible." The user's code is FUNCTIONAL — it has working state, API calls, event handlers, and business logic. Your job is to upgrade the visual layer without breaking any of it. You are a surgeon, not a demolition crew. Cut precisely. Leave the patient alive.

---

## The Sacred Rule — Read First

**JavaScript logic is sacred. You do not touch it. Ever.**

This is the non-negotiable, unbreakable rule that governs every line of this skill:

```
SACRED (never modify):
  ├── useState / useReducer declarations and updates
  ├── useEffect / useCallback / useMemo bodies
  ├── API calls (fetch, axios, SWR, React Query)
  ├── Event handler LOGIC (what happens onClick, not how the button looks)
  ├── Conditional rendering logic (ternaries, && chains, if blocks)
  ├── Router/navigation logic
  ├── Form validation logic
  ├── Context providers and consumers
  ├── Custom hook implementations
  ├── Data transformations (map, filter, reduce on data)
  ├── Error handling (try/catch, error boundaries)
  ├── Prop drilling / prop interfaces
  └── Third-party library integration logic

SLOP (upgrade aggressively):
  ├── className strings and CSS classes
  ├── Inline styles (style={{...}})
  ├── CSS/SCSS files
  ├── Tailwind utility classes
  ├── Bootstrap classes
  ├── Color values (hex, rgb, hsl)
  ├── Font families and sizes
  ├── Spacing values (padding, margin, gap)
  ├── Border-radius values
  ├── Shadow values
  ├── Transition/animation declarations
  ├── z-index values
  ├── Layout structure (flex/grid configuration)
  └── Wrapper div nesting (for layout, NOT for conditional logic)
```

⚠ **Drift Warning:** The #1 way AI "breaks the app" is by restructuring JSX to look cleaner and accidentally removing a conditional wrapper, moving a key prop, changing a ref assignment, or reordering children that depend on DOM position. NEVER restructure JSX for aesthetic reasons if the existing structure works. Add CSS to the existing structure. Do not reshape the structure to fit your CSS preferences.

### → The Gray Zone

Some elements are both logic and style. Handle them with extreme care:

| Element | Sacred or Slop? | Rule |
|---|---|---|
| `className={isActive ? 'active' : ''}` | **Both** — logic is sacred, class names are slop | Keep the ternary. Change only the class name values: `className={isActive ? 'nav-link--active' : 'nav-link'}` |
| `style={{ display: isOpen ? 'block' : 'none' }}` | **Sacred** — this is conditional visibility logic | Do NOT replace with CSS classes. The inline style is driven by state. Leave it. Add your styles alongside it |
| `{items.map((item) => <Card key={item.id} ... />)}` | **Sacred** — the map, key, and data flow are logic | Style the Card component's internals. Do not change the map structure or key assignment |
| `ref={containerRef}` | **Sacred** — ref assignments drive JS behavior | Never remove, move, or rename refs |
| `aria-*` attributes | **Sacred** — accessibility attributes are functional | Never remove. You may add missing ones |
| `data-*` attributes | **Probably sacred** — often used by JS/tests | Never remove unless confirmed unused |
| `id` attributes | **Probably sacred** — may be used by JS selectors | Never change unless confirmed unused |
| `onClick={() => setOpen(!open)}` | **Sacred** — the handler is logic | Style the element. Do not touch the handler |
| `<div>` that wraps conditional content | **Sacred** — the div may exist for rendering reasons | Do not remove "unnecessary" wrapper divs unless you've confirmed they're purely presentational |

**The Golden Rule of the Gray Zone:** If you're unsure whether something is logic or style, leave it alone and add your styles alongside it. A slightly less elegant CSS solution that doesn't break the app is infinitely better than an elegant refactor that introduces bugs.

---

## The Pipeline

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   CODE IN ──→ Phase 1: Audit                                            │
│                 (read every file, classify Sacred vs Slop,              │
│                  identify the aesthetic crimes)                          │
│                                                                          │
│             ──→ Phase 2: Extraction                                     │
│                  (extract current design decisions across               │
│                   7 layers, build the Slop Sheet)                       │
│                                                                          │
│             ──→ Phase 3: Prescription                                   │
│                  (define target aesthetic, map every                    │
│                   slop item to its gold replacement)                    │
│                                                                          │
│             ──→ Phase 4: Surgery                                        │
│                  (execute replacements layer by layer:                  │
│                   tokens → typography → color → spacing →              │
│                   components → atmosphere → motion)                     │
│                                                                          │
│             ──→ Phase 5: Post-Op                                        │
│                  (verify nothing broke, visual diff,                    │
│                   responsive check, motion check)                       │
│                                                                          │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.     │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Audit

Before changing a single character, read the entire codebase. Understand what exists. Classify everything.

### → Read every file and fill the Audit Table

| File | Type | Sacred elements | Slop elements | Risk level |
|---|---|---|---|---|
| `App.tsx` | Root component | Router setup, providers, global state | Root className, global wrapper styles | Low |
| `Header.tsx` | UI component | Nav state (mobile menu toggle), auth state | All className strings, inline styles, layout | Medium |
| `Hero.tsx` | UI component | CTA click handlers, any analytics calls | Typography, colors, spacing, images, layout | Low |
| `Features.tsx` | UI component | Data arrays, map iterations | Card styles, grid layout, icons | Low |
| `Dashboard.tsx` | Complex component | All state, effects, API calls, data transforms | Table styles, card styles, chart wrapper styles | **High** |
| `Form.tsx` | Complex component | Validation, submission, error handling, refs | Input styles, button styles, layout | **High** |
| `index.css` | Stylesheet | None (but may contain critical resets) | Everything | Low |

**Risk levels:**
- **Low** — Mostly presentational. Safe to restyle aggressively.
- **Medium** — Mix of logic and presentation. Restyle carefully, test after.
- **High** — Heavy logic intertwined with presentation. Touch only CSS classes and styles. Test every change.

### → Identify the Aesthetic Crimes

Walk through the UI and catalog every visual problem. Be specific — "looks bad" is not a diagnosis.

| Crime | Where | Severity | Example |
|---|---|---|---|
| **Generic font stack** | Global/body | Critical | `font-family: Arial, sans-serif` or browser default |
| **Default shadows** | Cards, buttons | Major | `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` — the Bootstrap default |
| **Pure black text on pure white** | Everywhere | Major | `color: #000; background: #fff` — zero warmth, harsh contrast |
| **Inconsistent spacing** | Between sections | Major | `margin-top: 20px` on one section, `margin-top: 50px` on the next |
| **Bootstrap blue accent** | Buttons, links | Critical | `#0d6efd` — the single most recognizable "I didn't design this" signal |
| **Generic border-radius** | Cards, buttons | Moderate | `border-radius: 4px` everywhere — no radius language |
| **No entry animations** | Page load | Moderate | Elements just appear — static, lifeless mount |
| **No hover states** | Buttons, cards, links | Major | Interactive elements give zero feedback |
| **Cramped padding** | Cards, sections | Major | `padding: 16px` on a card that needs `32px` to breathe |
| **No atmosphere** | Backgrounds | Moderate | Flat `background: white` or `background: #f5f5f5` — no depth |
| **Mixed radius languages** | Across components | Moderate | Buttons are `rounded-full` but cards are `rounded-sm` with no logic |
| **Body font as heading font** | H1-H3 | Critical | Inter/Roboto/Arial at `font-size: 24px` pretending to be a display heading |
| **No visual hierarchy** | Content sections | Major | Everything the same size, weight, and color |
| **No whitespace system** | Layout | Major | Random `mt-4`, `mt-6`, `mt-3` with no pattern |

### → Output the Audit Summary

State in 3-5 lines what you found:

> *"Audit Summary: React SPA with 8 components. Router, auth state, and 3 API calls are sacred — all in Dashboard.tsx and Header.tsx. The visual layer is Bootstrap 5 defaults across the board: #0d6efd blue accent, default shadows, Arial font stack, 4px radius on everything, no hover states, no entry animations, cramped 16px padding on cards, pure black-on-white text. No design system — spacing and colors are ad-hoc per component. Estimated crimes: 14 critical, 23 major. Risk: Medium overall, High on Dashboard.tsx (complex state + table rendering)."*

### ✓ Quality Gate: Audit

Before moving to Phase 2, confirm:
- Every file has been read and classified in the Audit Table
- Sacred elements are identified in every file
- Risk levels are assigned per file
- Aesthetic crimes are cataloged with specific examples
- Audit Summary is written
- You understand which files are High risk (heavy JS logic)
- You have NOT modified any code yet

---

## Phase 2: Extraction

Extract the current design decisions across 7 layers. This creates the "before" snapshot — the Slop Sheet.

### → Layer 1: Tokens (Colors, Fonts, Spacing Scale)

| Token | Current value (Slop) | Source |
|---|---|---|
| Primary background | `#ffffff` or `white` | index.css / inline |
| Secondary background | `#f5f5f5` or `#f8f9fa` | Bootstrap gray-100 |
| Primary text | `#000000` or `#212529` | Bootstrap default |
| Secondary text | `#6c757d` | Bootstrap gray-600 |
| Accent/primary action | `#0d6efd` | Bootstrap primary |
| Accent hover | `#0b5ed7` | Bootstrap primary hover |
| Danger/error | `#dc3545` | Bootstrap danger |
| Success | `#198754` | Bootstrap success |
| Border color | `#dee2e6` | Bootstrap gray-300 |
| Font display | `system-ui` or `Arial` | Browser default |
| Font body | Same as display | No differentiation |
| Font mono | None | Missing |
| Spacing base | No system (ad-hoc) | Random px values |
| Radius default | `4px` or `0.375rem` | Bootstrap default |

### → Layer 2: Typography

| Element | Current spec (Slop) |
|---|---|
| H1 | `font-size: 2rem; font-weight: bold; font-family: inherit` |
| H2 | `font-size: 1.5rem; font-weight: bold` |
| H3 | `font-size: 1.25rem; font-weight: bold` |
| Body | `font-size: 1rem; line-height: 1.5` |
| Small/caption | `font-size: 0.875rem` |
| Button text | `font-size: 1rem; font-weight: 400` |
| Letter-spacing | None set (browser default: normal) |
| Line-height on headings | 1.2 (Bootstrap default — too loose for display) |
| Text wrapping | No `text-wrap: balance` on headings |
| Max-width on body text | None (text runs edge to edge) |

### → Layer 3: Spacing

| Measurement | Current value (Slop) |
|---|---|
| Section padding | Inconsistent: `py-3`, `py-4`, `py-5`, random px values |
| Card padding | `p-3` (12px) or `p-4` (16px) — cramped |
| Grid gap | `gap-3` (12px) or `gap-4` (16px) — tight |
| Heading → body gap | `mb-2` or `mb-3` — too tight |
| Body → CTA gap | `mt-3` — too tight |
| Nav height | `py-2` (short and cramped) or default Bootstrap nav height |
| Component spacing | No consistent system — every component different |

### → Layer 4: Color Usage

| Usage | Current value (Slop) | Problem |
|---|---|---|
| Background | Pure `#fff` or `#f8f9fa` | Flat, cold, no warmth |
| Text | Pure `#000` or `#212529` | Harsh, no refinement |
| Accent | Bootstrap `#0d6efd` | Screams "undesigned" |
| Borders | `#dee2e6` | Generic gray |
| Shadows | `rgba(0,0,0,0.1)` | Default, undifferentiated |
| Hover states | Slightly darker shade | No personality |
| Active states | Even darker shade | Mechanical, not physical |
| Error | Bootstrap `#dc3545` | Generic red |

### → Layer 5: Components

| Component | Current state (Slop) |
|---|---|
| Buttons | Bootstrap `.btn.btn-primary` — `#0d6efd`, `4px` radius, generic padding, no hover physics |
| Cards | `.card` — `1px solid #dee2e6`, `4px` radius, default shadow or no shadow, cramped padding |
| Inputs | Bootstrap form controls — `#dee2e6` border, no focus glow, no float labels |
| Navigation | Bootstrap navbar — busy, cramped, default styling |
| Tables | Bootstrap `.table` — zebra stripes, cramped rows, no refinement |
| Modals | Bootstrap modal — generic overlay, no entry animation |
| Badges/pills | Bootstrap `.badge` — small, cramped, primary blue |
| Dropdowns | Bootstrap dropdown — generic shadow, no animation |

### → Layer 6: Atmosphere

| Property | Current state (Slop) |
|---|---|
| Background texture | None — flat solid color |
| Ambient glow/gradient | None — completely flat |
| Grain/noise | None |
| Frosted glass | None |
| Depth system | Default Bootstrap shadow or none |
| Visual warmth | Zero — cold and clinical |

### → Layer 7: Motion

| Property | Current state (Slop) |
|---|---|
| Page entry | None — static mount, everything appears instantly |
| Scroll reveals | None — everything visible immediately |
| Hover transitions | `transition: all 0.15s ease-in-out` (Bootstrap default) or none |
| Page transitions | None — instant swap |
| Micro-interactions | None |
| Loading states | Spinner or "Loading..." text |
| Easing curves | `ease-in-out` CSS keyword or none |

### ✓ Quality Gate: Extraction

Before moving to Phase 3, confirm:
- All 7 extraction layers are filled in with actual values from the codebase
- Values are specific (exact hex codes, exact rem/px values), not vague
- You can see the gap between current state and target quality
- You have NOT modified any code yet

---

## Phase 3: Prescription

For every slop item extracted in Phase 2, prescribe the gold replacement. This is the transformation map — the surgical plan.

### → Token Prescription

```css
/* PRESCRIPTION: Design tokens — Slop → Gold
   WHY: Tokens are the foundation. Changing these first
   means every component that references them upgrades
   automatically. This is the highest-leverage change. */

:root {
  /* ── Colors ────────────────────────────────────── */

  /* Background: #ffffff → warm off-white
     WHY: Pure white is harsh and clinical. Off-white
     with a warm undertone feels premium and intentional.
     The difference is subtle but the eye registers it
     as "designed" vs "default." */
  --color-bg: #FAFAF9;        /* was: #ffffff */
  --color-surface: #FFFFFF;    /* was: #f8f9fa — cards sit ON the bg */
  --color-surface-2: #F5F4F2;  /* was: none — for alternating sections */

  /* Text: #000000 → warm near-black
     WHY: Pure black on warm off-white creates a jarring
     temperature clash. Near-black (#1a1a1a) matches the
     warmth of the background and reduces eye strain. */
  --color-text: #1A1A1A;       /* was: #000000 or #212529 */
  --color-text-2: #6B7280;     /* was: #6c757d — muted, for secondary */
  --color-text-3: #9CA3AF;     /* was: none — for captions, placeholders */

  /* Accent: #0d6efd → considered, non-Bootstrap hue
     WHY: Bootstrap blue is the single loudest "I didn't
     design this" signal on the web. ANY other considered
     hue immediately elevates the design. Pick based on
     brand context from the user's brief. */
  --color-accent: #____;       /* MUST be chosen based on brand context */
  --color-accent-hover: #____; /* 10-15% darker or more saturated */

  /* Borders and shadows: warm, not gray
     WHY: Cool gray borders (#dee2e6) clash with warm
     backgrounds. Use warm gray or very low-opacity black. */
  --color-border: rgba(0, 0, 0, 0.08);  /* was: #dee2e6 */
  --color-shadow: rgba(0, 0, 0, 0.04);  /* was: rgba(0,0,0,0.1) */

  /* ── Typography ────────────────────────────────── */

  /* Display font: Arial → a real display font
     WHY: Arial/system-ui as a heading font is the
     typographic equivalent of serving fine dining
     on paper plates. Display fonts have optical
     refinements for large sizes that body fonts lack. */
  --font-display: 'Outfit', system-ui, sans-serif;  /* was: Arial/system-ui */
  --font-body: 'Inter', system-ui, sans-serif;       /* was: same as display */
  --font-mono: 'JetBrains Mono', monospace;           /* was: none */

  /* ── Spacing ───────────────────────────────────── */

  /* Section spacing: random values → consistent scale
     WHY: A spacing system creates rhythm. Random spacing
     creates visual noise — the eye detects inconsistency
     even when the brain can't articulate it. */
  --space-section: clamp(5rem, 10vw, 8rem); /* was: random py values */
  --space-element: 1.5rem;                  /* was: 0.75rem–1rem */
  --space-component: 2rem;                  /* was: 1rem–1.5rem */

  /* ── Radius ────────────────────────────────────── */

  /* Radius: 4px everywhere → considered radius language
     WHY: A design system commits to a radius language.
     Pick ONE and apply consistently. */
  --radius-sm: 8px;          /* was: 4px (Bootstrap) — inputs, badges */
  --radius-md: 12px;         /* was: 4px — cards, containers */
  --radius-lg: 16px;         /* was: 4px — modals, large cards */
  --radius-full: 9999px;     /* was: 50% — pills, avatars */

  /* ── Easing ────────────────────────────────────── */

  /* Easing: ease-in-out → custom curves
     WHY: CSS keyword easings are the typographic
     equivalent of Comic Sans. Zero character,
     zero intentionality. Custom curves give
     every animation a deliberate feel. */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### → Typography Prescription

```css
/* PRESCRIPTION: Typography scale — Slop → Gold
   WHY: The heading is the first thing the eye hits.
   A display font with tight tracking and compressed
   line-height immediately signals "designed." The body
   font stays readable with comfortable line-height. */

/* Import the fonts — add to the top of your CSS or <head> */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

h1, h2, h3, h4 {
  font-family: var(--font-display);
  letter-spacing: -0.03em;   /* was: normal (too loose at display size) */
  line-height: 1.1;          /* was: 1.2 (Bootstrap) — tighten */
  text-wrap: balance;        /* prevents ugly orphan lines */
  color: var(--color-text);
}

h1 {
  font-size: clamp(2.25rem, 5vw, 3.75rem);  /* was: 2rem fixed */
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.75rem); /* was: 1.5rem fixed */
  font-weight: 600;
}

h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);    /* was: 1.25rem fixed */
  font-weight: 600;
}

body, p, span, li {
  font-family: var(--font-body);
  font-size: clamp(0.9375rem, 1.1vw, 1.0625rem); /* was: 1rem fixed */
  line-height: 1.65;     /* was: 1.5 — slightly more generous */
  color: var(--color-text);
}

/* Body text max-width — prevent wall-to-wall text */
p {
  max-width: 65ch;  /* was: none — text ran edge to edge */
}

/* Muted secondary text */
.text-muted, .text-secondary {
  color: var(--color-text-2) !important; /* override Bootstrap's gray */
}

/* Eyebrow / label style — add where appropriate */
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-3);
}
```

### → Component Prescription

```css
/* PRESCRIPTION: Button — Bootstrap → Premium
   WHY: The button is the most interactive element on the page.
   Its hover feel communicates the entire quality level of the site.
   A snappy cubic-bezier with a physical lift-and-shadow creates
   a tactile impression that Bootstrap's default cannot achieve. */

/* Strip Bootstrap button defaults */
.btn {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.75rem 1.75rem;             /* was: py-2 px-3 — cramped */
  border-radius: var(--radius-full);     /* was: 4px — now pill */
  border: none;
  cursor: pointer;
  transition:
    transform 0.4s var(--ease-snap),
    box-shadow 0.4s var(--ease-snap),
    background-color 0.3s var(--ease-out);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--color-shadow);
}

.btn:active {
  transform: translateY(0) scale(0.98);
  transition-duration: 0.1s;
}

/* Primary button */
.btn-primary {
  background: var(--color-accent);
  color: #ffffff;
  border: none;
  box-shadow: 0 1px 3px var(--color-shadow);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
}

/* Ghost / outline button */
.btn-outline-primary,
.btn-secondary,
.btn-outline-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-outline-primary:hover,
.btn-outline-secondary:hover {
  border-color: var(--color-text);
  background: rgba(0, 0, 0, 0.02);
}

/* PRESCRIPTION: Card — Bootstrap → Premium */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);        /* was: 4px */
  padding: var(--space-component);         /* was: 1rem — cramped */
  box-shadow: none;                        /* was: default Bootstrap shadow */
  transition:
    transform 0.4s var(--ease-snap),
    box-shadow 0.4s var(--ease-snap),
    border-color 0.3s var(--ease-snap);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.12);
}

/* Reset Bootstrap card internals */
.card-body {
  padding: 0;  /* parent .card already has padding */
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: var(--space-element);
}

/* PRESCRIPTION: Input — Bootstrap → Premium */
.form-control,
input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  padding: 0.75rem 1rem;                  /* was: py-1.5 px-3 — cramped */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  transition:
    border-color 0.3s var(--ease-snap),
    box-shadow 0.3s var(--ease-snap);
}

.form-control:focus,
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.15);
}

/* PRESCRIPTION: Navigation — Bootstrap → Premium */
.navbar, nav {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background: rgba(250, 250, 249, 0.85);  /* semi-transparent for frost */
  border-bottom: 1px solid var(--color-border);
  padding: 0 clamp(1.5rem, 5vw, 5rem);
  height: 64px;
  display: flex;
  align-items: center;
}

.nav-link, .navbar-nav .nav-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-2);
  transition: color 0.3s var(--ease-snap);
  position: relative;
}

.nav-link:hover {
  color: var(--color-text);
}

/* Sliding underline on nav links */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--color-text);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s var(--ease-snap);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* PRESCRIPTION: Table — Bootstrap → Premium */
.table, table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.table th, table th {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-3);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}

.table td, table td {
  font-size: 0.9375rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  color: var(--color-text);
}

.table tbody tr:hover, table tbody tr:hover {
  background: rgba(0, 0, 0, 0.015);
}

/* Kill Bootstrap zebra striping — it looks cheap */
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: transparent;
}
```

### → Atmosphere Prescription

```css
/* PRESCRIPTION: Atmosphere — Flat → Alive
   WHY: Flat backgrounds feel like nothing. A subtle
   radial gradient, grain texture, or warm tint gives
   the background depth without adding visual elements. */

/* Subtle warm radial on the body */
body {
  background:
    radial-gradient(ellipse at 30% 0%, rgba(250, 235, 215, 0.2) 0%, transparent 50%),
    var(--color-bg);
}

/* Noise grain overlay — felt, not seen */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* Section dividers — subtle border instead of hard lines */
section + section {
  border-top: 1px solid var(--color-border);
}

/* Alternating section backgrounds for rhythm */
section:nth-child(even) {
  background-color: var(--color-surface-2);
}
```

### → Motion Prescription

```css
/* PRESCRIPTION: Motion — Static → Alive
   WHY: Every element that appears without animation
   feels like the page is broken. A staggered fade-up
   with deblur signals that the page loaded intentionally. */

/* Entry animation keyframe */
@keyframes enter-up {
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

/* Apply to major elements — use inline style for stagger:
   <h1 class="enter-up" style="--stagger: 0ms">
   <p class="enter-up" style="--stagger: 120ms">
   <button class="enter-up" style="--stagger: 240ms"> */
.enter-up {
  animation: enter-up 0.7s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

/* Scroll reveal — elements below the fold */
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s var(--ease-out),
    transform 0.8s var(--ease-out);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Universal interactive transition — replaces Bootstrap's
   transition: all 0.15s ease-in-out on EVERY interactive element */
a, button, [role="button"],
input, select, textarea,
.card, .nav-link, .badge {
  transition: all 0.3s var(--ease-snap);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .enter-up {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }

  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### → Scroll Reveal JavaScript (Non-Destructive)

```javascript
/* PRESCRIPTION: Scroll reveal — add as a separate script
   WHY: This script observes [data-reveal] elements and
   adds .is-visible when they enter the viewport. It does
   NOT modify any existing JS — it's a new, separate file
   that runs independently.

   Add to the end of the page or import in main entry. */

class ScrollReveal {
  constructor() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      this.observer.observe(el);
    });
  }
}

// Initialize after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ScrollReveal());
} else {
  new ScrollReveal();
}
```

### ✓ Quality Gate: Prescription

Before moving to Phase 4, confirm:
- Every slop item from Phase 2 has a gold replacement prescribed
- Token prescriptions are internally consistent (warm bg + warm text, not mixed temperatures)
- The accent color is chosen based on the user's brand context (not another generic blue)
- Typography prescription uses a display font for headings and a body font for body
- Component prescriptions maintain the same DOM structure (class changes only)
- Atmosphere additions are subtle (opacity < 0.05 for grain, < 0.3 for gradients)
- Motion additions are non-destructive (new CSS classes and a new script, no existing JS modified)
- The accent color `#____` placeholder is filled with an actual hex value

---

## Phase 4: Surgery

Execute the prescriptions. This is the operating room. Follow the exact order below — each layer builds on the previous one.

### → Surgical Order

```
Layer 1: Tokens     (CSS custom properties — the foundation)
Layer 2: Typography (font imports + heading/body styles)
Layer 3: Color      (replace all Bootstrap/generic color values)
Layer 4: Spacing    (padding, margins, gaps — breathing room)
Layer 5: Components (buttons, cards, inputs, nav, tables)
Layer 6: Atmosphere (grain, glow, section alternation)
Layer 7: Motion     (entry animations, hover states, scroll reveals)
```

### → Surgical Rules

| Rule | Why |
|---|---|
| **One layer at a time** | If you change tokens, typography, AND components simultaneously and something breaks, you cannot isolate the cause |
| **Test after each layer** | Run the app. Does it still work? Do all routes load? Do forms submit? Do API calls return? If yes, proceed to the next layer |
| **CSS overrides, not replacements** | Add a new stylesheet (e.g., `gold.css`) that overrides the existing styles. Do NOT delete the existing CSS files until the override is confirmed working |
| **className changes are surgical** | If replacing Bootstrap classes with custom ones, search the entire codebase for each class before removing it. A class used in JS logic (`document.querySelector('.btn-primary')`) is sacred |
| **Never rewrite JSX structure** | You may add/change `className` props and `style` props. You may NOT reorder children, remove wrapper divs, change component hierarchy, or modify props that aren't purely visual |
| **New files > modified files** | Prefer creating `gold.css` and importing it AFTER existing stylesheets (for override priority) over editing the existing stylesheets directly. This makes rollback trivial |

### → The Override Strategy

The safest approach is a single new stylesheet loaded AFTER all existing stylesheets:

```css
/* gold.css — loaded LAST in the cascade
   WHY: By loading after Bootstrap/existing CSS, our rules
   override the defaults without deleting any existing code.
   If something breaks, the user can remove this one import
   to revert entirely. This is the safest surgery method.

   Import in main entry file:
   import './gold.css'  // AFTER all other CSS imports */
```

This file contains ALL prescriptions from Phase 3 — tokens, typography, components, atmosphere, motion — in one file that can be added or removed as a single unit.

⚠ **Drift Warning:** The temptation is to "clean up" the existing CSS by deleting Bootstrap imports or removing old stylesheets. Do NOT do this until the user has confirmed the gold override is working. The old CSS is a safety net. Remove it only after the patient is confirmed stable.

### → High-Risk File Surgery (Dashboard, Forms, Complex Components)

For files marked **High** risk in the Audit Table:

1. **Read the entire file first** — understand every state variable, effect, and handler
2. **Map every className and style prop** — note which ones are referenced in JS logic
3. **Change ONLY className string values** — the attribute stays, only the value changes
4. **Never touch inline styles that reference state** — `style={{ display: isOpen ? 'block' : 'none' }}` is sacred
5. **Test immediately after changes** — run the app, trigger every state change, submit every form, verify every API call

```tsx
/* EXAMPLE: Safe className surgery on a complex component

   BEFORE (Bootstrap):
   <div className={`card ${isSelected ? 'border-primary' : ''}`}>

   AFTER (Gold):
   <div className={`card ${isSelected ? 'card--selected' : ''}`}>

   The ternary logic is IDENTICAL. Only the class name value changed.
   Then in gold.css:
   .card--selected {
     border-color: var(--color-accent);
     box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.2);
   }
*/
```

### → Adding data-reveal Attributes (Non-Destructive)

To add scroll reveal animations, add `data-reveal` attributes to existing JSX elements. This is safe because `data-*` attributes do not affect React's rendering logic:

```tsx
/* BEFORE: */
<section className="features">
  <h2>Features</h2>
  {features.map(f => <FeatureCard key={f.id} {...f} />)}
</section>

/* AFTER — added data-reveal, nothing else changed: */
<section className="features" data-reveal>
  <h2>Features</h2>
  {features.map(f => <FeatureCard key={f.id} {...f} />)}
</section>

/* The data-reveal attribute is inert until the ScrollReveal
   script observes it. It does not interfere with React's
   reconciliation, event handling, or state management. */
```

### → Adding Entry Animation Classes (Non-Destructive)

```tsx
/* BEFORE: */
<h1 className="hero-heading">Build faster.</h1>
<p className="hero-subtext">The platform for modern teams.</p>
<button className="btn btn-primary" onClick={handleSignup}>Get Started</button>

/* AFTER — added enter-up class and stagger variable: */
<h1 className="hero-heading enter-up" style={{ '--stagger': '0ms' } as React.CSSProperties}>Build faster.</h1>
<p className="hero-subtext enter-up" style={{ '--stagger': '120ms' } as React.CSSProperties}>The platform for modern teams.</p>
<button className="btn btn-primary enter-up" style={{ '--stagger': '240ms' } as React.CSSProperties} onClick={handleSignup}>Get Started</button>

/* onClick handler is UNTOUCHED. Only className and style were added.
   The style prop uses a CSS custom property for stagger delay.
   In TypeScript, cast as React.CSSProperties to avoid type errors. */
```

### ✓ Quality Gate: Surgery

After all 7 layers are applied, confirm:
- The app runs without errors (console is clean)
- All routes load correctly
- All forms submit and validate correctly
- All API calls return data and render correctly
- All state changes work (toggles, modals, dropdowns, selections)
- All event handlers fire correctly (clicks, submits, keypresses)
- No ref errors or "cannot read property of undefined" errors
- The new CSS imports load AFTER existing stylesheets
- The gold.css file can be removed to fully revert

---

## Phase 5: Post-Op

Verify the surgery was successful. Walk through every check. Any FAIL requires diagnosis and correction.

### Functionality Check (Sacred Integrity)

| Check | PASS/FAIL |
|---|---|
| All pages/routes load without error | |
| All forms submit correctly | |
| All API calls return and render data | |
| All state toggles work (open/close, show/hide, select/deselect) | |
| All event handlers fire (onClick, onSubmit, onChange, onKeyDown) | |
| Authentication flow works (login, logout, protected routes) | |
| No console errors | |
| No TypeScript errors (if TS project) | |
| No broken refs or undefined property errors | |
| All conditional rendering works (loading states, error states, empty states) | |

⚠ **If ANY functionality check fails, REVERT the last surgery layer and diagnose. Do NOT proceed to visual checks until all functionality passes.**

### Visual Upgrade Check

| Check | PASS/FAIL |
|---|---|
| No Bootstrap blue (#0d6efd) visible anywhere | |
| No pure black (#000) text on pure white (#fff) backgrounds | |
| Heading font is a display font (not Arial/system-ui) | |
| Heading letter-spacing is negative (tight, not loose) | |
| Heading line-height is compressed (< 1.15) | |
| Body text has comfortable max-width (not edge-to-edge) | |
| Cards have generous padding (not cramped 16px) | |
| Buttons are pill-shaped or use the prescribed radius | |
| Buttons have hover lift + shadow expansion | |
| Buttons have active press feedback | |
| Nav has frosted glass treatment | |
| Color palette is warm and consistent (no cold grays mixed with warm tones) | |
| Shadows are subtle and warm (not default Bootstrap) | |
| Border-radius is consistent across same component types | |

### Atmosphere Check

| Check | PASS/FAIL |
|---|---|
| Background has subtle warmth (not flat white/gray) | |
| Grain overlay is present and subtle (felt, not seen) | |
| Section alternation creates rhythm (not all same background) | |
| No flat, dead-feeling sections remain | |

### Motion Check

| Check | PASS/FAIL |
|---|---|
| Hero elements animate in on page load (staggered fade-up-deblur) | |
| Scroll reveals trigger on below-fold sections | |
| All buttons have hover transitions (not instant state change) | |
| All cards have hover lift | |
| Nav links have animated underlines | |
| Input focus has border glow transition | |
| No animation uses CSS keyword easing (ease, ease-in, ease-out, ease-in-out) | |
| `prefers-reduced-motion` is respected (no motion on reduce) | |

### Responsive Check

| Check | PASS/FAIL |
|---|---|
| Layout works at 1440px (desktop) | |
| Layout works at 768px (tablet) | |
| Layout works at 375px (mobile) | |
| No horizontal overflow at any viewport | |
| Touch targets minimum 44px on mobile | |
| Heading doesn't wrap beyond 3 lines at any viewport | |
| Cards stack properly on mobile (single column) | |

### Rollback Check

| Check | PASS/FAIL |
|---|---|
| Removing gold.css import reverts ALL visual changes cleanly | |
| No existing CSS files were deleted (they're intact as fallback) | |
| No JSX structural changes were made (only className and data-* additions) | |
| The user can accept or reject the entire upgrade as one unit | |

---

## The Slop Catalog — Common Patterns and Their Cures

Quick-reference for the most common aesthetic crimes. Look up the pattern, apply the cure.

| Slop Pattern | The Crime | The Cure |
|---|---|---|
| `font-family: Arial, Helvetica, sans-serif` | Body font as display font | Import Outfit/Satoshi/Cabinet Grotesk for headings |
| `color: #000; background: #fff` | Pure black-on-white | `color: #1a1a1a; background: #FAFAF9` |
| `background: #0d6efd` | Bootstrap primary blue | Choose a brand-appropriate accent color |
| `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` | Generic default shadow | `box-shadow: 0 1px 3px rgba(0,0,0,0.04)` at rest, expand on hover |
| `border-radius: 4px` | Bootstrap default radius | Commit to a radius language: 8/12/16/9999 |
| `border: 1px solid #dee2e6` | Cool gray border | `border: 1px solid rgba(0,0,0,0.08)` — warm, subtle |
| `transition: all 0.15s ease-in-out` | Bootstrap default transition | `transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1)` |
| `padding: 1rem` on a card | Cramped card padding | `padding: 2rem` minimum — cards need to breathe |
| `margin-bottom: 0.5rem` heading→body | Cramped heading gap | `margin-bottom: 1.5rem` — let the heading land |
| `gap: 1rem` in a card grid | Tight grid gap | `gap: 1.5rem` minimum — cards need separation |
| No `:hover` on buttons | Dead, unresponsive buttons | `translateY(-2px) + shadow expansion + custom easing` |
| No `:hover` on cards | Static, lifeless cards | `translateY(-4px) + shadow expansion + border glow` |
| No entry animation | Instant static mount | Staggered fade-up-deblur on above-fold elements |
| `h1 { font-size: 2rem }` | Undersized heading | `font-size: clamp(2.25rem, 5vw, 3.75rem)` |
| `line-height: 1.2` on headings | Too loose for display | `line-height: 1.05` — tight, architectural |
| No letter-spacing on headings | Loose, amateur tracking | `letter-spacing: -0.03em` — tighten |
| `py-3` section padding | Cramped sections | `py-20 md:py-32` — sections are chapters, not paragraphs |
| Zebra-striped tables | 2010 Bootstrap energy | Kill stripes, add subtle hover row highlight |
| `.badge { font-size: 0.75em }` | Tiny, cramped badges | `padding: 0.25rem 0.75rem; font-size: 0.75rem; border-radius: 9999px` |
| No `::placeholder` styling on inputs | Default gray placeholder | `color: var(--color-text-3); opacity: 0.7` |

---

## Edge Cases

### When the code uses CSS-in-JS (styled-components, Emotion)

1. Apply token prescriptions as a CSS custom property layer (`:root` variables)
2. Override styled-component styles via a global `createGlobalStyle` that references the tokens
3. For component-level overrides, add a `gold-overrides.ts` file with styled-component overrides
4. Never modify the existing styled-component definitions inline — create override wrappers

### When the code uses Tailwind CSS

1. Override Tailwind's `theme` in `tailwind.config.js` with the gold tokens (colors, fonts, radii, shadows)
2. Use `@layer utilities` for atmosphere and motion additions
3. Replace Tailwind color classes systematically: `text-gray-900` → `text-[#1a1a1a]` or define custom colors in config
4. Replace `shadow-sm` / `shadow-md` → custom shadow values in config
5. Replace `rounded` / `rounded-md` → custom radii in config
6. This is the safest approach for Tailwind because it changes the design system at the config level, not in every component file

### When the code uses Material UI / Chakra / Ant Design

1. Override the theme provider configuration — these libraries are designed for theme customization
2. Focus on the theme object: colors, typography, spacing, radii, shadows
3. Add component-level `sx` overrides or `styled()` wrappers for atmosphere and motion
4. Never fight the component library's structure — work within its theming system

### When the code is vanilla HTML/CSS (no framework)

1. Add `gold.css` as the LAST stylesheet in the `<head>`
2. Use CSS specificity to override existing styles without editing them
3. If existing styles use `!important`, your overrides may need `!important` too (unfortunate but necessary)
4. Add the ScrollReveal script as a `<script>` before `</body>`

### When the user says "just make the hero look good"

Do NOT upgrade the entire site. Apply the pipeline to the hero section only:
1. Audit the hero component
2. Extract its current design decisions
3. Prescribe the gold replacements for that section
4. Execute surgery on that section's CSS
5. Verify nothing else broke

Respect the user's scope. Upgrading more than asked wastes time and introduces risk.

---

## The Core Principles

> **The patient must survive.** A beautiful app that no longer functions is worse than an ugly app that works. Test after every surgery layer. Functionality always trumps aesthetics.

> **CSS overrides, never JS rewrites.** Your tools are className changes, new CSS files, and data-attributes. You do not rewrite component logic, refactor state management, or restructure JSX hierarchies. If a visual upgrade requires changing JS logic, find a CSS-only alternative.

> **The gold.css is a single unit.** One file, loaded last, that contains the entire visual upgrade. The user can add it (upgrade) or remove it (revert) with a single import. This is the surgical philosophy: clean entry, clean exit.

> **Warmth over neutrality.** Every premium design uses warm tones — off-white backgrounds, warm near-black text, warm gray borders. Cold neutrals (pure gray, pure white, pure black) feel clinical and undesigned. The fastest single upgrade is replacing the color temperature.

> **Spacing is the secret.** The single change that has the most dramatic impact is increasing spacing — section padding, card padding, heading gaps, grid gaps. Cramped spacing is the hallmark of amateur design. Generous spacing is the hallmark of premium design. When in doubt, add more space.

> **Display fonts separate amateurs from professionals.** Swapping the heading font from Arial/system-ui to a proper display font (Outfit, Satoshi, Cabinet Grotesk, Clash Display) is the highest-impact single change. Everything else builds on this foundation.
