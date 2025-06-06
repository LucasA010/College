// express
import express from "express";
import bodyParser from "body-parser";

import mongoose, { set } from "mongoose";
import connectMongodbSession from "connect-mongodb-session"
import session from "express-session";
import {WebSocketServer, WebSocket} from "ws";
import passport from "./config/passportConfig.js";
import url from "url";

import credentialRouter from "./routes/credentialsRoute.js"

const PORT = 3000;
const app = express();


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

// ws Server
const wsServer = new WebSocketServer({noServer:true});

// initial handshake with user
httpServer.on("upgrade", async (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request);
        console.log("Connection Handshake sucessfull");
    })
})

const clients = new Map();
let moves = [];

function broadcastPlayers() {
    const usernames = Array.from(clients.values());
    const data = JSON.stringify({
        method: "updatePlayers",
        players: usernames
    })

    clients.forEach((_, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
    
}
 
// response when user sends data
wsServer.on("connection", (ws, req) => {
    const query = url.parse(req.url, true).query;
    const username = query.username;

    if (!username) return ws.close();
    console.log(`${username} connected`)

    clients.set(ws, username);

    broadcastPlayers(); // adding to player list on open

    ws.on("message", (msg) => {
        let parsedMsg; //initialising parsed variabl
        // e
        
        try { //trying to parse message
            parsedMsg = JSON.parse(msg);
        } catch (e) {
            console.log(e+" -> Parsed msg went wrong")
        }

        // Switch statement to simulate 'functions'
        // depending on what method is sent
        switch(parsedMsg.method) {
            
            case "logMove":
                moves.push(parsedMsg)
                console.log(moves)
                break;
        }
    })

    ws.on("close", (event) => {
        console.log(`${username} disconnected`)
        clients.delete(ws)
        broadcastPlayers(); // taking player from list when disconnects
    })
 
    ws.on("error", (err) => {
        console.log(err+" -> Something went wrong with server connection")
    })
})