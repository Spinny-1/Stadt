let image1, image2;
let maskRadius = 150;
let mode = 0; // 0 = Maske aktiv, 1 = nur Bild 1, 2 = nur Bild 2
let showHelp = true; // Hilfstext an/aus

function preload() {
  image1 = loadImage("StadtPast.png");
  image2 = loadImage("StadtPost.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  image1.resize(width, height);
  image2.resize(width, height);
  noCursor();
}

function draw() {
  background(255);

  if (mode == 1) {
    image(image1, 0, 0);
  } else if (mode == 2) {
    image(image2, 0, 0);
  } else {
    image(image1, 0, 0);
  
    let mask = createGraphics(width, height);
    mask.beginDraw();
    mask.background(0);
    mask.noStroke();
  
    for (let r = int(maskRadius); r > 0; r--) {
      let alpha = map(r, 0, maskRadius, 255, 0);
      mask.fill(255, alpha);
      mask.ellipse(mouseX, mouseY, r * 2, r * 2);
    }

    mask.endDraw();

    let maskedImage = image2.copy();
    maskedImage.mask(mask);
    image(maskedImage, 0, 0);
  }

  // Hilfstext unten links
  if (showHelp) {
    drawHelpText();
    drawModeText();
  }
}

function drawModeText() {
  let modeText = "";
  if (mode == 1) {
    modeText = "StadtGegenwart";
  } else if (mode == 2) {
    modeText = "StadtZukunft";
  } else {
    modeText = "Blick in die Zukunft";
  }

  fill(0, 150); // Hintergrund leicht transparent
  rect(20, 20, textWidth(modeText) + 20, 40, 10); // Abgerundetes Rechteck
  fill(255); // Weißer Text
  textSize(20);
  textLeading(10);
  text(modeText, 30, 45);
}

function drawHelpText() {
  let helpText = "1: StadtGegenwart\n2: StadtZukunft\nMausklick: Blick in die Zukunft\nH: Hilfe ein/aus";
  fill(0, 150);
  rect(20, height - 110, 300, 100, 10);
  fill(255);
  textSize(20);
  textLeading(24);
  text(helpText, 30, height - 90);
  
  fill(0, 150);
  rect(width - 165, 0 + 20, 160, 40, 10);
  fill(255);
  textSize(20);
  textLeading(24);
  text("Esc zum beenden ", width - 155, 45);
  fill(0);
  text( "Gianluca Gontow", width - 160, height - 10);
}

function keyPressed() {
  if (key === '1') {
    mode = 1;
  } else if (key === '2') {
    mode = 2;
  } else if (key === 'h' || key === 'H') {
    showHelp = !showHelp;
  }
}

function mousePressed() {
  mode = 0;
}
