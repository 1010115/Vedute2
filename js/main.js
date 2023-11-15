document.addEventListener("DOMContentLoaded", init)

//starting variables for brush - color - size
let Ubrush = "pen"; //user brush
let UColor = [60, 180, 20] //user color
let USize = 50; //user size
let Utoothpicklength= 18;//user toothpick length

function init() {
    let PenButton = document.getElementById('pen')
}


// For every brush
function setup() {
    canvas = createCanvas(406, 560)
    background('#fbf8f3')
    canvas.parent('canvasCanvas');
}

function draw() {
    if (mouseIsPressed) {
        sprayPaint()
    }
}

function touchMoved() {
    return false
}



// --- pen---

function pen() {
    // set the color and weight of the stroke
    stroke(UColor, 255)
    strokeWeight(2)

    // draw a line from current mouse point to previous mouse point
    line(mouseX, mouseY, pmouseX, pmouseY)
}

// --- marker ---

function marker() {
    // set the color and brush style
    fill(UColor, 40)
    noStroke()

    // draw a circle at the current mouse point, with diameter of 50 pixels
    circle(mouseX, mouseY, USize)
}

// --- wiggle ---

function wiggle() {
    // set the color and brush style
    stroke(UColor, 255)
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
    fill(UColor, 150)
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
    stroke(UColor, 255)
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
    stroke(UColor, 160)
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
    stroke(UColor, 220)
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
    stroke(UColor, 255)
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

