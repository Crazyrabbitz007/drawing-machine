// draw to an offscreen graphic so that you can have multiple layers

let flower;
let o; // outline
let p; // painting
let switchButton;
let revealButton;
let mode = "outline";
let reveal = false;

function preload() {

  flower = loadImage('clipart568092.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  // create graphics - these are basically separate canvases drawn to an off-screen graphics buffer
  o = createGraphics(windowWidth, windowHeight);
  o.clear(); // clear the background of the outline graphics so it is transparent

  p = createGraphics(windowWidth, windowHeight);
  p.background(255); // set painting background to white

  switchButton = createButton("start coloring");
  switchButton.mousePressed(startColoring);

  revealButton = createButton("reveal");
  revealButton.mousePressed(revealPainting);
}

function draw() {

  if (mode === "outline") {
    o.stroke(0);
    o.strokeWeight(3);
    // if in outline mode, mouse pressed draws to the o (outline) off-screen graphic
    if (mouseIsPressed) {
      o.line(pmouseX, pmouseY, mouseX, mouseY);
    }
  } else if (mode === 'color') {
    p.stroke(200, 255, 215);
    p.strokeWeight(10);
        // if in painting mode, mouse pressed draws to the p (painting) graphic
    if (mouseIsPressed) {
      p.line(pmouseX, pmouseY, mouseX, mouseY);
    }

  }


  // only displays outline if you haven't revealed the painting underneath
  if (reveal) {
    image(p, 0, 0); // only draw painting
  } else {
    // draw painting and outline above it
    image(p, 0, 0);
    image(o, 0, 0);
  }
}


function startColoring() {
  mode = 'color';
}

function revealPainting() {
  clear(); // clear out canvas so outline doesn't show
  reveal = true; // toggle reveal so outline isn't drawn

  // this is how you would save the graphics
  // save(p, 'painting.jpg');

}
