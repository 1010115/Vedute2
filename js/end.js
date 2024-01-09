let placeHolder = document.getElementById('placeHolder')
let buttons = document.getElementById('buttons')
let downloadableImg = document.createElement('img')

let eindvedute;
let back = document.getElementById("back");
let frame1, frame2, frame3;
let downloadUrl;
//finishBtn.addEventListener('click', () => downloadImage(canvas))

back.addEventListener("click", backfunctie);
console.log(back)

    
    if(localStorage.getItem("img1")) {
        let downloadDiv = document.createElement('div');
        downloadDiv.classList.add("mt-8")
        buttons.appendChild(downloadDiv);
        for(let i = 1; i< 4; i++) {
    
            let downloadBtn = document.createElement('a')
            downloadBtn.classList.add("p-6",  "w-80", "text-center", "rounded-md", "bg-slate-50", "bg-opacity-70", "hover:bg-opacity-100", "text-black", "text-xl", "font-medium", "mr-4", "mt-2")
            downloadBtn.href = localStorage.getItem(`img${i}`);
            downloadBtn.download = `vedute${i}.png`
            downloadBtn.innerText = `Download laag ${i}` 
            downloadDiv.appendChild(downloadBtn)
        }
    }


function placeImg (){
    console.log(localStorage.getItem("img1"));
    if(localStorage.getItem('img1')) {
        frame1 = localStorage.getItem('img1');
        downloadUrl = frame1;
        frame2 = localStorage.getItem('img2');
        frame3 = localStorage.getItem('img3');
    }
    //placeHolder.appendChild(img)
}

placeImg();

downloadBtn.addEventListener('click', ()=>{
    
})


function downloadImage (){
    downloadBtn.download.href = downloadUrl;
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