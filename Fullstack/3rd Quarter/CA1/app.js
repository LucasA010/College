// express
import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import connectMongodbSession from "connect-mongodb-session"
import session from "express-session";
import {WebSocketServer, WebSocket} from "ws";
import {User} from "./schema.js"
import passport from "./config/passportConfig.js";

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


const sessionStore = new MongoDBStore ({ // seetin up mongo session 
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

const playerList = [];

// response when user sends data
wsServer.on("connection", (ws) => {
    
})