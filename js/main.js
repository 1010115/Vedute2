document.addEventListener("DOMContentLoaded", init);

//starting variables for images
let img; // the image your currently using
let staticImg; //the image that gets posted into the canvas
let imgDiv; //the div that has the img canvas
let confirmImg; //the button that onfirms the image
let cancelImg; //the button that cancels the image
let imgCorrect = false; //wether the image button has been pressed or not
let dragging = false; // Is the object being dragged?
let rollover = false; // Is the mouse over the ellipse?
let x, y, w, h; // Location and size
let staticX, staticY; //the location the image gets placed on the main canvas
let offsetX, offsetY; // Mouseclick offset
let imageLayer; //p5 object for the imagelayer
let uploadedImages = [] // array of all images that get saved into localstorage
let imageName; // Uploaded image name
let imageB64; // Uploaded
let downloadImg;// img to use for downloadimg
let usingGallery = false; //usinggallery wont save to localstorage if you use gallery
let inCanvas = false;
let color;

//starting variables for brush - color - size
let Ubrush = "pen"; //user brush
let USize = 10; //user size
let Utoothpicklength = 5;//user toothpick length
let sizeImg;
let brushImg

let previousState;
let saveStates = []
let drawing = true

//multiple canvases
let l1, l2, l3; //used as the extra layers
let prevLayerButton, nextLayerButton; //buttons to switch layers
let currentLayer = 0; //checks the current layer;
let layerSwitch = false;
let canvasImg;
let layerImg;

//brush sizes
const sizes = {
    'small': 5,
    'medium': 10,
    'big': 15
}

//alle colors die worden gebruikt
const colors = {
    "black": [0, 0, 0],
    "white": [255, 255, 255],
    "red": [239, 68, 68],
    "green": [34, 197, 94],
    "blue": [59, 130, 246],
    "yellow": [234, 179, 8],
    "orange": [249, 115, 22],
    "violet": [139, 92, 246],
    // "mypicker": color
}

const activeEvents = {
    "mousedown": undefined,
    "mouseup": undefined,
    "mousemove": undefined
};

// For every brush


function init() {

  //gets the necesarry html elements
  confirmImg = document.getElementById('image-confirm');
  cancelImg = document.getElementById('image-cancel');
  confirmImg.addEventListener('click', confirmClickHandler);
  cancelImg.addEventListener('click', cancelClickHandler);
  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', clearClickHandler)
  imgDiv = document.getElementById('imageCanvas');
  imgDiv.classList.add('hidden');
  layerImg = document.getElementById('layerImg');
  nextLayerButton = document.getElementById('nextLayer');
  nextLayerButton.addEventListener('click', nextLayerHandler)
  prevLayerButton = document.getElementById('prevLayer');
  prevLayerButton.addEventListener('click', prevLayerHandler);
  const tools = document.getElementsByClassName('tool')
        for(const tool of tools) {
            tool.addEventListener('click', (e) => { setBrush(e, tool.id)} );
        }


    const sizeButtons = document.getElementsByClassName('size')
    for (const sizeButton of sizeButtons) {
        sizeButton.addEventListener('click', (e) => {
            setSize(e, sizes[sizeButton.id])
        });
    }

    sizeImg = document.getElementById("sizeimg")
    sizeImg.src = "../assets/medium.svg";

    brushImg = document.getElementById("brushimg")
    brushImg.src = "../assets/pen-solid.svg"

    //get all saved images from localstorage and add to menu
    if (localStorage.getItem("uploadedImages")) {    //if uploadedimages are uploaded to localstorage
        uploadedImages = JSON.parse(localStorage.getItem("uploadedImages"));

        uploadedImages.forEach((object, index) => {
            //add to HTML
            // Create the div element
            let divElement = document.createElement("div");
            divElement.classList.add("p-1", "bg-slate-100", "rounded-lg", "text-center", "flex", "justify-center", "items-center");

            // Create the img element
            let imgElement = document.createElement("img");
            imgElement.setAttribute("src", object.base64);
            imgElement.setAttribute("alt", object.name);
            imgElement.classList.add("rounded-lg", "object-cover", "w-100px", "h-100px");
            imgElement.addEventListener('click', imageFromGallery, object.name);

            // Append the img element to the div
            divElement.appendChild(imgElement);

            // Append the div to the document body or any other desired location
            document.getElementById('imageModal').appendChild(divElement);
        });
    }

    downloadImg = document.getElementById('finish')
    downloadImg.addEventListener('click', finish)

    console.log("init klaar");
}

