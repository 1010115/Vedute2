document.addEventListener("DOMContentLoaded", init);

let infobutton
let okbutton
let deletebutton
let infopopup

function init() {
    infobutton = document.getElementById("infobutton");
    okbutton = document.getElementById("ok-button");
    deletebutton = document.getElementById("delete-data");
    infopopup = document.getElementById("infopopup");
    infobutton.addEventListener("click", info);
    okbutton.addEventListener("click", close);
    deletebutton.addEventListener("click", deldata);
}

function info () {
    infopopup.classList.toggle("hidden")
}

function close () {
    infopopup.classList.toggle("hidden")
}

function deldata () {
    close()

    localStorage.clear()

    alert("alle data is verwijderd");

}

