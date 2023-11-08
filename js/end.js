let placeHolder = document.getElementById('placeHolder')
let buttons = document.getElementById('buttons')
let downloadableImg = document.createElement('img')
let downloadBtn = document.createElement('a')
//finishBtn.addEventListener('click', () => downloadImage(canvas))


downloadBtn.href = localStorage.getItem('img')
downloadBtn.download = "vedute.png"
downloadBtn.innerText = 'Download mijn Vedute'
buttons.appendChild(downloadBtn)
function placeImg (img){
    img.alt= "jouw Vedute"
    img.src= localStorage.getItem('img')
    placeHolder.appendChild(img)

}

placeImg(downloadableImg)

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