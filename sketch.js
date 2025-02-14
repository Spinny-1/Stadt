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

    // Temporär transparenten Bereich für Bild 1 definieren
    let maskImage = createImage(image1.width, image1.height); // Neue Maske erstellen
    maskImage.loadPixels(); // Lade die Pixel der Maske

    // Erstelle die Maske basierend auf dem Mausbereich
    for (let x = 0; x < maskImage.width; x++) {
      for (let y = 0; y < maskImage.height; y++) {
        let d = dist(x, y, mouseX, mouseY);  // Berechne den Abstand zum Mauszeiger
        if (d < maskSize / 2) {
          maskImage.set(x, y, color(0, 0, 0, 0));  // Setze Pixel innerhalb des Mausradius auf transparent
        } else {
          maskImage.set(x, y, color(255, 255, 255, 255));  // Alle anderen Pixel bleiben sichtbar
        }
      }
    }
    maskImage.updatePixels();  // Wende die Änderungen auf das Maskenbild an
    image1.mask(maskImage);  // Wende die Maske auf Bild 1 an

    image(image1, 0, 0);  // Zeichne Bild 1 mit der Maske (Transparenz nur in Mausbereich)

    // Bild 2 ist immer im Hintergrund sichtbar
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
