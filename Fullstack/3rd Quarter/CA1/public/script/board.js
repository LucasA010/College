const socket = new WebSocket("ws://localhost:3000"); // change from hard code later
const divList = document.getElementsByTagName("div");

socket.onopen = () => {
    console.log("server opened")
    socket.send(JSON.stringify({newMessage: "Client says hi!"}))
}

socket.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    console.log(parsedData.divText+" this is the div text")
    console.log(parsedData.divnum+"this is the div num")
    divList[parsedData.divNum].innerText = parsedData.divText;

}

for (let i=0; i<divList.length; i++) {
    divList[i].addEventListener("click", () => {
        divList[i].innerText = "pressed";
        currDiv = divList[i];
        pressDiv(currDiv, i);
    })
}

function pressDiv (currDiv, index) {
    const data = {
        divNum: index,
        divText: currDiv.innerText
    }
    socket.send(JSON.stringify(data))
}