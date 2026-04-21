// alien_base.js
// The canonical little green man head.
// Pure vanilla canvas. The base reference implementation.
// Import into any HTML page — call drawAlienHead(ctx, x, y, size)

/**
 * Draw the canonical alien head centered at (x, y) with given size.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x - center x
 * @param {number} y - center y  
 * @param {number} size - head height in px (default: 100)
 * @param {object} opts - optional overrides
 *   opts.green: fill color (default '#39FF14')
 *   opts.outline: outline color (default '#000000')
 *   opts.outlineThickness: (default size * 0.05)
 *   opts.glowAmount: 0-1 (default 0 = no glow)
 */
function drawAlienHead(ctx, x, y, size = 100, opts = {}) {
  const green = opts.green || '#39FF14';
  const outline = opts.outline || '#000000';
  const thickness = opts.outlineThickness || size * 0.05;
  const glow = opts.glowAmount || 0;
  
  const hw = size * 0.5;   // half width
  const hh = size * 0.6;   // half height
  
  ctx.save();
  ctx.translate(x, y);
  
  // Glow effect
  if (glow > 0) {
    ctx.shadowColor = green;
    ctx.shadowBlur = size * glow * 0.4;
  }
  
  // Outline (slightly larger ellipse in black)
  ctx.beginPath();
  ctx.ellipse(0, 0, hw + thickness, hh + thickness, 0, 0, Math.PI * 2);
  ctx.fillStyle = outline;
  ctx.fill();
  
  // Green head
  ctx.beginPath();
  ctx.ellipse(0, 0, hw, hh, 0, 0, Math.PI * 2);
  ctx.fillStyle = green;
  ctx.fill();
  
  ctx.shadowBlur = 0;
  
  // Left eye
  ctx.save();
  ctx.translate(-hw * 0.3, -hh * 0.08);
  ctx.rotate(-0.35);
  ctx.beginPath();
  ctx.ellipse(0, 0, hw * 0.28, hh * 0.17, 0, 0, Math.PI * 2);
  ctx.fillStyle = outline;
  ctx.fill();
  ctx.restore();
  
  // Right eye
  ctx.save();
  ctx.translate(hw * 0.3, -hh * 0.08);
  ctx.rotate(0.35);
  ctx.beginPath();
  ctx.ellipse(0, 0, hw * 0.28, hh * 0.17, 0, 0, Math.PI * 2);
  ctx.fillStyle = outline;
  ctx.fill();
  ctx.restore();
  
  // Mouth
  ctx.beginPath();
  ctx.arc(hw * 0.05, hh * 0.28, hw * 0.13, 0.2, Math.PI - 0.2);
  ctx.strokeStyle = outline;
  ctx.lineWidth = thickness * 0.8;
  ctx.stroke();
  
  ctx.restore();
}

// Export for module use
if (typeof module !== 'undefined') module.exports = { drawAlienHead };
