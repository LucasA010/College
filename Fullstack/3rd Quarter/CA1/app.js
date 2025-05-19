import express from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import connectMongodbSession from "connect-mongodb-session"
import session from "express-session";


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

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);    
})