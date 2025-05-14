import express from "express";
import {WebSocketServer, WebSocket} from "ws";

// Express middleware
import bodyParser from "body-parser";

// Authentication and DB connection
import session from "express-session";
import passport from "./config/passportConfig.js";
import mongoose from "mongoose";
import connectMongodbSession from "connect-mongodb-session";
const MongoDBStore = connectMongodbSession(session);

// Routes
import loginroutes from "./routes/login.js";
import createAccountRoutes from "./routes/create-accounts.js";
import blogPostsRoutes from "./routes/blog-posts.js";

// Config
import {PORT} from "./config/config.js";


// Express config start
// Express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view-engine", "ejs");

// DB Setup
mongoose.connect("mongodb://127.0.0.1:27017/blogExercise")
.then(conn => console.log(conn.models));

// Manage authentication and cookies
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        mongURL: "mongodb://127.0.0.1:27017",
        collection: "blogExercise"
    }, err => console.log(err))
}));

app.use(passport.initialize());
app.use(passport.session());
// Express config end

function makeDummyPosts(numPosts, blogPosts) {
    for (let i=0; i<numPosts; i++) {
        blogPosts.push({
            author: "Author: " + i,
            title: "test" + i,
            content: "Text",
            datetime: new Date().toLocaleString()
        })
    }
}
// makeDummyPosts(98, blogPosts);

app.get("/chat", (req, res) => {
    res.render("chat.ejs");
})
app.use("/", blogPostsRoutes);
app.use ("/create-accounts", createAccountRoutes);
app.use("/login", loginroutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);  
})
const wsServer = new WebSocketServer({noServer: true});

httpServer.on("upgrade", async (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit("connection", ws, request);
    })
})

wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message);
        console.log(message.toLocaleString())
        console.log(JSON.parse(message.toLocaleString()))
        console.log(JSON.parse(message.toLocaleString()).newMessage)
        
        // Reply to the client that sent the message
        // ws.send(message.toLocaleString())

        // Reply to all connected clients
        wsServer.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) client.send(message.toLocaleString());
        })
    })
})

