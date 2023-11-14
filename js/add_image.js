window.addEventListener('DOMContentLoaded', init);
let currentX = 0;
let currentY = 0;
let lastX = 0;
let lastY = 0;
let canvas, context;
let imageCanvas, imagecontext;
let img;
let mouseX;
let mouseY;
let isDraggable = false;

function init() {
  //gets the necesarry html elements
    const input = document.getElementById("files");
    const output = document.getElementById("output");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    //checks if the user has uploaded any files and then initializes the image
    if (files.length === 0) {
      output.textContent = "No files selected.";
      return;
     } else {
    input.addEventListener("change", function(e) {
        if(e.target.files) {
        const imageFile = input.files[0];
        reader = new FileReader();
        reader.readAsDataURL(imageFile);
          reader.onloadend = function(e) {
            img = new Image(100);
            img.src = e.target.result;
            currentX = 0;
            currentY = 0;
          img.onload = function(ev) {
            createImageCanvas();
            _Go();
            
          };
         }
            }}
      )}
}

function _Go() {
  _MouseEvents();
  
  setInterval(function() {
    _ResetCanvas();
    _DrawImage();
  }, 1000/30);
}

function _ResetCanvas() {
  if(isDraggable) {
    imagecontext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  }
  
}

function _MouseEvents() {
  
  imageCanvas.onmousedown = function(e) {
    
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    console.log(mouseX, mouseY)
    

    if (mouseX >= (currentX - 400/2 ) &&
        mouseX <= (currentX + 400/2) &&
        mouseY >= (currentY -600/2) &&
        mouseY <= (currentY + 600/2)) {
      isDraggable = true;
      console.log(isDraggable);
    }
  };
  imageCanvas.onmousemove = function(e) {
    if (isDraggable) {
      currentX = e.pageX - this.offsetLeft;
      currentY = e.pageY - this.offsetTop;
    }
  };
  imageCanvas.onmouseup = function(e) {
    isDraggable = false;
    console.log(currentX, currentY);
    _DrawImage();
  };
  imageCanvas.onmouseout = function(e) {
    isDraggable = false;
  };
}
function _DrawImage() {

    imagecontext.drawImage(img, currentX * 2, currentY * 2, 400, 600);
    lastX = currentX * 2;
    lastY = currentY * 2;
}

function createImageCanvas() {
  let list = canvas.classList;
  let container = document.getElementById("canvasContainer");
  imageCanvas = document.createElement("canvas");
  imageCanvas.width = canvas.width;
  imageCanvas.height = canvas.height;
  imagecontext = imageCanvas.getContext("2d");
  for(let i =0; i <= list.length; i++) {
    imageCanvas.classList.add(list[i]);
  }
  imageCanvas.classList.add(["z-10", "absolute"])
  console.log(container);
  container.append(imageCanvas);
}
