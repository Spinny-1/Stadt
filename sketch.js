let image1, image2;
let currentImage;  // Variable für das aktuell angezeigte Bild

function preload() {
  image1 = loadImage("StadtPast.png");  // Bild 1 laden
  image2 = loadImage("StadtPost.png");  // Bild 2 laden
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Leinwand erstellen
  image1.resize(width, height);  // Bild 1 skalieren
  image2.resize(width, height);  // Bild 2 skalieren
  currentImage = image1;  // Standardmäßig Bild 1 anzeigen
}

function draw() {
  background(255);  // Hintergrund auf weiß setzen
  image(currentImage, 0, 0);  // Das aktuelle Bild anzeigen
  
  // Ellipse an der Mausposition zeichnen
  fill(0, 100, 255, 150);  // Blau mit transparenter Füllung
  noStroke();  // Kein Rand
  ellipse(mouseX, mouseY, 100, 100);  // Ellipse mit 100px Durchmesser
}

function keyPressed() {
  if (key === '1') {
    currentImage = image1;  // Bild 1 anzeigen
  } else if (key === '2') {
    currentImage = image2;  // Bild 2 anzeigen
  }
}
