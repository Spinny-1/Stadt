let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3
let maskSize = 150;  // Größe der Maske, um Bild 1 transparent zu machen

function preload() {
  image1 = loadImage("StadtPast.png");  // Bild 1 laden
  image2 = loadImage("StadtPost.png");  // Bild 2 laden
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild 1 skalieren
  image2.resize(width, height);  // Bild 2 skalieren
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

    // Ändere die Pixel von Bild 1, um es transparent zu machen, wo die Maus ist
    image1.loadPixels();  // Lade die Pixel von Bild 1

    for (let x = 0; x < image1.width; x++) {
      for (let y = 0; y < image1.height; y++) {
        let d = dist(x, y, mouseX, mouseY);  // Berechne den Abstand zum Mauszeiger
        let index = (x + y * image1.width) * 4;  // Berechne den Pixel-Index

        if (d < maskSize / 2) {
          // Wenn der Pixel im Radius der Maske liegt, auf transparent setzen
          image1.pixels[index + 3] = 0;  // Alpha-Wert auf 0 setzen
        } else {
          // Wenn der Pixel außerhalb des Radius liegt, zurück auf 100 setzen
          image1.pixels[index + 3] = 100;  // Alpha-Wert auf 100 setzen
        }
      }
    }

    image1.updatePixels();  // Update die Pixel von Bild 1

    image(image1, 0, 0);  // Zeichne Bild 1 mit der transparenten Stelle
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
