let image1;

function preload() {
  image1 = loadImage("StadtPost.png");  // Bild laden
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild auf die Größe der Leinwand skalieren
}

function draw() {
  background(255);  // Hintergrund auf weiß setzen
  image(image1, 0, 0);  // Bild anzeigen
}
