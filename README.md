# talk-broadsheet

Scaffold for academic talk decks in the broadsheet-newspaper aesthetic.
Stack: Quarto + Reveal.js + KaTeX + SVG plates.

Canonical exemplar: `~/GitHub/place/` (PLACE talk, ICERM TW-26-FCG, May 2026).

## Scaffold a new deck

```bash
TALK=talk-neurips-2026
mkdir ~/GitHub/$TALK
rsync -a --exclude='.git' ~/templates/talk-broadsheet/ ~/GitHub/$TALK/
cd ~/GitHub/$TALK && git init && git add . && git commit -m "scaffold broadsheet deck"
claude
```

`rsync --exclude='.git'` drops this template's git history so the new talk repo starts fresh. `cp -R` would copy `.git/` too and tangle the histories.

The scaffold drops `.claude/agents/slide-deck-architect.md` into the new repo,
so Claude Code auto-discovers the agent there. Then:

> Use slide-deck-architect to fill the scaffold. The talk is a 25-min plenary
> at NeurIPS on \<topic\>, audience is \<field\>, co-authors are \<names\>,
> draws from \<paper arxiv ID\>. Headline claim: \<one sentence\>.

## What's in the scaffold

```
talk-broadsheet/
├── .claude/agents/slide-deck-architect.md   # the deck-building agent
├── _quarto.yml                              # Reveal.js + KaTeX config
├── index.qmd                                # 4 sections + thank-you skeleton
├── theme.scss                               # broadsheet palette & idioms
├── README.md                                # this file
└── assets/
    ├── inject-landmark.js                   # masthead, edition line, seal, byline
    ├── plate-template.svg                   # blank section plate to clone
    └── section-{i,ii,iii,iv}-plate.svg      # four section dividers
```

## Build commands

```bash
quarto render index.qmd --to revealjs     # render to index.html
quarto preview index.qmd                   # live-reload preview
```

## Design quick reference

| Idiom           | Pandoc div                                                | Purpose                                          |
|-----------------|-----------------------------------------------------------|--------------------------------------------------|
| Section divider | `# § N. Title {.section-divider}`                          | Major section break                              |
| Section deck    | `::: {.section-deck}`                                      | Italic one-liner under section title             |
| Plate           | `::: {.plate}` + `![](assets/...svg)`                      | Broadsheet SVG figure                            |
| Plate caption   | `::: {.plate-caption}`                                     | Italic line under a plate                        |
| Slide title     | `## Title`                                                 | Content slide                                    |
| Standfirst      | `::: {.standfirst}`                                        | Headline opener                                  |
| Dispatch        | `::: {.dispatches .fragment data-title="..."}`             | Content box (bullets, table, KaTeX)              |
| Definition box  | `::: {.def-box}`                                           | Boxed theorem/definition/equation                |
| Transition      | `::: {.transition-line .fade-up}` + `.followup-stamp`     | Italic closer with manicule callout              |
| Speaker notes   | `::: {.notes}`                                             | Presenter-only HTML                              |

## Critical gotchas

- **Greek letters**: always KaTeX (`$\nu$`, `$\rho$`, `$\Delta$`), never Unicode (ν, ρ, Δ) in body text. CSS text-transform upcases them silently.
- **Fleurons**: SVG paths only, never Unicode `❦` (renders as apple-glyph in font fallback).
- **Title speaker notes**: configure `TITLE_NOTES_HTML` in `assets/inject-landmark.js`. A top-level `:::notes` block creates a phantom blank slide 2.
- **Phantom blank slide 2**: any body content before the first `#` heading — even an HTML `<!-- comment -->` — becomes an empty slide 2. Keep nothing between the `---` front matter and the first `# § ...` divider.
- **Std-dev subscripts**: `$\mathbf{87.2}_{\pm 0.6}$` not `**87.2** ${\pm 0.6}$`.
- **Cross-refs**: no "Thm 3.1" / "Eq. (11)" / "§2.5" in user-visible text — keep in `::: {.notes}` only.

## Maintenance

This template is the canonical source of truth for the broadsheet aesthetic.
The agent file lives here too (`.claude/agents/slide-deck-architect.md`),
so editing it once propagates to every future scaffold.

PLACE (`~/GitHub/place/`) is the polished reference deck — read it when you
need an example of a specific idiom in delivered form. Do not edit it.
