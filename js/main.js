//import '../css/output.css' <-- deze geeft error waardoor de script crashed
import {colors} from "./colors.js";

const container = document.getElementById("canvas-container");
const canvas = document.getElementById("canvas");
const width = 960;
const height = 1080;

let oldcolor;

// context of the canvas
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = true;

// resize canvas (CSS does scale it up or down)
canvas.height = height;
canvas.width = width;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}

// --- Pen ---
let drawing = false;

function startDraw(e) {
    drawing = true;
    context.beginPath();
    draw(e)
}

function endDraw(e) {
    drawing = false;
}

function draw(e) {
    if (!drawing) return;

    let { x, y } = getMousePos(canvas, e);

    context.lineTo(x, y);
    context.stroke();

    // for smoother drawing
    context.beginPath();
    context.moveTo(x, y);
}

const sizes = {
    'small': 5,
    'medium': 10,
    'big': 15
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

// --- Path ---

function startPath(e) {
    drawing = true;
    context.beginPath();
    draw(e)
}

function endPath(e) {
    drawing = false;
    let { x, y } = getMousePos(canvas, e);

    context.lineTo(x, y);
    context.stroke();
}

// --- Polygon ---

let poly = false;
let polyTimeout = undefined;

function startPolygon(e) {
    if (e.target.id !== 'canvas')
        return;

    drawing = true;

    if (poly) {
        polygon(e);
    }
    else {
        context.beginPath();
        draw(e);
    }
    poly = true;
}

function endPolygon(e) {
    if (!poly)
        return;

    polyTimeout = setTimeout(() => {
        drawing = false;
        context.closePath();
        context.stroke();

        poly = false;
    }, 1000);
}

function polygon(e) {
    if (!drawing) return;
    clearTimeout(polyTimeout);

    let { x, y } = getMousePos(canvas, e);

    context.lineTo(x, y);
    context.stroke();
}

// --- Rect ---
let start = {}

function startRect(e) {
    start = getMousePos(canvas, e);
}

function endRect(e) {
    let { x, y } = getMousePos(canvas, e);
    context.fillRect(start.x, start.y, x - start.x, y - start.y);
}

// --- Clear ---

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

let mode = 'draw';

function selectMode(e, newMode) {
    const tools = document.getElementsByClassName("tool");
    for (const tool of tools) {
        tool.classList.remove('selected');
    }

    const size = document.querySelector(".size.selected");
    if (size !== null)
    {
        size.classList.remove('hide-select');
        if (newMode === 'square')
            size.classList.add('hide-select');
    }


    e.target.parentElement.classList.add('selected');

    mode = newMode;

    let BrushTypeButton = document.getElementById("brushimg");
    BrushTypeButton.src = "../assets/" + mode + ".svg";
}

const activeEvents = {
    "mousedown": undefined,
    "mouseup": undefined,
    "mousemove": undefined
};

function setMode(e, mode) {
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
        case 'path':
            window.addEventListener("mousedown", startPath);
            window.addEventListener("mouseup", endPath);

            activeEvents['mousedown'] = startPath;
            activeEvents['mouseup'] = endPath;
            break;
        case 'polygon':
            window.addEventListener("mousedown", startPolygon);
            window.addEventListener("mouseup", endPolygon);

            activeEvents['mousedown'] = startPolygon;
            activeEvents['mouseup'] = endPolygon;
            break;
        case 'square':
            window.addEventListener("mousedown", startRect);
            window.addEventListener("mouseup", endRect);

            activeEvents['mousedown'] = startRect;
            activeEvents['mouseup'] = endRect;
            break;

        default:
            break;
    }

    selectMode(e, mode);
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

function initialize() {
    const colorButtons = document.getElementById('colors').children;
    for (const colorButton of colorButtons) {
        colorButton.addEventListener('click', (e) => { setColor(e, colorButton.classList.value.replace(/bg-(\w*).*/, '$1'))} );
    }

    const tools = document.getElementsByClassName('tool');
    for (const tool of tools) {
        tool.addEventListener('click', (e) => { setMode(e, tool.id)} );
    }

    const sizeButtons = document.getElementsByClassName('size');
    for (const sizeButton of sizeButtons) {
        sizeButton.addEventListener('click', (e) => { setSize(e, sizes[sizeButton.id])} );
    }

    document.getElementById('clear').addEventListener('click', clearCanvas);

    // set default settings
    context.lineCap = 'round';
    document.getElementById('small').firstElementChild.click();
    document.getElementById('pen').firstElementChild.click();
    document.getElementById('black').click();
}

initialize();