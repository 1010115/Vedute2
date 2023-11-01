let canvas = document.getElementById('test_canvas')
let ctx = canvas.getContext('2d')

ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(10, 10, 50, 50);

ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
ctx.fillRect(30, 30, 50, 50);



let download = document.createElement('a')

download.download = "vedute.png"
download.innerText = "DOWNLOAD VEDUTE"
document.body.appendChild(download)

function downloadImage (canvas){
    let img = canvas.toDataURL("image/png")
    download.href = img
}

// TEST
downloadImage(canvas)