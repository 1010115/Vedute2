document.addEventListener("DOMContentLoaded", init)

let BrushSelector;
let BrushModal;
let ColorSelector;
let ColorModal;
let ImageButton;
let ImageModal;
let StickerSelector;
let StickerModal;
let SizeSelector;
let SizeModal;

function init() {

    BrushSelector = document.getElementById('brush-selector');
    BrushModal = document.getElementById('brushModal');

    BrushSelector.addEventListener("click", selectBrushModal );

    ImageButton = document.getElementById("image-button");
    ImageModal = document.getElementById('imageModal');

    ImageButton.addEventListener("click", imageImport);

    StickerSelector = document.getElementById('sticker-selector');
    StickerModal = document.getElementById('stickerModal');

    StickerSelector.addEventListener("click", selectSticker);

    SizeSelector = document.getElementById('size-selector');
    SizeModal = document.getElementById('sizeModal');

    SizeSelector.addEventListener("click", selectSizeModal)
}


function selectBrushModal() {
    console.log('brushtype');
    //open brush modal
    BrushModal.classList.remove("hidden");

}

function selectSizeModal() {
    console.log('size-select');
    //open size modal
    SizeModal.classList.remove("hidden");
}

function imageImport() {
    console.log('image import');
    //open image modal
    ImageModal.classList.remove("hidden")
}

function selectSticker() {
    console.log('sticker selector');
    //open sticker modal
}

//close brushmodal
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


