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
    // Bild 2 wird hinter Bild 1 gezeichnet
    image(image2, 0, 0);  // Bild 2 im Hintergrund
    image(image1, 0, 0);  // Bild 1 im Vordergrund

    // Ellipse nur im Modus 3 zeichnen und Bild 1 durch Bild 2 ersetzen
    fill(0, 100, 255, 150);  // Blau mit transparenter Füllung
    noStroke();  // Kein Rand
    ellipse(mouseX, mouseY, ellipseSize, ellipseSize);  // Ellipse mit Größe
    
    // Überlagertes Bild: Bild 2 wird an der Stelle der Ellipse angezeigt
    let x = mouseX - ellipseSize / 2;
    let y = mouseY - ellipseSize / 2;
    image(image2, x, y, ellipseSize, ellipseSize);  // Bild 2 an Ellipsen-Position
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
