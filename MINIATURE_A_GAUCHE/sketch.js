let img;
let logo;
let userText = "SOUS TITRE ICI";
let userSubText = "TITRE ICI";
let bgImage;
let textSizeMain = 170;
let textSizeSub = 130;
let textX = 960;
let textY = 940;
let subTextY = 800;
let gothamFont;

function preload() {
    gothamFont = loadFont("fonts/Gotham-Black.otf");  // Vérifie que ce fichier existe
    logo = loadImage("logo.png"); 
}

function setup() {
    createCanvas(1920, 1080).parent("canvas-container");
    
    let inputText = document.getElementById("titleInput");
    inputText.addEventListener("input", updateText);
    
    let inputSubText = document.getElementById("subtitleInput");
    inputSubText.addEventListener("input", updateSubText);
    
    let inputFile = document.getElementById("imageUpload");
    inputFile.addEventListener("change", handleFile);
    
    let textSizeSlider = document.getElementById("textSizeSlider");
    textSizeSlider.addEventListener("input", (e) => {
        textSizeMain = parseInt(e.target.value);
    });
    
    let subTextSizeSlider = document.getElementById("subTextSizeSlider");
    subTextSizeSlider.addEventListener("input", (e) => {
        textSizeSub = parseInt(e.target.value);
    });
    
    let textYSlider = document.getElementById("textYSlider");
    textYSlider.addEventListener("input", (e) => {
        textY = parseInt(e.target.value);
    });
    
    let subTextYSlider = document.getElementById("subTextYSlider");
    subTextYSlider.addEventListener("input", (e) => {
        subTextY = parseInt(e.target.value);
    });

    document.getElementById("exportButton").addEventListener("click", () => {
        saveCanvas("miniature", "jpg");
    });
}

function draw() {
    background(200);

    if (bgImage) {
        let imgRatio = bgImage.width / bgImage.height;
        let canvasRatio = width / height;
        let drawWidth, drawHeight, xOffset, yOffset;

        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = bgImage.width * (height / bgImage.height);
            xOffset = (width - drawWidth) / 2;
            yOffset = 0;
        } else {
            drawWidth = width;
            drawHeight = bgImage.height * (width / bgImage.width);
            xOffset = 0;
            yOffset = (height - drawHeight) / 2;
        }

        image(bgImage, xOffset, yOffset, drawWidth, drawHeight);
    }

    let logoSize = 150;
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";
    image(logo, width - logoSize - 20, 20, logoSize, logoSize);
    drawingContext.shadowBlur = 0;

    // Ajout des dégradés
    drawGradient(0, height - (height / 1.8), width, height / 1.8, color(255, 255, 255, 0), color(255, 255, 255)); 
    drawGradient(0, height - (height / 3), width, height / 3, color(1, 61, 255, 0), color(1, 61, 255));

    textFont(gothamFont);

    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.7)";
    fill(255);
    textSize(textSizeMain);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(userText.toUpperCase(), textX, textY);
    drawingContext.shadowBlur = 0;

    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.7)";
    fill(1, 61, 255);
    textSize(textSizeSub);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(userSubText.toUpperCase(), textX, subTextY);
    drawingContext.shadowBlur = 0;
}


function updateText(event) {
    userText = event.target.value;
}

function updateSubText(event) {
    userSubText = event.target.value;
}

function handleFile(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            bgImage = loadImage(e.target.result);
        }
        reader.readAsDataURL(file);
    }
}

function drawGradient(x, y, w, h, c1, c2) {
    for (let i = 0; i < h; i++) {
        let inter = map(i, 0, h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, y + i, x + w, y + i);
    }
}


document.getElementById("exportButton").addEventListener("click", () => {
    saveCanvas("miniature", "jpg");
});
