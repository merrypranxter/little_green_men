// alien_pixel.js
// Little green man in pixel art.
// Space Invaders energy. 8-bit glory.

const PIXEL = 12;
const GREEN = '#39FF14';
const BLACK = '#000000';
const BG = '#0a0a0a';

// Alien head pixel grid (1 = green, 2 = black/outline, 0 = empty)
// 11x13 grid
const HEAD_SPRITE = [
  [0,0,0,2,2,2,2,2,0,0,0],
  [0,0,2,1,1,1,1,1,2,0,0],
  [0,2,1,1,1,1,1,1,1,2,0],
  [2,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,2,2,1,1,2,2,1,2],
  [2,1,1,2,2,1,1,2,2,1,2],
  [2,1,1,2,2,1,1,2,2,1,2],
  [2,1,1,1,1,1,1,1,1,1,2],
  [2,1,1,1,2,1,1,2,1,1,2],
  [0,2,1,1,1,1,1,1,1,2,0],
  [0,0,2,1,2,2,2,2,1,2,0],
  [0,0,0,2,2,2,2,2,2,0,0],
  [0,0,0,0,2,2,2,0,0,0,0],
];

let frame = 0;
let flashTimer = 0;

function setup() {
  createCanvas(400, 400);
  noSmooth();
  frameRate(8); // pixel art framerate
}

function draw() {
  background(BG);
  frame++;
  
  // Center the sprite
  let spriteW = HEAD_SPRITE[0].length * PIXEL;
  let spriteH = HEAD_SPRITE.length * PIXEL;
  let ox = (width - spriteW) / 2;
  let oy = (height - spriteH) / 2 - 20;
  
  // Draw pixel sprite
  for (let row = 0; row < HEAD_SPRITE.length; row++) {
    for (let col = 0; col < HEAD_SPRITE[row].length; col++) {
      let val = HEAD_SPRITE[row][col];
      if (val === 0) continue;
      
      let x = ox + col * PIXEL;
      let y = oy + row * PIXEL;
      
      if (val === 2) {
        fill(BLACK);
      } else if (val === 1) {
        // Scanline effect
        if (row % 2 === 0 && frame % 4 < 2) {
          fill(lerpColor(color(GREEN), color('#ffffff'), 0.15));
        } else {
          fill(GREEN);
        }
      }
      
      noStroke();
      rect(x, y, PIXEL, PIXEL);
    }
  }
  
  // Pixel "abduction beam" below head occasionally
  if (frame % 30 < 8) {
    fill(GREEN + '44');
    noStroke();
    rect(width/2 - 20, oy + spriteH, 40, 80);
  }
  
  // Score / arcade aesthetic
  fill(GREEN);
  textSize(10);
  textFont('monospace');
  textAlign(CENTER);
  text('< LITTLE GREEN MAN >', width / 2, height - 30);
  text('INSERT COIN', width / 2, height - 15);
}
