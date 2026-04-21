// alien_psychedelic.frag
// The alien head, but domain warped, color cycling, fractal background.
// He's fine. He's just vibing.

precision mediump float;
uniform float iTime;
uniform vec2 iResolution;

#define TAU 6.28318530718

vec2 rot2(vec2 p, float a) {
  return vec2(p.x*cos(a)-p.y*sin(a), p.x*sin(a)+p.y*cos(a));
}

float sdEllipseSimple(vec2 p, vec2 r) {
  return (length(p / r) - 1.0) * min(r.x, r.y);
}

// Simple 2D fbm for background
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

vec3 hsv(float h, float s, float v) {
  vec3 c = abs(mod(h*6.0+vec3(0,4,2),6.0)-3.0)-1.0;
  return v * mix(vec3(1), clamp(c, 0.0, 1.0), s);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  float t = iTime;
  
  // Domain warp UV for background
  vec2 wuv = uv;
  wuv += vec2(fbm(uv + t * 0.15), fbm(uv + vec2(3.4, 1.7) + t * 0.12)) * 0.3;
  
  // Background — color cycling fbm
  float bg = fbm(wuv * 2.5 + t * 0.1);
  vec3 col = hsv(bg + t * 0.08, 0.9, 0.6);
  
  // Warp the UV for the alien head too (mild)
  vec2 alienUV = uv;
  alienUV += vec2(sin(uv.y * 8.0 + t) * 0.012, cos(uv.x * 8.0 + t) * 0.012);
  
  // Head
  float head = sdEllipseSimple(alienUV, vec2(0.27, 0.35));
  float outline = sdEllipseSimple(alienUV, vec2(0.29, 0.37));
  
  // Eyes
  vec2 le = rot2(alienUV - vec2(-0.09, 0.04), -0.35);
  vec2 re = rot2(alienUV - vec2(0.09, 0.04), 0.35);
  float leye = sdEllipseSimple(le, vec2(0.072, 0.046));
  float reye = sdEllipseSimple(re, vec2(0.072, 0.046));
  
  // Color cycle the green
  vec3 alienGreen = hsv(0.33 + sin(t * 0.5) * 0.08, 1.0, 1.0);
  
  col = mix(col, vec3(0), smoothstep(0.008, -0.008, outline));
  col = mix(col, alienGreen, smoothstep(0.008, -0.008, head));
  col = mix(col, vec3(0), smoothstep(0.005, -0.005, leye));
  col = mix(col, vec3(0), smoothstep(0.005, -0.005, reye));
  
  // Pupils — psychedelic color
  vec2 lp = le;
  vec2 rp = re;
  float lpupil = sdEllipseSimple(lp, vec2(0.032, 0.032));
  float rpupil = sdEllipseSimple(rp, vec2(0.032, 0.032));
  vec3 pupilCol = hsv(t * 0.3, 1.0, 1.0);
  col = mix(col, pupilCol, smoothstep(0.004, -0.004, lpupil));
  col = mix(col, pupilCol, smoothstep(0.004, -0.004, rpupil));
  
  // Glow
  float glow = exp(max(0.0, -head) * -15.0) * 0.5;
  col += alienGreen * glow;
  
  gl_FragColor = vec4(col, 1.0);
}
