---
version: alpha
name: rootwithkhandal-design-system
description: A dark-slate, console-native identity with one saturated voice — amber ({colors.accent}). Slate surfaces (primary/secondary) carry the interface, tertiary grey carries the light reading surfaces, and amber appears only where something needs attention or action, like a status LED on a rack. Rectilinear, tightly rounded, tone-layered instead of shadow-layered. IBM Plex Sans Condensed for headlines, IBM Plex Sans for reading, IBM Plex Mono for real machine data only (hashes, IDs, timestamps, code).

colors:
  primary: "#3a4750"
  secondary: "#313841"
  tertiary: "#eeeeee"
  accent: "#ea9216"
  accent-pressed: "#c97a0a"
  accent-deep: "#8f4d00"
  accent-soft: "#fbecd0"
  accent-wash: "#373128"
  ink: "#1f242a"
  canvas: "#ffffff"
  surface: "#f7f7f7"
  hairline: "#dfe1e3"
  hairline-soft: "#e7e8ea"
  hairline-strong: "#c4c9ce"
  hairline-dark: "#4f5d68"
  steel: "#56636d"
  muted: "#8a949c"
  on-dark-muted: "#b3bdc5"
  status-success: "#5fc08f"
  status-danger: "#f26d6f"
  status-info: "#6cabe6"

typography:
  hero-display:
    fontFamily: IBM Plex Sans Condensed
    fontSize: 72px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.5px
  display-lg:
    fontFamily: IBM Plex Sans Condensed
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -0.25px
  heading-1:
    fontFamily: IBM Plex Sans Condensed
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.15
  heading-2:
    fontFamily: IBM Plex Sans Condensed
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.20
  heading-3:
    fontFamily: IBM Plex Sans Condensed
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
  heading-4:
    fontFamily: IBM Plex Sans
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.35
  heading-5:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.40
  subtitle:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.60
  body-md-medium:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.60
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
  body-sm-medium:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.50
  label:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.40
  button-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.30
  code-md:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.60
  data-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.50

rounded:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  section-sm: 48px
  section: 72px
  section-lg: 96px
  hero: 112px

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-pressed:
    backgroundColor: "{colors.accent-pressed}"
    textColor: "{colors.ink}"
  button-primary-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.muted}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    border: "1px solid {colors.hairline-strong}"
  button-secondary-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.tertiary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    border: "1px solid {colors.hairline-dark}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  link:
    backgroundColor: "transparent"
    textColor: "{colors.accent-deep}"
    typography: "{typography.body-md-medium}"
  link-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    typography: "{typography.body-md-medium}"

  card-base:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline}"
  card-feature:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xxl}"
    border: "1px solid {colors.hairline}"
  card-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.hairline-dark}"

  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
    border: "1px solid {colors.hairline-strong}"
    height: 44px
  text-input-focused:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "2px solid {colors.accent-deep}"
  text-input-on-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
    border: "1px solid {colors.hairline-dark}"
    height: 44px
  text-input-on-dark-focused:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tertiary}"
    border: "2px solid {colors.accent}"

  tab:
    backgroundColor: "transparent"
    textColor: "{colors.steel}"
    typography: "{typography.body-sm-medium}"
    padding: "{spacing.sm} {spacing.md}"
    border: "0 0 2px transparent solid"
  tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-medium}"
    border: "0 0 2px {colors.accent-deep} solid"
  tab-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-sm-medium}"
    padding: "{spacing.sm} {spacing.md}"
    border: "0 0 2px transparent solid"
  tab-on-dark-active:
    backgroundColor: "transparent"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-sm-medium}"
    border: "0 0 2px {colors.accent} solid"

  tag:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.xs}"
    padding: "2px 8px"
  tag-on-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.xs}"
    padding: "2px 8px"
    border: "1px solid {colors.hairline-dark}"
  badge-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-success:
    backgroundColor: "{colors.status-success}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-danger:
    backgroundColor: "{colors.status-danger}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  badge-info:
    backgroundColor: "{colors.status-info}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  callout-warning:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"
    border: "1px solid {colors.accent}"

  console-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tertiary}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.hairline-dark}"
  signal-line:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.tertiary}"
    typography: "{typography.code-md}"
    border: "0 0 0 2px {colors.accent} solid"
  code-block:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tertiary}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  code-inline:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.ink}"
    typography: "{typography.code-md}"
    rounded: "{rounded.xs}"
    padding: "1px 6px"

  data-table:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  data-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    padding: "{spacing.md} {spacing.lg}"
    border: "0 0 1px {colors.hairline-soft} solid"

  nav-top:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-sm-medium}"
    padding: "0 {spacing.xxl}"
    height: 64px
    border: "0 0 1px {colors.hairline-dark} solid"
  hero-band-dark:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.tertiary}"
    rounded: "0"
    padding: "{spacing.hero} {spacing.xxl}"
  band-soft:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "0"
    padding: "{spacing.section} {spacing.xxl}"
  cta-band-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.section}"
  footer-region:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-sm}"
    padding: "{spacing.section} {spacing.xxl}"
  footer-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-sm}"
    padding: "{spacing.xxs} 0"
