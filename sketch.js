let slider;
let r = 100;
let g = 100;
let b = 100;



function setup() {
  createCanvas(400, 400);

  strokeWeight(5);

  background(220);

  createP("stroke weight:");
  slider = createSlider(0, 30, 5);


}

function draw() {

  let lineWidth = slider.value();
  strokeWeight(lineWidth);

  stroke(r, g, b);

  // check to see if a key is pressed
  if (keyIsPressed === true) {
    // nested if statement checks to see what key is pressed
    if (key === 'a') {
      // increase 'r'
      r += 5;
    } else if (key === 's') {
      // increase 'g'
      g += 5;
    } else if (key === 'd') {
      //increase 'b'
      b += 5;
    } else if (key === 'z') {
      //decrease 'r'
      r -= 5;
    } else if (key === 'x') {
      //decrease 'g'
      g -= 5
    } else if (key === 'c') {
      // increase 'b'
      b -= 5;
    }
  }


  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }


}
