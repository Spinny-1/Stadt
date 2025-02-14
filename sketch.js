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

    // Temporäre Maske für die Transparenz an der Mausposition
    push();
    // Setze die Transparenz für den Bereich um den Mauszeiger
    noStroke();
    fill(255, 255, 255, 255);  // Weiß, aber mit voller Deckkraft
    ellipse(mouseX, mouseY, maskSize, maskSize);  // Erstelle die Maske als Ellipse
    pop();
    
    // Bild 2 wird an den Stellen sichtbar, wo Bild 1 transparent ist
    // (Dafür wird Bild 2 erneut gezeichnet, aber das transparente Bild 1 bleibt unverändert)
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
