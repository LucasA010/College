const divList = Array.from(document.getElementsByTagName("div"));
const playerList = document.getElementById("players");
const pieceSelector = document.getElementById("piece-selector");
const pieceButtons = document.querySelectorAll("#piece-selector button");
const readyButton = document.getElementById("start-button");
const msgDisplay = document.getElementById("message-display");
const monsters = {werewolf: `<img class="monster" src="../images/werewolf.png">`, 
                  vampire: `<img class="monster" src="../images/vampire.png">`, 
                  ghost: `<img class="monster" src="../images/ghost.png">`}

let players;
let username;
let piecesList = [];
let previousPiece;
let firstPlacement;
let playerNum;

readyButton.addEventListener("click", (event) => {
  Game.ready();
})

fetch('/api/me') // way of linking client username and sending it to the server
  .then(res => {
    if (!res.ok) throw new Error('Not logged in');
    return res.json();
  })
  .then(user => {
    username = user.username;
    console.log('Logged in as:', username);

    // connect to WebSocket using username
    const socket = new WebSocket(`ws://localhost:3000?username=${encodeURIComponent(username)}`); // change from hard code later
    
    // response when server opens connection with user
    socket.onopen = () => {
        console.log("Connected with server")
        socket.send(JSON.stringify({
            method: "addPlayer",
            username
        }))
    }

    function sendMove(data) {
      socket.send(JSON.stringify({
        method: "logMove",
        data
      }))
    }

    function readySignal() {
      socket.send(JSON.stringify({
        method: "playerReady"
      }))
      readyButton.style.display = "none";
      msgDisplay.innerText = "Awaiting other players";
    }

    window.Game = {
      logMove: (moveData) => {sendMove(moveData)},
      ready: () => {readySignal()}
    }

    // receiving from the server
    socket.onmessage = (event) => {
        parsedEvent = JSON.parse(event.data);
        switch (parsedEvent.method) {
           
          // function to receive players list update
          case "updatePlayers":
            players = parsedEvent.players;
            const roomID = parsedEvent.room.roomID;
            console.log("You're in Room -> ", roomID);
            updatePlayerList(players);
            break;

          case "gameStart":
            msgDisplay.innerText = "Game started!";
            startGame();
            break;
        }
    }

})
  .catch(err => {
    console.error('Failed to get user:', err);
});

// creating Piece class
class Piece {
  constructor(type, userOwner, currPosition) {
    this.type = type;
    this.userOwner = userOwner;
    this.currPosition = currPosition;
  }
}

function updatePlayerList(players) {
    // resetting list 
    playerList.innerHTML = "";

    // redoing list with new players
    players.forEach((player) => {
        const newLi = document.createElement("li");
        newLi.textContent = player;
        playerList.appendChild(newLi);
    })
}

function moveMonster(originDiv, destinyDiv) {
  Game.logMove({from: originDiv, 
                to: destinyDiv})
  destinyDiv.innerHTML = originDiv.innerHTML;
  originDiv.innerHTML = "";
}

function startGame() {
  // assigning player number
  for (let i=0; i<players.length; i++) {
    if (players[i] == username) {playerNum = `player-${i+1}`}
  }
  
  // adding event listners to divs
  divList.forEach((div, index) => {
    div.addEventListener("click", (event) => {
      const isEmpty = !div.innerHTML;
      if (isEmpty && firstPlacement) {
        // Monster pop up
        pieceSelector.style.left = `${event.pageX}px`;
        pieceSelector.style.top = `${event.pageY}px`;
        pieceSelector.style.display = "block";

        // Div index
        pieceSelector.dataset.targetIndex = index;
      } 
      
      if (div.classList.contains(`${username}-piece`)){
        div.classList.add(`piece-selected`)
        previousPiece = div;
      }

      if (!div.classList.contains(`piece-selected`) && !isEmpty) {
        div.classList.remove(`piece-selected`)
        moveMonster(previousPiece, div)
      }
  });
});

  // addigng event listeners to button to choose monster
  pieceButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      // relevant variables
      const monsterType = event.target.dataset.piece;
      const index = pieceSelector.dataset.targetIndex
      const cell = divList[index]

      // inserting monster in selected div
      cell.innerHTML = monsters[monsterType];
      cell.classList.add(`${username}-piece`)

      // hide monster popup
      pieceSelector.style.display = "none";

      //  creating piece obj to later send to server
      piecesList.push(new Piece(monsterType, username, cell))
    })
  })
  firstPlacement = true;
  nextTurn();
}

function nextTurn() {
  if (firstPlacement) {
    //highlight first row
  }
}



