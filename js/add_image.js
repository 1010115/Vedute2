window.addEventListener('load', init);
let currentX = 0;
let currentY = 0;
let lastX = 0;
let lastY = 0;
let canvas, context;
let img;
let isDraggable = false;

function init() {
    const input = document.getElementById("files");
    const output = document.getElementById("output");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    if (files.length === 0) {
      output.textContent = "No files selected.";
      return;
     } else {
    input.addEventListener("change", function(e) {
        if(e.target.files) {
        const imageFile = input.files[0];
        reader = new FileReader();
        reader.readAsDataURL(imageFile);
          console.log(files[0]);
          reader.onloadend = function(e) {
            img = new Image(100);
            img.src = e.target.result;
            
            currentX = 0;
            currentY = 0;
          
          img.onload = function(ev) {
            _Go();
            
          };
         }
            }}
      )};
}

function moveImage(ctx, img) {
  ctx.clearRect(lastX, lastY, 400, 600);
  let x = event.clientX - ctx.left;
  let y = event.clientY - ctx.top;
  let pos = `X: ${x}<br>Y: ${y}`
  ctx.drawImage(img, x, y, 400, 600);
  lastX = x;
  lastY = y;

}

function _Go() {
  _MouseEvents();
  _DrawImage();
  setInterval(function() {
    _ResetCanvas();
    
  }, 1000/30);
}

function _ResetCanvas() {
  context.fillStyle = '#fff';
  if(isDraggable) {
    context.clearRect(lastX, lastY, 400, 600);
  }
  
}

function _MouseEvents() {
  
  canvas.onmousedown = function(e) {
    
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    console.log(mouseX, mouseY)
    console.log(currentX, currentY);

    if (mouseX >= (currentX - 400/2 ) &&
        mouseX <= (currentX + 400/2) &&
        mouseY >= (currentY -600/2) &&
        mouseY <= (currentY + 600/2)) {
      isDraggable = true;
      console.log(isDraggable);
    }
  };
  canvas.onmousemove = function(e) {

    if (isDraggable) {
      currentX = e.pageX - this.offsetLeft;
      currentY = e.pageY - this.offsetTop;
    }
  };
  canvas.onmouseup = function(e) {
    isDraggable = false;
    _DrawImage();
  };
  canvas.onmouseout = function(e) {
    isDraggable = false;
  };
}
function _DrawImage() {
  context.drawImage(img, currentX, currentY, 400, 600);
  lastX = currentX;
  lastY = currentY;

}
