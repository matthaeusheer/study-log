# study-log — Product Spec

## Purpose

A public study journal for an actively job-searching engineer. Dual audience with equal weight:

- **Interviewers**: land on the site and within 10 seconds understand breadth, depth, and consistency of learning
- **Author (Matt)**: frictionless authoring — drop a Markdown file, it appears. No CMS, no dashboard, no ceremony

The site itself is a portfolio piece. Its aesthetic and engineering choices send a signal.

---

## Content Domains

Entries are expected across four domains:

- CS fundamentals + system design (algorithms, data structures, distributed systems, databases)
- Platform / infra (Kubernetes, cloud, CI/CD, observability, networking)
- Languages / runtimes (Rust, Go, Python, C++, etc.)
- Robotics + interview prep (ROS, control systems, embedded, Leetcode, behavioral)

These are not enforced categories — they emerge from tags.

---

## Authoring Model

**Pure Markdown with YAML frontmatter.** No tooling required.

Drop a `.md` file in `entries/`. That's it. The site picks it up on next build.

### Entry filename convention

```
YYYY-MM-DD-slug.md
```

### Frontmatter schema

```yaml
---
title: "Short descriptive title"            # required
date: 2026-07-26                            # required, ISO date
tags: [tag1, tag2]                          # required, lowercase-kebab
depth: deep                                 # required: quick-read | solid | deep | repetition
summary: "One sentence. What you learned."  # optional but strongly encouraged
links:                                      # optional
  - label: "Human-readable name"
    url: "https://..."
---
```

### Depth semantics

| Value | Meaning |
|-------|---------|
| `quick-read` | Skimmed a resource, got the gist. ~30 min |
| `solid` | Read carefully, could explain it. ~1–3 hrs |
| `deep` | Went deep: implemented, debugged, or could teach it. 3+ hrs |
| `repetition` | Active drilling or spaced repetition. Leetcode patterns, flashcards, re-reading key material. |

### Body

Free-form Markdown. No required sections. Common patterns:

- `## What I studied` — scope of the session
- `## Key insight` — the thing that clicked
- `## What I'd do differently` / `## Next` — reflection

Keep entries **lightweight**. A summary + a few bullet points beats a wall of text. The log is a signal, not a textbook.

---

## Site Structure

```
/                   — index: header, entry list, tag cloud
/entry/[id]         — entry detail page
404                 — shell-style "not found" page
```

No search, no pagination, no categories page — YAGNI. Add if the entry count demands it.

### 404 page

A custom not-found page that reads like a shell error rather than a generic
web 404, reinforcing the terminal conceit:

```
> cd <requested-path>
bash: cd: <requested-path>: No such file or directory

> cd ~
```

The last line links home (`/`). Uses the same terminal styling (prompt marks,
dim error text in the red accent color).

---

## Index Page Layout

Four sections, each preceded by a fake terminal prompt line. The prompt uses a
minimal `>` marker (not `user@host:~$`), e.g. `> cat README.md`.

1. **README block** — site title + a single tight sentence describing the log. No stats/counts row.
2. **Activity grid** — GitHub-style contributions heatmap, 6-month window (see Activity Grid)
3. **Entry list** — `git log`-style, newest first, wrapped in a bordered panel (same box treatment as the other sections for visual consistency). Each row: date | depth indicator | title | tags. The panel shows ~7 rows at a time (`> git log --oneline`) and scrolls internally to reveal the rest — the box height is fixed, older entries scroll into view. The depth indicator is a set of `▸` arrows: `quick-read`=▸, `repetition`=▸▸, `solid`=▸▸, `deep`=▸▸▸ (every depth has arrows, colored per the depth palette).
4. **Word cloud** — the topics/tags rendered as a true word cloud: each tag's font size scales subtly with its frequency, staying around the entry-list text size (~0.9rem baseline, modest range). No `--flag` prefix, no counts, no per-word colors — just the words in the normal text color, sized.

---

## Activity Grid

A ~6-month grid (columns = weeks, rows = days Sun–Sat, top to bottom), rendered as small squares. Sun on top means the Mon/Wed/Fri day labels sit centered in the column for visual symmetry.

### Time window

The grid spans **6 months centered on the current month**: 3 months in the past, the current month, and 2 months into the future. This shows both recent momentum and that the log is an ongoing, forward-looking habit. The window is snapped to whole Sun–Sat weeks covering that date range.

### Intensity scoring (depth-weighted)

| Depth | Score |
|-------|-------|
| `quick-read` | 1 |
| `repetition` | 2 |
| `solid` | 3 |
| `deep` | 5 |

Multiple entries on the same day sum their scores.

### Intensity levels → color

Palette follows GitHub's dark contribution graph, tuned to the site's darker background.

| Level | Score threshold | Color | Notes |
|-------|----------------|-------|-------|
| — | page background | `#0D1117` | overall canvas |
| 0 | 0 (no entries, past) | `#151A23` filled | a past day with no study; filled solid so it reads as "logged, nothing that day" |
| — | future (no entries) | transparent fill + visible border | days that haven't happened yet: a clearly-visible outlined empty square (border in the panel-border color, full opacity), not filled |
| 1 | 1–2 | `#013A16` | faint green |
| 2 | 3–4 | `#186C2D` | medium green |
| 3 | 5–7 | `#57D364` | bright green |
| 4 | 8+ | `#57D364` | same green as level 3 (no glow) |

