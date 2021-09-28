const container = document.getElementById("container");
const mainContainer = document.getElementById("mainContainer");
const victoryScreen = document.getElementById("finishGameScreen");
const attempsCounter = document.getElementById("attemptsTitle");
const levelTitle = document.getElementById("actualLevelTitle");
const winTitle = document.getElementById("winTitle");
const winBtn = document.getElementById("restartGameButton");
const levelInfo = document.getElementById("levelInfo");
const levelInfoComplement = document.getElementById("levelInfoComplement");
const timeInfo = document.getElementById("timeInfo");
const attemptsInfo = document.getElementById("attemptsInfo");
const endLevelButton = document.getElementById("endLevelButton2");
const restartLevelButton = document.getElementById("restartLevelButtonMainScreen");
const infoContainer = document.getElementById("infoContainer");
let duringPlay = false;



GenerateViewCards();
function GenerateViewCards() {
    container.innerHTML = "";
    for (let card of game.AllCards) {
        const viewCard = document.createElement("div");
        const frontContent = document.createElement("div");
        const backContent = document.createElement("div");

        viewCard.className = "card";
        viewCard.id = card.Id;
        frontContent.className = "cardContentFront";
        backContent.className = "cardContentBack";
        backContent.innerHTML = "&lt;/&gt;";

        frontContent.innerHTML = `<img src="./images/${card.Value}.png">`;
        viewCard.setAttribute("data-content", card.Value);
        viewCard.addEventListener("click", (e) => {
            Play(e.currentTarget);
        });
        viewCard.appendChild(frontContent);
        viewCard.appendChild(backContent);
        container.appendChild(viewCard);
    }
}

function Play(viewCard) {
    try {
        if (!duringPlay) {
            if (!game.CardsValueOnActualPlay.some(value => value.Id == viewCard.id) && !game.AllValuesAlreadyMatched.some(actualCard => actualCard.Id == viewCard.id)) {
                const card = TransformViewCardInCard(viewCard);
                viewCard.className = "card flip";
                const cardsOnPlay = [];
                if (game.CardsValueOnActualPlay.length > 0) {
                    for (let actualCard of game.CardsValueOnActualPlay) {
                        const transformedCard = TransformCardInViewcard(actualCard);
                        cardsOnPlay.push(transformedCard);
                    }
                }

                const resultado = game.Play(card);
                cardsOnPlay.push(viewCard);
                if (cardsOnPlay.length == game.GetActualLevel().MatchNumber) {
                    duringPlay = true;
                    const verifyFunction = () => {
                        if (!resultado) {
                            for (let cardOnPlay of cardsOnPlay) {
                                cardOnPlay.className = "card";
                            }

                        }
                        UpdateAttemptCounter();
                        if (game.VerifyVictory()) {
                            ShowEndLevelScreen(true);
                            if (game.VerifyEndGame()) {

                                
                                victoryScreen.style.visibility = "visible";
                                victoryScreen.style.opacity = 1;
                            }
                        }
                        else if (game.VerifyDefeat()){
                            /*loseLevelScreen.style.display = "flex"*/
                            ShowEndLevelScreen(false);
                        }

                        viewCard.removeEventListener("transitionend", verifyFunction);
                        duringPlay = false;
                    };
                    viewCard.addEventListener("transitionend", verifyFunction);
                }
            }
            else
                throw "You must select a card that isn't overturned"
        }
    }
    catch (error) {
        alert(error);
    }

}

function ShowEndLevelScreen(isWin) {
    timeInfo.style.opacity = "0";
    infoContainer.style.opacity = "0";
    restartLevelButton.style.opacity = "0";
    endLevelButton.style.left = "1200px"
    levelInfo.style.left = "900px";
    levelInfoComplement.style.left = "900px";
    attemptsInfo.style.left = "900px";
    mainContainer.className = "flip";
    levelInfo.innerText = `Level ${game.LevelCount + 1}`;
    if(isWin){
        levelInfoComplement.innerText = "COMPLETED";
        levelInfoComplement.style.color = "#24c912";
        endLevelButton.onclick = LoadNextLevel;
        endLevelButton.value = "Next Level";
    }
    else{
        levelInfoComplement.innerText = "FAIL";
        levelInfoComplement.style.color = "#c61133";
        endLevelButton.onclick = RestartLevel;
        endLevelButton.value = "Restart Level";
    }
    setTimeout(() => { levelInfo.style.left = "0px"; levelInfo.style.opacity = "1" }, 1000);
    setTimeout(() => { levelInfoComplement.style.left = "0px"; levelInfoComplement.style.opacity = "1" }, 2200);
    setTimeout(() => { timeInfo.style.opacity = "1"; }, 3600)
    setTimeout(() => { attemptsInfo.style.left = "0px"; attemptsInfo.style.opacity = "1" }, 4400);
    setTimeout(() => { endLevelButton.style.left = "0px"; endLevelButton.style.opacity = "1" }, 5400);
    const time = game.GetActualLevelDuration();
    const hours = time.Hours.toString().length == 1 ? "0" + time.Hours.toString() : time.Hours.toString();
    const minutes = time.Minutes.toString().length == 1 ? "0" + time.Minutes.toString() : time.Minutes.toString();
    const seconds = time.Seconds.toString().length == 1 ? "0" + time.Seconds.toString() : time.Seconds.toString();
    timeInfo.innerText = `Time: ${hours}:${minutes}:${seconds}`;
    attemptsInfo.innerText = `Number of Attempts: ${game.AttemptsCount} / ${game.GetActualLevel().MaxMoviments}`;
    container.style.pointerEvents = "none";
}

function HideLevelScreen() {
    infoContainer.style.opacity = "1";
    restartLevelButton.style.opacity = "1";
    mainContainer.className = "";
    container.style.pointerEvents = "auto";
}



function UpdateAttemptCounter() {
    attempsCounter.innerText = `Maximum number of attempts: ${game.AttemptsCount} / ${game.GetActualLevel().MaxMoviments}`;
}


function UpdateLevelTitle() {
    levelTitle.innerText = `Actual Level: ${game.LevelCount + 1}`;
}

function RestartGame() {
    duringPlay = false;
    game = new Game(levels);
    UpdateAttemptCounter();
    UpdateLevelTitle();
    container.innerHTML = "";
    GenerateViewCards();
    victoryScreen.style.visibility = "hidden";
    victoryScreen.style.opacity = "0";
    AtualizarGrid();
}

function RestartLevel() {
    duringPlay = false;
    HideLevelScreen();
    game.RestartActualLevel();
    container.innerHTML = "";
    GenerateViewCards();
    UpdateAttemptCounter();

}

function LoadNextLevel() {
    HideLevelScreen();
    game.GoToTheNextLevel();
    UpdateAttemptCounter();
    UpdateLevelTitle();
    container.innerHTML = "";
    GenerateViewCards();
    AtualizarGrid();
}

function AtualizarGrid() {
    let columns = "";
    let rows = "";
    const levelAtual = game.GetActualLevel();
    for (let c = 0; c < levelAtual.Row; c++) {
        rows += "auto ";
    }
    for (let c = 0; c < levelAtual.Column; c++) {
        columns += "auto ";
    }
    container.style.gridTemplateColumns = columns;
    container.style.gridTemplateRows = rows;
}

function TransformCardInViewcard(card) {
    const cards = Array.from(document.getElementsByClassName("card"));
    return cards.filter(actualCard => actualCard.id == card.Id)[0];
}

function TransformViewCardInCard(viewCard) {
    return new Card(viewCard.id, viewCard.dataset.content);
}

