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

    // Temporäre Bearbeitung der Pixel in der Nähe der Maus
    loadPixels();  // Die Leinwand-Pixel laden, auf denen wir die Maske anwenden werden
    for (let x = mouseX - maskSize / 2; x < mouseX + maskSize / 2; x++) {
      for (let y = mouseY - maskSize / 2; y < mouseY + maskSize / 2; y++) {
        let d = dist(x, y, mouseX, mouseY);  // Berechne den Abstand zum Mauszeiger
        if (d < maskSize / 2 && x >= 0 && x < width && y >= 0 && y < height) {
          let index = (x + y * width) * 4;  // Berechne den Pixel-Index
          // Setze den Alpha-Wert der Pixel temporär auf 0 (transparente Stelle)
          pixels[index + 3] = 0;  // Transparenz setzen
        }
      }
    }

    updatePixels();  // Update die Leinwand-Pixel mit den Änderungen

    image(image1, 0, 0);  // Bild 1 erneut zeichnen (nun mit temporärer Transparenz an der Mausposition)
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
