let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3
let maskSize = 150;  // Größe der Maske, um Bild 1 transparent zu machen

let originalPixels = [];

function preload() {
  image1 = loadImage("StadtPast.png");  // Bild 1 laden
  image2 = loadImage("StadtPost.png");  // Bild 2 laden
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild 1 skalieren
  image2.resize(width, height);  // Bild 2 skalieren

  image1.loadPixels();  // Lade die Pixel von Bild 1 in das Array
  originalPixels = image1.pixels.slice();  // Speichere die ursprünglichen Pixel
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
    image(image1, 0, 0);  // Bild 1 darüber

    // Temporär transparenten Bereich für Bild 1 definieren
    image1.loadPixels();  // Lade die Pixel von Bild 1

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let d = dist(x, y, mouseX, mouseY);  // Berechne den Abstand zum Mauszeiger
        let index = (x + y * width) * 4;  // Berechne den Pixel-Index

        if (d < maskSize / 2) {
          // Innerhalb des Radius: Setze den Alpha-Wert auf 0 (transparent)
          image1.pixels[index + 3] = 0;
        } else {
          // Außerhalb des Radius: Setze den Alpha-Wert zurück auf den Originalwert
          image1.pixels[index + 3] = originalPixels[index + 3];
        }
      }
    }

    image1.updatePixels();  // Wende die Pixeländerungen an

    // Bild 1 bleibt unverändert, da nur die Pixel temporär verändert wurden
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
