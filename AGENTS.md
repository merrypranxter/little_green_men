# AGENTS.md — Instructions for AI Agents

> Read this FIRST before touching anything in this repo.

## What This Repo Is

A creative coding laboratory for the **little green man** — the kitschy green oval-headed alien as a visual art trope. Sketches, shaders, SVGs, and documentation. **Static files only. No build system. No frameworks.**

## Stack Rules (DO NOT VIOLATE)

- **No npm, no bundler, no build step.** Everything must run by opening an HTML file.
- **No React, Vue, Angular, Svelte, or any SPA framework.** Vanilla JS only.
- **No Tailwind, Bootstrap, or CSS frameworks.** Use `styles/alien-tokens.css` for shared tokens.
- **p5.js loaded from CDN only:** `https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js`
- **Deployment target: GitHub Pages.** All paths must be relative. No server-side anything.

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| p5.js sketch logic | `alien_[name].js` | `alien_dancer.js` |
| p5.js gallery target | `alien_[name]_standalone.html` | `alien_dancer_standalone.html` |
| GLSL fragment shader | `alien_[name].frag` | `alien_head.frag` |
| Shader WebGL runner | `alien_[name]_demo.html` | `alien_head_demo.html` |
| SVG asset | `alien_[name].svg` | `alien_head.svg` |
| Docs | `UPPERCASE.md` | `TROPE.md` |

## Color Palette (ALWAYS use these, NEVER hardcode random values)

```css
--alien-green:   #39FF14   /* the canonical green — do not change */
--alien-black:   #000000   /* void black background always */
--alien-cyan:    #00FFFF
--alien-magenta: #FF00FF
--alien-gold:    #FFD700
--alien-pink:    #FF69B4
```

## Typography (ALWAYS use these two fonts, loaded from Google Fonts)

- `'Chakra Petch'` — headings, labels, UI
- `'Share Tech Mono'` — monospace, data readouts, code aesthetic

## Design Rules

- Background is ALWAYS `#000000` — pure void black. No exceptions.
- Border-radius is ALWAYS `0`. No rounded corners anywhere in the UI chrome.
- The alien green `#39FF14` should glow (`text-shadow` or `drop-shadow`) wherever possible.
- All text labels in ALL CAPS when used as UI elements.

## How Standalone HTML Files Work

Every `alien_[name]_standalone.html` file MUST:
1. Be fully self-contained (no external dependencies except CDN p5.js)
2. Load the corresponding `alien_[name].js` via `<script src="./alien_[name].js"></script>`
3. Use `_p5_template.html` as the base — copy and modify, don't invent from scratch
4. Set canvas to fill the full viewport (not a fixed pixel size)
5. Include no visible UI chrome — just the sketch, black background

Every `alien_[name]_demo.html` shader runner MUST:
1. Be fully self-contained
2. Use `_webgl_template.html` as the base
3. Load the `.frag` file contents inline (copy the shader code into the HTML)
4. Pass `iTime` and `iResolution` uniforms on every frame
5. Fill the full viewport

## What "Done" Looks Like Per File Type

**p5.js sketch JS file:**
- [ ] Runs without errors in browser console
- [ ] Has `setup()` and `draw()` functions
- [ ] Has a header comment block explaining what it does
- [ ] Animation loops smoothly (no stuttering, no infinite growth)

**Standalone HTML:**
- [ ] Opens in browser → sketch runs immediately, no interaction needed
- [ ] Black background fills full viewport
- [ ] No white flash on load
- [ ] Gallery iframe renders it correctly at 280px wide

**GLSL shader demo HTML:**
- [ ] Canvas fills viewport
- [ ] `iTime` increments, animation runs
- [ ] `iResolution` matches canvas size on resize

**SVG asset:**
- [ ] Clean, no unnecessary groups or transforms
- [ ] Viewbox defined so it scales correctly at any size
- [ ] Works as `<img src>` AND inline `<svg>`

## DO NOT

- ❌ Add a package.json or any npm tooling
- ❌ Use `localhost` or any server-dependent paths
- ❌ Add TypeScript
- ❌ Use `let` for canvas/GL context outside of setup — store on `window` or module scope
- ❌ Use `alert()` or `console.log()` in production code
- ❌ Add any alien images you find online — all assets are drawn procedurally or as SVG
- ❌ Change the color palette without explicit instruction
- ❌ Add border-radius to anything

## When Adding a New Sketch

1. Create `sketches/p5js/alien_[name].js`
2. Create `sketches/p5js/alien_[name]_standalone.html` from `_p5_template.html`
3. Add entry to `docs/REMIX_CATALOG.md` under "✅ Implemented"
4. Add entry to the `sketches` array in `gallery/index.html`

## When Adding a New Shader

1. Create `shaders/alien_[name].frag`
2. Create `shaders/alien_[name]_demo.html` from `_webgl_template.html`
3. Add entry to `docs/REMIX_CATALOG.md`
4. Add entry to the `sketches` array in `gallery/index.html`
