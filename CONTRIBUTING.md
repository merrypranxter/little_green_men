# Contributing

## Adding a New Sketch

1. **Create the JS file:** `sketches/p5js/alien_[name].js`
   - Must have `setup()` and `draw()`
   - Use `createCanvas(windowWidth, windowHeight)` + `windowResized()`
   - Header comment: what it does, what makes it interesting

2. **Create the standalone HTML:** `sketches/p5js/alien_[name]_standalone.html`
   - Copy from `sketches/p5js/_p5_template.html`
   - Change the script src to your JS file
   - Nothing else

3. **Add to the catalog:** `docs/REMIX_CATALOG.md` under `✅ Implemented`

4. **Add to gallery:** add an entry to the `sketches` array in `gallery/index.html`

---

## Adding a New Shader

1. **Create the .frag file:** `shaders/alien_[name].frag`
   - Must use `uniform float iTime` and `uniform vec2 iResolution`
   - Header comment block required

2. **Create the demo HTML:** `shaders/alien_[name]_demo.html`
   - Copy from `shaders/_webgl_template.html`
   - Paste your frag source into `FRAG_SOURCE`

3. **Add to the catalog + gallery** (same as above)

---

## Rules

- No build step. No npm. No frameworks. Static files only.
- Background is always `#000000`.
- Alien green is always `#39FF14`.
- Import `styles/alien-tokens.css` for any HTML file with visible UI.
- Border-radius stays at 0.
