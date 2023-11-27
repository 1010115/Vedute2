document.addEventListener("DOMContentLoaded", init)

//starting variables for brush - color - size
let Ubrush = "pen"; //user brush
let UColor = [0,0,0];//user color
let USize = 10; //user size
let Utoothpicklength= 5;//user toothpick length
let oldcolor;
let sizeImg;
let brushImg

let previousState;
let saveStates = []

//brush sizes
const sizes = {
    'small': 5,
    'medium': 10,
    'big': 15
}

//alle colors die worden gebruikt
const colors = {
    "black": [0,0,0],
    "white": [255,255,255],
    "red": [239,68,68],
    "green": [34,197,94],
    "blue": [59,130,246],
    "yellow": [234,179,8],
    "orange": [249,115,22],
    "violet": [139,92,246]
}

const activeEvents = {
    "mousedown": undefined,
    "mouseup": undefined,
    "mousemove": undefined
};

// For every brush
function setup() {
    canvas = createCanvas(406, 560);
    background('#fbf8f3')
    canvas.parent('canvasCanvas');
    saveState()
}

function draw() {
    if (mouseIsPressed) {

        switch ( Ubrush ) {
            case "pen":
                pen()
                saveState()
                console.log(saveStates)
                break;
            case "spraypaint":
                sprayPaint()
                break;
            case "calligraphy":
                calligraphy()
                break;
            case "marker":
                marker()
                break;
            case "wiggle":
                wiggle()
                break;
            case "toothpick":
                toothpick()
                break;
            case "hatching":
                hatching()
                break;
            case "splatter":
                splatter()
                break;
            case "eraser":
                eraser()
                break;
        }
    }

}

function setBrush(e, mode){
    for (const event in activeEvents) {
        window.removeEventListener(event, activeEvents[event]);
        activeEvents[event] = undefined;
    }

    switch (mode) {
        case 'pen':
            Ubrush = "pen";
            console.log(Ubrush);
            noErase()
            break;
        case 'spraypaint':
            Ubrush = "spraypaint";
            console.log(Ubrush);
            noErase()
            break;
        case 'calligraphy':
            Ubrush = "calligraphy";
            console.log(Ubrush);
            noErase()
            break;
        case 'marker':
            Ubrush = "marker";
            console.log(Ubrush);
            noErase()
            break;
        case 'wiggle':
            Ubrush = "wiggle";
            console.log(Ubrush);
            noErase()
            break;
        case 'toothpick':
            Ubrush = "toothpick";
            console.log(Ubrush);
            noErase()
            break;
        case 'splatter':
            Ubrush = "splatter";
            console.log(Ubrush);
            noErase()
            break;
        case 'eraser':
            Ubrush = "eraser";
            console.log(Ubrush);
            break;
    }}

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


    function setColor(e, color, buttonid) {

        let Buttonlist = document.getElementById("color-selector");
        UColor = color

        console.log(UColor);


        if (oldcolor) {
            Buttonlist.classList.remove("bg-" + oldcolor + "-500")
        }
        oldcolor = buttonid

        Buttonlist.classList.add("bg-" + buttonid + "-500");
    }

    function init() {
        const tools = document.getElementsByClassName('tool')
        for(const tool of tools) {
            tool.addEventListener('click', (e) => { setBrush(e, tool.id)} );
        }

        const sizeButtons = document.getElementsByClassName('size')
        for(const sizeButton of sizeButtons) {
            sizeButton.addEventListener('click', (e) => { setSize(e, sizes[sizeButton.id])} );
        }

        const colorButtons = document.getElementById('colors').children;
        for (const colorButton of colorButtons) {
            colorButton.addEventListener('click', (e) => { setColor(e, colors[colorButton.id], colorButton.id)} );
        }

        sizeImg = document.getElementById("sizeimg")
        sizeImg.src = "../assets/medium.svg";

        brushImg = document.getElementById("brushimg")
        brushImg.src = "../assets/pen.svg"


        console.log("init klaar");

    }



function touchMoved() {
    return false
}



// --- pen---

function pen() {
    // set the color and weight of the stroke
    stroke(UColor[0], UColor[1], UColor[2], 255)
    strokeWeight(USize)

    // draw a line from current mouse point to previous mouse point
    line(mouseX, mouseY, pmouseX, pmouseY)
}

// --- marker ---

function marker() {
    // set the color and brush style
    fill(UColor[0], UColor[1], UColor[2], 40)
    noStroke()

    // draw a circle at the current mouse point, with diameter of 50 pixels
    circle(mouseX, mouseY, USize)
}

// --- wiggle ---

function wiggle() {
    // set the color and brush style
    stroke(UColor[0], UColor[1], UColor[2], 255)
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
    fill(UColor[0], UColor[1], UColor[2], 150)
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
    stroke(UColor[0], UColor[1], UColor[2], 255)
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
    stroke(UColor[0], UColor[1], UColor[2], 160)
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
    stroke(UColor[0], UColor[1], UColor[2], 220)
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
    stroke(UColor[0], UColor[1], UColor[2], 255)
    strokeWeight(USize/50)

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

function keyPressed(e) {
    // check if the event parameter (e) has Z (keycode 90) and ctrl or cmnd
    if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
        undoToPreviousState();
    }
}

function undoToPreviousState() {
    if (saveStates == 0) {
        return;
    } else {
    background('#fbf8f3')
        saveStates.pop()
    image(saveStates[saveStates.length -1],0,0,406,560);
    console.log(saveStates.length)
    }
}

function saveState() {
    saveStates.push(previousState = get(0,0,406,560));
}