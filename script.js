'use strict'
let playBtn = document.querySelector("#play")
let settingsBtn = document.querySelector("#settings")
let settingsModal = document.querySelector(".settings")
let settingsModalClose = document.querySelector(".close")
let musicVolume = document.querySelector("#sound")
let gameDifficulty = document.querySelector("#difficulty")
let gameThemeOne = document.querySelector("#themeFirst")
let gameThemeTwo = document.querySelector("#themeSecond")
let gameThemeThree = document.querySelector("#themeThird")
let themes = [gameThemeOne, gameThemeTwo, gameThemeThree]
let music = document.querySelector("#music")
let body = document.querySelector("#body")
let gameWindow = document.querySelector(".game")
let cardList = document.querySelector(".cards")

let counter = 0
let flippedCardCounter = 0
let colors = ["#B6BBC4", "#974EC3", "#872341", "#005B41", "#7752FE", "#5C8374", "#A2678A", "#4477CE"]
let clickedCards = []


// Setting

function playMusic() {

    if (gameThemeOne.checked == true) {
        music.src = "./music1.mp3"
    }

    else if (gameThemeTwo.checked == true) {
        music.src = "./music2.mp3"
    }

    else if (gameThemeThree.checked == true) {
        music.src = "./music3.mp3"
    }

    else {
        music.src = "./music1.mp3"
    }

    music.volume = musicVolume.value
    music.play()

}

function chooseTheme() {
    if (gameThemeOne.checked == true) {
        body.style.backgroundColor = "#161A30"
        settingsModal.style.backgroundColor = "#161A30"
        body.style.fontFamily = "'fasebulan'"
        playBtn.style.backgroundColor = "#31304D"
        playBtn.style.fontFamily = "'fasebulan'"
        settingsBtn.style.backgroundColor = "#31304D"
        settingsBtn.style.fontFamily = "'fasebulan'"
        gameDifficulty.style.fontFamily = "'fasebulan'"
        gameWindow.style.backgroundColor = "#161A30"
    }

    else if (gameThemeTwo.checked == true) {
        body.style.backgroundColor = "#0F0F0F"
        settingsModal.style.backgroundColor = "#0F0F0F"
        body.style.fontFamily = "'ebullience'"
        playBtn.style.backgroundColor = "#292929"
        playBtn.style.fontFamily = "'ebullience'"
        settingsBtn.style.backgroundColor = "#292929"
        settingsBtn.style.fontFamily = "'ebullience'"
        gameDifficulty.style.fontFamily = "'ebullience'"
        gameWindow.style.backgroundColor = "#0F0F0F"
    }

    else if (gameThemeThree.checked == true) {
        body.style.backgroundColor = "#313866"
        settingsModal.style.backgroundColor = "#313866"
        body.style.fontFamily = "'grim'"
        playBtn.style.backgroundColor = "#414b86"
        playBtn.style.fontFamily = "'grim'"
        settingsBtn.style.backgroundColor = "#414b86"
        settingsBtn.style.fontFamily = "'grim'"
        gameDifficulty.style.fontFamily = "'grim'"
        gameWindow.style.backgroundColor = "#313866"
    }

    else {
        body.style.backgroundColor = "#161A30"
        settingsModal.style.backgroundColor = "#161A30"
        body.style.fontFamily = "'fasebulan'"
        playBtn.style.backgroundColor = "#161A30"
        playBtn.style.fontFamily = "'fasebulan'"
        settingsBtn.style.backgroundColor = "#161A30"
        settingsBtn.style.fontFamily = "'fasebulan'"
        gameDifficulty.style.fontFamily = "'fasebulan'"
        gameWindow.style.backgroundColor = "#161A30"
    }
}

playBtn.addEventListener('click', () => {
    playMusic()
})

musicVolume.addEventListener("input", () => {
    music.volume = musicVolume.value
})

themes.forEach((theme) => {
    theme.addEventListener('click', () => {
        chooseTheme()
    })
})

settingsBtn.addEventListener('click', () => {
    settingsModal.classList.toggle("hidden")
})

settingsModalClose.addEventListener('click', () => {
    settingsModal.classList.add("hidden")
})

// Setting



// Play

function chooseDifficulty() {

    for (let i = 0; i < gameDifficulty.length; i++) {
        if (gameDifficulty[i].selected == true) {
            return gameDifficulty[i].textContent
        }
    }
}

function flipCard(a) {
    a.classList.add("is-flipped")
}

