window.addEventListener('load', init);

function init() {
    const input = document.getElementById("files");
    const output = document.getElementById("output");
    input.addEventListener("change", function(e) {
        if(e.target.files) {
        const imageFile = input.files[0];
        reader = new FileReader();
        reader.readAsDataURL(imageFile);
          console.log(files[0]);
          reader.onloadend = function(e) {
        if (files.length === 0) {
          output.textContent = "No files selected.";
          return;
         } else {
            img = new Image(100);
            img.src = e.target.result;
          const ctx = document.getElementById("canvas").getContext("2d");
          
          img.onload = function(ev) {
            ctx.drawImage(img, 0,0, 400, 600);
            ctx.beginPath();
            ctx.stroke();
          };
          
         }
            }}
      });
}






function draw() {
    
  }
  