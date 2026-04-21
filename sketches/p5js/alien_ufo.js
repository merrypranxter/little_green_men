// alien_ufo.js
// Classic scene: saucer hovers, beam of light, alien descends.
// Looping animation with idle hover mode.

let t = 0;
let alienY = -200;
let beamOpacity = 0;
let phase = 'hovering'; // hovering | descending | arrived | ascending

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0, 0, 20); // near-black blue
  t += 0.02;
  
  // Stars
  drawStars();
  
  // Ground
  fill(20, 40, 20);
  noStroke();
  rect(0, 420, width, 80);
  
  // UFO hover position
  let ufoY = 100 + sin(t * 0.8) * 8;
  
  // Update phase
  updatePhase();
  
  // Beam
  drawBeam(width / 2, ufoY + 20, beamOpacity);
  
  // Alien
  push();
  translate(width / 2, ufoY + 100 + alienY);
  let alienScale = 0.7;
  scale(alienScale);
  drawAlienMini();
  pop();
  
  // UFO on top
  push();
  translate(width / 2, ufoY);
  drawUFO();
  pop();
}

function updatePhase() {
  if (phase === 'hovering') {
    beamOpacity = lerp(beamOpacity, 200, 0.05);
    if (beamOpacity > 190 && frameCount % 200 === 0) phase = 'descending';
  } else if (phase === 'descending') {
    alienY = lerp(alienY, 80, 0.04);
    if (alienY > 78) phase = 'arrived';
  } else if (phase === 'arrived') {
    if (frameCount % 180 === 0) phase = 'ascending';
  } else if (phase === 'ascending') {
    alienY = lerp(alienY, -200, 0.05);
    beamOpacity = lerp(beamOpacity, 0, 0.08);
    if (alienY < -180) { phase = 'hovering'; alienY = -200; }
  }
}

function drawBeam(x, y, opacity) {
  if (opacity < 5) return;
  noStroke();
  for (let i = 0; i < 8; i++) {
    let w = map(i, 0, 8, 10, 90);
    let alpha = map(i, 0, 8, opacity, 0);
    fill(180, 255, 180, alpha * 0.4);
    beginShape();
    vertex(x - w * 0.4, y);
    vertex(x + w * 0.4, y);
    vertex(x + w, 430);
    vertex(x - w, 430);
    endShape(CLOSE);
  }
}

function drawUFO() {
  // Saucer body
  fill(0);
  noStroke();
  ellipse(0, 0, 180, 36);
  fill(140);
  ellipse(0, 0, 170, 30);
  
  // Dome
  fill(0);
  ellipse(0, -12, 80, 50);
  fill(100, 200, 100, 180);
  ellipse(0, -14, 70, 42);
  
  // Lights
  for (let i = 0; i < 8; i++) {
    let lx = map(i, 0, 7, -70, 70);
    let pulse = sin(t * 4 + i * 0.8) > 0;
    fill(pulse ? '#39FF14' : '#003300');
    ellipse(lx, 8, 10, 8);
  }
}

function drawAlienMini() {
  // Head
  fill(0); ellipse(0, 0, 55, 65);
  fill('#39FF14'); ellipse(0, 0, 48, 58);
  // Eyes
  for (let s of [-1, 1]) {
    push(); translate(s * 10, -3); rotate(s * 0.35);
    fill(0); ellipse(0, 0, 18, 12);
    pop();
  }
  // Mouth
  stroke(0); strokeWeight(2); noFill();
  arc(2, 10, 14, 7, 0.1, PI - 0.1);
}

function drawStars() {
  noStroke();
  randomSeed(42);
  for (let i = 0; i < 80; i++) {
    let sx = random(width);
    let sy = random(height * 0.85);
    let brightness = 150 + sin(t * 2 + i) * 60;
    fill(brightness);
    ellipse(sx, sy, random(1, 3));
  }
}
