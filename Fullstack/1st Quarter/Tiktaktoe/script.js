
const nameForm = document.getElementsByTagName("form")[0];
const inputLabel = document.getElementsByTagName("label")[0];
const nameInput = document.getElementById("name");
const gameSquares = document.getElementsByTagName("td");
const resetButton = document.getElementById("reset");
const numRows = numColumns = 3;
// const numColumns = 3;

const playerSymbols = { 1: "X",
                        2: "O"}

let playerNum = turnNumber = 1;
let isGameOver = false;
// let turnNumber = 1;

function changePlayerNum() {
    turnNumber++;
    if (playerNum == 1) playerNum +=1;
    else playerNum = 1;
}

function checkForDraw() {
    if (turnNumber == numRows * numColumns) {
        alert("Draw! No winners this time")
        endGame();
    }
}

function checkForGameEnd() {
    checkForVictory();
    if (!isGameOver) checkForDraw();
}

function endGame() {
    isGameOver = true;
    resetButton.style.display = "block";
}

function victory() {
    alert(`Victory for player ${playerNum}!`)
    endGame();
    // Local storage addition
    /*
    - Get winner name
    - Get loser name
    - getItem(winner)
    - Increment loser value
    - Save updated object
    */

    const winningPlayerNameDisplay = document.getElementById(`player-${playerNum}-name`);
    const winningPlayer = winningPlayerNameDisplay.innerText.split(":")[1];
    
    // resetting player who plays firts
    changePlayerNum();}
    const losingPlayerNameDisplay = document.getElementById(`player-${playerNum}-name`);
    const losingPlayer = losingPlayerNameDisplay.innerText.split(":")[1];

    winnerStats = JSON.parse(localStorage.getItem(winningPlayer));

    if (winnerStats) {
        if (winnerStats[losingPlayer]) {
            winnerStats[losingPlayer]++;
        } else {
            winnerStats[losingPlayer] = 1;
        }
    } else {
        // winnerStats = {losingPlayer: 1};
        winnerStats = {};
        winnerStats[losingPlayer] = 1;
    }

    localStorage.setItem(winningPlayer, JSON.stringify(winnerStats));

function checkForVictory() {
    // Checking rows for victory
    for (let rowStart = 0; rowStart < numRows * numColumns; rowStart += numColumns) {
        if (gameSquares[rowStart].innerText && 
            gameSquares[rowStart].innerText == gameSquares[rowStart+1].innerText && 
            gameSquares[rowStart].innerText == gameSquares[rowStart+2].innerText) 
            victory();
    }

    // Checking columns for victory
    for (let colStart = 0; colStart < numColumns; colStart++) {
        if (gameSquares[colStart].innerText &&
            gameSquares[colStart].innerText == gameSquares[colStart+numRows].innerText &&
            gameSquares[colStart].innerText == gameSquares[colStart+(numRows*2)].innerText) 
            victory();
    }

    // Checking for diagonal victory
    if (gameSquares[0].innerText &&
        gameSquares[0].innerText == gameSquares[4].innerText &&
        gameSquares[0].innerText == gameSquares[8].innerText) 
        victory();

    if (gameSquares[2].innerText &&
        gameSquares[2].innerText == gameSquares[4].innerText &&
        gameSquares[2].innerText == gameSquares[6].innerText) 
        victory();
}

function playerSquareSelection(gameSquare) {
    if (gameSquare.innerText || isGameOver) return;
    gameSquare.innerText = playerSymbols[playerNum];

    checkForGameEnd();
    changePlayerNum();

    // gameSquare.removeEventListener("click", func)
    
    
}

function startGame() {
    for (let i = 0; i < gameSquares.length; i++) {
            gameSquares[i].addEventListener("click", (event) => {
                playerSquareSelection(event.target);
            })
        }

    nameForm.getElementsByTagName("input")[0].disabled = true;
    nameForm.getElementsByTagName("button")[0].disabled = true;
    playerNum = 1;
    inputLabel.innerText = "Game on! Good luck!"
}

resetButton.addEventListener("click", (event) => {
    for (let i = 0; i < gameSquares.length; i++) {
        gameSquares[i].innerText = "";
        }
        turnNumber = 1;
        isGameOver = false;
        resetButton.style.display = "none";
})

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const playerName = nameInput.value;
    const playerNameDisplay = document.getElementById(`player-${playerNum}-name`);

    // Old code for local storage
    // let playerList = localStorage.getItem("playerList");
    // if (playerList) {
    //     let playerNames = playerList.split(",");
    //     let isOnList = false;

    //     playerList.forEach(player => {if (playerName == player) isOnList = true;})
    //     if (!isOnList) {
    //         playerList += "," + playerName;
    //         localStorage.setItem("playerList", playerList);
    //     }
    // } else {
    //     localStorage.setItem("playerList", playerName);
    // }

    // Updated local storage

    let playerList = JSON.parse(localStorage.getItem("playerList"));
    if (playerList) {
        if (!playerList.includes(playerName)) playerList.push(playerName);
    } else {
        playerList = [playerName];
    }

    localStorage.setItem("playerList", JSON.stringify(playerList));

    // Code for game
    playerNameDisplay.innerText = playerNameDisplay.innerText + " " + playerName;
    nameInput.value="";
    playerNum += 1;
    inputLabel.innerText = `Player ${playerNum} Name: `;

    if (playerNum > 2) {
        startGame(); 
    }
})


/*
Local storage support
keep track of palyers
    + Keep track of individual playerrs
        - Store player name when playing(entered their name)
            - players = [player1, player2, ...]

    - Keep track of player pairs

Keep track of wins
    - Keep track of total wins
    + Keep track of wins against individual players 
        - playerXWins = {playerY: y, playerZ: z}
*/