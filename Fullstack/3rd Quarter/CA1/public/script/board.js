const socket = new WebSocket("ws://localhost:3000"); // change from hard code later
const divList = document.getElementsByTagName("div");

// response when server opens connection with user
socket.onopen = () => {
    // change to identify user when login is done
    socket.send(JSON.stringify({newMessage: "Userx connected to server"}))
}

// receiving from the server
socket.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    divList[parsedData.divNum].innerText = parsedData.divText;

}

// adding event listners to divs
for (let i=0; i<divList.length; i++) {
    divList[i].addEventListener("click", () => {
        divList[i].innerText = "pressed";
        currDiv = divList[i];
        pressDiv(currDiv, i); // trigger function to update particular div to server
    })
}

// send pressed info to server with needed data
function pressDiv (currDiv, index) {
    const data = {
        divNum: index,
        divText: currDiv.innerText
    }
    socket.send(JSON.stringify(data))
}