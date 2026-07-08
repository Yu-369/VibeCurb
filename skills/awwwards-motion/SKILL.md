---
name: awwwards-motion-design
description: Motion design pipeline for building Awwwards/Apple-tier animations, micro-interactions, scroll sequences, page transitions, and kinetic typography. Enforces the principles that separate award-winning motion from generic CSS transitions — intentional easing, scroll-linked choreography, staggered reveals, magnetic interactions, text splitting, parallax depth, morphing state transitions, and the invisible micro-animations that make interfaces feel alive. Every animation must justify its existence, respect reduced-motion, and run at 60fps. Motion is choreography, not decoration.
---

# Awwwards-Tier Motion Design

> This skill fires when the user asks for animations, transitions, micro-interactions, scroll effects, page transitions, kinetic typography, parallax, hover physics, loading sequences, or anything that involves making a web interface feel alive and premium. Motion is the language of quality — the difference between a static page and an experience that feels like it was hand-crafted by a studio charging $200k per project.

---

## The Pipeline

```
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│   BRIEF IN ──→ Phase 1: Motion Audit ──→ Phase 2: Choreography      │
│                  (classify, extract        (sequence map, timing      │
│                   motion intent)            sheet, easing palette)    │
│                                                                       │
│                              ──→ Phase 3: Build                       │
│                                   (implement layer by layer:          │
│                                    entry → scroll → hover →          │
│                                    transitions → ambient)            │
│                                                                       │
│                              ──→ Phase 4: Motion Diff                 │
│                                   (60fps check, feel check,          │
│                                    reduced-motion audit)             │
│                                                                       │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.    │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## The Core Doctrine

Before touching any code, internalize these. They override every aesthetic preference. The quality bar is **Apple keynote presentations, Linear app, Stripe homepage, Vercel dashboard, Raycast.** If your animation would look out of place on apple.com, it is not good enough.

> **The Apple Standard.** Apple does not use generic CSS transitions. Apple uses spring physics — animations that overshoot, settle, and breathe like physical objects. Every interaction on iOS feels like touching a real thing: buttons compress, sheets slide with momentum, elements settle with a gentle bounce. Your animations must achieve this same physical, tangible quality. If an element moves and it feels "digital" or "computed" rather than "physical" or "alive," the easing is wrong.

> **Every animation must have a reason.** If you cannot answer "why does this move?" with a functional answer (guides attention, communicates state change, provides feedback, establishes spatial relationship), remove the animation. Motion without purpose is noise.

> **The best animations are invisible.** The user should not think "that's a nice animation." They should think "this feels good." If the animation draws attention to ITSELF rather than to the CONTENT, it is too much. Apple never makes you wait for an animation to finish. The animation serves the interaction, not the other way around.

> **Spring physics over cubic-bezier.** The era of `cubic-bezier(0.25, 0.1, 0.25, 1)` as the pinnacle of easing is over. Material Design 3 Expressive has moved to spring-based motion. Apple has used spring animations since iOS 7. The web has caught up: CSS `linear()` enables true spring physics with overshoot and settle. Use spring-derived easing for EVERY primary animation. Reserve cubic-bezier only for ambient/background motion where spring overshoot would be inappropriate.

> **Easing IS the animation.** A 300ms linear transition and a 300ms spring transition have the same duration but completely different character. The curve is what separates a $200k studio site from a template. There is no such thing as a "default" ease. Every curve is a deliberate, conscious choice with a specific emotional character.

> **Stagger creates hierarchy.** When multiple elements animate, they cannot all move at once. Stagger is the motion equivalent of visual hierarchy — it tells the eye where to look first, second, third. Apple staggers with millisecond precision. So do you.

> **Motion respects the user.** Every animation gates behind `prefers-reduced-motion`. No exceptions. Users who set this flag have vestibular disorders, motion sensitivity, or simply prefer stillness. Reduced motion does not mean no animation — it means no translation, no parallax, no scale, no spring overshoot. Opacity-only fades at reduced duration are acceptable.

> **ZERO static elements.** Every single visible element on the page MUST have at least one form of motion — an entry animation, a scroll reveal, a hover state, or an ambient effect. If an element exists on the page and has no animation whatsoever, the implementation is incomplete. A static element in an animated page is a dead pixel in a living display.

---

## The Animation Coverage Mandate

This is the non-negotiable rule: **every visible element gets motion.** Not "most elements." Not "the important ones." Every element. Walk through the page element by element and assign motion from this table. If an element does not appear in this table, it still gets at minimum a scroll-triggered fade-in.

### → Mandatory Element Animation Map

Fill this table for EVERY element on the page. Every row must have at least one ✓. Any empty row = incomplete implementation.

| Element | Entry Animation | Scroll Reveal | Hover/Focus State | Ambient/Micro | Assigned |
|---|---|---|---|---|---|
| **Navigation bar** | Slide down + fade from top | — | Link underline slide, spring-scale menu items | — | ✓ |
| **Logo** | Fade in (first element, 0ms delay) | — | Subtle scale(1.05) on hover | — | ✓ |
| **Nav links** | Stagger fade-in left-to-right | — | Sliding underline + color shift | — | ✓ |
| **Hero heading** | Word-by-word masked reveal OR char split | — | — | — | ✓ |
| **Hero subtext** | Fade-up-deblur (stagger after heading) | — | — | — | ✓ |
| **Hero CTA button** | Scale-in + fade (last hero element) | — | Pressure depth (compress + inner shadow) + lift + ripple on click | Subtle glow pulse | ✓ |
| **Hero background** | Scale(1.05→1) + fade (Ken Burns settle) | Parallax slow | — | Gradient shift OR grain movement | ✓ |
| **Section headings** | — | Word-by-word masked reveal OR fade-up-deblur | — | — | ✓ |
| **Section subtext** | — | Fade-up (stagger 80ms after heading) | — | — | ✓ |
| **Body paragraphs** | — | Line-by-line reveal OR fade-up | — | — | ✓ |
| **Cards** | — | Stagger fade-up (80ms increment per card) | Lift(-4px) + shadow expand + border glow + 3D tilt | — | ✓ |
| **Card icons/images** | — | Scale-in (after card reveals) | Subtle rotate or color shift on card hover | — | ✓ |
| **Card titles** | — | Part of card reveal | Color shift on card hover | — | ✓ |
| **Card descriptions** | — | Part of card reveal | Opacity increase on card hover | — | ✓ |
| **Images** | — | Clip-path wipe reveal OR scale-in | Ken Burns zoom on hover | — | ✓ |
| **Buttons (all)** | — | Fade-up with parent | Pressure depth + lift + shadow + ripple click | — | ✓ |
| **Links (inline)** | — | Part of parent reveal | Sliding underline + color shift | — | ✓ |
| **Input fields** | — | Fade-up with parent | Border glow on focus + label float | — | ✓ |
| **Badges/pills** | — | Scale-in + fade | Background color shift on hover | Subtle bounce float | ✓ |
| **Dividers/lines** | — | Width expand from center (scaleX 0→1) | — | — | ✓ |
| **Testimonial quotes** | — | Fade-up-deblur + slide | — | — | ✓ |
| **Avatars** | — | Scale-in with border ring animation | Ring pulse on hover | — | ✓ |
| **Stats/numbers** | — | Counter animation (count up from 0) | — | — | ✓ |
| **Footer** | — | Fade-up (last section) | Link underline slides | — | ✓ |
| **Footer links** | — | Stagger reveal | Underline slide + color shift | — | ✓ |
| **Social icons** | — | Stagger scale-in | Lift + color shift to brand color | — | ✓ |
| **Background shapes** | — | — | — | Floating animation + parallax | ✓ |
| **Decorative elements** | — | Rotate-in or scale-in | — | Slow spin or float | ✓ |
| **Scroll indicator** | Fade-in after hero loads | — | — | Gentle bounce loop | ✓ |
| **Progress bars** | — | Width expand (scaleX 0→1) with easing | — | — | ✓ |
| **Tooltips** | — | — | Float up + fade from trigger | — | ✓ |
| **Accordions** | — | Fade-up with parent | Border/bg shift on hover | Smooth height expand | ✓ |
| **Tabs** | — | Fade-up with parent | Background shift | Sliding indicator + content crossfade | ✓ |
| **Modals** | — | — | — | Backdrop fade + content scale-in | ✓ |
| **Toast/notifications** | — | — | — | Slide-in from edge + auto-dismiss | ✓ |

⚠ **Drift Warning:** The #1 failure is animating the hero and first section, then leaving everything below the fold completely static. EVERY section must have scroll-triggered reveals. EVERY interactive element must have hover feedback. Walk the page top-to-bottom and verify coverage. If you scroll and find a section that just "sits there" without animating in, the implementation is broken.

### → Coverage Verification Sweep

After building all animations, perform this sweep. Open the page and scroll top to bottom at a natural reading pace. For EVERY element that enters the viewport:

1. **Does it animate into view?** If no → add a scroll reveal
2. **Can you hover it?** If yes → does it have hover feedback? If no → add hover state
3. **Is it interactive (clickable, focusable)?** If yes → does it have active/focus states? If no → add them
4. **Is it decorative?** If yes → does it have ambient motion (float, rotate, pulse)? If no → add it
5. **Is it a text element?** If yes → does it have at minimum a fade-up reveal? If no → add it

A page with 100% animation coverage feels alive. A page with 80% coverage has dead spots that the eye catches immediately.

---

## Phase 1: Motion Audit

Before writing any code, classify the motion requirements.

### → Classify the Motion Context

| Field | Your answer |
|---|---|
| **Page type** | Marketing landing page / Product app / Portfolio / E-commerce / Editorial / Dashboard |
| **Motion density** | Minimal (Apple-style restraint) / Moderate (Stripe-level) / Rich (Awwwards experimental) |
| **Primary motion purpose** | Guide attention / Communicate state / Create atmosphere / Reveal content / Delight |
| **Scroll behavior** | Standard scroll / Scroll-linked animations / Scroll-jacked sections / Sticky reveals |
| **Page transitions** | None (SPA with instant swap) / Crossfade / Slide / Morph / Custom sequence |
| **Framework** | Vanilla CSS/JS / Framer Motion (React) / GSAP / Motion One / CSS-only |

### → Identify Motion Layers

Walk through the page and tag every element that should move. Classify each into one of these layers:

| Motion Layer | What it covers | Priority |
|---|---|---|
| **Entry** | First-paint reveals, above-the-fold load animation | P0 — must have |
| **Scroll** | Elements revealing as user scrolls, parallax, sticky sequences | P0 — must have |
| **Hover/Focus** | Button lifts, card tilts, link underlines, pressure depth effects | P0 — must have |
| **State** | Page transitions, tab switches, modal open/close, accordion, menu | P1 — should have |
| **Ambient** | Floating elements, gradient shifts, particle systems, cursor glow | P2 — polish layer |
| **Kinetic** | Text splitting, character-by-character reveals, word rotators | P2 — polish layer |

### → Output the Motion Brief

State in 2-3 lines the motion strategy:

> *"Motion Brief: Apple-restraint motion density. Staggered fade-up-deblur entries on all sections. Scroll-triggered reveals with 20% viewport threshold. Magnetic hover on CTA buttons. Smooth text split reveals on section headings. Crossfade page transitions. No ambient particles. Easing palette: snappy decel for entries, spring for hovers, smooth for scrolls."*

### ✓ Quality Gate: Audit

Before moving to Phase 2, confirm:
- Motion context is classified (page type, density, purpose)
- Every moving element is tagged to a motion layer
- The Element Animation Map is filled for EVERY element on the page — no empty rows
- Motion Brief is written
- Framework is selected

---

## Phase 2: Choreography

Motion is choreography. Every element has an entrance cue, a duration, an easing curve, and a relationship to the elements around it. This phase creates the timing sheet — the musical score of the page.

### → The Easing Palette

This is the single most important section in the entire skill. The easing palette defines the emotional language of every animation on the page. Using the wrong curve is like playing a wrong note in a symphony — even non-musicians can feel it.

The palette has THREE tiers, ordered by quality. Use the highest tier your browser support allows.

---

**TIER 1: Spring Physics via CSS `linear()` — THE GOLD STANDARD**

This is what Apple uses. This is what Material Design 3 Expressive uses. This is what separates $200k studio sites from templates. CSS `linear()` enables true spring physics with overshoot and settle — something `cubic-bezier()` fundamentally cannot achieve.

```css
/* BLUEPRINT: Spring-based easing palette via CSS linear()
   WHY: Real spring physics create motion that feels PHYSICAL.
   Objects in the real world don't follow cubic-bezier curves —
   they have mass, momentum, and elasticity. Springs overshoot
   their target and settle back, which reads as "alive" to the
   human eye. This is why every iOS animation feels tangible.

   These curves were generated from spring physics simulations
   with specific mass/stiffness/damping parameters. The linear()
   function plots the spring's position at discrete time steps,
   which the browser interpolates smoothly between. */

