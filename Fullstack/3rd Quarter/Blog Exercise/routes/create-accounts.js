import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/?pagenum=1");
        return;
    }
    res.render("create-account.ejs");
});

router.post("/", (req, res) => {
    console.log(req.body);
    if (req.isAuthenticated()) res.redirect("/?pagenum=1");
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, (error, user) => {
        if (error) console.log(error);
        console.log("Created");
        passport.authenticate("local", {failureRedirect: "/login2"})  (req, res, () => {
            res.redirect("/?pagenum=1");
        })
        })
});

export default router;