let tutorialField = document.getElementById('tutorialField')
let tutorialBtn = document.getElementById('tutorialBtn')
let pageNmbr = 0
let popUpState = false

let tutorialImg = document.createElement('img')
let nextBtn = document.createElement('button')
let prevBtn = document.createElement('button')

tutorialImg.src = `../assets/tutorial_${pageNmbr}.png`
nextBtn.innerText = '>'
prevBtn.innerText = '<'

// tutorialImg.tagName = "h-50% fit"


tutorialBtn.addEventListener('click', () => {
    popUp()
})


function popUp() {
    if (popUpState === false) {
        tutorialField.appendChild(tutorialImg)
        tutorialField.appendChild(prevBtn)
        tutorialField.appendChild(nextBtn)

        popUpState = true
    } else {
        tutorialField.removeChild(tutorialImg)
        tutorialField.removeChild(prevBtn)
        tutorialField.removeChild(nextBtn)

        popUpState = false
    }
}

    function pageTracker(number) {
        pageNmbr = pageNmbr + number;
        if (pageNmbr < 0) {
            pageNmbr = 0
        } else if (pageNmbr > 3) {
            pageNmbr = 3
        }
        tutorialImg.src = `../assets/tutorial_${pageNmbr}.png`
    }

    nextBtn.addEventListener('click', () => {
        pageTracker(1)
    })

    prevBtn.addEventListener('click', () => {
        pageTracker(-1)
    })