:root {
  /* 1. APPLE SNAPPY SPRING — Primary entrance/reveal easing
     Physics: mass=1, stiffness=400, damping=30
     Character: Explosive start, tiny overshoot (~2%), soft settle.
     This is the iOS sheet-present / notification-arrive curve.
     Use on: hero entries, scroll reveals, modal opens, everything
     that "arrives" on screen. This is your DEFAULT curve. */
  --spring-snappy: linear(
    0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%,
    0.938 16.7%, 1.017 19.4%, 1.067 22.5%, 1.089 26.0%,
    1.079 30.3%, 1.049 36.0%, 1.024 42.6%, 1.011 50.3%,
    1.004 59.2%, 1.001 69.3%, 1
  );
  --spring-snappy-duration: 0.55s;

  /* 2. APPLE SMOOTH SPRING — State changes, position shifts
     Physics: mass=1, stiffness=200, damping=24
     Character: Gentle acceleration, visible overshoot (~5%),
     two-phase settle. Feels like a precision instrument.
     This is the iOS page-transition / tab-switch curve.
     Use on: page transitions, tab switches, carousel slides,
     anything moving from position A to position B. */
  --spring-smooth: linear(
    0, 0.004, 0.016 2.3%, 0.063 4.7%, 0.141 7.2%,
    0.25 9.9%, 0.601 16.5%, 0.815 21.0%, 0.929 25.2%,
    0.987 29.0%, 1.025 33.5%, 1.042 38.0%, 1.04 43.5%,
    1.027 50.0%, 1.013 57.5%, 1.005 67.0%, 1.001 79.0%, 1
  );
  --spring-smooth-duration: 0.7s;

  /* 3. APPLE BOUNCY SPRING — Playful micro-interactions
     Physics: mass=1, stiffness=500, damping=18
     Character: Very fast, pronounced overshoot (~12%), visible
     bounce-settle. Feels playful, energetic, delightful.
     Use SPARINGLY on: toggles, like buttons, notification pops,
     small badges, emoji reactions. NEVER on large elements. */
  --spring-bouncy: linear(
    0, 0.014, 0.055 1.8%, 0.218 3.7%, 0.867 8.5%,
    1.085 10.7%, 1.212 12.9%, 1.264 15.0%, 1.262 17.0%,
    1.217 19.5%, 1.098 24.0%, 1.035 28.5%, 0.993 33.0%,
    0.981 38.0%, 0.988 45.0%, 0.998 55.0%, 1.001 68.0%, 1
  );
  --spring-bouncy-duration: 0.5s;

  /* 4. MATERIAL 3 EMPHASIZED — Google's expressive motion standard
     Source: Material Design 3 motion spec (legacy cubic-bezier fallback)
     Character: Very slow start, dramatic acceleration, gentle decelerate.
     This is the M3 "emphasized" transition for container transforms,
     shared element transitions, and FAB expansions.
     Use on: container morphs, expand/collapse, shared transitions. */
  --m3-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1.0);
  --m3-emphasized-duration: 0.5s;

  /* 5. MATERIAL 3 EMPHASIZED as SPRING — for spring-capable contexts
     Physics: mass=1, stiffness=300, damping=22
     The spring equivalent of M3 Emphasized — with the overshoot
     that Google's spec now recommends via their spring system. */
  --m3-spring: linear(
    0, 0.007, 0.029 2.0%, 0.118 4.2%, 0.508 10.9%,
    0.797 15.4%, 0.951 19.2%, 1.029 22.2%, 1.074 25.6%,
    1.088 29.2%, 1.075 33.6%, 1.045 39.5%, 1.02 46.5%,
    1.007 55.0%, 1.001 66.0%, 1
  );
  --m3-spring-duration: 0.6s;
}
```

---

**TIER 2: Premium Cubic-Bezier Curves — STRONG FALLBACK**

For browsers that don't support `linear()`, or for secondary animations where spring overshoot would be inappropriate (ambient motion, background transitions, color shifts).

```css
:root {
  /* 6. SNAPPY DECEL — Tier 2 fallback for spring-snappy
     The best cubic-bezier approximation of the Apple snappy spring,
     minus the overshoot. Still far better than CSS keyword easings.
     Use when linear() is unavailable, or for secondary reveals. */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* 7. SMOOTH IN-OUT — for ambient position shifts
     Neither Material 3 nor Apple style — this is the Awwwards
     agency standard for smooth lateral movements, carousel
     auto-play, and background panning. */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* 8. ENERGETIC SNAP — for hover responses, interactive feedback
     Faster than --ease-out, designed for immediate tactile response.
     The curve front-loads 80% of the motion into the first 30% of
     the duration, creating a "snap" sensation. */
  --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);

  /* 9. DRAMATIC IN-OUT — for hero reveals, cinematic entrances
     Extremely slow start ("winding up"), explosive middle,
     graceful deceleration. Use for the ONE theatrical moment
     per page — the hero heading reveal, a page transition wipe. */
  --ease-dramatic: cubic-bezier(0.77, 0, 0.175, 1);

  /* 10. CUBIC SPRING APPROXIMATION — bouncy without linear()
      The y2 value exceeds 1.0, causing overshoot. This is the
      closest cubic-bezier can get to a spring. Less natural than
      linear() springs but works everywhere. */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

**TIER 3: CSS Keyword Easings — BANNED**

`ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear` — these CSS keywords are the typographic equivalent of Comic Sans. They have zero character, zero intentionality, zero soul. They exist because browsers needed a default, not because any designer chose them.

| CSS Keyword | Why it's banned | What to use instead |
|---|---|---|
| `ease` | Generic curve that matches nothing. The "I didn't think about this" easing. | `--spring-snappy` or `--ease-out` |
| `ease-in` | Slow start, fast end — objects accelerating into a wall. Almost never what you want. | `--ease-dramatic` (if you need a slow start) |
| `ease-out` | Better than `ease`, but still a bland, characterless deceleration. | `--spring-snappy` or `--ease-out` (the custom one) |
| `ease-in-out` | The "I want this to look smooth" default that looks like nothing. | `--spring-smooth` or `--ease-in-out` (the custom one) |
| `linear` | Objects don't move at constant speed in nature. Feels robotic and dead. | Only acceptable for `animation-timing-function` on infinite loops (marquees, spinners) |

⚠ **Drift Warning:** If you write `transition: all 0.3s ease` ANYWHERE in the codebase, the implementation has failed the quality bar. Every transition must use a named curve from the palette. No exceptions. No shortcuts. The easing palette is the DNA of the entire motion experience.

---

**→ How to choose between Tier 1 and Tier 2:**

| Animation type | Use this tier | Why |
|---|---|---|
| **Hero entry, page load reveals** | Tier 1 (`--spring-snappy`) | First impression. Must feel physical and premium. |
| **Scroll reveals** | Tier 1 (`--spring-snappy`) | User sees dozens of these. Each one must feel alive. |
| **Button/card hover** | Tier 2 (`--ease-snap`) | Hover is fast and functional. Spring overshoot on hover feels jittery. |
| **Button click/active** | Tier 1 (`--spring-bouncy`) | Click feedback benefits from the satisfying "pop" of a spring bounce. |
| **Modal/dialog open** | Tier 1 (`--spring-smooth`) | Modals are spatial — they arrive from somewhere. Springs make this feel real. |
| **Tab switch/carousel** | Tier 1 (`--spring-smooth`) | Position changes need momentum and settle. |
| **Background color shift** | Tier 2 (`--ease-in-out`) | Color doesn't have mass. Springs on color feel wrong. |
| **Gradient animation** | Tier 2 (`--ease-in-out`) or `linear` | Ambient motion. No spring needed. |
| **Page transition** | Tier 1 (`--spring-smooth`) | Page navigation is a major spatial event. Must feel physical. |
| **Tooltip appear** | Tier 2 (`--ease-snap`) | Fast, functional, non-theatrical. |
| **Accordion expand** | Tier 1 (`--spring-snappy`) or Tier 1 (`--m3-spring`) | Height changes with spring settle feel premium. |
| **Floating/ambient** | CSS `linear` keyword | Continuous loops don't need easing — constant speed IS correct. |

---

**→ Framer Motion / Motion spring equivalents:**

```tsx
/* BLUEPRINT: Framer Motion spring presets matching the CSS palette
   WHY: When using Framer Motion (React), use these spring configs
   instead of the CSS linear() values. Framer Motion's spring()
   computes physics natively, giving even smoother results than
   the CSS approximation. These match the FEEL of the CSS palette. */

const springs = {
  // Matches --spring-snappy: fast, minimal overshoot
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 1 },

  // Matches --spring-smooth: gentle, visible settle
  smooth: { type: "spring", stiffness: 200, damping: 24, mass: 1 },

  // Matches --spring-bouncy: playful pop
  bouncy: { type: "spring", stiffness: 500, damping: 18, mass: 1 },

  // Matches --m3-spring: Material 3 emphasized
  emphasized: { type: "spring", stiffness: 300, damping: 22, mass: 1 },

  // For hover responses (no spring, just fast decel)
  snap: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

// Usage:
// <motion.div transition={springs.snappy} />
// <motion.div transition={springs.smooth} />
```

---

**→ GSAP spring equivalents:**

```javascript
/* BLUEPRINT: GSAP spring-like easing
   WHY: GSAP doesn't use spring physics natively, but its
   CustomEase plugin can replicate the feel. For standard use,
   these "power" easings are the closest GSAP equivalents. */

// snappy: "power3.out" or CustomEase
// smooth: "power2.inOut"
// bouncy: "back.out(1.7)"  — the 1.7 controls overshoot amount
// dramatic: "expo.inOut"
// snap: "power4.out"

// For true springs in GSAP, use the gsap-spring plugin:
// gsap.to(".element", { x: 100, ease: "spring({stiffness: 400, damping: 30})" });
```

### → The Timing Sheet

Map every animation in sequence. This is the score.

| Element | Trigger | Delay | Duration | Easing | Transform | Notes |
|---|---|---|---|---|---|---|
| Nav | Page load | 0ms | 600ms | --ease-out | opacity 0→1, y -20→0 | First element to appear |
| Hero eyebrow | Page load | 100ms | 700ms | --ease-out | opacity 0→1, y 20→0, blur 8→0 | Stagger start |
| Hero heading | Page load | 200ms | 800ms | --ease-out | opacity 0→1, y 30→0, blur 8→0 | Core focal point |
| Hero subtext | Page load | 320ms | 700ms | --ease-out | opacity 0→1, y 20→0 | After heading lands |
| Hero CTA | Page load | 440ms | 600ms | --ease-out | opacity 0→1, y 20→0, scale 0.95→1 | Last hero element |
| Section heading | Scroll (20% visible) | 0ms | 800ms | --ease-out | opacity 0→1, y 40→0 | Per section |
| Cards | Scroll (15% visible) | 0/80/160ms | 700ms | --ease-out | opacity 0→1, y 30→0 | Stagger per card |
| CTA buttons | Hover | 0ms | 500ms | --ease-snap | y 0→-2px, shadow increase | Immediate response |
| Cards | Hover | 0ms | 400ms | --ease-snap | y 0→-4px, shadow increase | Lift effect |

**Timing Rules:**

| Rule | Value | Why |
|---|---|---|
| Maximum total entry sequence | 800ms | Beyond 800ms, the page feels slow to load |
| Stagger increment | 80-150ms | Below 80ms feels simultaneous. Above 150ms feels sluggish |
| Hover response | ≤ 150ms perceived start | The user must feel instant feedback |
| Scroll reveal duration | 600-900ms | Long enough to notice, short enough to not obstruct |
| Page transition | 300-500ms | Fast enough to not break flow, slow enough to register |
| Micro-interaction (toggle, checkbox) | 200-350ms | Functional feedback, not theatrical |

