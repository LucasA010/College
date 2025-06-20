// express
import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import connectMongodbSession from "connect-mongodb-session"
import session from "express-session";
import {WebSocket} from "ws";
import passport from "./config/passportConfig.js";
import url from "url";
import { setupWebSocket } from "./websocket/setup.js";

import credentialRouter from "./routes/credentialsRoute.js"
import { PORT} from "./config/config.js";
import { Room } from "./models/Room.js";

const app = express();
let nextRoom = 1;

const MongoDBStore = connectMongodbSession(session);



// express setup
app.use(bodyParser.urlencoded({ extended:true }))
app.set("view engine", "ejs");
app.use(express.static("public"));

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/mayhemDB")
.then(conn => console.log(conn.models));


const sessionStore = new MongoDBStore ({ // seeting up mongo session 
        uri: "mongodb://127.0.0.1:27017/mayhemDB",
        collection: "sessions"
}, err => {if(err) console.log(err+" -> something went wrong setting up session DB")})


// autentication and cookies
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

// passport config
app.use(passport.initialize()) // starts passport
app.use(passport.session()) //link passport with session

app.get('/api/me', (req, res) => { // method to get username in client side 
  if (req.isAuthenticated()) {
    res.json({
      username: req.user.username,
    });
  } else {
    console.log("User not autenticated");
  }
});


app.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login")
        return;
    }
    console.log(req.user.username)
    res.render("home.ejs")
})

app.get("/game", (req, res) => {
    res.render("board.ejs")
})

// credentials handling
app.get("/register", credentialRouter);
app.post("/register", credentialRouter);
app.get("/login", credentialRouter);
app.post("/login", credentialRouter);

// http server
const httpServer = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);    
})

// ws Server/ initial handshake
const wsServer = setupWebSocket(httpServer);
const rooms = new Map();


function broadcastPlayers(room) {
    const usernames = Array.from(room.players.values());
    const data = JSON.stringify({
        method: "updatePlayers",
        players: usernames,
        room
    })

    room.players.forEach((_, ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
}

function broadcast(room, data) {
    room.players.forEach((_, ws) => {
        if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
    }
    })    
}

function startGame(ws) {
    const room = rooms.get(ws.roomID);
    if (!room) return;

    room.playersReady++;

    if (room.playersReady === room.players.size) {
        console.log(`Room "${room.roomID}: all players ready, starting game."`)

        const data = JSON.stringify({
            method: "gameStart",
            board: room.boardState,
        });

        room.players.forEach((_,  playerWs) => {
            if (playerWs.readyState === WebSocket.OPEN) {
                playerWs.send(data);
            }
        })
    }
}
 
// response when user sends data
wsServer.on("connection", (ws, req) => {
    const query = url.parse(req.url, true).query;
    const username = query.username;
    let room = null;

    if (!username) return ws.close();
    console.log(`${username} connected`)

   for (let [id, r] of rooms.entries()) {
        if (!r.isFull()) {
            room = r;
            break;
        }
    }

    if (!room) { // creating room
        room = new Room(nextRoom++);
        rooms.set(room.roomID, room);
        console.log(`Room "${room.roomID}" created`)
    }

    room.players.set(ws, {
        username,
        monstersNum: 10,
        monstersOnBoard: 0
    });
    ws.roomID = room.roomID;
    console.log(`${username} joined room ${room.roomID}`)

    broadcastPlayers(room);

    ws.on("message", (msg) => {
        let parsedMsg; //initialising parsed variable
        const room = rooms.get(ws.roomID);
        const player = room.players.get(ws);
        
        try { //trying to parse message
            parsedMsg = JSON.parse(msg);
        } catch (e) {
            console.log(e+" -> Parsed msg went wrong")
        }

        // Switch statement to simulate 'functions'
        // depending on what method is sent
        switch(parsedMsg.method) {
            
            case "logMove":
                room.movesLog.push({
                    fromIndex: parsedMsg.data.from,
                    toIndex: parsedMsg.data.to
                });
                console.log(room.movesLog)
                break;
            
            case "playerReady":
                startGame(ws);
                break;

            
        }
    })

    ws.on("close", (event) => {
        console.log(`${username} disconnected`)
        room.players.delete(ws)
        broadcastPlayers(room); // taking player from list when disconnects
    })
 
    ws.on("error", (err) => {
        console.log(err+" -> Something went wrong with server connection")
    })
})