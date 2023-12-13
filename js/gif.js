class Layer {

    constructor(lColor, x, y) {
        this. color = lColor
        this.x = x;
        this.y = y;
        this.speed = 0;
    }

    start(speed) {
        this.speed = speed;
    }

    display() { // method
        fill(this.color);
        rect(this.x, this.y, 32, 44);
    }

    move() { // method
        this.x += this.speed;
        // Wrap x around boundaries
        if (this.x < -20) {
            this.x = width;
        } else if (this.x > width) {
            this.x = -20;
        }
    }

} //end class Layer

let layer1;
let layer2;
let layer3;

function setup() {
    createCanvas(108, 192);//10% from an instagram story so we can easily making it 100% by adding a 0s
//add the layes
    layer1 = new Layer("pink", 10, 10);
    layer2 = new Layer("pink", 20, 20);
    layer3 = new Layer("pink", 30, 30);


    //call start methods of layer instances
    //the start method expects a number for speed
    layer1.start(3);
    layer2.start(3);
    layer3.start(3);

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