---

## Overview

The identity is a **dark console with one signal light**. Two near-neighbouring slates ({colors.secondary}, {colors.primary}) form the interface; {colors.tertiary} is the light reading surface; {colors.accent} amber is the only saturated colour and it is spent like a status LED — only on the thing that needs action or attention. Amber phosphor terminals and hazard/evidence labelling are the visual ancestors; the practical lesson from security tooling applies: if everything alerts, nothing does. The accent budget is therefore a design constraint, not a preference.

The site is dual-mode by section, not by toggle: dark hero, nav and footer anchor every page; light bands ({colors.tertiary} and white) carry long-form reading such as write-ups, docs and tables. The memorable element is the **signal line** — inside any console, code or data block, exactly one line or row may carry the amber treatment. Everything else stays quiet.

**Key Characteristics:**
- Two-slate interface with tone-based elevation (lighter = higher); no shadows on dark surfaces
- Amber ({colors.accent}) reserved for primary actions, the active state, and the single signal line per block
- Tight geometry: 4px controls, 8px cards, 12px hero-level panels; no pill buttons
- Left-aligned everywhere; asymmetric hero (text left, console panel right)
- Monospace only for real machine data — never for decoration
- Hairline borders carry structure; borders encode containment, not ornament

## Colors

> Brand palette supplied by the owner: `primary`, `secondary`, `tertiary`, `accent`. Everything else is derived from those four and exists to make them usable (contrast-safe text roles, surfaces, status).

### Brand
- **Primary** ({colors.primary}): Raised dark surface (cards, CTA band) and the body-text colour on light surfaces
- **Secondary** ({colors.secondary}): Base dark canvas — nav, hero band, dark page background
- **Tertiary** ({colors.tertiary}): Light section band, tag and inline-code fill, and the text colour on every dark surface
- **Accent** ({colors.accent}): Primary CTA fill, active-state rule, signal line, focus ring on dark

### Accent Family (derived)
- **Accent Pressed** ({colors.accent-pressed}): Pressed CTA. Still passes 4.5:1 with {colors.ink} text
- **Accent Deep** ({colors.accent-deep}): The only amber that may be used as text or a rule on light surfaces (links, active tab, focus ring on light). Raw {colors.accent} fails contrast there
- **Accent Soft** ({colors.accent-soft}): Warning callout background
- **Accent Wash** ({colors.accent-wash}): 12% amber over {colors.ink}; background of the signal line

### Surface
- **Ink** ({colors.ink}): Deepest surface (console, code, footer) and the text colour on amber and on light headlines
- **Canvas** ({colors.canvas}): Cards, tables and inputs on light bands
- **Surface** ({colors.surface}): Subtle light section division
- **Hairline / Soft / Strong** ({colors.hairline}, {colors.hairline-soft}, {colors.hairline-strong}): Light-surface borders — default, row dividers, input borders
- **Hairline Dark** ({colors.hairline-dark}): Every border on dark surfaces

### Text
- **Ink** ({colors.ink}): Headlines on light
- **Primary** ({colors.primary}): Body text on light
- **Steel** ({colors.steel}): Secondary text, placeholders, captions on light
- **Muted** ({colors.muted}): Disabled state only — fails 4.5:1 by design, so never for readable content
- **Tertiary** ({colors.tertiary}): Body and headline text on dark
- **On Dark Muted** ({colors.on-dark-muted}): Secondary text on dark

