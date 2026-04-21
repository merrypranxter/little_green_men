// alien_head.frag
// Little green man head in GLSL.
// SDF-based, with CRT glow and scanlines.
// Uniform: iTime, iResolution

precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

#define GREEN vec3(0.224, 1.0, 0.078)  // #39FF14
#define BLACK vec3(0.0)

// Signed distance — ellipse centered at origin
float sdEllipse(vec2 p, vec2 ab) {
  p = abs(p);
  if (p.x > p.y) { p = p.yx; ab = ab.yx; }
  float l = ab.y * ab.y - ab.x * ab.x;
  float m = ab.x * p.x / l;
  float n = ab.y * p.y / l;
  float m2 = m * m, n2 = n * n;
  float c = (m2 + n2 - 1.0) / 3.0;
  float c3 = c * c * c;
  float q = c3 + m2 * n2 * 2.0;
  float d = c3 + m2 * n2;
  float g = m + m * n2;
  float co;
  if (d < 0.0) {
    float h = acos(q / c3) / 3.0;
    float s = cos(h);
    float t = sin(h) * sqrt(3.0);
    float rx = sqrt(-c * (s + t + 2.0) + m2);
    float ry = sqrt(-c * (s - t + 2.0) + m2);
    co = (ry + sign(l) * rx + abs(g) / (rx * ry) - m) / 2.0;
  } else {
    float h = 2.0 * m * n * sqrt(d);
    float s = sign(q + h) * pow(abs(q + h), 1.0/3.0);
    float t = sign(q - h) * pow(abs(q - h), 1.0/3.0);
    float rx = -(s + t) - c * 4.0 + 2.0 * m2;
    float ry = (s - t) * sqrt(3.0);
    float rm = sqrt(rx * rx + ry * ry);
    co = (ry / sqrt(rm - rx) + 2.0 * g / rm - m) / 2.0;
  }
  vec2 r = ab * vec2(co, sqrt(1.0 - co * co));
  return length(r - p) * sign(p.y - r.y);
}

// Rotate 2D
vec2 rot2(vec2 p, float a) {
  return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  
  float t = iTime;
  float breathe = sin(t * 1.2) * 0.015;
  
  // HEAD
  float head = sdEllipse(uv, vec2(0.28 + breathe, 0.36 + breathe));
  float headOutline = sdEllipse(uv, vec2(0.30 + breathe, 0.38 + breathe));
  
  // LEFT EYE
  vec2 leftEyePos = vec2(-0.09, 0.04);
  vec2 leUV = rot2(uv - leftEyePos, -0.35);
  float leftEye = sdEllipse(leUV, vec2(0.075, 0.048));
  
  // RIGHT EYE
  vec2 rightEyePos = vec2(0.09, 0.04);
  vec2 reUV = rot2(uv - rightEyePos, 0.35);
  float rightEye = sdEllipse(reUV, vec2(0.075, 0.048));
  
  // MOUTH
  vec2 mouthCenter = vec2(0.012, -0.14);
  float mouthDist = length(uv - mouthCenter) - 0.06;
  float mouthAngle = atan(uv.y - mouthCenter.y, uv.x - mouthCenter.x);
  float mouth = abs(mouthDist) - 0.008;
  float mouthMask = step(0.15, mouthAngle) * step(mouthAngle, 3.0);
  
  // Compose
  vec3 col = BLACK;
  
  // Outline
  col = mix(col, BLACK, smoothstep(0.005, -0.005, headOutline));
  // Green head
  col = mix(col, GREEN, smoothstep(0.005, -0.005, head));
  // Eyes (cut out)
  col = mix(col, BLACK, smoothstep(0.004, -0.004, leftEye));
  col = mix(col, BLACK, smoothstep(0.004, -0.004, rightEye));
  // Mouth
  col = mix(col, BLACK, (1.0 - smoothstep(0.0, 0.006, mouth)) * mouthMask);
  
  // Glow
  float glowDist = max(0.0, -head);
  float glow = exp(-glowDist * 12.0) * 0.4;
  col += GREEN * glow * (0.5 + 0.5 * sin(t * 2.0));
  
  // Scanlines
  float scanline = sin(gl_FragCoord.y * 3.14159 * 2.0) * 0.5 + 0.5;
  col *= 0.92 + scanline * 0.08;
  
  // Vignette
  float vig = 1.0 - length(uv) * 0.8;
  col *= clamp(vig, 0.0, 1.0);
  
  gl_FragColor = vec4(col, 1.0);
}