⚠ **Drift Warning:** The #1 AI animation failure is making everything too slow. A 1.5-second fade-in on every section makes the page feel like it's loading, not revealing. Keep scroll reveals under 900ms. Keep hover responses under 500ms. Keep total page entry under 800ms.

### → Stagger Choreography

Stagger is not "delay each item by 100ms." Stagger follows visual hierarchy.

**Correct stagger order (top to bottom = first to last):**
```
1. Container/background (instant or 0ms)
2. Primary content (heading, hero image) — 100ms
3. Supporting content (subtext, description) — 220ms  
4. Interactive elements (CTAs, buttons) — 340ms
5. Decorative elements (badges, accents) — 440ms
```

**Stagger within grids (cards, features):**
```
For a 3-column grid, stagger left-to-right:
  Card 1: 0ms
  Card 2: 80ms
  Card 3: 160ms

For a 2x3 grid, stagger top-left to bottom-right:
  Row 1: 0ms, 80ms, 160ms
  Row 2: 120ms, 200ms, 280ms
```

⚠ **Drift Warning:** Never stagger more than 6-8 items. If you have 12 cards, stagger the first 4-6, then bring the rest in together. A 12-item stagger takes 1.2+ seconds and the user loses patience watching items appear one by one.

### ✓ Quality Gate: Choreography

Before moving to Phase 3, confirm:
- Easing palette is defined (not using CSS keyword easings)
- Timing sheet covers every moving element
- No animation exceeds 900ms duration
- Total page entry sequence is under 800ms
- Stagger increments are 80-150ms
- Stagger follows visual hierarchy, not DOM order
- No more than 6-8 items are individually staggered

---

## Phase 3: Build the Motion

Implement layer by layer. Each layer builds on the previous one. Do not skip layers.

---

### Layer 1: Entry Animations (Page Load)

The first impression. Every above-the-fold element needs a choreographed entrance.

**CSS-Only Entry System:**

```css
/* BLUEPRINT: CSS entry animation system
   WHY: Using CSS custom properties for delay values lets you
   stagger from HTML with data attributes. No JS required for
   basic entries. The blur-to-sharp adds perceived quality —
   elements feel like they're "focusing" into existence, not
   just fading in. */

@keyframes enter-up {
  from {
    opacity: 0;
    transform: translateY(var(--enter-y, 24px));
    filter: blur(var(--enter-blur, 6px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes enter-scale {
  from {
    opacity: 0;
    transform: scale(var(--enter-scale, 0.95));
    filter: blur(var(--enter-blur, 4px));
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes enter-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.enter-up {
  animation: enter-up 0.7s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

.enter-scale {
  animation: enter-scale 0.6s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

.enter-fade {
  animation: enter-fade 0.5s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

/* Stagger via inline custom properties in HTML:
   <h1 class="enter-up" style="--stagger: 100ms">
   <p class="enter-up" style="--stagger: 220ms">
   <a class="enter-up" style="--stagger: 340ms">
*/

@media (prefers-reduced-motion: reduce) {
  .enter-up,
  .enter-scale {
    animation: enter-fade 0.3s ease both;
    animation-delay: 0ms;
  }
}
```

**Framer Motion Entry System (React):**

```tsx
/* BLUEPRINT: Framer Motion staggered entry
   WHY: variants + staggerChildren is the cleanest way to
   orchestrate multi-element entrances. The parent controls
   timing, children just declare their start/end states.
   This keeps animation logic declarative, not imperative. */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpSubtle = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Usage:
// <motion.div variants={containerVariants} initial="hidden" animate="visible">
//   <motion.span variants={fadeUpBlur}>EYEBROW</motion.span>
//   <motion.h1 variants={fadeUpBlur}>Heading</motion.h1>
//   <motion.p variants={fadeUpSubtle}>Subtext</motion.p>
//   <motion.a variants={scaleIn}>CTA</motion.a>
// </motion.div>
```

**GSAP Entry System:**

```javascript
/* BLUEPRINT: GSAP staggered entry with ScrollTrigger
   WHY: GSAP's timeline gives frame-perfect control over
   complex sequences. The "from" tween is cleaner than
   "to" for entries because you define the hidden state
   and GSAP animates TO the element's natural CSS state. */

// Hero entry (fires on page load)
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl
  .from(".hero-eyebrow", {
    y: 20, opacity: 0, duration: 0.7, filter: "blur(8px)"
  })
  .from(".hero-heading", {
    y: 30, opacity: 0, duration: 0.8, filter: "blur(8px)"
  }, "-=0.55")  // overlap with previous
  .from(".hero-subtext", {
    y: 20, opacity: 0, duration: 0.6
  }, "-=0.5")
  .from(".hero-cta", {
    y: 20, opacity: 0, scale: 0.95, duration: 0.5
  }, "-=0.4");
```

---

### Layer 2: Scroll-Triggered Reveals

Elements below the fold reveal as the user scrolls them into view.

**Intersection Observer (Vanilla JS):**

```javascript
/* BLUEPRINT: Scroll reveal with IntersectionObserver
   WHY: IntersectionObserver is GPU-friendly — it doesn't fire
   on every scroll event. The threshold (0.15) means the element
   starts animating when 15% is visible, which feels natural.
   rootMargin "-50px" prevents elements at the very edge of the
   viewport from triggering prematurely. The "once" pattern
   (unobserve after first trigger) prevents re-animation on
   scroll-up, which looks janky. */

class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-50px 0px",
      }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      this.observer.observe(el);
    });
  }
}

// Initialize after DOM ready
new ScrollReveal();
```

```css
/* BLUEPRINT: Scroll reveal CSS states
   WHY: The element starts in its hidden state via CSS.
   When JS adds .is-visible, the CSS transition takes over.
   This means elements are hidden by default (no flash of
   unstyled content), and the transition uses the easing
   palette for consistency. */

[data-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s var(--ease-out),
    transform 0.8s var(--ease-out),
    filter 0.8s var(--ease-out);
  will-change: transform, opacity;
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Variant: reveal with blur */
[data-reveal="blur"] {
  filter: blur(8px);
}
[data-reveal="blur"].is-visible {
  filter: blur(0);
}

/* Variant: reveal with scale */
[data-reveal="scale"] {
  transform: scale(0.92);
}
[data-reveal="scale"].is-visible {
  transform: scale(1);
}

/* Stagger children within a revealed container */
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-out),
    transform 0.7s var(--ease-out);
}
[data-reveal-stagger].is-visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(2) { transition-delay: 80ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(6) { transition-delay: 400ms; opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    transform: none !important;
    filter: none !important;
    transition: opacity 0.3s ease;
  }
  [data-reveal-stagger] > * {
    transform: none !important;
    transition: opacity 0.3s ease;
    transition-delay: 0ms !important;
  }
}
```

```html
<!-- Usage in HTML -->
<section data-reveal>
  <h2>Section heading</h2>
</section>

<div data-reveal="blur">
  <p>Blurs into focus</p>
</div>

<div data-reveal-stagger>
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

**Scroll-Linked Progress Animations (GSAP ScrollTrigger):**

```javascript
/* BLUEPRINT: Scroll-pinned reveal sequence
   WHY: "pin: true" locks the section in place while the user
   scrolls through the animation. scrub: 1 ties the animation
   progress 1:1 to scroll position with a 1-second smoothing.
   This creates the Apple-style "the page tells a story as you
   scroll" effect. Without pinning, the animation plays once
   and the user scrolls past it. */

// Sticky section with scroll-driven content changes
gsap.timeline({
  scrollTrigger: {
    trigger: ".feature-section",
    start: "top top",
    end: "+=300%",   // 3x viewport height of scroll distance
    pin: true,
    scrub: 1,        // smooth 1:1 scroll linking
  },
})
.to(".feature-text-1", { opacity: 0, y: -30, duration: 0.3 })
.from(".feature-text-2", { opacity: 0, y: 30, duration: 0.3 })
.to(".feature-image-1", { scale: 0.9, opacity: 0, duration: 0.3 }, "<")
.from(".feature-image-2", { scale: 1.1, opacity: 0, duration: 0.3 })
.to(".feature-text-2", { opacity: 0, y: -30, duration: 0.3 })
.from(".feature-text-3", { opacity: 0, y: 30, duration: 0.3 });
```

**Horizontal Scroll Section:**

```javascript
/* BLUEPRINT: Horizontal scroll gallery
   WHY: This converts vertical scroll into horizontal movement.
   The "x" tween moves the container by its total overflow width.
   "end" is set to the scrollable width so 1px of vertical scroll
   = 1px of horizontal movement. The pin keeps the section in
   view during the entire horizontal traverse. */

const horizontalSection = document.querySelector(".horizontal-gallery");
const scrollWidth = horizontalSection.scrollWidth - window.innerWidth;

