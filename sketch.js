let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3
let ellipseSize = 100;  // Größe der Ellipse

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
  
  // Je nach Modus das passende Bild anzeigen
  if (mode === 1) {
    image(image1, 0, 0);  // Bild 1 anzeigen
  } else if (mode === 2) {
    image(image2, 0, 0);  // Bild 2 anzeigen
  } else if (mode === 3) {
    // Bild 2 wird im Hintergrund angezeigt
    image(image2, 0, 0);  // Bild 2 im Hintergrund

    // Erstelle eine Maske für Bild 1
    let maskImg = createGraphics(width, height);  // Neue Maske erstellen
    maskImg.clear();  // Alte Zeichnungen löschen
    maskImg.fill(255);  // Weiße Farbe für den Bereich, der sichtbar bleibt
    maskImg.noStroke();
    maskImg.ellipse(mouseX, mouseY, ellipseSize, ellipseSize);  // Ellipse an der Mausposition

    // Wende die Maske auf Bild 1 an
    image1.mask(maskImg);  // Maskiere Bild 1 mit der Maske

    // Bild 1 anzeigen, aber mit der Maske angewendet
    image(image1, 0, 0);  
  }
}

function keyPressed() {
  if (key === '1') {
    mode = 1;  // In Modus 1 wechseln (Bild 1)
  } else if (key === '2') {
    mode = 2;  // In Modus 2 wechseln (Bild 2)
  } else if (key === '3') {
    mode = 3;  // In Modus 3 wechseln (Bild 1 und Bild 2 mit Ellipse)
  }
}
