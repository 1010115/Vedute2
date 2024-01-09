let tutorialField = document.getElementById('tutorial-field')
let tutorialBtn = document.getElementById('tutorial-button')
let screen = document.getElementById('screen')
let pageNmbr = 0
let popUpState = false
let tutorialLength = 5

console.log(tutorialBtn)

let tutorialImg = document.createElement('img')
let nextBtn = document.createElement('button')
let prevBtn = document.createElement('button')
let exitBtn = document.createElement('button')

tutorialImg.src = `../Images/tutorial_${pageNmbr}.png`
nextBtn.innerHTML = `<img src="../Images/arrow-right.png" alt="->"/>`
prevBtn.innerHTML = `<img src="../Images/arrow-left.png" alt="<-"/>`
exitBtn.innerHTML = `<img src="../Images/cross.png" alt="X"/>`

nextBtn.classList = 'absolute left-3/4 bottom-2 rounded-full bg-slate-50 hover:border-2 border-black w-1/6 flex justify-center'
prevBtn.classList = 'absolute left-1/4 bottom-2 rounded-full bg-slate-50 hover:border-2 border-black w-1/6 flex justify-center'
exitBtn.classList = 'absolute left-2/4 bottom-2 rounded-full bg-slate-50 hover:border-2 border-black w-1/6 flex justify-center'
tutorialImg.classList = 'w-screen h-screen'


tutorialBtn.addEventListener('click', () => {
    popUp()
})

exitBtn.addEventListener('click', ()=> {
    popUp()
})


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

    nextBtn.addEventListener('click', () => {
        pageTracker(1)
    })

    prevBtn.addEventListener('click', () => {
        pageTracker(-1)
    })