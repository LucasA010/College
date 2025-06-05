const divList = Array.from(document.getElementsByTagName("div"));
const playerList = document.getElementById("players");
const pieceSelector = document.getElementById("piece-selector");
const pieceButtons = document.querySelectorAll("#piece-selector button");
const monsters = {werewolf: `<img class="monster" src="../images/werewolf.png">`, 
                  vampire: `<img class="monster" src="../images/vampire.png">`, 
                  ghost: `<img class="monster" src="../images/ghost.png">`}

let username;
let piecesList = [];

// adding event listners to divs
divList.forEach((div, index) => {
  div.addEventListener("click", (event) => {
    const isEmpty = !div.innerHTML;
    if (isEmpty) {
      // Monster pop up
      pieceSelector.style.left = `${event.pageX}px`;
      pieceSelector.style.top = `${event.pageY}px`;
      pieceSelector.style.display = "block";

      // Div index
      pieceSelector.dataset.targetIndex = index;
    } else {
      moveMonster();
    }
  });
});

// addigng event listeners to button to choose monster
pieceButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    // relevant variables
    const selectedPiece = event.target.dataset.piece;
    const index = pieceSelector.dataset.targetIndex
    const cell = divList[index]

    // inserting monster in selected div
    cell.innerHTML = monsters[selectedPiece];

    // hide monster popup
    pieceSelector.style.display = "none";

    //  creating piece obj to later send to server
    piecesList.push(new Piece(selectedPiece, username, cell))
  })
})


fetch('/api/me')
  .then(res => {
    if (!res.ok) throw new Error('Not logged in');
    return res.json();
  })
  .then(user => {
    username = user.username;
    console.log('Logged in as:', username);

    // Now connect to WebSocket using username
    const socket = new WebSocket(`ws://localhost:3000?username=${encodeURIComponent(username)}`); // change from hard code later
    
    // response when server opens connection with user
    socket.onopen = () => {
        console.log("Connected with server")
        socket.send(JSON.stringify({
            method: "addPlayer",
            username
        }))
    }

    // receiving from the server
    socket.onmessage = (event) => {
        parsedEvent = JSON.parse(event.data);
        switch (parsedEvent.method) {
            case "updatePlayers":
                const players = parsedEvent.players;
                updatePlayerList(players);
                break;
        }
    }

})
  .catch(err => {
    console.error('Failed to get user:', err);
    // Optionally redirect to login
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
    playerList.innerHTML = "";

    players.forEach((player) => {
        const newLi = document.createElement("li");
        newLi.textContent = player;
        playerList.appendChild(newLi);
    })
}

function moveMonster() {

}