gsap.to(".horizontal-gallery-inner", {
  x: -scrollWidth,
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-gallery",
    start: "top top",
    end: () => `+=${scrollWidth}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  },
});
```

⚠ **Drift Warning:** Scroll-jacking (overriding native scroll to control animation) is the most controversial motion pattern. Use scroll-linked animations (scrub) rather than scroll-jacking (onScroll → preventDefault). The difference: scroll-linked lets the user scroll naturally and ties animation progress to scroll position. Scroll-jacking hijacks scroll input entirely. Users hate scroll-jacking. Studios like Apple get away with it because their content is worth pausing for — yours may not be.

---

### Layer 3: Hover and Interactive Micro-Animations

The layer that separates "works" from "feels premium." Every interactive element needs physical-feeling feedback.

**Button Hover Physics:**

```css
/* BLUEPRINT: Premium button hover
   WHY: translateY(-2px) creates a subtle lift that mimics
   physical buttons rising when your finger approaches.
   The shadow expansion reinforces the lift illusion.
   scale(0.98) on :active gives tactile "press" feedback.
   The cubic-bezier gives a snappy response with a gentle
   settle — it feels weighted, not springy. */

.btn {
  transition:
    transform 0.5s var(--ease-snap),
    box-shadow 0.5s var(--ease-snap),
    background-color 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 16px 40px rgba(0, 0, 0, 0.06);
}

.btn:active {
  transform: translateY(0px) scale(0.98);
  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.08);
  transition-duration: 0.1s;
}
```

**Card Hover Lift:**

```css
/* BLUEPRINT: Card hover with lift and glow
   WHY: The card lifts (translateY) AND its shadow expands,
   creating a convincing depth change. The border-color
   shift adds a subtle glow. will-change prevents the
   browser from recalculating layout on every hover. */

.card {
  transition:
    transform 0.4s var(--ease-snap),
    box-shadow 0.4s var(--ease-snap),
    border-color 0.4s var(--ease-snap);
  will-change: transform;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.06),
    0 24px 60px rgba(0, 0, 0, 0.04);
  border-color: var(--color-accent, rgba(0, 0, 0, 0.08));
}
```

**3D Card Tilt (Cursor-Tracking):**

```javascript
/* BLUEPRINT: 3D tilt card that follows cursor position
   WHY: The card tilts toward the cursor, creating a tangible
   depth feel. The rotation is clamped to ±8deg to prevent
   extreme angles. The glare overlay simulates light reflection.
   getBoundingClientRect() is called on mousemove — this is
   acceptable because it only fires on hovered cards (1-2 elements),
   not on scroll (hundreds of elements). */

function initTiltCards() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const maxTilt = 8; // degrees

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 to 1
      const y = (e.clientY - rect.top) / rect.height;    // 0 to 1

      const rotateX = (0.5 - y) * maxTilt;  // tilt up/down
      const rotateY = (x - 0.5) * maxTilt;  // tilt left/right

      card.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
      card.style.transition = "transform 0.6s var(--ease-out)";
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease-out";
    });
  });
}
```

**Apple-Style Pressure Button (Tactile Depth):**

```javascript
/* BLUEPRINT: Button that compresses with spring physics on hover
   WHY: Apple's buttons don't float toward your cursor — they
   COMPRESS under your touch, like pressing a physical key.
   The button scales down slightly (0.97), gains an inner shadow
   that simulates depth (as if pressing into the surface), and
   the text subtly brightens. On mouse-leave, a spring easing
   brings it back with a satisfying settle. This feels PHYSICAL
   — like touching a real button — not like a gimmick.

   The magnetic button effect (cursor pull) is overused on
   Awwwards sites and reads as a parlor trick. Apple never uses
   it. Linear never uses it. Stripe never uses it. Pressure
   depth is what premium products use.

   Best on: primary CTAs, nav buttons, pricing buttons,
   all interactive buttons. */

function initPressureButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('[data-pressure]').forEach((btn) => {
    const depth = parseFloat(btn.dataset.pressure) || 0.97;

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = `scale(${depth})`;
      btn.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)';
      btn.style.transition = `transform 0.5s var(--spring-snappy), box-shadow 0.3s var(--ease-snap)`;
      btn.style.filter = 'brightness(1.05)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '';
      btn.style.transition = `transform 0.55s var(--spring-snappy), box-shadow 0.4s var(--ease-out)`;
      btn.style.filter = 'brightness(1)';
    });

    btn.addEventListener('mousedown', () => {
      btn.style.transform = `scale(${depth - 0.03})`; // deeper press
      btn.style.boxShadow = 'inset 0 3px 12px rgba(0,0,0,0.25), 0 0 0 rgba(0,0,0,0)';
      btn.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
    });

    btn.addEventListener('mouseup', () => {
      btn.style.transform = `scale(${depth})`;
      btn.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)';
      btn.style.transition = `transform 0.5s var(--spring-bouncy), box-shadow 0.3s var(--ease-snap)`;
    });
  });
}

// CSS-only version (no JS needed):
```

```css
/* BLUEPRINT: CSS-only pressure button
   WHY: For cases where JS isn't desired, this CSS-only version
   uses :hover and :active pseudo-classes to achieve the same
   compress-and-spring-back feel. The spring comes from the
   --spring-snappy linear() curve on the transition. */

.btn-pressure {
  transition:
    transform 0.55s var(--spring-snappy),
    box-shadow 0.3s var(--ease-snap),
    filter 0.3s var(--ease-snap);
  will-change: transform;
}

.btn-pressure:hover {
  transform: scale(0.97);
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  filter: brightness(1.05);
}

.btn-pressure:active {
  transform: scale(0.94);
  box-shadow: inset 0 3px 12px rgba(0,0,0,0.2);
  transition-duration: 0.08s;
  transition-timing-function: ease;
}
```

**Animated Link Underlines:**

```css
/* BLUEPRINT: Sliding underline on hover
   WHY: The underline starts from the left (scaleX(0) with
   transform-origin: left) and grows to full width on hover.
   This creates directional motion that guides the eye.
   Using scaleX instead of width means the animation is
   GPU-composited (transform) rather than layout-triggering. */

.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s var(--ease-snap);
}

.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

**Image Reveal on Hover (Portfolio/Gallery):**

```css
/* BLUEPRINT: Image reveal with clip-path
   WHY: clip-path creates a cinematic "wipe" reveal that feels
   more intentional than opacity. The inset() function clips
   from all edges — going from inset(0) (full image) to
   inset(50%) (invisible) and back. The scale adds a Ken Burns
   subtle zoom. */

.image-reveal {
  overflow: hidden;
}

.image-reveal img {
  transition:
    transform 1.2s var(--ease-out),
    clip-path 0.8s var(--ease-out);
  clip-path: inset(0);
}

.image-reveal:hover img {
  transform: scale(1.05);
}

/* Variant: reveal from left */
.image-reveal--wipe img {
  clip-path: inset(0 100% 0 0);  /* hidden: clipped from right */
  transition: clip-path 0.9s var(--ease-dramatic);
}
.image-reveal--wipe.is-visible img {
  clip-path: inset(0 0 0 0);  /* visible: no clipping */
}
```

---

### Layer 4: Text Animations (Kinetic Typography)

Text splitting and character-level animation is the signature of studio-quality sites.

**Text Split Utility:**

```javascript
/* BLUEPRINT: Text splitter for character and word animations
   WHY: To animate individual characters or words, each must be
   wrapped in its own element. This utility splits text content
   into <span>-wrapped units while preserving spaces.
   aria-hidden on individual characters + an sr-only full-text
   ensures screen readers read the complete text, not individual
   letters. */

function splitText(element, type = "chars") {
  const text = element.textContent;

  // Keep original text accessible
  element.setAttribute("aria-label", text);

  if (type === "chars") {
    element.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? '<span class="split-char">&nbsp;</span>'
          : `<span class="split-char" aria-hidden="true">${char}</span>`
      )
      .join("");
  } else if (type === "words") {
    element.innerHTML = text
      .split(" ")
      .map(
        (word) =>
          `<span class="split-word-wrap"><span class="split-word" aria-hidden="true">${word}</span></span>`
      )
      .join('<span class="split-char">&nbsp;</span>');
  } else if (type === "lines") {
    // Wrap each line in a clip container for reveal
    element.innerHTML = text
      .split("\n")
      .map(
        (line) =>
          `<span class="split-line-wrap" style="display:block;overflow:hidden;"><span class="split-line">${line}</span></span>`
      )
      .join("");
  }

  return element.querySelectorAll(
    type === "chars"
      ? ".split-char"
      : type === "words"
      ? ".split-word"
      : ".split-line"
  );
}
```

**Character-by-Character Reveal:**

```css
/* BLUEPRINT: Character stagger reveal
   WHY: Each character fades + translates individually with
   an incremented delay. The effect reads as text "typing
   itself" or "assembling from nothing." The 20ms increment
   creates a very fast cascade that reads as fluid, not choppy. */

.split-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  transition:
    opacity 0.4s var(--ease-out),
    transform 0.4s var(--ease-out);
}

.is-visible .split-char {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger via JS: */
```

```javascript
// Apply stagger after splitting
const chars = splitText(document.querySelector(".hero-heading"), "chars");
chars.forEach((char, i) => {
  char.style.transitionDelay = `${i * 25}ms`;
});
```

**Word-by-Word Slide Up (Masked Reveal):**

```css
/* BLUEPRINT: Word reveal from below (masked)
   WHY: Each word is wrapped in an overflow:hidden container.
   The word starts translated 100% below (hidden by the mask)
   and slides up into view. This creates a "curtain rise"
   effect per word. The mask hides the translation, so words
   appear to materialize from the baseline. This is THE
   premium text reveal — used by Apple, Linear, Vercel. */

.split-word-wrap {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 0.05em; /* prevents descender clipping */
}

.split-word {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 0.6s var(--ease-out);
}

.is-visible .split-word {
  transform: translateY(0);
}
```

```javascript
// Apply stagger on words
const words = splitText(document.querySelector(".section-heading"), "words");
words.forEach((word, i) => {
  word.style.transitionDelay = `${i * 60}ms`;
});
```

**Line-by-Line Reveal:**

```css
/* BLUEPRINT: Line reveal for paragraphs
   WHY: Each line slides up from behind its mask. This is
   more readable than character-level animation for body
   text. Works best for short paragraphs (3-5 lines).
   Do NOT use on long body copy — it becomes tedious. */

.split-line {
  display: block;
  transform: translateY(100%);
  transition: transform 0.7s var(--ease-out);
}

.is-visible .split-line {
  transform: translateY(0);
}
```

**Counter / Number Animation:**

```javascript
/* BLUEPRINT: Animated number counter
   WHY: Numbers that count up from 0 to their final value
   draw attention to statistics. The easing makes the count
   decelerate as it approaches the target, which feels like
   the number is "settling" into place. Duration scales with
   the target value to prevent tiny numbers from animating
   too slowly and large numbers from animating too fast. */

function animateCounter(element, target, duration = 2000) {
  const start = performance.now();
  const format = element.dataset.format || "number"; // "number" | "percent" | "currency"

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    if (format === "percent") {
      element.textContent = `${current}%`;
    } else if (format === "currency") {
      element.textContent = `$${current.toLocaleString()}`;
    } else {
      element.textContent = current.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Trigger on scroll reveal:
// When counter element becomes visible, call:
// animateCounter(element, parseInt(element.dataset.target), 2000);
```

⚠ **Drift Warning:** Text splitting is expensive. Only split headings and short phrases (max ~100 characters). Never character-split a paragraph. Never character-split more than 3 elements on the same page. The DOM bloat from wrapping every character in a `<span>` impacts paint performance.

---

### Layer 5: Page Transitions

Moving between pages or views with choreographed transitions.

**CSS View Transitions API (Modern Browsers):**

```css
/* BLUEPRINT: View Transitions
   WHY: The View Transitions API (Chrome 111+) enables
   native page transitions without a framework. The browser
   snapshots the old page, navigates, then animates between
   the old snapshot and the new page. ::view-transition
   pseudo-elements let you customize the animation. */

::view-transition-old(root) {
  animation: fade-out 0.3s var(--ease-in-out);
}

::view-transition-new(root) {
  animation: fade-in 0.3s var(--ease-in-out);
}

@keyframes fade-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.98); }
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(1.02); }
  to   { opacity: 1; transform: scale(1); }
}

/* Element-level transitions (e.g., hero image persists across pages) */
.hero-image {
  view-transition-name: hero-image;
}

::view-transition-old(hero-image) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(hero-image) {
  animation: none;
  mix-blend-mode: normal;
}
```

```javascript
/* BLUEPRINT: Triggering View Transitions
   WHY: document.startViewTransition wraps the DOM update
   in a transition. The callback performs the actual navigation
   or content swap. If the API isn't supported, it falls back
   to instant navigation. */

function navigateWithTransition(url) {
  if (!document.startViewTransition) {
    window.location.href = url;
    return;
  }

  document.startViewTransition(async () => {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Swap the main content
    document.querySelector("main").innerHTML =
      doc.querySelector("main").innerHTML;

    // Update the title
    document.title = doc.title;

    // Update URL
    history.pushState({}, "", url);
  });
}
```

**Framer Motion Page Transitions (React/Next.js):**

```tsx
/* BLUEPRINT: Framer Motion AnimatePresence page transition
   WHY: AnimatePresence detects when children are removed from
   the React tree and plays their exit animation before unmounting.
   mode="wait" ensures the exit completes BEFORE the enter starts,
   preventing both pages from being visible simultaneously. */

import { AnimatePresence, motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] },
  },
};

// In layout:
// <AnimatePresence mode="wait">
//   <motion.main key={pathname} {...pageTransition}>
//     {children}
//   </motion.main>
// </AnimatePresence>
```

---

### Layer 6: Smooth Scroll and Navigation

**Smooth Scroll with Lenis:**

```javascript
/* BLUEPRINT: Smooth scroll with Lenis
   WHY: Native CSS scroll-behavior: smooth is janky and
   non-configurable. Lenis provides butter-smooth inertia
   scrolling with configurable easing, duration, and scroll
   direction. It's the same library used by most Awwwards
   sites for their scroll feel. lerp (linear interpolation)
   controls smoothness — 0.1 is silky, 0.3 is more direct. */

import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  lerp: 0.1,           // smoothness factor (0.05 = very smooth, 0.2 = snappier)
  duration: 1.2,       // base scroll duration
  smoothWheel: true,
  smoothTouch: false,   // never smooth-scroll on touch — it breaks native feel
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect to GSAP ScrollTrigger if using both:
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time) => lenis.raf(time * 1000));
// gsap.ticker.lagSmoothing(0);
```

⚠ **Drift Warning:** NEVER use smooth scroll on touch devices. It destroys the native scroll feel that mobile users expect and creates accessibility nightmares. `smoothTouch: false` is mandatory.

**Scroll Progress Indicator:**

```css
/* BLUEPRINT: Reading progress bar
   WHY: A thin bar at the top of the viewport that fills
   as the user scrolls gives a sense of progression.
   Using scroll-timeline (CSS) instead of JS is more
   performant as it's handled by the compositor thread. */

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--color-accent);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
  animation: scroll-progress linear;
  animation-timeline: scroll();
}

