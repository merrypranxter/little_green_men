# Little Green Man — Visual Language Spec

Use this as a design reference for all sketches, shaders, and assets in this repo.

## Core Geometry

```
HEAD:
  shape: ellipse, slightly taller than wide
  width: ~0.6 units
  height: ~0.75 units
  position: centered

LEFT EYE:
  shape: ellipse, almond (rotated ~-20deg)
  fill: black
  width: ~0.18 units
  height: ~0.12 units
  x: -0.14 from center
  y: 0.05 from center

RIGHT EYE:
  shape: ellipse, almond (rotated ~+20deg)
  fill: black
  width: ~0.18 units
  height: ~0.12 units
  x: +0.14 from center
  y: 0.05 from center

MOUTH:
  shape: short arc or line, slight upward curve
  y: ~-0.2 from center
  length: ~0.12 units

BODY (optional):
  spindly torso, 2 arms, 2 legs
  mid-dance pose: arms out asymmetric, one leg kicked
```

## Color Palette

| Element | Value | Notes |
|---------|-------|-------|
| Primary green | `#39FF14` | Neon green — the canonical one |
| Alt green | `#00FF00` | More saturated, more "computer" |
| Eye/outline black | `#000000` | Pure black always |
| Background | `#000000` | Void black — the alien lives in darkness |
| Glow color | `#39FF14` at 40% opacity | For bloom/glow effects |
| Accent neon | `#FF00FF` or `#00FFFF` | For psychedelic variants |

## Typography (if used)

- **Chakra Petch** — primary display font
- **Share Tech Mono** — code / data readout aesthetic
- All caps preferred for alien content

## Outline Style

The classic little green man has a **thick black outline** — this reads as:
- Badge / embroidered patch quality
- Sticker aesthetic
- Screen print aesthetic (which is perfect given the context)

In GLSL: achieve with SDF step() and offset distance field
In p5.js: draw black shape slightly larger, then green shape on top

## Animation Vocabulary

| Motion | Description |
|--------|-------------|
| The Sway | Gentle left-right oscillation, like he's vibing |
| The Wave | One arm traces a sine curve |
| The Dance | Full body, hip displacement, arm flail |
| The Float | Slow vertical sine, implies anti-gravity |
| The Appear | Descend from above or emerge from UFO |
| The Pulse | Size oscillation — breathing or scared |
| The Spin | Head rotation (2D: scale X for flip effect) |
| The Distort | Psychedelic: SDF distortion, chromatic aberration |
