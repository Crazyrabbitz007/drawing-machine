// draw to an offscreen graphic so that you can have multiple layers
var prompts = ["Rabbit Sleeping", "Rain on a Street", "Rocks in a River", "Rat at Night", "Rhino in a Field","Racoon on a Garbage Can"];
let o; // outline
let p; // painting
let mode = "outline";
let reveal = false;
let noiseOffset = 0.0;
let strokeWidth = 5;
let switchButton;
let revealButton;
let promptButton;
let saveButton;
let saveallButton;
let sizeSlider;
let redSlider;
let blueSlider;
let greenSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create graphics - these are basically separate canvases drawn to an off-screen graphics buffer
  o = createGraphics(windowWidth, windowHeight);
  o.clear(); // clear the background of the outline graphics so it is transparent

  p = createGraphics(windowWidth, windowHeight);
  p.background(255, 255, 255, 5); // set painting background to white

  sizeSlider = createSlider(0, 50, 15);
  sizeSlider.position(50, height * 0.80);

  redSlider = createSlider(0, 255, 10);
  redSlider.position(50, height * 0.80 + 50);

  blueSlider = createSlider(0, 255, 10);
  blueSlider.position(50, height * 0.80 + 80);

  greenSlider = createSlider(0, 255, 10);
  greenSlider.position(50, height * 0.80 + 110);

  promptButton = createButton("Click to Receive a Prompt");
  promptButton.mousePressed(randomPrompt);

  switchButton = createButton("Start Coloring");
  switchButton.mousePressed(startColoring);

  revealButton = createButton("Reveal");
  revealButton.mousePressed(revealPainting);

  saveButton = createButton("Save your Painting!");
  saveButton.mousePressed(savePainting);

  saveallButton = createButton("Save your Painting! + Outline");
  saveallButton.mousePressed(saveallPainting);
}

function draw() {
  push();
  text('Stroke',15,height* 0.80 +15);
  text('Red', 15, height * 0.80 + 65);
  text('Green', 15, height * 0.80 + 95);
  text('Blue', 15, height * 0.80 + 125);
  pop();

  if (mode === "outline") {
    o.stroke(0);
    o.strokeWeight(sizeSlider.value());
    // if in outline mode, mouse pressed draws to the o (outline) off-screen graphic
    if (mouseIsPressed) {
      o.line(pmouseX, pmouseY, mouseX, mouseY);
    }
  } else if (mode === 'color') {
    p.stroke(redSlider.value(),blueSlider.value(),greenSlider.value());
    p.strokeWeight(sizeSlider.value());
    noiseOffset += 0.05;
    strokeWidth = noise(noiseOffset * 100)
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

function randomPrompt() {
  randomword = random(prompts); //pick a random word!
  push();
  text(randomword, width / 2, height / 2);
  textFont("Arial", 72);
  pop();
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

function savePainting() {
  save(p, 'painting.jpg');
}

function saveallPainting() {
  save('painting+outline');
}
