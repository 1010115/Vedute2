document.addEventListener("DOMContentLoaded", init);

let layer1;
let layer2;
let layer3;

let veduteImage1;
let veduteImage2;
let veduteImage3;

let canvas;
let canvasParent;
let GifDiv;

let img1;
let img2;
let img3;
let imagesLoaded = false;

function init() {
    canvasParent = document.getElementById("canvas");
    GifDiv = document.getElementById('gifdiv');
}

function preload() {
    getImageFromLocalstorage();
    if(imagesLoaded) {
        img1 = loadImage(veduteImage1);
        img2 = loadImage(veduteImage2);
        img3 = loadImage(veduteImage3);
    }
    
}

function setup() {
    canvas = createCanvas(406, 560);
    canvas.background(155);
    canvas.parent(canvasParent);

    layer1 = new Layer("pink", img1, 70, 123);
    layer2 = new Layer("pink", img2, 150, 203);
    layer3 = new Layer("pink", img3, 230, 283);

    layer1.start(3, 150, 203);
    layer2.start(3, 150, 203);
    layer3.start(3, 150, 203);

    let button = createButton('Gif opslaan');
    button.addClass("p-6 w-80 text-center rounded-md bg-slate-50 bg-opacity-70 hover:bg-opacity-100 text-black text-xl font-medium mr-4 mt-2 transition duration-150 ease-in-out")
    button.parent(GifDiv);

    button.mousePressed(() => {
        saveGif('myVedute', 5);
    });

}


function draw() {
    background(220);

    layer1.display();
    layer2.display();
    layer3.display();

    layer1.move();
    layer2.move();
    layer3.move();
}

class Layer {
    constructor(lColor, image, x, y) {
        this.color = lColor;
        this.image = image;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.pointBX = x;
        this.pointBY = y;
        this.pointAX = x;
        this.pointAY = y;
        this.returning = false;
    }


    start(speed, pointBX, pointBY) {
        this.speed = speed;
        this.pointBX = pointBX;
        this.pointBY = pointBY;
        this.pointAX = this.x;
        this.pointAY = this.y;
    }


    display() {
        fill(255, 255, 255, 0.5)
        rect(this.x, this.y, 128, 176);
         if(imagesLoaded) {
            image(this.image, this.x, this.y, 128, 176);
        }
        
        
    }


    move() {
        if (!this.returning) {
            this.x = lerp(this.x, this.pointBX, 0.05);
            this.y = lerp(this.y, this.pointBY, 0.05);

            if (dist(this.x, this.y, this.pointBX, this.pointBY) < 0.1) {
                this.returning = true;
            }
        } else {
            this.x = lerp(this.x, this.pointAX, 0.05);
            this.y = lerp(this.y, this.pointAY, 0.05);

            if (dist(this.x, this.y, this.pointAX, this.pointAY) < 0.1) {
                this.returning = false;
            }
        }

        if (this.x < -20) {
            this.x = width;
        } else if (this.x > width) {
            this.x = -20;
        }
    }

    
}
function getImageFromLocalstorage() {
    if(localStorage.getItem('img1')) {
        veduteImage1 = localStorage.getItem("img1");
        veduteImage2 = localStorage.getItem("img2");
        veduteImage3 = localStorage.getItem("img3");
        localStorage.removeItem('img1');
        localStorage.removeItem("img2");
        localStorage.removeItem("img3");
        imagesLoaded = true;
    }
    
}

