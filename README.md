<div align="center">
  <img src="https://github.com/user-attachments/assets/018a0d17-ae0b-4357-958b-6108768563d8" alt="VibeCurb" width="100%" />
</div>

<br/>

<div align="center">
  <a href="https://vibecurb.pages.dev/"><img src="https://img.shields.io/badge/Website-vibecurb.pages.dev-black?style=flat-square" alt="Website" /></a>
  <a href="https://github.com/Yu-369/VibeCurb/stargazers"><img src="https://img.shields.io/github/stars/Yu-369/VibeCurb?style=flat-square&color=yellow" alt="Stars" /></a>
</div>

<br/>

AI defaults to the mean. Models are trained on millions of average websites. If you don't constrain them, they will build you an average website.

**VibeCurb is the constraint.**

It replaces your agent's guesswork with strict rules and quality gates: real hierarchy, real typography, still production-ready. Instead of letting an agent arbitrarily generate UI, VibeCurb forces it to audit, extract, build, and verify against premium standards before writing a single line of code.

> [!WARNING]
> These skills do not ask nicely. They are strict protocols that intentionally override standard AI generation defaults in favor of complex grids, deep contrast, and advanced typography. Do not use VibeCurb if you are looking for safe, generic layouts.

---

## How it works

Every skill follows the same strict pipeline:

1. **The Design Read:** The agent reads your reference image, existing code, or brief and extracts design signals (typography, color, spacing, layout, atmosphere) before writing a single line.
2. **Quality Gate 1:** No code is generated until the extraction passes. The agent must prove it understands the design direction, palette, and spatial structure first.
3. **Precise Build:** The agent builds with exact fidelity to the extraction. Each skill has its own build sequence.
4. **Visual Diff:** The output is verified against the reference across composition, typography, color, motion, and responsiveness using PASS/FAIL tables.
5. **Drift Rejection:** Generic defaults, CSS keyword easings, AI-purple gradients, and placeholder patterns are caught and rejected inline.

---

## The Skills

Different problems require different constraints. Load the specific skill pipeline tailored for your exact task.

| Skill | Category | What it does |
| :--- | :--- | :--- |
| `awwwards-hero` | Frontend | Generates an award-winning hero section from a brief or reference. Massive typography, tight palette, zero-slop layouts. |
| `visual-redesign` | Frontend | Give the agent your ugly-but-functional React code and get back something that actually looks designed, without touching a line of JS. |
| `pixel-perfect` | Frontend | Hand the agent a screenshot of any website and get back an exact code replica. Every font, color, and spacing matched. |
| `awwwards-motion` | Animations | Turns static layouts into something that moves like it's alive. Scroll reveals, kinetic typography, fluid micro-interactions tuned frame-by-frame. |
| `imagegen-frontend` | Image Generation | Generates Awwwards-tier images, editorial photography, and textures that you can feed straight into your other skills as the reference brief. |

---

## Drop it in

VibeCurb isn't a bulky dependency. One command injects production-grade design constraints directly into your agent's context.

```bash
# View all available pipelines
$ npx vibecurb-cli list

# Install a specific skill
$ npx vibecurb-cli add visual-redesign
```

**Or do it manually:**

1. Clone this repo or download the specific `SKILL.md` file you need.
2. Place it inside your project's `.cursor/rules/` or `.agents/skills/` folder.
3. Reference the skill in your prompt: *"Based on the skill above..."*

**Works with:** Cursor, Claude Code, v0, Codex, ChatGPT, Lovable, AI Studio, Gemini CLI, and any agent that reads markdown context.

---

## The Prompt Architecture

Structure matters. If you ask for a layout without defining the aesthetic constraints first, the agent will hallucinate generic design choices. Use a narrative flow:

```
Based on the skill above, generate the <deliverable> for a <subject>.

The website is for a <context>. Because of that, I want the visual
to feel <vibe words>, with <specific elements>. Make it feel
<quality bar/reference>.

<Layout direction>. Think <composition style>, utilizing a
<color palette>. Keep it in <light/dark> mode, using <typography rules>.

I want it to look <final vibe reinforcement>. Generate the <deliverable>.
```

> [!TIP]
> The agent can't read your mind. If you tell it "make a sleek landing page," it will give you a purple gradient and a centered glassmorphic card. Providing a strong reference image removes the guesswork.

---

## Examples

<div align="center">
  <img src="https://github.com/user-attachments/assets/bec44fd6-f100-4a94-a586-441d3e58acaa" width="48%" />
  <img src="https://github.com/user-attachments/assets/af20dbab-49e6-42cf-acdc-3408b90ffb70" width="48%" />
  <br/><br/>
  <img src="https://github.com/user-attachments/assets/a5f05877-77af-484b-a025-3d6795fb2717" width="48%" />
  <img src="https://github.com/user-attachments/assets/b908ad4c-f974-4e9a-bbf6-fd4a9b4819ed" width="48%" />
  <p><em>Generated strictly via VibeCurb skills.</em></p>
</div>

---

## When things go wrong

Agents drift back toward the mean over long conversations. Here is how you snap them back.

| Problem | Fix |
| :--- | :--- |
| Output looks like a standard dashboard template. | It dropped the context. Reply: *"You ignored the skill file. Re-read it and apply the drift constraints."* |
| Typography feels weak and uninspired. | Reply: *"Your typographic scale is too safe. Increase the contrast between the h1 and body text."* |
| Agent rushes straight to code. | Reply: *"Stop. Run the Design Read first. No code until the extraction passes."* |

---

## Contribute

PRs and feature requests are welcome.

- Found a bug? Open an Issue.
- Have a new skill idea? Submit a PR.
