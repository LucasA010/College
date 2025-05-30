import express from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import connectMongodbSession from "connect-mongodb-session"
import session from "express-session";
import {WebSocketServer, WebSocket} from "ws";
import {User} from "./schema.js"
import passport from "./config/passportConfig.js";

const PORT = 3000;
const app = express();

// const Schema = mongoose.Schema;
const MongoDBStore = connectMongodbSession(session);
// const userSchema = new Schema({
//     username: String,
//     email: String
// })

// userSchema.plugin(passportLocalMongoose) //hash and salt

// const User = mongoose.model("User", userSchema)


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

// passport.use(User.createStrategy()); // creates a passport Local Strategy
// passport.serializeUser(User.serializeUser()); // store ID in session
// passport.deserializeUser(User.deserializeUser()); // fetches user from DB

app.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login")
        return;
    }
    res.render("home.ejs")
})

app.get("/game", (req, res) => {
    res.render("board.ejs")
})

app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.post("/register", (req, res) => {
    // if (!req.isAuthenticated()) {
    //     res.redirect("/login")
    //     return;
    // }
    console.log("inside register")
    User.register(new User ({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, (error, user) => {
            if (error) console.log(error);
            console.log("Created");
            passport.authenticate("local", {failureRedirect: "/login"})  (req, res, () => {
                res.render("home.ejs");
            })
            })
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", 
    passport.authenticate("local", {failureRedirect:"/register"}) 
    , (req, res) => {
    res.render("board.ejs")
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

const playerList = [];

// response when user sends data
wsServer.on("connection", (ws) => {
    
})