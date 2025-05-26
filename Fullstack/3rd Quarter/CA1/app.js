import express from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import connectMongodbSession from "connect-mongodb-session"
import session from "express-session";
import {WebSocketServer, WebSocket} from "ws";


const MongoDBStore = connectMongodbSession(session);

const PORT = 3000;
const app = express();

// express setup
app.use(bodyParser.urlencoded({ extended:true }))
app.set("view engine", "ejs");
app.use(express.static("public"));

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/mayhemDB")
.then(conn => console.log(conn.models));

// autentication and cookies
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore ({
        uri: "mongodb://127.0.0.1:27017/mayhemDB",
        collection: "sessions"
    }, err => console.log(err))
}))

app.get("/game", (req, res) => {
    res.render("board.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

// http server
const httpServer = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);    
})

// ws Server
const wsServer = new WebSocketServer({noServer:true});

// initial handshake with user
httpServer.on("upgrade", async (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request);
        console.log("Connection Handshake sucessfull");
    })
})

// response when user sends data
wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString()); // convert data to readable data
        console.log(parsedMessage.newMessage);
        console.log(parsedMessage.divText);
        
        wsServer.clients.forEach( client => { // loop to send reveiced data to all connected
            if (client.readyState == WebSocket.OPEN) {
                console.log("sending data")
                client.send(JSON.stringify({
                    divNum: parsedMessage.divNum,
                    divText: parsedMessage.divText
                }))
            }
        })
    })
})