@keyframes scroll-progress {
  to { transform: scaleX(1); }
}
```

---

### Layer 7: Ambient and Atmospheric Motion

The final polish layer. These are the details that make a page feel alive even when the user isn't interacting.

**Orbital Motion (Lissajous Curves):**

```css
/* BLUEPRINT: Lissajous orbital motion for decorative elements
   WHY: A simple up-down float is the #1 cheap-looking ambient
   animation on the web. It screams "template site." Real
   objects don't bob up and down on a single axis — they drift
   in complex, organic paths.

   Lissajous curves create figure-8 and orbital trajectories
   by combining two sine waves at different frequencies on
   the X and Y axes. The result is a path that never repeats
   exactly, feels organic and hypnotic, and reads as "high
   production value" rather than "I added a float animation."

   The key: use DIFFERENT durations for X and Y movement.
   When X cycles at 7s and Y at 11s, the combined path takes
   77s to repeat — effectively infinite variety. */

/* Primary orbital — for hero decorative shapes */
.orbital {
  animation:
    orbital-x 7s var(--ease-in-out) infinite alternate,
    orbital-y 11s var(--ease-in-out) infinite alternate;
}

@keyframes orbital-x {
  0%   { transform: translateX(0); }
  100% { transform: translateX(15px); }
}

@keyframes orbital-y {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-12px); }
}

/* Secondary orbital — offset phase for second element */
.orbital-alt {
  animation:
    orbital-x 9s var(--ease-in-out) infinite alternate-reverse,
    orbital-y 13s var(--ease-in-out) infinite alternate;
}

/* Tertiary — with rotation for depth */
.orbital-spin {
  animation:
    orbital-x 8s var(--ease-in-out) infinite alternate,
    orbital-y 12s var(--ease-in-out) infinite alternate-reverse,
    orbital-rotate 20s linear infinite;
}

@keyframes orbital-rotate {
  to { transform: rotate(360deg); }
}

/* For elements that need true combined transforms,
   wrap in a container that handles one axis: */

/* Outer wrapper handles X drift */
.drift-x {
  animation: orbital-x 7s var(--ease-in-out) infinite alternate;
}

/* Inner element handles Y drift + optional rotation */
.drift-y {
  animation: orbital-y 11s var(--ease-in-out) infinite alternate;
}

/* Scale pulse variant — breathes in and out */
.orbital-breathe {
  animation:
    orbital-x 8s var(--ease-in-out) infinite alternate,
    orbital-y 13s var(--ease-in-out) infinite alternate,
    orbital-scale 6s var(--ease-in-out) infinite alternate;
}

@keyframes orbital-scale {
  0%   { scale: 1; }
  100% { scale: 1.08; }
}

@media (prefers-reduced-motion: reduce) {
  .orbital,
  .orbital-alt,
  .orbital-spin,
  .orbital-breathe,
  .drift-x,
  .drift-y {
    animation: none;
  }
}
```

```html
<!-- Usage: wrap for combined orbital path -->
<div class="drift-x">
  <div class="drift-y">
    <div class="decorative-blob"></div>
  </div>
</div>

<!-- Simple usage (single element): -->
<div class="orbital decorative-shape"></div>
<div class="orbital-alt decorative-shape-2"></div>
```

⚠ **Why this replaces float:** A `translateY(-8px)` bounce on a 6s loop is the CSS equivalent of a stock photo. It's on every template, every tutorial, every "add some life to your page" blog post. Lissajous orbital motion creates a path that feels hand-crafted and unique. The mismatched X/Y durations mean the element never repeats the same path visually, which reads as organic and intentional.

**Gradient Animation (Living Backgrounds):**

```css
/* BLUEPRINT: Animated gradient background
   WHY: A slowly shifting gradient makes the background feel
   alive. background-size: 400% 400% creates a large gradient
   that pans across the element. 15s duration is slow enough
   to be ambient. This works for hero sections and full-page
   backgrounds. */

.gradient-animate {
  background: linear-gradient(
    -45deg,
    var(--grad-1, #0a0a0a),
    var(--grad-2, #1a1a2e),
    var(--grad-3, #16213e),
    var(--grad-4, #0f3460)
  );
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-animate {
    animation: none;
    background-size: 100% 100%;
  }
}
```

**Cursor Glow (Custom Cursor Follower):**

```javascript
/* BLUEPRINT: Cursor glow that follows mouse position
   WHY: A soft radial glow following the cursor creates an
   ambient light effect. Using CSS custom properties (--mx, --my)
   set from JS is more performant than moving a DOM element,
   because the browser can composite the radial-gradient on the
   GPU. requestAnimationFrame is NOT needed here — mousemove
   fires at monitor refresh rate already. */

function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    glow.style.display = "none";
    return;
  }

  document.addEventListener("mousemove", (e) => {
    glow.style.setProperty("--mx", `${e.clientX}px`);
    glow.style.setProperty("--my", `${e.clientY}px`);
  });
}
```

```css
/* BLUEPRINT: Cursor glow CSS
   WHY: The glow is a fixed-position pseudo-element using
   radial-gradient positioned by custom properties.
   pointer-events: none makes it non-interactive.
   The large spread (600px) and low opacity (0.06) create
   a subtle ambient effect, not a spotlight. */

.cursor-glow {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    rgba(var(--color-accent-rgb, 99, 102, 241), 0.06),
    transparent 70%
  );
  transition: background 0.15s ease;
}
```

**Parallax Depth Layers:**

```javascript
/* BLUEPRINT: Lightweight CSS-variable parallax
   WHY: Instead of transforming elements directly on scroll
   (which requires JS on every frame), we update a single
   CSS custom property (--scroll) on the document. Individual
   elements use calc() with --scroll to compute their own
   parallax offset. This is one JS listener, zero per-element
   JS calculations. */

function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--scroll",
          window.scrollY.toString()
        );
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
```

```css
/* BLUEPRINT: Parallax layers via CSS calc()
   WHY: Each layer multiplies --scroll by a different speed
   factor. Negative values move the element against scroll
   direction (up when scrolling down), creating depth. The
   speed factor determines the "distance" of the layer —
   0.05 = close (subtle), 0.2 = far (dramatic). */

.parallax-slow {
  transform: translateY(calc(var(--scroll, 0) * -0.05px));
  will-change: transform;
}

.parallax-medium {
  transform: translateY(calc(var(--scroll, 0) * -0.12px));
  will-change: transform;
}

.parallax-fast {
  transform: translateY(calc(var(--scroll, 0) * -0.2px));
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .parallax-slow,
  .parallax-medium,
  .parallax-fast {
    transform: none !important;
    will-change: auto;
  }
}
```

---

### Layer 8: State Transitions

Smooth transitions between UI states — modals, accordions, tabs, menus.

**Modal Open/Close:**

```css
/* BLUEPRINT: Modal with backdrop and content animation
   WHY: The backdrop fades while the modal content scales +
   fades separately. This two-layer animation creates depth:
   the dark overlay "lowers" and the modal "lifts" into view.
   Using the <dialog> element gives us native accessibility
   (focus trapping, Escape key, aria roles) for free. */

dialog::backdrop {
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s var(--ease-in-out);
}

dialog[open]::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

dialog {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
  transition:
    opacity 0.3s var(--ease-out),
    transform 0.3s var(--ease-out),
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete;
}

