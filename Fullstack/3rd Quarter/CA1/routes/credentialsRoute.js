import express from "express";
import {User} from "../schema.js";
import passport from "../config/passportConfig.js";
const rules = "rules here";

const router = express.Router();

router.get("/register", (req, res) => { // sending regestering page
    res.render("register.ejs")
})

router.post("/register", (req, res) => { // creating account
    User.register(new User ({
        username: req.body.username,
        email: req.body.email
        }), 
        req.body.password, //define password hashed and salted
        (error, user) => {
            if (error) console.log(error + " -> something went wrong with User creation");
            console.log(`User ${req.body.username} created`);
            passport.authenticate("local", 
                {failureRedirect: "/login"})  
                (req, res, () => {
                res.render("home.ejs", {rules});
                })
    })
})

router.get("/login", (req, res) => {  //render login page unless already autenticated
    if (req.isAuthenticated()) {
        res.render("home.ejs");
        return;
    }
    res.render("login.ejs")
})

router.post("/login", //render board unless not autenticated, the sent to registration
    passport.authenticate("local", {failureRedirect:"/register"}) 
    , (req, res) => {
    res.render("home.ejs", {rules})
})

export default router;