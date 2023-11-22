window.addEventListener('DOMContentLoaded', init);

let img;

let staticImg;
let imgDiv;
let confirmImg;
let imgCorrect = false;
let dragging = false; // Is the object being dragged?
let rollover = false; // Is the mouse over the ellipse?
let x, y, w, h; // Location and size
let staticX, staticY;
let offsetX, offsetY; // Mouseclick offset
let imageLayer;


function init() {
  //gets the necesarry html elements
  confirmImg = document.getElementById('image-confirm');
  confirmImg.addEventListener('click', confirmClickHandler);
  imgDiv = document.getElementById('imageCanvas');
  imgDiv.classList.add('hidden');
}

let s1 = function (sketch) {
  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(406, 560);
    canvas1.parent('canvasCanvas');
    input = sketch.createFileInput(sketch.handleFile);
    input.parent('image-button')
  }
  sketch.draw = function () {
    //for canvas 1
    sketch.background(255, 0);
    if (img && imgCorrect) {
      console.log(img);
      sketch.image(staticImg, staticX, staticY, w, h);
    }

  }
  sketch.handleFile = function (file) {

    if (file.type === 'image') {
      img = sketch.createImg(file.data, '');
      img.hide();
      if (imgDiv.classList.contains('hidden')) {
        imgDiv.classList.toggle('hidden');
      }
    } else {
      img = null;
    }
  }


}


mainCanvas = new p5(s1);

let s2 = function (sketch) {
  sketch.setup = function () {
    let canvas2 = sketch.createCanvas(406, 560);
    canvas2.parent('imageCanvas');
    // Starting location
    x = 0;
    y = 0;

    // Dimensions
    w = 100;
    h = 100;
  }
  sketch.draw = function () {
    //for canvas 2

    sketch.clear();

    // Is mouse over object
    if (sketch.mouseX > x && sketch.mouseX < x + w && sketch.mouseY > y && sketch.mouseY < y + h) {
      rollover = true;
    } else {
      rollover = false;
    }

    // Adjust location if being dragged
    if (dragging) {
      x = sketch.mouseX + offsetX;
      y = sketch.mouseY + offsetY;
    }

    sketch.stroke(0);
    if (img) {

      sketch.image(img, x, y, w, h);
    }

  }

  sketch.mousePressed = function () {
    if (sketch.mouseX > x && sketch.mouseX < x + w && sketch.mouseY > y && sketch.mouseY < y + h) {
      dragging = true;

      offsetX = x - sketch.mouseX;
      offsetY = y - sketch.mouseY;
    }


  }
  sketch.mouseReleased = function () {
    // Quit dragging
    dragging = false;
  }
}

imageLayer = new p5(s2);

function confirmClickHandler() {
  imgCorrect = true;
  staticImg = img;
  staticX = x;
  staticY = y;
  if (!imgDiv.classList.contains('hidden') && imgDiv !== undefined) {
    imgDiv.classList.add('hidden');
  }
}



function keyTyped() {
  if (key === 'a') {
    save('image.png');
  }
}