dialog[open] {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Starting style for entry animation (CSS allow-discrete) */
@starting-style {
  dialog[open] {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  dialog[open]::backdrop {
    background: rgba(0, 0, 0, 0);
  }
}
```

**Accordion Expand/Collapse:**

```css
/* BLUEPRINT: Smooth accordion with CSS grid
   WHY: The grid-template-rows trick (0fr → 1fr) animates
   the height of an unknown-height element, which CSS cannot
   do with height: auto. The inner wrapper (min-height: 0)
   prevents content from showing below the 0fr collapsed state.
   This is pure CSS — no JS height calculations needed. */

.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s var(--ease-out);
}

.accordion-content[data-expanded="true"] {
  grid-template-rows: 1fr;
}

.accordion-content > .accordion-inner {
  overflow: hidden;
  min-height: 0;
}
```

**Tab Switch with Sliding Indicator:**

```javascript
/* BLUEPRINT: Tab indicator that slides to the active tab
   WHY: Instead of hiding/showing a fixed indicator, the indicator
   MOVES from the previous tab to the new one using transform.
   This creates a direct spatial connection between tabs.
   The indicator's width and position are set from the active
   tab's getBoundingClientRect() for pixel-perfect alignment. */

function initTabs() {
  const tabContainer = document.querySelector("[data-tabs]");
  const indicator = tabContainer.querySelector(".tab-indicator");
  const tabs = tabContainer.querySelectorAll("[data-tab]");

  function moveIndicator(tab) {
    const rect = tab.getBoundingClientRect();
    const containerRect = tabContainer.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - containerRect.left}px)`;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      moveIndicator(tab);
    });
  });

  // Initialize on the active tab
  const activeTab = tabContainer.querySelector("[data-tab].active");
  if (activeTab) moveIndicator(activeTab);
}
```

```css
.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--color-accent);
  transition:
    transform 0.4s var(--ease-snap),
    width 0.4s var(--ease-snap);
}
```

**Menu Slide-In:**

```css
/* BLUEPRINT: Off-canvas menu with staggered link entry
   WHY: The menu slides in from the right (translateX(100%))
   while individual links stagger down with a delay. The
   two-layer animation (container slides, children stagger)
   creates a rich, choreographed feel. The container uses
   visibility + pointer-events to prevent interaction when
   closed, not display:none (which cannot be animated). */

.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  transform: translateX(100%);
  transition: transform 0.5s var(--ease-out);
  visibility: hidden;
  pointer-events: none;
  z-index: 100;
}

.mobile-menu.is-open {
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
}

.mobile-menu .menu-link {
  opacity: 0;
  transform: translateX(30px);
  transition:
    opacity 0.4s var(--ease-out),
    transform 0.4s var(--ease-out);
}

.mobile-menu.is-open .menu-link:nth-child(1) { transition-delay: 100ms; opacity: 1; transform: translateX(0); }
.mobile-menu.is-open .menu-link:nth-child(2) { transition-delay: 160ms; opacity: 1; transform: translateX(0); }
.mobile-menu.is-open .menu-link:nth-child(3) { transition-delay: 220ms; opacity: 1; transform: translateX(0); }
.mobile-menu.is-open .menu-link:nth-child(4) { transition-delay: 280ms; opacity: 1; transform: translateX(0); }
.mobile-menu.is-open .menu-link:nth-child(5) { transition-delay: 340ms; opacity: 1; transform: translateX(0); }
```

---

### Layer 9: Loading and Preloader Sequences

The first thing the user sees. A choreographed preloader signals quality before the content even appears.

**Minimal Progress Preloader:**

```css
/* BLUEPRINT: Minimal preloader with line expansion
   WHY: A single expanding line is more premium than a spinner.
   The line grows from center (scaleX 0 → 1) while a counter
   ticks up. When loading completes, the preloader lifts away
   with a clip-path wipe. */

.preloader {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: clip-path 0.8s var(--ease-dramatic);
  clip-path: inset(0);
}

.preloader.is-done {
  clip-path: inset(0 0 100% 0);  /* wipes upward */
  pointer-events: none;
}

.preloader-line {
  width: 120px;
  height: 1px;
  background: var(--color-text-3);
  position: relative;
  overflow: hidden;
}

.preloader-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-text);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s linear;
}

/* JS sets --progress from 0 to 1 */
.preloader-line::after {
  transform: scaleX(var(--progress, 0));
}

.preloader-counter {
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--color-text-3);
  margin-top: 1rem;
}
```

```javascript
/* BLUEPRINT: Preloader controller
   WHY: We simulate loading progress based on font + image
   readiness. The counter formats to 3 digits (001...100).
   When all resources are loaded, we trigger the exit sequence
   and then fire the hero entry animation. */

class Preloader {
  constructor() {
    this.counter = document.querySelector(".preloader-counter");
    this.line = document.querySelector(".preloader-line");
    this.preloader = document.querySelector(".preloader");
    this.progress = 0;
    this.target = 0;
  }

  start() {
    // Track actual resource loading
    const promises = [
      document.fonts.ready,
      ...Array.from(document.images).map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.onload = res;
                img.onerror = res;
              })
      ),
    ];

    // Animate counter smoothly
    const tick = () => {
      this.progress += (this.target - this.progress) * 0.08;

      const rounded = Math.round(this.progress);
      this.counter.textContent = String(rounded).padStart(3, "0");
      this.line.style.setProperty("--progress", this.progress / 100);

      if (rounded < 100) {
        requestAnimationFrame(tick);
      } else {
        this.complete();
      }
    };

    // Simulate progress stages
    setTimeout(() => { this.target = 30; }, 100);
    setTimeout(() => { this.target = 60; }, 400);
    setTimeout(() => { this.target = 80; }, 700);

    Promise.all(promises).then(() => {
      this.target = 100;
    });

    requestAnimationFrame(tick);
  }

  complete() {
    setTimeout(() => {
      this.preloader.classList.add("is-done");
      // Trigger hero entry animation after preloader exits
      setTimeout(() => {
        document.body.classList.add("is-loaded");
      }, 800);
    }, 300);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new Preloader().start();
});
```

---

### Layer 10: Signature Micro-Animations

These are the unique, non-generic animations that separate an Awwwards site from a "nice website with some fade-ins." Use these selectively — 3-5 per page maximum. Each one is a moment of delight.

---

**1. Text Scramble / Decode Effect:**

```javascript
/* BLUEPRINT: Text scramble that decodes random characters into final text
   WHY: Creates a "hacking / decrypting" feel. Each character position
   cycles through random characters before landing on the correct one.
   Used by studios like Active Theory and Monopo. The stagger between
   character "locks" creates a wave of resolution from left to right.
   Best on: headings, stat labels, nav links on hover. */

class TextScramble {
  constructor(element) {
    this.element = element;
    this.chars = '!<>-_\\/[]{}—=+*^?#_abcdefghijklmnop';
    this.frame = 0;
    this.queue = [];
    this.resolve = null;
  }

  setText(newText) {
    const oldText = this.element.textContent;
    const length = Math.max(oldText.length, newText.length);
    return new Promise((resolve) => {
      this.resolve = resolve;
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
    });
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.element.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }
}

// Usage on hover:
// const scrambler = new TextScramble(element);
// element.addEventListener('mouseenter', () => scrambler.setText('New Text'));
// element.addEventListener('mouseleave', () => scrambler.setText('Original Text'));

// Usage on scroll reveal:
// When element becomes visible, scramble from '' to final text
```

```css
.scramble-char {
  color: var(--color-accent);
  opacity: 0.6;
}
```

---

**2. Border Draw Animation:**

```css
/* BLUEPRINT: Border that draws itself around an element
   WHY: Instead of a border "appearing," it DRAWS around the
   element like a pen tracing the edges. Uses four separate
   pseudo-elements (two on the element, two on a wrapper) each
   scaling from 0 to full width/height. The stagger creates a
   clockwise drawing sequence. Used on featured cards, hero CTAs,
   and section highlights.
   Best on: feature cards on scroll reveal, CTAs on hover. */

.border-draw {
  position: relative;
}

/* Top and Bottom borders */
.border-draw::before,
.border-draw::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.6s var(--ease-out);
}

.border-draw::before {
  top: 0;
  left: 0;
  transform-origin: left;
}

.border-draw::after {
  bottom: 0;
  right: 0;
  transform-origin: right;
}

/* Left and Right borders via inner wrapper */
.border-draw-inner::before,
.border-draw-inner::after {
  content: '';
  position: absolute;
  width: 1px;
  height: 100%;
  background: var(--color-accent);
  transform: scaleY(0);
  transition: transform 0.6s var(--ease-out);
}

.border-draw-inner::before {
  top: 0;
  right: 0;
  transform-origin: top;
  transition-delay: 0.2s;
}

.border-draw-inner::after {
  bottom: 0;
  left: 0;
  transform-origin: bottom;
  transition-delay: 0.4s;
}

/* Trigger: on hover or scroll reveal */
.border-draw:hover::before,
.border-draw:hover::after,
.border-draw.is-visible::before,
.border-draw.is-visible::after {
  transform: scaleX(1);
}

.border-draw:hover .border-draw-inner::before,
.border-draw:hover .border-draw-inner::after,
.border-draw.is-visible .border-draw-inner::before,
.border-draw.is-visible .border-draw-inner::after {
  transform: scaleY(1);
}
```

---

**3. Ripple Click Effect (Material-Inspired, Premium):**

```javascript
/* BLUEPRINT: Click ripple that expands from the click point
   WHY: The ripple originates from the EXACT cursor position,
   not from the center. This creates a direct spatial connection
   between the user's action and the visual feedback. The ripple
   expands as a circle using scale(0) → scale(4) and fades out.
   Unlike Material Design's harsh ripple, this version uses a
   softer gradient edge and custom easing for a premium feel.
   Best on: all buttons, cards, nav items. */

function initRipple() {
  document.querySelectorAll('[data-ripple]').forEach((el) => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        margin-left: ${-size / 2}px;
        margin-top: ${-size / 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: scale(0);
        opacity: 1;
        pointer-events: none;
        animation: ripple-expand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;

      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
```

```css
@keyframes ripple-expand {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
```

---

**4. Shimmer / Skeleton Loading:**

```css
/* BLUEPRINT: Shimmer loading state that sweeps across elements
   WHY: While content loads, placeholder shapes with a sweeping
   shimmer convey progress better than a spinner. The gradient
   moves via translateX animation. The shimmer angle (-20deg)
   creates a natural light-sweep direction. This runs ONLY
   until real content replaces it — never as a permanent effect.
   Best on: cards, images, text blocks during async data fetch. */

.shimmer {
  background: var(--color-surface, #e0e0e0);
  background-image: linear-gradient(
    -20deg,
    transparent 25%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 75%
  );
  background-size: 200% 100%;
  animation: shimmer-sweep 1.5s ease-in-out infinite;
  border-radius: var(--radius-card, 8px);
}

@keyframes shimmer-sweep {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Dark mode variant */
.shimmer--dark {
  background: rgba(255, 255, 255, 0.05);
  background-image: linear-gradient(
    -20deg,
    transparent 25%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 75%
  );
  background-size: 200% 100%;
  animation: shimmer-sweep 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .shimmer, .shimmer--dark {
    animation: none;
  }
}
```

---

**5. Infinite Marquee / Ticker:**

```css
/* BLUEPRINT: Infinite horizontal marquee
   WHY: A continuously scrolling strip of logos, testimonials,
   or text creates ambient motion that fills horizontal space.
   The trick: duplicate the content, place both copies side by
   side, and translate the container by -50% (one copy's width).
   When it reaches -50%, it snaps back to 0 — but since the
   second copy is now where the first was, the loop is seamless.
   Speed: 30s for logos, 20s for text, 40s for slow ambient.
   Best on: client logos, testimonial strips, tech stack badges. */

.marquee {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.marquee-inner {
  display: inline-flex;
  animation: marquee-scroll 30s linear infinite;
}

.marquee:hover .marquee-inner {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Fade edges for seamless look */
.marquee::before,
.marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(to right, var(--color-bg), transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(to left, var(--color-bg), transparent);
}

@media (prefers-reduced-motion: reduce) {
  .marquee-inner {
    animation: none;
  }
}
```

```html
<!-- Usage: duplicate content for seamless loop -->
<div class="marquee">
  <div class="marquee-inner">
    <!-- First copy -->
    <span class="marquee-item">Logo 1</span>
    <span class="marquee-item">Logo 2</span>
    <span class="marquee-item">Logo 3</span>
    <!-- Exact duplicate for seamless loop -->
    <span class="marquee-item">Logo 1</span>
    <span class="marquee-item">Logo 2</span>
    <span class="marquee-item">Logo 3</span>
  </div>
</div>
```

---

**6. Morphing Blob Background:**

```css
/* BLUEPRINT: Organic morphing blob
   WHY: An amorphous shape that slowly changes form creates
   a living, organic background element. Uses border-radius
   animation with 8-value syntax (4 corners × 2 axes) to
   create asymmetric, organic shapes. The slow duration (8s)
   makes it ambient. Pair with blur(40px) for a soft glow.
   Best on: hero backgrounds, behind pricing cards, CTA sections. */

.morph-blob {
  width: 400px;
  height: 400px;
  background: linear-gradient(
    135deg,
    var(--blob-color-1, rgba(99, 102, 241, 0.3)),
    var(--blob-color-2, rgba(168, 85, 247, 0.3))
  );
  filter: blur(40px);
  animation: morph 8s ease-in-out infinite;
  position: absolute;
  pointer-events: none;
}

@keyframes morph {
  0%, 100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: rotate(45deg) scale(1.05);
  }
  50% {
    border-radius: 50% 60% 30% 60% / 30% 40% 70% 60%;
    transform: rotate(90deg) scale(1);
  }
  75% {
    border-radius: 40% 60% 50% 40% / 60% 50% 40% 70%;
    transform: rotate(135deg) scale(0.95);
  }
}

@media (prefers-reduced-motion: reduce) {
  .morph-blob {
    animation: none;
    border-radius: 50%;
  }
}
```

---

**7. Hover Color Wipe (Button/Card Background):**

```css
/* BLUEPRINT: Background color wipe on hover
   WHY: Instead of a flat background-color transition, the new
   color WIPES across from one edge. Uses a pseudo-element
   that scales from 0 to full width. The wipe direction (left
   to right) creates intentional, directional motion that a
   simple color fade cannot achieve. The z-index layering
   ensures text stays above the wipe layer.
   Best on: CTAs, nav links, feature list items. */

.hover-wipe {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.hover-wipe::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease-snap);
  z-index: -1;
}

.hover-wipe:hover::before {
  transform: scaleX(1);
}

/* Text color shifts when wipe is active */
.hover-wipe {
  transition: color 0.3s var(--ease-snap);
}

.hover-wipe:hover {
  color: white;
}

/* Variant: wipe from bottom */
.hover-wipe--up::before {
  transform: scaleY(0);
  transform-origin: bottom;
}

.hover-wipe--up:hover::before {
  transform: scaleY(1);
}
```

---

**8. Elastic Spring Hover (Bouncy Scale):**

```css
/* BLUEPRINT: Elastic spring scale on hover
   WHY: The spring easing (cubic-bezier 0.34, 1.56, 0.64, 1)
   overshoots the target scale and bounces back, creating a
   physically playful feel. The overshoot is ~1.56x which gives
   a visible bounce without feeling broken. Use on small,
   playful elements — never on large containers.
   Best on: social icons, emoji reactions, small badges, toggles. */

.spring-hover {
  transition: transform 0.5s var(--ease-spring);
  will-change: transform;
}

.spring-hover:hover {
  transform: scale(1.15);
}

.spring-hover:active {
  transform: scale(0.9);
  transition-duration: 0.1s;
}

/* Variant: spring rotate */
.spring-rotate:hover {
  transform: rotate(12deg) scale(1.1);
}
```

---

**9. Tilt Parallax Cards (Layered Depth on Hover):**

```javascript
/* BLUEPRINT: Multi-layer parallax within a card on hover
   WHY: Different elements inside the card move at different
   speeds relative to cursor position, creating depth WITHIN
   the card itself. The background shifts slightly, the main
   content shifts more, and a floating element shifts the most.
   This creates a convincing diorama / parallax box effect.
   Best on: feature cards, testimonial cards, product showcase. */

function initParallaxCards() {
  document.querySelectorAll('[data-parallax-card]').forEach((card) => {
    const layers = card.querySelectorAll('[data-depth]');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 1;
        const moveX = x * depth * 20;
        const moveY = y * depth * 20;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        layer.style.transition = 'transform 0.2s ease-out';
      });
    });

    card.addEventListener('mouseleave', () => {
      layers.forEach((layer) => {
        layer.style.transform = 'translate(0, 0)';
        layer.style.transition = 'transform 0.6s var(--ease-out)';
      });
    });
  });
}
```

```html
<!-- Usage -->
<div data-parallax-card class="card">
  <div data-depth="0.5" class="card-bg"><!-- subtle shift --></div>
  <div data-depth="1" class="card-content">
    <h3>Feature Title</h3>
    <p>Description text</p>
  </div>
  <div data-depth="2" class="card-float-icon"><!-- dramatic shift --></div>
</div>
```

---

**10. Scroll-Speed Typography (Text Velocity Effect):**

```javascript
/* BLUEPRINT: Text that shifts weight/style based on scroll speed
   WHY: The faster the user scrolls, the more the text stretches
   or shifts weight. This creates a direct physical metaphor:
   speed = force = visual distortion. When scrolling stops, the
   text eases back to its resting state. Used by experimental
   typography sites and studios like Locomotive.
   Best on: large display headings in editorial/portfolio sites. */

function initScrollTypography() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('[data-scroll-type]');
  let lastScroll = 0;
  let velocity = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        velocity = Math.abs(currentScroll - lastScroll);
        lastScroll = currentScroll;

        // Clamp velocity to usable range
        const clampedVelocity = Math.min(velocity, 50);
        const skewAmount = clampedVelocity * 0.15; // max ~7.5deg
        const scaleY = 1 + clampedVelocity * 0.002; // max ~1.1

        elements.forEach((el) => {
          el.style.transform = `skewY(${currentScroll > lastScroll ? -skewAmount : skewAmount}deg) scaleY(${scaleY})`;
          el.style.transition = 'transform 0.1s ease-out';
        });

        // Reset when scroll stops
        clearTimeout(window._scrollTypeTimer);
        window._scrollTypeTimer = setTimeout(() => {
          elements.forEach((el) => {
            el.style.transform = 'skewY(0deg) scaleY(1)';
            el.style.transition = 'transform 0.6s var(--ease-out)';
          });
        }, 150);

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
```

---

**11. Staggered Grid Rain (Cards Cascading In):**

```css
/* BLUEPRINT: Cards that cascade in like falling rain
   WHY: Instead of all cards fading up together, each card
   drops in from above with a stagger that creates a "rainfall"
   pattern. The slight rotation on entry (+2deg → 0deg) adds
   a physical "settling" feel, as if each card lands and rights
   itself. Combined with scale(0.9 → 1) for mass impression.
   Best on: portfolio grids, product grids, team member cards. */

@keyframes rain-drop {
  from {
    opacity: 0;
    transform: translateY(-60px) rotate(2deg) scale(0.9);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1);
    filter: blur(0);
  }
}

.grid-rain > * {
  animation: rain-drop 0.7s var(--ease-out) both;
}

/* Cascade stagger: top-left → bottom-right */
.grid-rain > *:nth-child(1)  { animation-delay: 0ms; }
.grid-rain > *:nth-child(2)  { animation-delay: 60ms; }
.grid-rain > *:nth-child(3)  { animation-delay: 120ms; }
.grid-rain > *:nth-child(4)  { animation-delay: 100ms; }
.grid-rain > *:nth-child(5)  { animation-delay: 160ms; }
.grid-rain > *:nth-child(6)  { animation-delay: 220ms; }
.grid-rain > *:nth-child(7)  { animation-delay: 200ms; }
.grid-rain > *:nth-child(8)  { animation-delay: 260ms; }
.grid-rain > *:nth-child(9)  { animation-delay: 320ms; }

@media (prefers-reduced-motion: reduce) {
  .grid-rain > * {
    animation: enter-fade 0.3s ease both;
    animation-delay: 0ms !important;
  }
}
```

---

**12. Focus Glow Ring (Input/Button Focus):**

```css
/* BLUEPRINT: Animated glow ring on focus
   WHY: A pulsing, softly glowing ring on :focus-visible
   draws attention to the active input without the harshness
   of a solid outline. The box-shadow expands and contracts
   via animation, creating a "breathing" focus indicator.
   Uses :focus-visible (not :focus) so it only triggers
   on keyboard navigation, not mouse clicks.
   Best on: form inputs, search bars, interactive elements. */

.glow-focus:focus-visible {
  outline: none;
  animation: focus-glow 1.5s ease-in-out infinite;
}

@keyframes focus-glow {
  0%, 100% {
    box-shadow:
      0 0 0 2px var(--color-accent),
      0 0 0 4px rgba(var(--color-accent-rgb, 99, 102, 241), 0.2);
  }
  50% {
    box-shadow:
      0 0 0 3px var(--color-accent),
      0 0 0 8px rgba(var(--color-accent-rgb, 99, 102, 241), 0.1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow-focus:focus-visible {
    animation: none;
    box-shadow:
      0 0 0 2px var(--color-accent),
      0 0 0 4px rgba(var(--color-accent-rgb, 99, 102, 241), 0.3);
  }
}
```

---

**13. Tooltip Float-Up:**

```css
/* BLUEPRINT: Tooltip that floats up from the trigger element
   WHY: Tooltips that appear instantly feel mechanical. This
   tooltip translates from 8px below and fades in, creating
   a gentle "rising" motion. The 100ms delay prevents accidental
   triggers when the cursor is just passing over the element.
   The tail (::after arrow) is included for spatial anchoring.
   Best on: icon buttons, truncated text, info indicators. */

.tooltip-trigger {
  position: relative;
}

.tooltip-trigger .tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  padding: 6px 12px;
  background: var(--color-text);
  color: var(--color-bg);
  font-size: 0.75rem;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition:
    opacity 0.25s var(--ease-out),
    transform 0.25s var(--ease-out);
  transition-delay: 0ms;
}

.tooltip-trigger:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  transition-delay: 100ms;
}

/* Arrow */
.tooltip-trigger .tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--color-text);
}
```

---

**14. Image Hover Distortion (CSS Scale Shift):**

```css
/* BLUEPRINT: Image that distorts slightly on hover
   WHY: A subtle scale + skew on hover creates a "warped lens"
   effect that feels photographic and editorial. The asymmetric
   scale (scaleX slightly different from scaleY) creates an
   anamorphic distortion. The mix-blend-mode shift changes
   the image's color relationship to its container.
   Best on: portfolio images, blog thumbnails, gallery grids. */

.image-distort {
  overflow: hidden;
  border-radius: var(--radius-card, 8px);
}

.image-distort img {
  transition:
    transform 0.8s var(--ease-out),
    filter 0.8s var(--ease-out);
  will-change: transform;
}

.image-distort:hover img {
  transform: scale(1.08) skew(-1deg, 0.5deg);
  filter: contrast(1.1) saturate(1.15);
}

/* Variant: desaturate-to-color on hover */
.image-distort--desat img {
  filter: grayscale(100%);
  transition: filter 0.6s var(--ease-out), transform 0.8s var(--ease-out);
}

.image-distort--desat:hover img {
  filter: grayscale(0%);
  transform: scale(1.03);
}
```

---

**15. Rotating Text Badge:**

```css
/* BLUEPRINT: Circular text that rotates continuously
   WHY: A slow-spinning circular badge with text on a path
   creates an ambient decorative element. The 12s duration
   is slow enough to be meditative, not distracting. Use SVG
   textPath for the curved text. Position absolutely in a
   corner or near a CTA.
   Best on: hero corners, next to CTAs, portfolio project cards. */

.rotating-badge {
  width: 120px;
  height: 120px;
  animation: spin-slow 12s linear infinite;
}

.rotating-badge svg text {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  fill: var(--color-text-2);
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .rotating-badge {
    animation: none;
  }
}
```

```html
<!-- Usage -->
<div class="rotating-badge">
  <svg viewBox="0 0 120 120">
    <defs>
      <path id="circle-path" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
    </defs>
    <text>
      <textPath href="#circle-path">SCROLL TO EXPLORE • SCROLL TO EXPLORE • </textPath>
    </text>
  </svg>
</div>
```

---

**16. Stagger Reveal with Rotation (Fanning Cards):**

```css
/* BLUEPRINT: Cards that fan in from a central point
   WHY: Instead of a simple stagger fade-up, each card starts
   rotated and off-position, then "fans" into its final place.
   This creates a playing-card-spread effect. The rotation
   starts at ±8deg (alternating) and settles to 0. Combined
   with translateX to create lateral spread.
   Best on: testimonial cards, team grids, pricing cards. */

@keyframes fan-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px) rotate(-8deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0) scale(1);
  }
}

@keyframes fan-in-right {
  from {
    opacity: 0;
    transform: translateX(30px) rotate(8deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0) scale(1);
  }
}

.fan-reveal > *:nth-child(odd) {
  animation: fan-in-left 0.7s var(--ease-out) both;
}

.fan-reveal > *:nth-child(even) {
  animation: fan-in-right 0.7s var(--ease-out) both;
}

.fan-reveal > *:nth-child(1) { animation-delay: 0ms; }
.fan-reveal > *:nth-child(2) { animation-delay: 80ms; }
.fan-reveal > *:nth-child(3) { animation-delay: 160ms; }
.fan-reveal > *:nth-child(4) { animation-delay: 240ms; }

@media (prefers-reduced-motion: reduce) {
  .fan-reveal > * {
    animation: enter-fade 0.3s ease both !important;
    animation-delay: 0ms !important;
  }
}
```

---

**17. Gradient Border Animation:**

```css
/* BLUEPRINT: Animated gradient border that rotates around an element
   WHY: A border that shifts colors creates a living, iridescent
   edge. Uses a conic-gradient on a pseudo-element slightly larger
   than the element, with the element's own background masking the
   center. The @property rule enables smooth angle animation.
   Best on: featured cards, pricing cards, CTA buttons, hero elements. */

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.gradient-border {
  position: relative;
  border-radius: var(--radius-card, 12px);
  padding: 2px; /* border width */
  background: conic-gradient(
    from var(--gradient-angle),
    var(--grad-1, #6366f1),
    var(--grad-2, #a855f7),
    var(--grad-3, #ec4899),
    var(--grad-4, #6366f1)
  );
  animation: gradient-rotate 3s linear infinite;
}

.gradient-border > * {
  background: var(--color-bg);
  border-radius: calc(var(--radius-card, 12px) - 2px);
}

@keyframes gradient-rotate {
  to { --gradient-angle: 360deg; }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-border {
    animation: none;
    background: var(--color-border);
  }
}
```

---

**18. Hover Image Reveal (Text → Image Transition):**

```css
/* BLUEPRINT: Text item that reveals an image on hover
   WHY: A list of text items where hovering reveals a floating
   image next to the cursor creates an editorial, gallery-like
   experience. The image scales from 0 and fades in, positioned
   relative to the hovered list item. Used heavily on portfolio
   sites (Locomotive, Aristide Benoist, Dennis Snellenberg).
   Best on: project lists, blog post lists, portfolio items. */

.reveal-list-item {
  position: relative;
  cursor: pointer;
}

.reveal-list-item .reveal-image {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.4s var(--ease-snap),
    transform 0.4s var(--ease-snap);
  z-index: 10;
}

.reveal-list-item:hover .reveal-image {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

/* Stagger effect: shift image position per item */
.reveal-list-item:nth-child(even) .reveal-image {
  right: auto;
  left: 20%;
}
```

---

**19. Cursor Trail / Custom Cursor:**

```javascript
/* BLUEPRINT: Custom cursor with trailing dot
   WHY: A custom cursor with a smaller leading dot and a larger
   trailing circle creates a fluid, living cursor feel. The
   trailing circle uses lerp (linear interpolation) to smoothly
   follow the cursor with delay, creating an elastic tether.
   The cursor changes shape/color on interactive elements.
   Best on: portfolio sites, agency sites, creative studios. */

function initCustomCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return; // No custom cursor on touch

  const dot = document.createElement('div');
  const circle = document.createElement('div');
  dot.className = 'cursor-dot';
  circle.className = 'cursor-circle';
  document.body.append(dot, circle);

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  // Lerp the trailing circle
  function animate() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    circle.style.transform = `translate(${circleX - 20}px, ${circleY - 20}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Expand on interactive elements
  document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      circle.classList.add('cursor-active');
    });
    el.addEventListener('mouseleave', () => {
      circle.classList.remove('cursor-active');
    });
  });
}
```

```css
/* Hide default cursor on the page */
.has-custom-cursor {
  cursor: none;
}
.has-custom-cursor a,
.has-custom-cursor button {
  cursor: none;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  mix-blend-mode: difference;
}

