document.addEventListener("DOMContentLoaded", init);

let img;
let staticImg;
let imgDiv;
let confirmImg;
let cancelImg;
let imgCorrect = false;
let dragging = false;
let rollover = false;
let x, y, w, h;
let staticX, staticY;
let offsetX, offsetY;
let imageLayer;
let uploadedImages = []
let imageName;
let imageB64;
let downloadImg;
let usingGallery = false;
let inCanvas = false;
let color;


let Ubrush = "pen";
let USize = 10;
let Utoothpicklength = 5;
let sizeImg;
let brushImg

let previousState;
let saveStates = []
let drawing = true

let l1, l2, l3;
let img1, img2, img3;
let prevLayerButton, nextLayerButton;
let currentLayer = 0;
let layerSwitch = false;
let canvasImg;
let layerImg;


const sizes = {
    'small': 5,
    'medium': 10,
    'big': 15
}

const activeEvents = {
    "mousedown": undefined,
    "mouseup": undefined,
    "mousemove": undefined
};

function init() {
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

    if (localStorage.getItem("uploadedImages")) {
        uploadedImages = JSON.parse(localStorage.getItem("uploadedImages"));

        uploadedImages.forEach((object, index) => {
            let divElement = document.createElement("div");
            divElement.classList.add("p-1", "bg-slate-100", "rounded-lg", "text-center", "flex", "justify-center", "items-center");

            let imgElement = document.createElement("img");
            imgElement.setAttribute("src", object.base64);
            imgElement.setAttribute("alt", object.name);
            imgElement.classList.add("rounded-lg", "object-cover", "w-100px", "h-100px");
            imgElement.addEventListener('click', imageFromGallery, object.name);

            divElement.appendChild(imgElement);

            document.getElementById('imageModal').appendChild(divElement);
        });
    }

    downloadImg = document.getElementById('finish')
    downloadImg.addEventListener('click', finish)
}

setup = function () {
    myPicker = createColorPicker('black');
    myPicker.parent("color-picker");
    myPicker.style('position:absolute; width:330px; height:60px; top: 0vw; right: 0vw; opacity:0;');
    myPicker.changed(ButtonColor);

    let canvas1 = createCanvas(406, 560);
    canvas1.parent('canvasCanvas');
    l1 = createGraphics(406, 560);
    l2 = createGraphics(406, 560);
    l3 = createGraphics(406, 560);

    if(localStorage.getItem('img1')) {
        loadImage(localStorage.getItem("img1"),img1 => {
            l1.image(img1, 0,0, 406, 560);
            image(l1, 0, 0, 406, 560);
        })
        loadImage(localStorage.getItem("img2"),img2 => {
            l2.image(img2, 0,0, 406, 560);
        })
        loadImage(localStorage.getItem("img3"),img3 => {
            l3.image(img3, 0,0, 406, 560);
        })

        if( localStorage.getItem("img1")){
            localStorage.removeItem("img1");
        }
        if( localStorage.getItem("img2")){
            localStorage.removeItem("img2");
        }
        if( localStorage.getItem("img3")){
            localStorage.removeItem("img3");
        }
    }

    input = createFileInput(handleFile);
    
    input.id('image-import');
    input.parent('image-insert');

    saveState();
}



    draw = function () {
    color = myPicker.color();
    color = color.toString();
    color= color.replace(/rgba?|\(|\)/g,'').split(',');
    color = color.slice(0,3)
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

    if(canvasImg && layerSwitch) {
        clear();
        image(canvasImg, 0, 0, 406, 560);
        switch(currentLayer) {
            case(0):
            l1.clear();
            break;
            case(1):
            l2.clear();
            break;
            case(2):
            l3.clear();
            break;
        }
        layerSwitch = false;
        if(Ubrush === "eraser") {
            Ubrush = "pen";
            brushImg.src = "../assets/pen-solid.svg";
            noErase()
        }
    }

    if (img && imgCorrect) {
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

handleFile = function (file) {

    if (file.type === 'image') {
        imgSaveState()

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

function handleGallery(b64) {
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

    switch (mode) {
        case 'pen':
            Ubrush = "pen";
            brushImg.src = "../assets/pen-solid.svg";
            noErase()
            break;
        case 'spraypaint':
            Ubrush = "spraypaint";
            brushImg.src = "../assets/spraypaint.svg";
            noErase()
            break;
        case 'calligraphy':
            Ubrush = "calligraphy";
            brushImg.src = "../assets/calligraphy.svg";
            noErase()
            break;
        case 'marker':
            Ubrush = "marker";
            brushImg.src = "../assets/marker.svg";
            noErase()
            break;
        case 'wiggle':
            Ubrush = "wiggle";
            noErase()
            brushImg.src = "../assets/wiggle.svg";
            break;
        case 'toothpick':
            Ubrush = "toothpick";
            noErase()
            brushImg.src = "../assets/pen.svg";
            break;
        case 'splatter':
            Ubrush = "splatter";
            noErase()
            brushImg.src = "../assets/splatter.svg";
            break;
        case 'hatching':
            Ubrush = "hatching"
            noErase()
            brushImg.src = "../assets/hatching.svg";
            break;
        case 'eraser':
            Ubrush = "eraser";
            brushImg.src = "../assets/eraser.svg";
            break;
    }
}

function setSize(e, size) {
    if (size === 5) {
        USize = 5;
        sizeImg.src = "../assets/small.svg";
    }

    if (size === 10) {
        USize = 10;
        sizeImg.src = "../assets/medium.svg";
    }

    if (size === 15) {
        USize = 15;
        sizeImg.src = "../assets/big.svg";
    }
}

function ButtonColor() {

    colorButton = document.getElementById("color-selector");
    colorButton.style = `background-color: rgb(${color});`;

}

function clearClickHandler(e) {
    if(confirm("wil je echt je canvas clearen? Dit verwijderd alles wat op de huidige laag is getekent, als je dit terug wil halen kan je op de undo button clicken (ctrl + z)")){
        imgSaveState();
        clear();
    }
    
}

function pen() {
    stroke(color[0], color[1], color[2], 255)
    strokeWeight(USize)

    line(mouseX, mouseY, pmouseX, pmouseY)
}

function marker() {
    fill(color[0], color[1], color[2], 40)
    noStroke()

    circle(mouseX, mouseY, USize)
}

function wiggle() {
    stroke(color, 255)
    strokeWeight(USize)
    noFill()

    const distance = dist(mouseX, mouseY, pmouseX, pmouseY)

    const midX = (mouseX + pmouseX) / 2
    const midY = (mouseY + pmouseY) / 2

    const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)

    const flip = (frameCount % 2) * PI

    arc(midX, midY, distance, distance, angle + flip, angle + PI + flip)
}

function toothpick() {
    fill(color, 150)
    noStroke()

    translate(mouseX, mouseY)

    const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)
    rotate(angle)

    const minSize = USize

    const distance = dist(mouseX, mouseY, pmouseX, pmouseY)

    ellipse(0, 0, distance * Utoothpicklength + minSize, minSize)
}

function calligraphy() {
    stroke(color, 255)
    strokeWeight(1)
    const width = USize

    const lerps = 1000

    for (let i = 0; i <= lerps - 1; i++) {

        const x = lerp(mouseX, pmouseX, i / lerps)
        const y = lerp(mouseY, pmouseY, i / lerps)

        line(x - width, y - width, x + width, y + width)
    }
}

function splatter() {
    stroke(color, 160)
    strokeWeight(USize)

    const lerps = 8

    for (let i = 0; i < lerps; i++) {

        const x = lerp(mouseX, pmouseX, i / lerps + lerps)
        const y = lerp(mouseY, pmouseY, i / lerps + lerps)

        point(x, y)
    }
}

function hatching() {
    stroke(color, 220)
    strokeWeight(USize)

    let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)

    const vector = createVector(mouseY - pmouseY, mouseX - pmouseX)

    vector.setMag(speed / 2)

    const lerps = 3

    for (let i = 0; i < lerps; i++) {

        const x = lerp(mouseX, pmouseX, i / lerps)
        const y = lerp(mouseY, pmouseY, i / lerps)

        line(x - vector.x, y - vector.y, x + vector.x, y + vector.y)
    }
}

function sprayPaint() {
    stroke(color, 255)
    strokeWeight(USize / 50)

    const speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY)

    const minRadius = USize;
    const sprayDensity = 80

    const r = speed + minRadius;
    const rSquared = r * r;

    const lerps = 1

    for (let i = 0; i < lerps; i++) {

        const lerpX = lerp(mouseX, pmouseX, i / lerps)
        const lerpY = lerp(mouseY, pmouseY, i / lerps)

        for (let j = 0; j < sprayDensity; j++) {

            const randX = random(-r, r)
            const randY = random(-1, 1) * sqrt(rSquared - randX * randX)

            point(lerpX + randX, lerpY + randY)
        }
    }
}

