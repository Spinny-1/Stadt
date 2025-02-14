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
    image(image1, 0, 0);  // Bild 1 im Hintergrund

    // Erstelle eine Maske, um an der Mausposition Bild 1 transparent zu machen
    let maskImg = createImage(width, height);
    maskImg.loadPixels();

    // Setze das gesamte Bild auf undurchsichtig
    for (let i = 0; i < maskImg.pixels.length; i++) {
      maskImg.pixels[i] = color(255, 255, 255, 255);  // Alle Pixel undurchsichtig
    }

    // Setze die Pixels im Bereich um die Maus auf transparent
    let mouseXmin = mouseX - maskSize / 2;
    let mouseXmax = mouseX + maskSize / 2;
    let mouseYmin = mouseY - maskSize / 2;
    let mouseYmax = mouseY + maskSize / 2;

    for (let x = mouseXmin; x < mouseXmax; x++) {
      for (let y = mouseYmin; y < mouseYmax; y++) {
        let d = dist(x, y, mouseX, mouseY);
        if (d < maskSize / 2) {
          let index = (x + y * width) * 4;
          maskImg.pixels[index + 3] = 0;  // Setze die Alpha-Kanal auf 0 (transparent)
        }
      }
    }

    maskImg.updatePixels();  // Maske anwenden

    // Wende die Maske auf Bild 1 an, sodass es transparent wird an der Mausposition
    image(image1, 0, 0);  // Bild 1 noch einmal zeichnen
    image(image2, 0, 0);  // Bild 2 im Hintergrund
    image(image1, 0, 0);  // Bild 1 noch einmal zeichnen
    image(image2, 0, 0);
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
