import passport from "passport";
import {User} from "../schemas.js";
import LocalStrategy from "passport-local";


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const LocalStrategy = require("passport-local").Strategy;
passport.use(new LocalStrategy.Strategy(User.authenticate()));

export default passport;