function eraser() {
    pen()
    erase(200, 255)

}

function keyPressed(e) {
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

function saveState() {
    if(inCanvas === true){
        saveStates.push(previousState = get(0, 0, 406, 560));
    }
    
}

function imgSaveState() {
        saveStates.push(previousState = get(0, 0, 406, 560));
}

let s2 = function (sketch) {
    sketch.setup = function () {
        let canvas2 = sketch.createCanvas(406, 560);
        canvas2.parent('imageCanvas');
        x = 0;
        y = 0;

        w = 100;
        h = 100;
    }
    sketch.draw = function () {

        sketch.clear();

        if (sketch.mouseX > x && sketch.mouseX < x + w && sketch.mouseY > y && sketch.mouseY < y + h) {
            rollover = true;
        } else {
            rollover = false;
        }

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
        dragging = false;
    }


    sketch.mousePressed = function () {
        if (sketch.mouseX > x && sketch.mouseX < x + w && sketch.mouseY > y && sketch.mouseY < y + h) {
            dragging = true;

            offsetX = x - sketch.mouseX;
            offsetY = y - sketch.mouseY;
        }

        sketch.mouseReleased = function () {
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

function confirmClickHandler() {
    imgCorrect = true;
    staticImg = img;
    staticX = x;
    staticY = y;

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

    if (uploadedImages.filter(array => array.name === ImageObject.name).length === 0) {
        uploadedImages.push(ImageObject);

        let divElement = document.createElement("div");
        divElement.classList.add("p-1", "bg-slate-100", "rounded-lg", "text-center", "flex", "justify-center", "items-center");

        let imgElement = document.createElement("img");
        imgElement.setAttribute("src", imageB64);
        imgElement.setAttribute("alt", imageName);
        imgElement.classList.add("rounded-lg", "object-cover", "w-100px", "h-100px");
        imgElement.addEventListener('click', imageFromGallery, imageName);

        divElement.appendChild(imgElement);

        document.getElementById('imageModal').appendChild(divElement);

        localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
    }
}

function finish() {
    switch(currentLayer) {
        case(0):
            l1.clear();
            break;
        case(1):
            l2.clear();
            break;
        case(2):
            l3.clear();
            break;
    }
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
    window.location.href="./end.html"
    localStorage.setItem("img1", code1);
    localStorage.setItem("img2", code2);
    localStorage.setItem("img3", code3);

}

function imageFromGallery(imgName) {
    let clickedName = imgName.target.alt;

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