function createCards(n) {
    cardList.innerHTML = null

    for (let i = 0; i < n; i++) {
        let li = document.createElement("li")
        li.classList.add("card")
        let liFront = document.createElement("div")
        liFront.classList.add("card__face")
        liFront.classList.add("card__face--front")
        let liBack = document.createElement("div")
        liBack.classList.add("card__face")
        liBack.classList.add("card__face--back")
        li.appendChild(liFront)
        li.appendChild(liBack)
        cardList.appendChild(li)

        li.addEventListener('click', () => {

            if (li.classList[1] != "is-flipped") {
                flipCard(li)


                if (clickedCards.length != 2) {
                    let x = li.children[1]

                    if (clickedCards.indexOf(x) == -1) {
                        clickedCards.push(x)

                        if (clickedCards.length == 2) {

                            if (clickedCards[0].style.backgroundColor == clickedCards[1].style.backgroundColor) {
                                flippedCardCounter += 2
                            }

                            else {
                                setTimeout(() => { li.classList.remove("is-flipped"); }, 500);
                                let y = cardList.children
                                for (let n = 0; n < y.length; n++) {
                                    if (y[n].children[1] == clickedCards[0]) {
                                        setTimeout(() => { y[n].classList.remove("is-flipped"); }, 500);
                                    }
                                }
                            }

                            clickedCards = []

                        }
                    }

                }


                if (chooseDifficulty() == "Easy") {
                    while (flippedCardCounter == 8) {
                        setTimeout(() => { alert("You win!"); }, 200);
                        setTimeout(() => { gameWindow.classList.add("hidden"); }, 200);
                        flippedCardCounter = 0
                        music.src = ""
                        break
                    }
                }

                else if (chooseDifficulty() == "Medium") {
                    while (flippedCardCounter == 12) {
                        setTimeout(() => { alert("You win!"); }, 200);
                        setTimeout(() => { gameWindow.classList.add("hidden"); }, 200);
                        flippedCardCounter = 0
                        music.src = ""
                        break
                    }
                }

                else if (chooseDifficulty() == "Hard") {
                    while (flippedCardCounter == 16) {
                        setTimeout(() => { alert("You win!"); }, 200);
                        setTimeout(() => { gameWindow.classList.add("hidden"); }, 200);
                        flippedCardCounter = 0
                        music.src = ""
                        break
                    }
                }
            }


        })
    }

    if (n == 8) {
        cardList.classList.remove("medium")
        cardList.classList.remove("hard")
    }

    else if (n == 12) {
        cardList.classList.add("medium")
        cardList.classList.remove("hard")
    }

    else if (n == 16) {
        cardList.classList.remove("medium")
        cardList.classList.add("hard")
    }



    let bcg = document.querySelectorAll(".card__face--back")
    let halfOfLength = bcg.length / 2

    if (bcg.length == 8) {
        bcg[0].style.backgroundColor = colors[1]
        bcg[1].style.backgroundColor = colors[1]
        bcg[2].style.backgroundColor = colors[2]
        bcg[3].style.backgroundColor = colors[2]
        bcg[4].style.backgroundColor = colors[3]
        bcg[5].style.backgroundColor = colors[3]
        bcg[6].style.backgroundColor = colors[4]
        bcg[7].style.backgroundColor = colors[4]
    }

    else if (bcg.length == 12) {
        bcg[0].style.backgroundColor = colors[1]
        bcg[1].style.backgroundColor = colors[1]
        bcg[2].style.backgroundColor = colors[2]
        bcg[3].style.backgroundColor = colors[2]
        bcg[4].style.backgroundColor = colors[3]
        bcg[5].style.backgroundColor = colors[3]
        bcg[6].style.backgroundColor = colors[4]
        bcg[7].style.backgroundColor = colors[4]
        bcg[8].style.backgroundColor = colors[5]
        bcg[9].style.backgroundColor = colors[5]
        bcg[10].style.backgroundColor = colors[6]
        bcg[11].style.backgroundColor = colors[6]
    }

    else {
        bcg[0].style.backgroundColor = colors[1]
        bcg[1].style.backgroundColor = colors[1]
        bcg[2].style.backgroundColor = colors[2]
        bcg[3].style.backgroundColor = colors[2]
        bcg[4].style.backgroundColor = colors[3]
        bcg[5].style.backgroundColor = colors[3]
        bcg[6].style.backgroundColor = colors[4]
        bcg[7].style.backgroundColor = colors[4]
        bcg[8].style.backgroundColor = colors[5]
        bcg[9].style.backgroundColor = colors[5]
        bcg[10].style.backgroundColor = colors[6]
        bcg[11].style.backgroundColor = colors[6]
        bcg[12].style.backgroundColor = colors[7]
        bcg[13].style.backgroundColor = colors[7]
        bcg[14].style.backgroundColor = colors[0]
        bcg[15].style.backgroundColor = colors[0]
    }



    let cards = document.querySelectorAll(".card")

    for (let i = 0; i < cards.length; i++) {
        let x = Math.round(Math.random() * (7 - 1) + 1)
        cards[i].style.order = x
    }
}

playBtn.addEventListener('click', () => {

    gameWindow.classList.remove("hidden")


    if (chooseDifficulty() == "Easy") {
        createCards(8)
    }

    else if (chooseDifficulty() == "Medium") {
        createCards(12)
    }

    else if (chooseDifficulty() == "Hard") {
        createCards(16)
    }

})

// Play
