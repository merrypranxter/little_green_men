// alien_scanlines.frag
// VHS scanlines, RGB split, glitch artifacts.
// Alien on a dying television.

precision mediump float;
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iChannel0; // optional: provide alien head as texture

float sdEllipseSimple(vec2 p, vec2 r) {
  return (length(p / r) - 1.0) * min(r.x, r.y);
}

vec2 rot2(vec2 p, float a) {
  return vec2(p.x*cos(a)-p.y*sin(a), p.x*sin(a)+p.y*cos(a));
}

float hash(float n) { return fract(sin(n) * 43758.5453); }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  float t = iTime;
  
  // Glitch: occasional horizontal shift
  float glitchLine = floor(uv.y * 40.0);
  float glitchTime = floor(t * 8.0);
  float glitch = hash(glitchLine + glitchTime * 100.0);
  float glitchAmt = step(0.97, glitch) * hash(glitchTime) * 0.04;
  uv.x += glitchAmt * sign(sin(glitchLine));
  
  // RGB split
  float aberr = 0.008 + sin(t * 0.7) * 0.003;
  
  vec2 uvR = uv + vec2(aberr, 0.0);
  vec2 uvG = uv;
  vec2 uvB = uv - vec2(aberr, 0.0);
  
  // Alien SDF at each channel offset
  float headR = sdEllipseSimple(uvR, vec2(0.27, 0.35));
  float headG = sdEllipseSimple(uvG, vec2(0.27, 0.35));
  float headB = sdEllipseSimple(uvB, vec2(0.27, 0.35));
  
  float outlineG = sdEllipseSimple(uvG, vec2(0.29, 0.37));
  
  // Eyes
  vec2 le = rot2(uvG - vec2(-0.09, 0.04), -0.35);
  vec2 re = rot2(uvG - vec2(0.09, 0.04), 0.35);
  float leye = sdEllipseSimple(le, vec2(0.072, 0.046));
  float reye = sdEllipseSimple(re, vec2(0.072, 0.046));
  
  vec3 col = vec3(0.0);
  float GREEN_R = 0.224, GREEN_G = 1.0, GREEN_B = 0.078;
  
  col.r = mix(col.r, 0.0, smoothstep(0.008, -0.008, outlineG));
  col.r = mix(col.r, GREEN_R, smoothstep(0.008, -0.008, headR));
  
  col.g = mix(col.g, 0.0, smoothstep(0.008, -0.008, outlineG));
  col.g = mix(col.g, GREEN_G, smoothstep(0.008, -0.008, headG));
  
  col.b = mix(col.b, 0.0, smoothstep(0.008, -0.008, outlineG));
  col.b = mix(col.b, GREEN_B, smoothstep(0.008, -0.008, headB));
  
  // Eyes (no split)
  col = mix(col, vec3(0.0), smoothstep(0.005, -0.005, leye));
  col = mix(col, vec3(0.0), smoothstep(0.005, -0.005, reye));
  
  // Scanlines
  float scan = sin(gl_FragCoord.y * 3.14159) * 0.5 + 0.5;
  col *= 0.85 + scan * 0.15;
  
  // Occasional bright scanline flash
  float flashLine = step(0.995, hash(floor(uv.y * 60.0) + floor(t * 12.0)));
  col += flashLine * vec3(0.224, 1.0, 0.078) * 0.3;
  
  // Noise
  float noise = hash(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + t * 100.0);
  col += (noise - 0.5) * 0.04;
  
  // Vignette
  col *= 1.0 - length(uv) * 0.7;
  
  gl_FragColor = vec4(col, 1.0);
}
