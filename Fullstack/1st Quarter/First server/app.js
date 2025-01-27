const express = require("express");
const PORT = 8000;
const rootDir = `C:\\Users\\lucru\\Documents\\College\\Fullstack\\First server\\`;

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let name;

let numVisitors = 0;

app.get("/", (request, response) => {
    numVisitors++;
    response.send("Welcome to the server! You're visitor number: "+numVisitors);
    console.log(numVisitors);
    response.sendFile(`${rootDir}index.html`);
});

app.post("/name", (request, response) => {
    console.log(request.body);
    console.log(request.body.name);
    name = request.body.name;
    response.redirect("/welcome");
})

app.get("/welcome", (request, response) => {
    response.send(`Welcome ${name}`);
})

app.listen(PORT, () => {
    console.log(`${new Date()}: Listening at localhost:${PORT}`) 
});