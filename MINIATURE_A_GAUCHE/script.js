let img;
let logo;
let inputText;
let inputFile;
let userText = "Votre texte ici";
let bgImage;

function preload() {
    logo = loadImage("logo.png"); // Assurez-vous d'avoir un logo disponible
}

function setup() {
    createCanvas(1920, 1080);
    inputText = createInput("Votre texte ici");
    inputText.position(20, height + 20);
    inputText.input(updateText);
    
    inputFile = createFileInput(handleFile);
    inputFile.position(20, height + 60);
}

function draw() {
    background(200);
    
    if (bgImage) {
        image(bgImage, 0, 0, width, height);
    }
    
    image(logo, 20, 20, 200, 100);
    
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(userText, width / 2, height - 100);
}

function updateText() {
    userText = this.value();
}

function handleFile(file) {
    if (file.type === 'image') {
        bgImage = loadImage(file.data);
    }
}
