let placeHolder = document.getElementById('placeHolder')
let buttons = document.getElementById('buttons')
let downloadableImg = document.createElement('img')
let downloadBtn = document.createElement('a')
let eindvedute;
let back = document.getElementById("back");
let frame1, frame2, frame3;
//finishBtn.addEventListener('click', () => downloadImage(canvas))

back.addEventListener("click", backfunctie);
console.log(back)
downloadBtn.href = localStorage.getItem('img')
downloadBtn.download = "vedute.png"
downloadBtn.innerText = 'Download mijn Vedute'
buttons.appendChild(downloadBtn)
function placeImg (){
    console.log(localStorage.getItem("img1"));
    if(localStorage.getItem('img1')) {
        frame1 = localStorage.getItem('img1');
        frame2 = localStorage.getItem('img2');
        frame3 = localStorage.getItem('img3');
    }
    //placeHolder.appendChild(img)
    eindvedute = localStorage.getItem("img")
}

placeImg();

downloadBtn.addEventListener('click', ()=>{
    
})

let download = document.createElement('a')

download.download = "vedute.png"
download.innerText = "DOWNLOAD VEDUTE"
document.body.appendChild(download)

function downloadImage (canvas){
    console.log(canvas)
    download.href = canvas.toDataURL("image/png")
    console.log('pew')
}


function backfunctie() {
localStorage.setItem("img1", frame1)
localStorage.setItem("img2",frame2)
localStorage.setItem("img3", frame3)
window.location.href="./canvas.html";
}






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