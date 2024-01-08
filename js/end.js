let placeHolder = document.getElementById('placeHolder')
let buttons = document.getElementById('buttons')
let downloadableImg = document.createElement('img')
let downloadBtn = document.createElement('a')
let eindvedute;
let back = document.getElementById("back");
//finishBtn.addEventListener('click', () => downloadImage(canvas))

back.addEventListener("click",backfunctie)
downloadBtn.href = localStorage.getItem('img')
downloadBtn.download = "vedute.png"
downloadBtn.innerText = 'Download mijn Vedute'
buttons.appendChild(downloadBtn)
function placeImg (img){
    img.alt= "jouw Vedute"
    img.src= localStorage.getItem('img')
    placeHolder.appendChild(img)
    eindvedute = localStorage.getItem("img")
}

placeImg(downloadableImg)

downloadBtn.addEventListener('click', ()=>{


})


function downloadImage (canvas){
    console.log(canvas)
    download.href = canvas.toDataURL("image/png")
    console.log('pew')
}


function backfunctie() {
localStorage.setItem("img",eindvedute)
    window.location.href="./canvas.html"
}

localStorage.removeItem("img")





// TEST

// let canvas = document.getElementById('test_canvas')
// let ctx = canvas.getContext('2d')
//
// ctx.fillStyle = "rgb(200, 0, 0)";
// ctx.fillRect(10, 10, 50, 50);
//
// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
// ctx.fillRect(30, 30, 50, 50);

// downloadImage(canvas)