//prepares the main canvas and input button
setup = function () {
    //color picker
    myPicker = createColorPicker('black');
    myPicker.parent("color-picker");
    //change opacity to 1 to see color picker input
    myPicker.style('position:absolute; width:330px; height:60px; top: 0vw; right: 0vw; opacity:0;');
    myPicker.changed(ButtonColor);

    //p5 canvas
    let canvas1 = createCanvas(406, 560);
    canvas1.parent('canvasCanvas');
    l1 = createGraphics(406, 560);
    l2 = createGraphics(406, 560);
    l3 = createGraphics(406, 560);

    //image input file
    input = createFileInput(handleFile);
    
    input.id('image-import');
    input.parent('image-insert');

    //savestate for undo function
    saveState();

    //get last vedute from localstorage (if one is in there)
    if(localStorage.getItem("img")){
        loadImage(localStorage.getItem("img"),img => {
        image(img,0,0,406,560);
        });
    }
    localStorage.removeItem('img');
}



draw = function () {
    color = myPicker.color();
    color = color.toString();
    color= color.replace(/rgba?|\(|\)/g,'').split(',');
    color = color.slice(0,3)
    // Display the current color as a hex string.
    //selects the correct pen and allows you to draw
    if (mouseIsPressed && imgDiv.classList.contains("hidden") && inCanvas === true) {
        switch (Ubrush) {
            case "pen":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                pen()
                break;
            case "spraypaint":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                sprayPaint()
                break;
            case "calligraphy":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                calligraphy()
                break;
            case "marker":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                marker()
                break;
            case "wiggle":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                wiggle()
                break;
            case "toothpick":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                toothpick()
                break;
            case "hatching":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                hatching()
                break;
            case "splatter":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                splatter()
                break;
            case "eraser":

                if (drawing) {
                    saveState()
                    drawing = false
                }
                eraser()
                break;
        }

    }

    addEventListener("mouseup", (event) => {
         drawing = true;
        
        
    })

    addEventListener("mousedown", (event) => {
        let canvas1 = document.getElementById('defaultCanvas0');
        if(event.target === canvas1) {
            inCanvas = true;
        } else {
            inCanvas = false;
        }
        
    })

    //sets the current canvas to new layer
    if(canvasImg && layerSwitch) {
        clear();
        image(canvasImg, 0, 0, 406, 560);
        layerSwitch = false;
        if(Ubrush === "eraser") {
            Ubrush = "pen";
            console.log(Ubrush);
            brushImg.src = "../assets/pen-solid.svg";
            noErase()
        }
    }

    //checks if the image gets pasted into the main canvas and pasts it there
    if (img && imgCorrect) {

        console.log(img);
        image(staticImg, staticX, staticY, w, h);
        imgCorrect = false;
        if (!confirmImg.classList.contains('hidden')) {
            confirmImg.classList.toggle('hidden');
            cancelImg.classList.toggle('hidden');
            imgDiv.classList.toggle('hidden');
        }
        image(staticImg, staticX, staticY, w, h);
        imgCorrect = false;
    }
}


//handles the image file input
handleFile = function (file) {

    if (file.type === 'image') {
        
        //add savestate for undo function
        imgSaveState()

        //set name and B64 data
        imageName = file.name;
        setB64(file.file)
        img = createImg(file.data, '');
        img.hide();
        if (imgDiv.classList.contains('hidden')) {
            imgDiv.classList.toggle('hidden');
            confirmImg.classList.toggle('hidden');
            cancelImg.classList.toggle('hidden')
        }

    } else {
        img = null;
    }
}

//handles image import to canvas from image gallery
function handleGallery(b64) {

    //image savestate to add undo from gallery
    imgSaveState()

    img = createImg(b64);

    usingGallery = true;

    img.hide();
    if (imgDiv.classList.contains('hidden')) {
        imgDiv.classList.toggle('hidden');
        cancelImg.classList.toggle('hidden');
        confirmImg.classList.toggle('hidden');
    }
}


