let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3
let maskSize = 150;  // Größe der Maske, um Bild 1 transparent zu machen
let tempImage;

function preload() {
  image1 = loadImage("StadtPast.png");  // Bild 1 laden
  image2 = loadImage("StadtPost.png");  // Bild 2 laden
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild 1 skalieren
  image2.resize(width, height);  // Bild 2 skalieren

  tempImage = createImage(width, height);  // Temporäres Bild erstellen
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

    // Temporäres Bild (Maske) mit dem Bild 1 laden
    tempImage.copy(image1, 0, 0, width, height, 0, 0, width, height);

    tempImage.loadPixels();  // Lade die Pixel des temporären Bildes

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let d = dist(x, y, mouseX, mouseY);  // Berechne den Abstand zum Mauszeiger
        let index = (x + y * width) * 4;  // Berechne den Pixel-Index

        if (d < maskSize / 2) {
          // Innerhalb des Radius: Setze den Alpha-Wert auf 0 (transparent)
          tempImage.pixels[index + 3] = 0;
        } else {
          // Außerhalb des Radius: Behalte die Transparenz bei
          tempImage.pixels[index + 3] = 255;  // oder 255 für vollen Alpha-Wert (undurchsichtig)
        }
      }
    }

    tempImage.updatePixels();  // Update der Pixel des temporären Bildes

    // Zeichne das temporäre Bild, das die Transparenz an der Mausposition hat
    image(tempImage, 0, 0);
  }
}

function keyPressed() {
  if (key === '1') {
    mode = 1;  // In Modus 1 wechseln (Bild 1)
  } else if (key === '2') {
    mode = 2;  // In Modus 2 wechseln (Bild 2)
  } else if (key === '3') {
    mode = 3;  // In Modus 3 wechseln (Bild 1 und Bild 2 an Mausposition)
  }
}
