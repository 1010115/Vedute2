document.addEventListener("DOMContentLoaded", init)

let tutorialField
let tutorialBtn
let screen
let pageNmbr = 0
let popUpState = false
let tutorialLength = 6

let tutorialImg
let nextBtn
let prevBtn
let exitBtn

function init () {
    exitBtn = document.createElement('button')
    prevBtn = document.createElement('button')
    nextBtn = document.createElement('button')
    tutorialImg = document.createElement('img')
    screen = document.getElementById('screen')
    tutorialBtn = document.getElementById('tutorial-button')
    tutorialField = document.getElementById('tutorial-field')

    if (!localStorage.getItem("firsttime")) {
        localStorage.setItem("firsttime", "true")
    }

    if (localStorage.getItem("firsttime") === "true") {
        popUp()
        localStorage.setItem("firsttime", "false")
    }

    tutorialImg.src = `../Images/tutorial_${pageNmbr}.png`
    nextBtn.innerHTML = `<img src="../assets/arrow-right.svg" alt="->"/>`
    prevBtn.innerHTML = `<img src="../assets/arrow-left.svg" alt="<-"/>`
    exitBtn.innerHTML = `<img src="../assets/xmark-solid.svg" alt="X"/>`

    nextBtn.classList = 'absolute left-3/4 bottom-2 rounded-full bg-slate-50 border border-2 hover:border-black w-1/6 flex justify-center'
    prevBtn.classList = 'absolute left-1/4 bottom-2 rounded-full bg-slate-50 border border-2 hover:border-black w-1/6 flex justify-center'
    exitBtn.classList = 'absolute left-2/4 bottom-2 rounded-full bg-slate-50 border border-2 hover:border-black w-1/6 flex justify-center'
    tutorialImg.classList = 'w-screen h-screen'

    tutorialBtn.addEventListener('click', popUp)

    exitBtn.addEventListener('click', popUp)

    nextBtn.addEventListener('click', () => {
        pageTracker(1)
    })

    prevBtn.addEventListener('click', () => {
        pageTracker(-1)
    })
}


function popUp() {
    if (popUpState === false) {
        tutorialField.appendChild(tutorialImg)
        tutorialField.appendChild(prevBtn)
        tutorialField.appendChild(nextBtn)
        tutorialField.appendChild(exitBtn)
        tutorialField.classList = 'h-screen w-screen gap-x-20 justify-center relative'
        screen.classList = 'display: hidden overflow-y: hidden'

        popUpState = true
    } else {
        tutorialField.classList = 'display: hidden'
        screen.classList = 'grid grid-cols-10 place-content-center min-w-screen min-h-screen h-full bg-clouds2 bg-cover'

        popUpState = false
    }
}

function pageTracker(number) {
    pageNmbr = pageNmbr + number;
    if (pageNmbr < 0) {
        pageNmbr = 0
    } else if (pageNmbr > tutorialLength) {
        pageNmbr = tutorialLength
    }
    tutorialImg.src = `../Images/tutorial_${pageNmbr}.png`
}