### Interaction

- Hover on a cell shows a tooltip: date + entry titles for that day
- Cells with entries are clickable (future: filter list to that day)
- Month labels above columns: one label per month, placed on the first week that enters that month, skipped only if it would visually overlap the previous label (≥2 columns apart). Every month in the window gets a label.
- Day-of-week labels on the left, centered: Mon / Wed / Fri (rows are Sun–Sat)

### Prompt line

```
> study-log --activity --months=6
```

---

## Keyboard Navigation (vim-style)

The entry list on the index page is navigable entirely by keyboard, mimicking
vim. This is a signal touch: it should feel native to anyone who lives in a
terminal, and be invisible/harmless to anyone who doesn't.

### Keys (index page)

| Key | Action |
|-----|--------|
| `j` | Move selection down one entry |
| `k` | Move selection up one entry |
| `Enter` | Open the selected entry |
| `g g` | Jump to first entry (press `g` twice) |
| `G` | Jump to last entry |
| `/` | Enter search: live-filter entries by title + tags |
| `Esc` | Exit search (restores full list, keeps selection) |

### Keys (entry detail page)

| Key | Action |
|-----|--------|
| `Esc` | Go back to the index (`cd ..`) |

### Hint line

Instead of a toggle-able `?` overlay, the keybindings are shown inline as a
dim hint line directly under the `> git log --oneline` prompt:

```
j/k up/down · Enter select · gg/G first/last · / filter
```

Readability comes from styling: dim base color, the keys themselves lightly
emphasized (accent color / slightly brighter), separated by `·`. It reads as a
natural continuation of the terminal output, not a UI chrome element.

### Behavior

- **Selection** is visually a vim-style *cursorline*: a colored left cursor bar
  plus a subtle row-background highlight. One entry is selected at a time.
- **A selection is always present** (no "nothing selected" state, unless a
  filter yields zero matches):
  - On initial load / reload: the **first** entry is selected.
  - When navigating **back from a detail page** (e.g. via `Esc` or the back
    link): the entry that was open is re-selected, so focus returns to where the
    user left off rather than jumping to the top. The last-opened entry id is
    remembered in `sessionStorage` and restored on return; if it's not present
    in the current (possibly filtered) list, fall back to the first entry.
- The selected row scrolls into view within the scrollable list box as an
  **instant jump** (no smooth-scroll animation) for a snappy vim feel.
- **Search (`/`)**: opens a small input styled as a shell filter
  (`/` prompt marker). Typing filters the list live — case-insensitive substring
  match against title and tags. Selection stays within the filtered set (first
  match selected). `Enter` opens the current selection; `Esc` clears the filter
  and closes the input.
- Keys are ignored while focus is in a text input (except the search box's own
  handling), so nothing hijacks normal typing.
- All of this is progressive enhancement: with JS disabled the list is still a
  plain, fully-usable set of links.

---

## Entry Detail Page Layout

- Back link (`← cd ..`)
- Commit-hash-style entry ID
- Title, date, depth badge, tags
- Summary (blockquote style, if present)
- Links block (`## refs`)
- Rendered Markdown body

---

## Aesthetic

**Terminal / code-style. Not pixel art.**

- Font: JetBrains Mono everywhere
- Palette: Tokyo Night accents (`#c0caf5` text, blue/cyan/purple/yellow/red accents) on a GitHub-dark canvas (`#0D1117` background)
- No gradients, no rounded corners, no shadows
- ASCII-style borders (1px solid `var(--bg-border)`)
- Depth indicators use color:
  - `quick-read` → green
  - `solid` → yellow
  - `deep` → red
  - `repetition` → cyan/blue (active practice, ongoing)
- Tags in the entry list/detail rendered as `#tag` in purple
- Tags in the word cloud rendered as bare words, sized by frequency, in the normal foreground text color (no per-word accent colors), normal weight

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Astro (static output) | Zero JS by default, fast, great content collections |
| Styling | Hand-written CSS | Full aesthetic control, no Tailwind bloat |
| Content | Markdown + frontmatter | Lowest authoring friction |
| Deployment | Netlify or Vercel | Free tier, push-to-deploy, preview URLs |
| Language | TypeScript (strict) | Type safety on frontmatter schema |

---

## Deployment

- `site/` is the Astro project root
- `entries/` lives at the repo root, referenced via absolute path in content config
- Build command: `npm run build` (from `site/`)
- Output dir: `site/dist/`
- Deploy target: Netlify or Vercel, connected to the GitHub repo

### Netlify config

```toml
# netlify.toml at repo root
[build]
  base    = "site"
  command = "npm run build"
  publish = "dist"
```

---

## Out of Scope (for now)

- Search / filtering by tag
- Pagination
- Dark/light mode toggle
- Comments
- RSS feed
- Auth / private entries
- A CLI authoring helper (revisit if the Markdown flow feels slow)

---

## Open Questions

- Custom domain? (decide when deploying)
- Repo visibility: public (interviewers can see source) vs. private (only the built site is public)
