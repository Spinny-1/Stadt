let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3
let maskSize = 250;  // Größe der Maske, um Bild 1 transparent zu machen
let pg;
let showHelp = false;  // Flag für das Ein- und Ausblenden der Hilfe

function preload() {
  image1 = loadImage("StadtPast.png");  // Bild 1 laden
  image2 = loadImage("StadtPost.png");  // Bild 2 laden
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild 1 skalieren
  image2.resize(width, height);  // Bild 2 skalieren

  pg = createGraphics(width, height);  // PGraphics für temporäre Bearbeitung
  pg.image(image1, 0, 0);  // Bild 1 in PGraphics laden
  
  noCursor();  // Mauszeiger ausblenden
  console.log("Canvas Size:", width, height);
console.log("Mouse Position:", mouseX, mouseY);
console.log("Pixel Density:", pixelDensity());
}

function draw() {
  background(255);  // Hintergrund auf weiß setzen

  if (mode === 1) {
    image(image1, 0, 0);  // Modus 1: Bild 1 anzeigen
  } else if (mode === 2) {
    image(image2, 0, 0);  // Modus 2: Bild 2 anzeigen
  } else if (mode === 3) {
    // Modus 3: Bild 1 im Hintergrund und Bild 2 immer sichtbar
    image(image2, 0, 0);  // Bild 2 im Hintergrund

    // Temporäre Maske im PGraphics bearbeiten
    pg.image(image1, 0, 0);  // Originalbild zurückladen, um den Zustand zu resetten
    pg.loadPixels();  // Lade die Pixel des temporären Bildes

    // Berechne nur den Bereich um die Maus herum
    let startX = max(mouseX - maskSize / 2, 0);
    let endX = min(mouseX + maskSize / 2, width);
    let startY = max(mouseY - maskSize / 2, 0);
    let endY = min(mouseY + maskSize / 2, height);

    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        let d = dist(x, y, mouseX, mouseY);  // Berechne den Abstand zum Mauszeiger
        let index = (x + y * width) * 4;  // Berechne den Pixel-Index

        if (d < maskSize / 2) {
          // Innerhalb des Radius: Setze den Alpha-Wert auf 0 (transparent)
          pg.pixels[index + 3] = 0;
        }
      }
    }

    pg.updatePixels();  // Update der Pixel des temporären Bildes

    // Zeichne das temporäre Bild mit der Transparenz
    image(pg, 0, 0);
  }

  // Hilfe und Modus-Text zeichnen
  drawModeText();
  if (!showHelp) {
    drawHelpText();
  }
}

// Funktion zum Zeichnen des Modus-Texts
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

// Funktion zum Zeichnen des Hilfetexts
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
    mode = 1;  // In Modus 1 wechseln (Bild 1)
  } else if (key === '2') {
    mode = 2;  // In Modus 2 wechseln (Bild 2)
  } else if (key === '3') {
    mode = 3;  // In Modus 3 wechseln (Bild 1 und Bild 2 an Mausposition)
  } else if (key === 'h' || key === 'H') {
    showHelp = !showHelp;  // Hilfe ein- oder ausblenden
  }
}