### Status (filled pills, ink text — never colour-only text)
- **Success** ({colors.status-success}), **Danger** ({colors.status-danger}), **Info** ({colors.status-info})
- **Warning has no separate colour.** It is {colors.accent-soft} + {colors.accent-deep} with an icon and the word "Warning". Amber never means "error".

### Verified Contrast (WCAG 2.x, computed)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| {colors.ink} | {colors.accent} | 6.41 | Button text ✔ |
| {colors.ink} | {colors.accent-pressed} | 4.67 | Pressed button text ✔ |
| {colors.accent} | {colors.ink} | 6.41 | Amber on console ✔ |
| {colors.accent} | {colors.secondary} | 4.86 | Amber text on base dark ✔ |
| {colors.accent} | {colors.primary} | 3.92 | **Large text (≥18px) and UI/borders only** |
| {colors.accent} | {colors.tertiary} | 2.10 | ✘ Never text or rules on light |
| {colors.accent} | {colors.canvas} | 2.44 | ✘ Never text or rules on light |
| {colors.accent-deep} | {colors.canvas} / {colors.tertiary} | 6.50 / 5.60 | Links, active rules on light ✔ |
| {colors.tertiary} | {colors.primary} / {colors.secondary} | 8.24 / 10.21 | Text on dark ✔ |
| {colors.on-dark-muted} | {colors.primary} | 5.01 | Secondary text on raised dark ✔ |
| {colors.primary} | {colors.canvas} / {colors.tertiary} | 9.56 / 8.24 | Body on light ✔ |
| {colors.steel} | {colors.canvas} / {colors.tertiary} | 6.17 / 5.32 | Secondary text on light ✔ |
| {colors.primary} | {colors.secondary} | 1.24 | Adjacent surfaces only — never a text/background pair |

## Typography

### Font Family
**IBM Plex Sans Condensed** — display and headings from 28px up. Tall, tight, signage-like; gives headlines an engineered rather than friendly voice.
**IBM Plex Sans** — headings below 28px, body, UI, buttons.
**IBM Plex Mono** — real machine data only: code, hashes, CVE/ticket IDs, timestamps, log lines, tech-stack tags.

One superfamily, three cuts, all SIL OFL (free to self-host). Fallbacks: Condensed → `'Arial Narrow', 'Roboto Condensed', sans-serif`; Sans → `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`; Mono → `'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace`.

