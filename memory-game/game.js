class Level {
    constructor(column, row, cardsList, maxMoviments, matchNumber = 2) {
        this.Column = column;
        this.Row = row;
        this.CardsList = cardsList;
        this.MaxMoviments = maxMoviments;
        this.MatchNumber = matchNumber;
    }
}

class Card {
    constructor(id, value) {
        this.Id = id;
        this.Value = value;
    }
}

const cardsList1 = [
    "bootstrap",
    "bootstrap",
    "css",
    "css",
    "electron",
    "electron",
    "firebase",
    "firebase",
    "html",
    "html",
    "javascript",
    "javascript",
    "jquery",
    "jquery",
    "mongo",
    "mongo",
    "node",
    "node",
    "react",
    "react"
];
const cardsList2 = [...cardsList1,
    "php",
    "php",
    "go",
    "go",
    "ruby",
    "ruby",
    "python",
    "python",
    "scratch",
    "scratch",
];
const cardsList3 = [...cardsList2,
    "csharp",
    "csharp",
    "c",
    "c",
    "vscode",
    "vscode",
    "github",
    "github",
    "java",
    "java"
];
const cardsList4 = [...cardsList2, ...cardsList2.filter((value, index, array) => array.indexOf(value) == index)];

const levels = [
    new Level(4, 5, cardsList1, Infinity),
    new Level(4, 5, cardsList1, 30),
    new Level(6, 5, cardsList2, 60),
    new Level(8, 5, cardsList3, 85),
    new Level(9, 5, cardsList4, 100, 3)
];

class Game {
    constructor(levels) {
        this.Levels = levels;
        this.LevelCount = 0;
        this.AttemptsCount = 0;
        this.CardsValueOnActualPlay = new Array();
        this.AllCards = new Array();
        this.AllValuesAlreadyMatched = new Array();
        this.LevelStartDate = null;
        this.InitNewLevel();
    }

    Play(cardValue) {
        this.CardsValueOnActualPlay.push(cardValue);
        if (this.CardsValueOnActualPlay.length == this.GetActualLevel().MatchNumber) {
            this.AttemptsCount++;
            const cards = this.CardsValueOnActualPlay;
            const card1 = cards[0];
            this.CardsValueOnActualPlay = new Array();
            if (cards.every(actualCard => actualCard.Value == card1.Value)) {
                this.AllValuesAlreadyMatched.push(...cards);
                return true;
            }
            return false;
        }
        return true;
    }
    VerifyVictory() {
        return this.AllValuesAlreadyMatched.length == this.GetActualLevel().CardsList.length;
    }

    VerifyDefeat() {
        const result = this.AttemptsCount >= this.GetActualLevel().MaxMoviments;
        return result;
    }
    GoToTheNextLevel() {
        this.LevelCount++;
        this.AttemptsCount = 0;
        this.CardsValueOnActualPlay = new Array();
        this.AllValuesAlreadyMatched = new Array();
        this.InitNewLevel();
    }
    GetActualLevel() {
        return this.Levels[this.LevelCount];
    }
    RestartActualLevel() {
        this.AttemptsCount = 0;
        this.CardsValueOnActualPlay = new Array();
        this.AllValuesAlreadyMatched = new Array();
        this.InitNewLevel();
    }

    ShuffleCards() {
        this.AllCards = new Array();
        const cardsList = this.GetActualLevel().CardsList;
        const actualImagesList = [...cardsList];
        for (let c = 0; c < cardsList.length; c++) {
            const randomValue = Math.floor(Math.random() * actualImagesList.length);
            const realValue = actualImagesList[randomValue];
            const id = "id-" + realValue + "-" + this.AllCards.filter(card => card.Value == realValue).length;
            const card = new Card(id, realValue);
            this.AllCards.push(card);
            actualImagesList.splice(randomValue, 1);
        }
    }
    InitNewLevel() {
        this.LevelStartDate = new Date();
        this.ShuffleCards();
    }
    GetActualLevelDuration() {
        const diferenceBetweenDates = new Date() - this.LevelStartDate;
        const seconds = Math.trunc(diferenceBetweenDates / 1000);
        const minutes = Math.trunc(seconds / 60);
        const hours = Math.trunc(minutes / 60);
        return { Hours: hours, Minutes: minutes - (hours * 60), Seconds: seconds - (minutes * 60) };
    }
    VerifyEndGame() {
        const levelSuperior = this.LevelCount + 1;
        return this.Levels.length == levelSuperior;
    }



}

let game = new Game(levels);


