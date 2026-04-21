// alien_dancer.js
// The little green man, doing his thing.
// Full body, animated dance loop.
// Run in p5.js web editor or via gallery/index.html

let t = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  t += 0.04;
  
  translate(width / 2, height / 2 + 20);
  
  // Dance motion: hip sway
  let hipSway = sin(t) * 12;
  let hipBob = abs(sin(t * 2)) * -8;
  
  translate(hipSway * 0.3, hipBob);
  
  drawAlienBody(hipSway, t);
  drawAlienHead(hipSway * 0.2);
}

function drawAlienBody(sway, t) {
  push();
  translate(0, 30);
  
  // Torso
  fill(0);
  noStroke();
  ellipse(0, 0, 38, 50); // black backing
  fill('#39FF14');
  ellipse(0, 0, 30, 42);
  
  // Left arm
  push();
  rotate(-0.4 + sin(t + PI) * 0.5);
  fill(0);
  ellipse(0, -22, 22, 10);
  fill('#39FF14');
  ellipse(0, -20, 18, 8);
  translate(0, -26);
  fill(0); ellipse(0,0,14,14);
  fill('#39FF14'); ellipse(0,0,10,10);
  pop();
  
  // Right arm
  push();
  translate(0, 0);
  rotate(0.4 + sin(t) * 0.5);
  fill(0);
  ellipse(0, -22, 22, 10);
  fill('#39FF14');
  ellipse(0, -20, 18, 8);
  translate(0, -26);
  fill(0); ellipse(0,0,14,14);
  fill('#39FF14'); ellipse(0,0,10,10);
  pop();
  
  // Left leg
  push();
  translate(-8, 20);
  rotate(0.2 + sin(t) * 0.4);
  fill(0); rect(-5, 0, 12, 32, 4);
  fill('#39FF14'); rect(-4, 0, 10, 28, 3);
  pop();
  
  // Right leg
  push();
  translate(8, 20);
  rotate(-0.2 + sin(t + PI * 0.5) * 0.4);
  fill(0); rect(-5, 0, 12, 32, 4);
  fill('#39FF14'); rect(-4, 0, 10, 28, 3);
  pop();
  
  pop();
}

function drawAlienHead(wobble) {
  push();
  translate(wobble, 0);
  
  // Head — black backing (outline)
  fill(0);
  noStroke();
  ellipse(0, -10, 88, 105);
  
  // Head — green fill
  fill('#39FF14');
  ellipse(0, -10, 80, 96);
  
  // Left eye
  push();
  translate(-15, -8);
  rotate(-0.35);
  fill(0);
  ellipse(0, 0, 28, 18);
  pop();
  
  // Right eye
  push();
  translate(15, -8);
  rotate(0.35);
  fill(0);
  ellipse(0, 0, 28, 18);
  pop();
  
  // Mouth — slight smirk
  stroke(0);
  strokeWeight(3);
  noFill();
  arc(3, 12, 22, 10, 0.1, PI - 0.1);
  
  pop();
}
