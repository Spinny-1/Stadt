let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3
let maskSize = 250;  // Größe der Maske, um Bild 1 transparent zu machen
let pg;
let showHelp = false;  // Flag für das Ein- und Ausblenden der Hilfe
let baseWidth = 1920, baseHeight = 1080;

function preload() {
  image1 = loadImage("StadtPast.png");  // Bild 1 laden
  image2 = loadImage("StadtPost.png");  // Bild 2 laden
}

function setup() {
  let aspectRatio = baseWidth / baseHeight;
  let newWidth = windowWidth;
  let newHeight = windowWidth / aspectRatio;
  if (newHeight > windowHeight) {
    newHeight = windowHeight;
    newWidth = windowHeight * aspectRatio;
  }
  createCanvas(newWidth, newHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild 1 skalieren
  image2.resize(width, height);  // Bild 2 skalieren

  pg = createGraphics(width, height);  // PGraphics für temporäre Bearbeitung
  pg.image(image1, 0, 0);  // Bild 1 in PGraphics laden
  
  noCursor();  // Mauszeiger ausblenden
}

function draw() {
  background(255);  // Hintergrund auf weiß setzen

  let scaleX = width / baseWidth;
  let scaleY = height / baseHeight;
  let mouseXAdj = mouseX / scaleX;
  let mouseYAdj = mouseY / scaleY;

  if (mode === 1) {
    image(image1, 0, 0);  // Modus 1: Bild 1 anzeigen
  } else if (mode === 2) {
    image(image2, 0, 0);  // Modus 2: Bild 2 anzeigen
  } else if (mode === 3) {
    image(image2, 0, 0);  // Bild 2 im Hintergrund

    pg.image(image1, 0, 0);  // Originalbild zurückladen, um den Zustand zu resetten
    pg.loadPixels();  // Lade die Pixel des temporären Bildes

    let startX = max(mouseXAdj - maskSize / 2, 0);
    let endX = min(mouseXAdj + maskSize / 2, width);
    let startY = max(mouseYAdj - maskSize / 2, 0);
    let endY = min(mouseYAdj + maskSize / 2, height);

    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        let d = dist(x, y, mouseXAdj, mouseYAdj);  // Berechne den Abstand zum Mauszeiger
        let index = (x + y * width) * 4;  // Berechne den Pixel-Index

        if (d < maskSize / 2) {
          pg.pixels[index + 3] = 0;
        }
      }
    }

    pg.updatePixels();  // Update der Pixel des temporären Bildes
    image(pg, 0, 0);
  }

  drawModeText();
  if (!showHelp) {
    drawHelpText();
  }
}

function drawModeText() {
  let modeText = "";
  if (mode === 1) {
    modeText = "StadtGegenwart";
  } else if (mode === 2) {
    modeText = "StadtZukunft";
  } else {
    modeText = "Blick in die Zukunft";
  }

  fill(0, 150);
  rect(20, 20, textWidth(modeText) + 20, 40, 10);
  fill(255);
  textSize(20);
  textLeading(10);
  text(modeText, 30, 45);
  textSize(20);
  textLeading(24);
  fill(0);
  text("Gianluca Gontow", width - 160, height - 10);
}

function drawHelpText() {
  let helpText = "1: StadtGegenwart\n2: StadtZukunft\n3: Blick in die Zukunft\nH: Hilfe ein/aus";
  fill(0, 150);
  rect(20, height - 110, 300, 100, 10);
  fill(255);
  textSize(20);
  textLeading(24);
  text(helpText, 30, height - 90);
}

function keyPressed() {
  if (key === '1') {
    mode = 1;
  } else if (key === '2') {
    mode = 2;
  } else if (key === '3') {
    mode = 3;
  } else if (key === 'h' || key === 'H') {
    showHelp = !showHelp;
  }
}
