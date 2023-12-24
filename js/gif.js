//initialize layers
let layer1;
let layer2;
let layer3;

//function setup
function setup() {
    //create canvas
    createCanvas(108, 192);

    //give layers inheritance from class "Layer" and set their initial positions
    layer1 = new Layer("pink", 10, 10);
    layer2 = new Layer("pink", 20, 20);
    layer3 = new Layer("pink", 30, 30);

    //call start methods of layer instances with target positions
    layer1.start(3, 20, 20);
    layer2.start(3, 20, 20);
    layer3.start(3, 20, 20);

    //create a button and place it beneath the canvas.
    let button = createButton('save gif');
    button.position(0, 192);

    //use the button to change download the gif
    button.mousePressed(() => {
        //saveGif method with parameters: fileName and duration (in seconds)
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

//add a class named "Layer" wich represents the layers from the vedute.
class Layer {
    //constructor function to put layers properties
    constructor(lColor, x, y) {
        this.color = lColor; //for color
        this.x = x; //for initial position horizontal
        this.y = y; //for initial position vertical
        this.speed = 0; //for speed
        this.pointBX = x; //set target position for animatio horizontal
        this.pointBY = y; //set target position for animation vertical
        this.pointAX = x; //for storing initial position horizontal
        this.pointAY = y; //for storing initial position vertical
        this.returning = false; //set returning to false (for tracking if animation is returning or not)
    }

    //method for stating animation by setting speed and target positions
    start(speed, pointBX, pointBY) {
        this.speed = speed;
        this.pointBX = pointBX;
        this.pointBY = pointBY;
        this.pointAX = this.x;
        this.pointAY = this.y;
    }

    //method to display the layer on the canvas
    display() {
        //set the fill color and draw a rectangle at the layer's position
        //this rect is a placeholder for the images from the vedute
        fill(this.color);
        rect(this.x, this.y, 32, 44);
    }

    //method to update the layer's position for animation
    move() {
        //if the layer is not returning to the starting position
        if (!this.returning) {
            //interpolate between current position and target position
            //the 0.05 is the easing factor, controlling the smoothness of the interpolation.
            //setting the number lower makes the animation smoother.
            this.x = lerp(this.x, this.pointBX, 0.05);
            this.y = lerp(this.y, this.pointBY, 0.05);

            //check if the layer has reached the target position
            //dist measures the distance between the current (x, y) and target (pointBX, pointBY).
            //if it's very close (less than 0.1), the layer is considered at the target.
            if (dist(this.x, this.y, this.pointBX, this.pointBY) < 0.1) {
                //set returning to true to start second part of the animation
                this.returning = true;
            }
        } else {
            //if returning = true, move back to the starting position
            this.x = lerp(this.x, this.pointAX, 0.05);
            this.y = lerp(this.y, this.pointAY, 0.05);

            //check if the layer has returned to the starting position
            //dist measures the distance between the current (x, y) and target (pointBX, pointBY).
            //if it's very close (less than 0.1), the layer is considered at the target.
            if (dist(this.x, this.y, this.pointAX, this.pointAY) < 0.1) {
                //set returning to false so the first part of the animation starts again
                this.returning = false;
            }
        }

        //wrap the layer's x position around the canvas boundaries
        //this code ensures the layer stays within canvas boundaries.
        //if x is less than -20, it wraps to the right; if greater than canvas width, it wraps to
        if (this.x < -20) {
            this.x = width;
        } else if (this.x > width) {
            this.x = -20;
        }
    }
}