function setBrush(e, mode) {
    for (const event in activeEvents) {
        window.removeEventListener(event, activeEvents[event]);
        activeEvents[event] = undefined;
    }

    //when user selects diffrent brush
    switch (mode) {
        case 'pen':
            Ubrush = "pen";
            console.log(Ubrush);
            brushImg.src = "../assets/pen-solid.svg";
            noErase()
            break;
        case 'spraypaint':
            Ubrush = "spraypaint";
            console.log(Ubrush);
            brushImg.src = "../assets/spraypaint.svg";
            noErase()
            break;
        case 'calligraphy':
            Ubrush = "calligraphy";
            console.log(Ubrush);
            brushImg.src = "../assets/calligraphy.svg";
            noErase()
            break;
        case 'marker':
            Ubrush = "marker";
            console.log(Ubrush);
            brushImg.src = "../assets/marker.svg";
            noErase()
            break;
        case 'wiggle':
            Ubrush = "wiggle";
            console.log(Ubrush);
            noErase()
            brushImg.src = "../assets/wiggle.svg";
            break;
        case 'toothpick':
            Ubrush = "toothpick";
            console.log(Ubrush);
            noErase()
            brushImg.src = "../assets/pen.svg";
            break;
        case 'splatter':
            Ubrush = "splatter";
            console.log(Ubrush);
            noErase()
            brushImg.src = "../assets/splatter.svg";
            break;
        case 'hatching':
            Ubrush = "hatching"
            console.log(Ubrush);
            noErase()
            brushImg.src = "../assets/hatching.svg";
            break;
        case 'eraser':
            Ubrush = "eraser";
            console.log(Ubrush);
            brushImg.src = "../assets/eraser.svg";
            break;
    }
}

function setSize(e, size) {
    if (size === 5) {
        USize = 5;
        console.log(USize);
        sizeImg.src = "../assets/small.svg";
    }

    if (size === 10) {
        USize = 10;
        console.log(USize);
        sizeImg.src = "../assets/medium.svg";
    }

    if (size === 15) {
        USize = 15;
        console.log(USize);
        sizeImg.src = "../assets/big.svg";
    }
}

function ButtonColor() {
    // change button color to selected color

    colorButton = document.getElementById("color-selector");
    colorButton.style = `background-color: rgb(${color});`;

}

function clearClickHandler(e) {
    if(confirm("wil je echt je canvas clearen? Dit verwijderd alles wat op de huidige laag is getekent, als je dit terug wil halen kan je op de undo button clicken (ctrl + z)")){
        imgSaveState();
        clear();
    }
    
}


// --- pen---
function pen() {
    // set the color and weight of the stroke
    stroke(color[0], color[1], color[2], 255)
    strokeWeight(USize)

    // draw a line from current mouse point to previous mouse point
    line(mouseX, mouseY, pmouseX, pmouseY)
}

// --- marker ---
function marker() {
    // set the color and brush style
    fill(color[0], color[1], color[2], 40)
    noStroke()

    // draw a circle at the current mouse point, with diameter of 50 pixels
    circle(mouseX, mouseY, USize)
}

// --- wiggle ---
function wiggle() {
    // set the color and brush style
    stroke(color, 255)
    strokeWeight(USize)
    noFill()

    // find the distance between the current and previous mouse points
    const distance = dist(mouseX, mouseY, pmouseX, pmouseY)

    // find the midpoint between the current and previous mouse points
    const midX = (mouseX + pmouseX) / 2
    const midY = (mouseY + pmouseY) / 2

    // find the angle of the direction the mouse is moving in
    const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)

    // find which way to flip the arc
    const flip = (frameCount % 2) * PI

    // draw the arc as a half circle
    arc(midX, midY, distance, distance, angle + flip, angle + PI + flip)
}

// ---toothpick---
function toothpick() {
    // set the color and brush style
    fill(color, 150)
    noStroke()

    // move the origin (0,0) to the current mouse point
    translate(mouseX, mouseY)

    // find the angle of the direction the mouse is moving in
    // then rotate the canvas by that angle
    const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)
    rotate(angle)

    // set minumum width and height of the toothpick-shaped ellipse
    const minSize = USize

    // find the distance between current mouse point and previous mouse point
    const distance = dist(mouseX, mouseY, pmouseX, pmouseY)

    // draw the toothpick-shaped ellipse
    ellipse(0, 0, distance * Utoothpicklength + minSize, minSize)
}

