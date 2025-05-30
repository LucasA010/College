const socket = new WebSocket("ws://localhost:3000"); // change from hard code later
const divList = document.getElementsByTagName("div");
const playerList = document.getElementById("players");

// response when server opens connection with user
socket.onopen = () => {
    
}

// receiving from the server
socket.onmessage = (event) => {
    
}


// adding event listners to divs
for (let i=0; i<divList.length; i++) {
    divList[i].addEventListener("click", () => {
        divList[i].innerText = "pressed";
        currDiv = divList[i];
        pressDiv(currDiv, i); // trigger function to update particular div to server
    })
}

