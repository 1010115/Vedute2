document.addEventListener("DOMContentLoaded", init);

let infobutton
let okbutton
let deletebutton
let infopopup


//init variables
function init() {
    console.log("init")
    infobutton = document.getElementById("infobutton");
    okbutton = document.getElementById("ok-button");
    deletebutton = document.getElementById("delete-data");
    infopopup = document.getElementById("infopopup");
    infobutton.addEventListener("click", info);
    okbutton.addEventListener("click", close);
    deletebutton.addEventListener("click", deldata);
}

//give the user information about the data this webapp stores
function info () {
    infopopup.classList.toggle("hidden")
}

//close the popup menu
function close () {
    infopopup.classList.toggle("hidden")
}

//delete everything that is stored in localhost
function deldata () {
    //close the popup
    close()

    //delete all data in localstorage
    localStorage.clear()

    //give alert that localstorage is cleared
    alert("alle data is verwijderd");

}

