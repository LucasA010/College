const boardDiv = document.getElementById("board");
const playerList = document.getElementById("players");
const pieceSelector = document.getElementById("piece-selector");
const pieceButtons = document.querySelectorAll("#piece-selector button");
const readyButton = document.getElementById("start-button");
const endTurnButton = document.getElementById("end-turn-button");
const msgDisplay = document.getElementById("message-display");


let players;
let username;
let previousPiece;
let firstPlacement;
let playerNum;
let board;
let divList = [];

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

    function endTurn(data) {
      socket.send(JSON.stringify({
        method: "endTurn",
        username
      }));
    }

    window.Game = {
      logMove: (moveData) => {sendMove(moveData)},
      ready: () => {readySignal()},
      endTurn: () => {endTurn()}
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
            board = parsedEvent.board;
            startGame();
            break;

        }
    }

})
  .catch(err => {
    console.error('Failed to get user:', err);
});

function updatePlayerList(players) {
    // resetting list 
    playerList.innerHTML = "";

    // redoing list with new players
    players.forEach((player) => {
        const newLi = document.createElement("li");
        newLi.textContent = player.username;
        playerList.appendChild(newLi);
    })
}

function moveMonster(originDiv, destinyDiv) {
  const fromIndex = divList.indexOf(originDiv);
  const toIndex = divList.indexOf(destinyDiv);

  Game.logMove({
    from: { datasetIndex: fromIndex },
    to: { datasetIndex: toIndex }
  });

  destinyDiv.innerHTML = originDiv.innerHTML;
  originDiv.innerHTML = "";
}

function renderBoard(board) {
  boardDiv.innerHTML = "";
  boardDiv.style.display = "grid";
  divList = [];

  for(let row=0; row<board.length; row++) {
    for(let col=0; col<board[row].length; col++) {
      const tileData = board[row][col];
      const tileElement = document.createElement("div");
      tileElement.classList.add("tile");
      divList.push(tileElement)


      if (tileData) {
        tileElement.innerHTML = tileData.monster
      }
      boardDiv.appendChild(tileElement)
    }
  }
}

function startGame() {
  firstPlacement = true;
  renderBoard(board);

  // assigning player number
  
  for (let i=0; i<players.length; i++) {
    console.log(players+"this is the players")
    console.log(players.length+"this is the players length")
    if (players[i].username == username) {playerNum = i+1}
  }
  
  highlightCells();

  endTurnButton.addEventListener("click", () => {
  Game.endTurn();

  endTurnButton.style.display = "none";
  msgDisplay.innerText = "Waiting for other players...";
  });

  // adding event listners to divs
  divList.forEach((div, index) => {
    div.addEventListener("click", (event) => {
      const isEmpty = !div.innerHTML;
      const isValid = div.classList.contains("highlight");
      const imgMonster = div.querySelector("img");
      const owner = imgMonster?.dataset.owner;

      // first placement
      if (isEmpty && firstPlacement && isValid) {
        pieceSelector.style.left = `${event.pageX}px`;
        pieceSelector.style.top = `${event.pageY}px`;
        pieceSelector.style.display = "block";
        pieceSelector.dataset.targetIndex = index;
      } 
      else if (owner === username){
        highlightCells(index);
        div.classList.add(`piece-selected`)
        previousPiece = div;
      } 
      else if (isEmpty && div.classList.contains("highlight")) {
        previousPiece.classList.remove(`piece-selected`)
        moveMonster(previousPiece, div)
        clearHighlights()
      }
  });
  
});

  // addigng event listeners to button to choose monster
  pieceButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      // relevant variables
      const monsterType = event.target.dataset.piece;
      const index = pieceSelector.dataset.targetIndex;
      const cell = divList[index];
      const row = Math.floor(index / 10);
      const col = index % 10;

      // inserting monster in selected div
      cell.innerHTML = `<img class="monster "src="../images/${monsterType}.png" data-owner="${username}">`;
      if (firstPlacement) highlightCells();
      cell.classList.remove("highlight");

      board[row][col] = {
        username,
        monster: monsterType
      };

      // hide monster popup
      pieceSelector.style.display = "none";
      firstPlacement = false;
      endTurnButton.style.display = "inline-block";

      clearHighlights();

      // send placement info to server - TO DO
    })
  })
}

function clearHighlights() {
  divList.forEach(div => {
    div.classList.remove("highlight");
  });
}

function highlightCells(index) {
  if (!firstPlacement) {
    const row = Math.floor(index/10)
    const col = index % 10;

    for (let r=0; r<10; r++) {// highlight row
      divList[r * 10 + col].classList.add("highlight");
    }

    for (let c=0; c<10; c++) {// highlight column
      divList[row * 10 + c].classList.add("highlight");
    }

    for (let i = 1; i <= 2; i++) { //highlight diagonals
    const diagonalOffsets = [
      [row - i, col - i], 
      [row - i, col + i], 
      [row + i, col - i], 
      [row + i, col + i], 
    ];

    diagonalOffsets.forEach(([r, c]) => {
      if (r >= 0 && r < 10 && c >= 0 && c < 10) {
        divList[r * 10 + c].classList.add("highlight");
      }
    });
  }
  };

  if(firstPlacement) {
    let indices = [];

    switch (playerNum) {
      case 1: indices = Array.from({ length: 10 }, (_, i) => i * 10); break;// Left
      case 2: indices = Array.from({ length: 10 }, (_, i) => i); break;// Top
      case 3: indices = Array.from({ length: 10 }, (_, i) => i * 10 + 9); break;// Right
      case 4: indices = Array.from({ length: 10 }, (_, i) => 90 + i); break;// Bottom
    }

  indices.forEach(i => divList[i].classList.add("highlight"));
  }
}

function nextTurn() {
  if (firstPlacement) {
    //highlight first row
    
  }
}