// ---calligraphy---
function calligraphy() {
    // set the color and brush style
    stroke(color, 255)
    strokeWeight(1)
    const width = USize

    // set the number of times we lerp the line in the for loop
    const lerps = 1000

    // repeat the slanted line with lerping
    for (let i = 0; i <= lerps - 1; i++) {

        // find the lerped x and y coordinates between the mouse points
        const x = lerp(mouseX, pmouseX, i / lerps)
        const y = lerp(mouseY, pmouseY, i / lerps)

        // draw a slanted line
        line(x - width, y - width, x + width, y + width)
    }
}

// ---splatter---
function splatter() {
    // set the color and brush style
    stroke(color, 160)
    strokeWeight(USize)

    // set the number of times we lerp the point in the for loop
    const lerps = 8

    // repeat the point with lerping
    for (let i = 0; i < lerps; i++) {

        // find lerped x and y coordinates of the point
        const x = lerp(mouseX, pmouseX, i / lerps + lerps)
        const y = lerp(mouseY, pmouseY, i / lerps + lerps)

        // draw a point
        point(x, y)
    }
}

// ---hatching ---
function hatching() {
    // set the color and brush style
    stroke(color, 220)
    strokeWeight(USize)

    // calculate the speed of the mouse
    let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)

    // make a vector by inverting X and Y values
    const vector = createVector(mouseY - pmouseY, mouseX - pmouseX)

    // set the vector magnitude (the line length) based on the mouse speed
    vector.setMag(speed / 2)

    // set the number of times we lerp the line
    const lerps = 3

    // repeat the line with lerping
    for (let i = 0; i < lerps; i++) {

        // find the lerped X and Y coordinates
        const x = lerp(mouseX, pmouseX, i / lerps)
        const y = lerp(mouseY, pmouseY, i / lerps)

        // draw a line
        line(x - vector.x, y - vector.y, x + vector.x, y + vector.y)
    }
}

// --- spraypaint---
function sprayPaint() {
    // set the color and brush style
    stroke(color, 255)
    strokeWeight(USize / 50)

    // find the speed of the mouse movement
    const speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)

    // set minimum radius and spray density of spraypaint brush
    const minRadius = USize;
    const sprayDensity = 80

    // find radius of the spray paint brush and radius squared
    const r = speed + minRadius;
    const rSquared = r * r;

    // set the number of times we lerp the points in the for loop
    const lerps = 1

    // repeat the random points with lerping
    for (let i = 0; i < lerps; i++) {

        // find the lerped X and Y coordinates
        const lerpX = lerp(mouseX, pmouseX, i / lerps)
        const lerpY = lerp(mouseY, pmouseY, i / lerps)

        // draw a bunch of random points within a circle
        for (let j = 0; j < sprayDensity; j++) {

            // pick a random position within the circle
            const randX = random(-r, r)
            const randY = random(-1, 1) * sqrt(rSquared - randX * randX)

            // draw the random point
            point(lerpX + randX, lerpY + randY)
        }
    }
}

//---   eraser  ---
function eraser() {
    pen()
    erase(200, 255)

}

//---   UNDO FUNCTION   ---
function keyPressed(e) {
    // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
    if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        undoToPreviousState();
    }
}

function undoToPreviousState() {
    if (saveStates !== 0) {
        clear();

        image(saveStates[saveStates.length - 1], 0, 0, 406, 560);
        saveStates.pop()
    }
}

//savestatue function for undo function
function saveState() {
    if(inCanvas === true){
        saveStates.push(previousState = get(0, 0, 406, 560));
        console.log(saveStates)
    }
    
}

//savestate for importing images
function imgSaveState() {
        saveStates.push(previousState = get(0, 0, 406, 560));
        console.log(saveStates)
}

//---imagelayer--
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
    sketch.mouseReleased = function () {
        // Quit dragging
        dragging = false;
    }


    sketch.mousePressed = function () {
        if (sketch.mouseX > x && sketch.mouseX < x + w && sketch.mouseY > y && sketch.mouseY < y + h) {
            dragging = true;

            offsetX = x - sketch.mouseX;
            offsetY = y - sketch.mouseY;
        }

        console.log(img);
        sketch.mouseReleased = function () {
            // Quit dragging
            dragging = false;

        }
    }
}

function setB64(file) {
    const reader = new FileReader()


    reader.onload = function (event) {
        imageB64 = event.target.result;
    };

    reader.readAsDataURL(file);
}

imageLayer = new p5(s2);

