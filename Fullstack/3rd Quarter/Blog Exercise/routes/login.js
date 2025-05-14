import express from "express";
import passport from "../config/passportConfig.js";

const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) res.redirect("/?pagenum=1");
    res.render("login.ejs");
});

router.post('/', passport.authenticate('local', {failureRedirect: "/login"}), (req, res) => {
    res.redirect("/?pagenum=1");
})

export default router;