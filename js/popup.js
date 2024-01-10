document.addEventListener("DOMContentLoaded", init)

let BrushSelector;
let BrushModal;
let ImageButton;
let ImageModal;
let SizeSelector;
let SizeModal;

function init() {

    BrushSelector = document.getElementById('brush-selector');
    BrushModal = document.getElementById('brushModal');

    BrushSelector.addEventListener("click", selectBrushModal );

    ImageButton = document.getElementById("image-button");
    ImageModal = document.getElementById('imageModal');

    ImageButton.addEventListener("click", imageImport);

    SizeSelector = document.getElementById('size-selector');
    SizeModal = document.getElementById('sizeModal');

    SizeSelector.addEventListener("click", selectSizeModal)
}


function selectBrushModal() {
    BrushModal.classList.remove("hidden");

}

function selectSizeModal() {
    SizeModal.classList.remove("hidden");
}

function imageImport() {
    ImageModal.classList.remove("hidden")
}

document.addEventListener("click", function(event) {
    if (!BrushSelector.contains(event.target)) {
        BrushModal.classList.add("hidden");
    }

    if (!SizeSelector.contains(event.target)) {
        SizeModal.classList.add("hidden");
    }

    if (!ImageButton.contains(event.target)) {
        ImageModal.classList.add("hidden")
    }
});


