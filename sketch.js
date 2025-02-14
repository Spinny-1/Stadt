let image1, image2;
let mode = 1;  // Modus-Variable: 1 = Bild 1, 2 = Bild 2, 3 = Modus 3

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
    image(image1, 0, 0);  // Nur Bild 1 im Modus 3
    // Ellipse nur im Modus 3 zeichnen
    fill(0, 100, 255, 150);  // Blau mit transparenter Füllung
    noStroke();  // Kein Rand
    ellipse(mouseX, mouseY, 100, 100);  // Ellipse mit 100px Durchmesser
  }
}

function keyPressed() {
  if (key === '1') {
    mode = 1;  // In Modus 1 wechseln (Bild 1)
  } else if (key === '2') {
    mode = 2;  // In Modus 2 wechseln (Bild 2)
  } else if (key === '3') {
    mode = 3;  // In Modus 3 wechseln (nur Bild 1 und Ellipse)
  }
}
