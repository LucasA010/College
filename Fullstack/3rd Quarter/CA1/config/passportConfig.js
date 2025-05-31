import passport from "passport";
import LocalStrategy from "passport-local"
import {User} from "../schema.js"

passport.serializeUser(User.serializeUser()); // store ID in session
passport.deserializeUser(User.deserializeUser()); // fetches user from DB


passport.use(new LocalStrategy.Strategy(User.authenticate())); // creates a passport Local Strategy
 

export default passport;