.cursor-circle {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1.5px solid var(--color-accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transition: width 0.3s var(--ease-snap), height 0.3s var(--ease-snap), border-color 0.3s ease;
  mix-blend-mode: difference;
}

.cursor-circle.cursor-active {
  width: 60px;
  height: 60px;
  border-color: var(--color-accent);
  background: rgba(var(--color-accent-rgb, 99,102,241), 0.08);
}
```

---

**20. Scroll-Triggered Clip-Path Section Reveal:**

```css
/* BLUEPRINT: Section that reveals via expanding clip-path
   WHY: Instead of a simple fade-in, the entire section reveals
   through an expanding circle (or polygon) clip-path. This
   creates a cinematic "iris" transition between sections.
   Uses intersection observer to trigger. The circle starts
   at 0% radius and expands to cover the full section.
   Best on: hero-to-content transitions, portfolio section entries. */

.clip-reveal {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 1.2s var(--ease-dramatic);
}

.clip-reveal.is-visible {
  clip-path: circle(150% at 50% 50%);
}

/* Variant: reveal from bottom-left corner */
.clip-reveal--corner {
  clip-path: circle(0% at 0% 100%);
}

.clip-reveal--corner.is-visible {
  clip-path: circle(200% at 0% 100%);
}

/* Variant: polygon wipe from left */
.clip-reveal--wipe {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path 0.9s var(--ease-out);
}

.clip-reveal--wipe.is-visible {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

@media (prefers-reduced-motion: reduce) {
  .clip-reveal,
  .clip-reveal--corner,
  .clip-reveal--wipe {
    clip-path: none !important;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  .clip-reveal.is-visible,
  .clip-reveal--corner.is-visible,
  .clip-reveal--wipe.is-visible {
    opacity: 1;
  }
}
```

---

### → Micro-Animation Selection Guide

Do not use all 20 effects on one page. Select 4-6 that match the project's personality:

| Project type | Recommended signature effects |
|---|---|
| **Tech/SaaS landing** | Text scramble on hero, gradient border on pricing, shimmer loading, hover wipe buttons |
| **Creative agency** | Custom cursor trail, image hover reveal on project list, clip-path section reveals, morphing blob background |
| **Portfolio** | Tilt parallax cards, fan reveal on grid, image distortion hover, text scramble on project titles |
| **Editorial/blog** | Scroll-speed typography, marquee ticker, word-by-word masked reveals, border draw on features |
| **E-commerce** | Ripple click on CTAs, shimmer loading for products, elastic spring on cart icons, gradient border on featured products |
| **Luxury/brand** | Rotating text badge, cursor glow, clip-path reveals, border draw animation, morphing blob |

⚠ **Drift Warning:** Signature micro-animations are spice, not the main dish. 4-6 per page maximum. If every element has a unique animation, none of them feel special. The signature effects should be on YOUR MOST IMPORTANT elements — the hero heading, the primary CTA, the featured card, the section transition. Everything else uses the standard fade-up-deblur reveal system.

## Phase 4: Motion Diff

Compare your animations against the Motion Brief and Timing Sheet. Walk through every category. Any FAIL blocks delivery.

### ⚡ Coverage Check (MANDATORY — Run First)

| Check | PASS/FAIL |
|---|---|
| **Every heading** on the page has a scroll reveal or entry animation | |
| **Every paragraph/body text** has at minimum a fade-up reveal | |
| **Every card** has a scroll reveal AND a hover state (lift + shadow) | |
| **Every button** has hover (lift/wipe/color) + active (press) + focus-visible states | |
| **Every link** has a hover underline animation or color shift | |
| **Every image** has a reveal animation (clip-path, scale-in, or fade) | |
| **Every input** has a focus state (glow, border shift, or label animation) | |
| **Every section** has scroll-triggered entry (no section just "sits there") | |
| **Every decorative element** has ambient motion (float, rotate, pulse) | |
| **Every divider/line** animates in (scaleX expansion or fade) | |
| **Every icon** has hover feedback (color, scale, or rotation shift) | |
| **Stats/numbers** count up from 0 when scrolled into view | |
| **Nav bar** has an entry animation on page load | |
| **Footer** has scroll-triggered stagger reveal on its contents | |
| Scroll the entire page top-to-bottom: ZERO static elements found | |

⚠ **If any row is FAIL, go back and add the missing animation before proceeding.** This is not optional. A page with 90% animation coverage has dead spots that destroy the premium feel.

### Feel Check

| Check | PASS/FAIL |
|---|---|
| Page entry completes in under 800ms total | |
| No element "pops" into existence without any animation | |
| Stagger follows visual hierarchy (heading before subtext before CTA) | |
| Scroll reveals trigger at a natural point (~15-20% element visibility) | |
| Hover feedback is immediate (perceived start ≤ 150ms) | |
| No animation feels "slow" or makes the user wait | |
| No animation draws attention to ITSELF rather than to the content | |
| At least 3-5 signature micro-animations are present (not just fade-ups everywhere) | |
| The page has a "wow moment" — one animation that is uniquely memorable | |

### Easing Check

| Check | PASS/FAIL |
|---|---|
| No CSS keyword easings (ease, ease-in, ease-out) on visible animations | |
| All entry animations use --ease-out (snappy decel) | |
| All hover interactions use --ease-snap (energetic out) | |
| All state transitions use --ease-in-out (smooth) | |
| Easing palette is consistent across the entire page | |

### Performance Check

| Check | PASS/FAIL |
|---|---|
| All animations use ONLY `transform` and `opacity` (except clip-path reveals and filter:blur entries) | |
| No animations on `top`, `left`, `width`, `height`, `margin`, `padding` | |
| `will-change` is applied only to elements that are actively animating | |
| `will-change` is removed after animation completes (for one-shot animations) | |
| No `backdrop-filter` on scrolling elements (only fixed/sticky) | |
| Scroll listeners use `{ passive: true }` | |
| Page maintains 60fps during all animations (check DevTools → Performance) | |
| No layout thrashing (reading layout → writing layout in a loop) | |

### Accessibility Check

| Check | PASS/FAIL |
|---|---|
| All motion respects `prefers-reduced-motion: reduce` | |
| Reduced motion fallback is opacity-only fade (no transforms) | |
| Split text has `aria-label` preserving the original text | |
| No essential information is conveyed ONLY through animation | |
| Focus states are visible and not obscured by animations | |
| Auto-playing animations (marquee, floats, gradients) can be paused (WCAG 2.2.2) | |
| Custom cursor does not appear on touch devices | |

### Technical Check

| Check | PASS/FAIL |
|---|---|
| Scroll reveal uses IntersectionObserver, not scroll event listener | |
| Scroll-linked animations use `scrub` (not triggered by scroll events) | |
| Touch devices have `smoothTouch: false` if using Lenis | |
| No scroll-jacking (overriding native scroll behavior) without clear justification | |
| Parallax is disabled on mobile (too janky on underpowered devices) | |
| Custom cursor is disabled on mobile/touch | |
| Preloader shows content within 3 seconds maximum | |
| No FOUC (flash of unstyled content) before animations initialize | |

### Composition Check

| Check | PASS/FAIL |
|---|---|
| Maximum 2-3 complex animations running simultaneously on screen | |
| No competing motion (two elements fighting for attention at the same time) | |
| Ambient motion (floats, gradients) does not compete with interactive motion | |
| Animation density matches the Motion Brief (minimal/moderate/rich) | |
| The page feels cohesive — all motion speaks the same language | |
| Signature micro-animations are on the MOST important elements, not random ones | |

---

## The Anti-Patterns

These are the specific failures that turn premium motion into amateur animation. Check for all of them.

### ❌ The Slow Reveal
Everything fades in over 1.5 seconds. The page feels like it's buffering. **Fix:** Keep reveals under 800ms. The user came for content, not a curtain call.

### ❌ The Scroll Carnival
Every element has a different animation: this one slides left, that one bounces, this one rotates in. **Fix:** Use ONE reveal animation (fade-up-deblur) for all scroll reveals. Consistency reads as intentional.

### ❌ The Hover Disco
Buttons scale to 1.1x, cards rotate, links flash different colors. **Fix:** Hover effects should be subtle: 2px lift + shadow expansion for cards, background-color shift for buttons. The user shouldn't be startled.

### ❌ The Parallax Soup
Five layers of parallax on every section. Foreground, midground, background, all moving at different speeds. **Fix:** Maximum 2 parallax layers per viewport. One subtle background shift, one element float. More is motion sickness.

### ❌ The Text Disassembly
Every heading character-splits and reassembles from random positions. **Fix:** Character-split maximum ONE heading per page. Use word-reveal on section headings. Use simple fade-up on everything else.

### ❌ The Infinite Preloader
A 5-second preloader with elaborate animations before the content appears. **Fix:** Preloader maximum 2.5 seconds. If content loads faster, end sooner. Never add artificial delay.

### ❌ The Missing Reduced Motion
No `prefers-reduced-motion` media query anywhere. **Fix:** Every single animation must gate behind `prefers-reduced-motion: reduce` with an opacity-only fallback.

### ❌ The Layout Animator
Animating `width`, `height`, `top`, `left`, `padding`, `margin`, or `border-radius`. **Fix:** Only animate `transform` and `opacity`. Use `transform: scale()` instead of `width`/`height`. Use `transform: translate()` instead of `top`/`left`.

---

## Framework Decision Matrix

| If the project uses... | Use this motion stack |
|---|---|
| **Vanilla HTML/CSS/JS** | CSS keyframes + transitions + IntersectionObserver. Add GSAP only for scroll-pinning or complex timelines |
| **React (no framework)** | Framer Motion (`motion/react`). It handles AnimatePresence, layout animations, and gesture detection |
| **Next.js** | Framer Motion + View Transitions API for page transitions |
| **Vue** | `<Transition>` / `<TransitionGroup>` components + GSAP for scroll |
| **Astro** | View Transitions API (built-in) + CSS animations + GSAP for scroll |
| **Svelte** | Built-in `transition:` and `animate:` directives + GSAP for scroll |

**When to reach for GSAP:**
- Scroll-pinned (sticky) sequences where content changes as you scroll
- Horizontal scroll sections
- Complex timelines with overlapping animations
- Text splitting with SplitText plugin (premium, but best-in-class)

**When CSS is enough:**
- Entry animations (keyframes + animation-delay)
- Hover states (transitions)
- Simple scroll reveals (IntersectionObserver + CSS transitions)
- Floating/ambient motion (keyframes + infinite)
- Accordion/tab state changes (transitions)

---

## The Apple-Level Motion Standards

These are the non-negotiable standards that separate Apple/Awwwards motion from everything else. They apply regardless of framework. Memorize them.

> **Spring physics are mandatory.** Use CSS `linear()` spring curves or Framer Motion springs for EVERY primary animation (entries, reveals, modals, transitions). Cubic-bezier is acceptable only for secondary motion (hovers, color shifts, ambient). If the page feels "digital" instead of "physical," the easing is wrong.

> **Material 3 Expressive is the baseline.** Google's M3 Expressive easing — `cubic-bezier(0.05, 0.7, 0.1, 1.0)` — is the MINIMUM quality for any transition. If your easing is less intentional than this, replace it.

> **Every curve is a conscious choice.** The same 400ms animation with `ease`, `cubic-bezier(0.16, 1, 0.3, 1)`, and a spring `linear()` produces three completely different emotional responses: generic, professional, and alive. You must be able to justify WHY you chose each curve.

> **Stagger creates narrative.** Elements appearing simultaneously is a data dump. Elements appearing in sequence is a story. The stagger order IS your visual hierarchy. Apple staggers with 80-120ms precision.

> **Motion is restraint with intensity.** The most awarded sites have fewer animations, not more — but each one is more sophisticated. A single spring-physics text reveal with word masking is worth more than 20 generic fade-ins. Quality over quantity, always.

> **Performance is non-negotiable.** A 45fps animation is worse than no animation. Only animate `transform`, `opacity`, and `filter`. Test on a throttled CPU. If it's not 60fps, simplify until it is. Use `will-change` surgically.

> **Reduced motion is not optional.** Every animation gates behind `prefers-reduced-motion`. The reduced version uses opacity-only fades at shorter durations. No transforms, no parallax, no spring overshoot, no scroll-linked sequences.

> **The acid test.** Take a screenshot of your page. Put it next to apple.com, linear.app, vercel.com, or stripe.com. If your motion design looks like it belongs on a different planet, start over. If it looks like it could be a page on one of those sites, you've passed.