### Hierarchy

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.hero-display}` | Plex Sans Condensed | 72px | 600 | 1.05 | -0.5px | Hero headline |
| `{typography.display-lg}` | Plex Sans Condensed | 56px | 600 | 1.10 | -0.25px | Section openers |
| `{typography.heading-1}` | Plex Sans Condensed | 48px | 600 | 1.15 | 0 | Page titles |
| `{typography.heading-2}` | Plex Sans Condensed | 36px | 600 | 1.20 | 0 | Subsection headlines |
| `{typography.heading-3}` | Plex Sans Condensed | 28px | 600 | 1.25 | 0 | Feature titles |
| `{typography.heading-4}` | Plex Sans | 22px | 600 | 1.35 | 0 | Card titles |
| `{typography.heading-5}` | Plex Sans | 18px | 600 | 1.40 | 0 | Small card titles |
| `{typography.subtitle}` | Plex Sans | 18px | 400 | 1.55 | 0 | Lead paragraph |
| `{typography.body-md}` | Plex Sans | 16px | 400 | 1.60 | 0 | Body |
| `{typography.body-sm}` | Plex Sans | 14px | 400 | 1.50 | 0 | Table cells, secondary text |
| `{typography.body-sm-medium}` | Plex Sans | 14px | 500 | 1.50 | 0 | Nav, tabs |
| `{typography.label}` | Plex Sans | 13px | 600 | 1.40 | 0 | Badges, form labels |
| `{typography.button-md}` | Plex Sans | 14px | 600 | 1.30 | 0 | Buttons |
| `{typography.code-md}` | Plex Mono | 14px | 400 | 1.60 | 0 | Code, console |
| `{typography.data-sm}` | Plex Mono | 12px | 500 | 1.50 | 0 | Tags, hashes, IDs |

### Principles
- Rule of thumb: **Condensed at 28px and up, Sans below.** Never Condensed for body.
- Sentence case everywhere. No tracked-out ALL-CAPS labels; a label is a label, not a costume.
- Body line length ≤ 68ch. Longer than that, add a column.
- Mono is information, not garnish: if the string isn't literally code or data, it isn't mono.
- Weight 600 is the only emphasis weight for headings; use 500 for in-sentence emphasis.

## Layout

### Spacing System
- **Base unit**: 4px, 8px primary increment
- **Tokens**: `{spacing.xxs}` (4px) through `{spacing.hero}` (112px)
- **Section rhythm**: `{spacing.section}` (72px) between bands; `{spacing.hero}` inside the hero; `{spacing.section-sm}` (48px) inside dense docs

### Grid & Container
- 1200px max width, 12 columns, 24px gutters, 32px page margin
- Hero: 7 / 5 split — headline and actions left, `console-panel` right
- Reading pages: single 68ch column, optional 4-col margin rail for metadata
- Alignment: **left-aligned by default.** Centre alignment only for a single-line CTA band

### Whitespace Philosophy
Dense inside components, generous between them. Console panels and tables are allowed to be tight; sections breathe.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 Flat | 1px `{colors.hairline}` border, no shadow | Cards, tables, inputs on light |
| 1 Tonal | Fill steps one slate lighter (`{colors.secondary}` → `{colors.primary}`) + `{colors.hairline-dark}` border, no shadow | Cards and panels on dark |
| 2 Overlay | Light: `rgba(31, 36, 42, 0.16) 0 12px 32px -8px` · Dark: `rgba(0, 0, 0, 0.45) 0 16px 40px -8px` + `{colors.hairline-dark}` border | Menus, popovers, modals only |

Shadows are invisible on dark surfaces, so tone does the elevation work there. No gradients, glows or glassmorphism.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 2px | Tags, inline code |
| `{rounded.sm}` | 4px | Buttons, inputs, badges |
| `{rounded.md}` | 8px | Cards, console and code panels, tables, callouts |
| `{rounded.lg}` | 12px | Feature cards, CTA band |
| `{rounded.full}` | 9999px | Avatars and status dots only |

Radius scales with container size, so hierarchy is legible without shadows. Buttons are deliberately **not** pills.

## Components

> Default, pressed/active, focused and disabled states only; hover is not specified. Focus ring: 2px, offset 2px — `{colors.accent}` on dark surfaces, `{colors.accent-deep}` on light. Never remove it.

### Buttons
- **`button-primary`** — Solid amber, ink text. **One per view.** Works unchanged on dark and light surfaces.
- **`button-secondary` / `button-secondary-on-dark`** — Outlined, for the second action next to a primary.
- **`button-ghost`** — Quiet toolbar and tertiary actions.
- **`link` / `link-on-dark`** — Inline text links. Amber-deep on light, amber on dark. Underline on focus and pressed. No trailing arrows.

### Cards
- **`card-base`** — Light-band card, 8px radius, hairline border.
- **`card-feature`** — Larger padding, 12px radius; for the one or two hero-level panels per page.
- **`card-dark`** — Raised card on dark (`{colors.primary}` on `{colors.secondary}`); elevation by tone.
- Cards are not decoration: if content doesn't need a container, use a divider or whitespace.

### Inputs
- **`text-input` / `text-input-on-dark`** — 44px, 4px radius. Focus swaps to a 2px amber border (deep on light, bright on dark). Placeholder in `{colors.steel}` / `{colors.on-dark-muted}`.

### Tabs
- **`tab` / `tab-active`** (and on-dark variants) — Underline style. Active state is ink/tertiary text with a 2px amber rule.

### Tags, Badges, Callouts
- **`tag`** — Mono, 2px radius; tech-stack and taxonomy chips.
- **`badge-accent|success|danger|info`** — Filled, ink text, 4px radius. Meaning is carried by the text label as well as the colour.
- **`callout-warning`** — Soft-amber fill, amber hairline, warning icon and the word "Warning" in the first line.

### Console & Code (signature)
- **`console-panel`** — Ink surface, hairline-dark border, mono. Used in the hero and for product/tool showcases with real output, not mock lorem.
- **`signal-line`** — The single amber-treated line or row inside a console, code block or data table: `{colors.accent-wash}` fill, 2px amber left bar. **Max one per block.** It marks the finding, the match, the anomaly.
- **`code-block` / `code-inline`** — Ink block on any surface; tertiary chip for inline.

### Tables
- **`data-table` / `data-row`** — Hairline-only, no zebra. Data cells (IDs, hashes, timestamps) in `{typography.data-sm}`; the signal row is the only highlighted row.

### Navigation & Regions
- **`nav-top`** — 64px, always dark (`{colors.secondary}`) even on light pages. Wordmark left, links, one amber primary at the right.
- **`hero-band-dark`** — Secondary canvas, 7/5 split, `console-panel` on the right.
- **`band-soft`** — Tertiary reading band between dark regions.
- **`cta-band-dark`** — Raised `{colors.primary}` panel with 12px radius; the only place a CTA may be centred.
- **`footer-region` / `footer-link`** — Ink base; links in `{colors.on-dark-muted}`.

## Do's and Don'ts

### Inversion — how to guarantee this brand looks wrong
Design the failure first, then forbid it:
- **Amber everywhere.** Headings, borders, icons, hover glows. Result: the signal loses meaning (alert fatigue applied to UI).
- **Amber as text or rule on light.** 2.1–2.4:1. Use `{colors.accent-deep}`.
- **Primary next to secondary as a contrast pair.** 1.24:1; it reads as one muddy slab. They are layers, not opposites.
- **Neon-green "hacker" tropes**, matrix rain, glows, skulls, hoodie imagery. The brand is calm and forensic, not cosplay.
- **Pill buttons, one radius on everything, the same soft shadow on every card.** That is the generic SaaS kit.
- **Monospace or ALL-CAPS as decoration** (eyebrows, section labels, "→" on every link).
- **Shadows on dark surfaces.** They don't render; elevate by tone.
- **Centred layouts and scroll-triggered fade-ups on every section.**

### Do
- Keep one amber primary action per view and at most one signal line per block
- Use `{colors.ink}` on amber fills, `{colors.tertiary}` on dark fills
- Layer dark surfaces by tone: `{colors.ink}` → `{colors.secondary}` → `{colors.primary}`
- Use real data in console panels (real scan output, real log lines, real hashes)
- Pair every colour-coded status with a text label

### Don't
- Don't put body text in amber, or amber text on `{colors.primary}` under 18px
- Don't add accent colours; status hues exist only inside filled badges
- Don't use Condensed for body or Mono for prose
- Don't invert to a full light theme by removing the dark nav and footer; the dark frame is the brand

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 480px | Single column. Hero 36px. Console panel below text, horizontal scroll for long lines |
| Mobile (large) | 480 – 767px | Hero 44px. 2-up tag rows |
| Tablet | 768 – 1023px | 2-column grids. Hero 56px. Nav collapses to menu |
| Desktop | 1024 – 1279px | 3-up card grids. Hero 64px. 7/5 hero split begins |
| Wide | ≥ 1280px | 72px hero, 1200px container |

### Touch Targets
- Buttons and inputs ≥ 44px tall; tabs ≥ 44px on touch
- Focus ring must remain visible at every breakpoint

### Collapsing Strategy
- **Hero**: 7/5 split → stacked, console panel after the actions
- **Tables**: horizontal scroll inside their own container; page body never scrolls sideways
- **Footer**: 4 columns → 2 → single stacked list
- **Hero type**: 72px → 64px → 56px → 44px → 36px

### Motion
- State changes: 120–180ms ease-out
- One orchestrated moment at most: the hero console types in once on load, then the amber caret blinks three times and holds solid
- Everything else responds to user action only; honour `prefers-reduced-motion` by rendering the final state

## Iteration Guide

1. Work one component at a time; reference tokens, never raw hex
2. Run `npx @google/design.md lint DESIGN.md` after edits
3. Before adding any amber, ask: *does this need action or attention?* If not, use tertiary, primary or steel
4. New variants go in as separate `components:` entries
5. Default body is `{typography.body-md}`; default heading below 28px is `{typography.heading-4}`
6. Check any new text/background pair against the contrast table before shipping

## Known Gaps

- Logo, wordmark and favicon are not specified; amber-on-slate is assumed
- Photography and illustration style are undefined; the current stance is "real data over stock imagery"
- No light-theme toggle; the dark frame plus light reading bands is the intended dual mode
- Severity scale (critical / high / medium / low) is not defined; add one if the brand ships security tooling UI with CVSS-style ratings
- Fonts must be self-hosted (IBM Plex, SIL OFL); load only the weights used: Condensed 600, Sans 400/500/600, Mono 400/500
- Lint has not been run against this file