//handles the confirm button for images
function confirmClickHandler() {
    imgCorrect = true;
    staticImg = img;
    staticX = x;
    staticY = y;

    //save uploaded image to array
    if (usingGallery === false) {
        saveUploadedToLocal();
    }
    
    usingGallery = false;
    
  if (!imgDiv.classList.contains('hidden') && imgDiv !== undefined) {
        imgDiv.classList.add('hidden');
        confirmImg.classList.toggle('hidden');
        cancelImg.classList.toggle('hidden');
      }
}

function cancelClickHandler() {
    if (!imgDiv.classList.contains('hidden') && imgDiv !== undefined) {
        imgDiv.classList.toggle('hidden');
        confirmImg.classList.toggle('hidden');
        cancelImg.classList.toggle('hidden');
    }
}

function saveUploadedToLocal() {
    ImageObject = {"name": imageName, "base64": imageB64};

    //check if the image already has been uploaded
    if (uploadedImages.filter(array => array.name === ImageObject.name).length === 0) {
        uploadedImages.push(ImageObject);
        console.log(uploadedImages);

        //add to HTML
        // Create the div element
        let divElement = document.createElement("div");
        divElement.classList.add("p-1", "bg-slate-100", "rounded-lg", "text-center", "flex", "justify-center", "items-center");

        // Create the img element
        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", imageB64);
        imgElement.setAttribute("alt", imageName);
        imgElement.classList.add("rounded-lg", "object-cover", "w-100px", "h-100px");
        imgElement.addEventListener('click', imageFromGallery, imageName);

        // Append the img element to the div
        divElement.appendChild(imgElement);

        // Append the div to the document body or any other desired location
        document.getElementById('imageModal').appendChild(divElement);

        //save to localstorage
        localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
    }
}

//export canvas to B64 and save in localastorage
function finish() {
    let eindvedute =  get(0,0,406,560)
    let code = eindvedute.canvas.toDataURL();
    let prevCanvas = get( 0, 0, 406, 560);
    switch(currentLayer){
        case(0):  
            l1.image(prevCanvas, 0,0, 406, 560);
            break;
            case(1):
        l2.image(prevCanvas, 0,0, 406, 560);
        break;
        case(2):
        l3.image(prevCanvas, 0,0, 406, 560);
        break;
    }
    let code1 = l1.canvas.toDataURL();
    let code2 = l2.canvas.toDataURL();
    let code3 = l3.canvas.toDataURL();
    console.log(code1);
    window.location.href="./end.html"
    localStorage.setItem("img", code)
    localStorage.setItem("img1", code1);
    localStorage.setItem("img2", code2);
    localStorage.setItem("img3", code3);

}

function imageFromGallery(imgName) {
    //get image name
    let clickedName = imgName.target.alt;

    //get image from localstorage and use b64 in handleFile
    uploadedImages.forEach((image, index) => {
        if (image.name === clickedName){
            handleGallery(image.base64);
        }
    });

}

function nextLayerHandler() {
    currentLayer ++;
    let prevCanvas = get( 0, 0, 406, 560);
    if(currentLayer > 2) {
        currentLayer = 0
    }
    switch(currentLayer){
        case(0): 
            canvasImg = l1;
            l3.image(prevCanvas, 0,0, 406, 560);
            layerSwitch = true;
            layerImg.src = "../Images/layer1.png"
            break;
        case(1):
        l1.image(prevCanvas, 0,0, 406, 560);
        canvasImg = l2;
        layerSwitch = true;
        layerImg.src = "../Images/layer2.png"
        break;
        case(2):
        l2.image(prevCanvas, 0,0, 406, 560);
        canvasImg = l3;
        layerSwitch = true;
        layerImg.src = "../Images/layer3.png"
        break;
    }
}

function prevLayerHandler() {
    currentLayer --;
    
    let prevCanvas = get( 0, 0, 406, 560);
    if(currentLayer < 0) {
        currentLayer = 2
    }
    console.log(currentLayer)
    switch(currentLayer){
        case(0): 
            canvasImg = l1;
            l2.image(prevCanvas, 0,0, 406, 560);
            layerSwitch = true;
            layerImg.src = "../Images/layer1.png"
            break;
            case(1):
        l3.image(prevCanvas, 0,0, 406, 560);
        canvasImg = l2;
        layerSwitch = true;
        layerImg.src = "../Images/layer2.png"
        break;
        case(2):
        l1.image(prevCanvas, 0,0, 406, 560);
        canvasImg = l3;
        layerSwitch = true;
        layerImg.src = "../Images/layer3.png"
        break;
    }
        
    }




