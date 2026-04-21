// alien_acid.js
// The little green man has taken something.
// Eyes: dilating, chromatic aberration, color cycling.
// Head only. He's having a moment.

let t = 0;
let pupilDilation = 0;
let colorPhase = 0;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0, 0, 0);
  t += 0.025;
  colorPhase = (colorPhase + 0.5) % 360;
  pupilDilation = 0.5 + sin(t * 0.7) * 0.4 + noise(t * 0.3) * 0.3;
  
  translate(width / 2, height / 2);
  
  let floatY = sin(t * 0.6) * 6;
  translate(0, floatY);
  
  // Chromatic aberration offset
  let aberr = sin(t * 2) * 3;
  
  // Red layer
  push();
  translate(aberr, 0);
  tint(0, 80, 100, 0.4);
  drawHead(120, 80, 90, 0.3);
  pop();
  
  // Blue layer
  push();
  translate(-aberr, 0);
  tint(240, 80, 100, 0.4);
  drawHead(220, 70, 90, 0.3);
  pop();
  
  // Main green head
  drawHead(colorPhase * 0.05 % 60 + 100, 100, 90, 1.0);
  drawAcidEyes(pupilDilation);
}

function drawHead(hue, sat, bri, alpha) {
  push();
  noStroke();
  // Outline
  fill(0, 0, 0, alpha);
  ellipse(0, 0, 88, 105);
  // Fill
  fill(hue, sat, bri, alpha);
  ellipse(0, 0, 80, 96);
  pop();
}

function drawAcidEyes(dilation) {
  push();
  noStroke();
  
  // Eye whites (the almond shapes)
  for (let side of [-1, 1]) {
    push();
    translate(side * 15, -4);
    rotate(side * 0.35);
    
    // Eye backing
    fill(0, 0, 0);
    ellipse(0, 0, 28, 18);
    
    // Iris — color cycling
    let irisHue = (colorPhase + side * 40) % 360;
    fill(irisHue, 100, 100);
    ellipse(0, 0, 28 * dilation * 0.8, 18 * dilation * 0.8);
    
    // Pupil — dilating
    fill(0, 0, 0);
    ellipse(0, 0, 12 * dilation, 12 * dilation);
    
    // Pupil specular
    fill(0, 0, 100, 0.7);
    ellipse(-3 * dilation, -3 * dilation, 3 * dilation, 3 * dilation);
    
    pop();
  }
  
  // Mouth — wavy
  stroke(0, 0, 0);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let x = -12; x <= 12; x += 2) {
    let y = 18 + sin(x * 0.4 + t * 3) * 3;
    curveVertex(x, y);
  }
  endShape();
  
  pop();
}
