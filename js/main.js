document.addEventListener("DOMContentLoaded", init)

//starting variables for brush - color - size
let Ubrush = "pen"; //user brush
let UColor = "black"; //user color
let USize = "size"; //user size

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

function setup() {
    canvas = createCanvas(406, 560);
    background(220);
    canvas.parent('canvasCanvas');

}

function setBrush(e, mode){
    for (const event in activeEvents) {
        window.removeEventListener(event, activeEvents[event]);
        activeEvents[event] = undefined;
    }

    switch (mode) {
        case 'pen':
            window.addEventListener("mousedown", startDraw);
            window.addEventListener("mouseup", endDraw);
            window.addEventListener("mousemove", draw);

            activeEvents['mousedown'] = startDraw;
            activeEvents['mouseup'] = endDraw;
            activeEvents['mousemove'] = draw;
            break;

        case 'kwast':
            window.addEventListener("mousedown", startPath);
            window.addEventListener("mouseup", endPath);

            activeEvents['mousedown'] = startPath;
            activeEvents['mouseup'] = endPath;
    }

    function setSize(e, size) {
        context.lineWidth = size;
        selectSize(e);

        let sizeImg = document.getElementById("sizeimg")

        if (size == 5) {
            sizeImg.src = "../assets/small.svg";
        }

        if (size == 10) {
            sizeImg.src = "../assets/medium.svg";
        }

        if (size == 15) {
            sizeImg.src = "../assets/big.svg";
        }
    }

    function selectSize(e) {
        if (mode === 'square')
            return;

        const sizes = document.getElementsByClassName("size");
        for (const size of sizes) {
            size.classList.remove('selected');
        }

        if (e === undefined)
            return;

        e.target.parentElement.classList.add('selected');
    }

    function setColor(e, color) {
        context.strokeStyle = colors[color];
        context.fillStyle = colors[color];
        selectColor(e);

        let Buttonlist = document.getElementById("color-selector");


        if (oldcolor) {
            Buttonlist.classList.remove("bg-" + oldcolor + "-500")
        }
        oldcolor = color

        Buttonlist.classList.add("bg-" + color + "-500");
    }

    function selectColor(e) {
        const colors = document.getElementById("colors").children;
        for (const color of colors) {
            color.classList.remove('selected');
        }

        e.target.classList.add('selected');
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
            colorButton.addEventListener('click', (e) => { setColor(e, colorButton.classList.value.replace(/bg-(\w*).*/, '$1'))} );
        }

    }

}
