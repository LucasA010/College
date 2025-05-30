import passport from "passport";
import LocalStrategy from "passport-local"
import {User} from "../schema.js"

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy.Strategy(User.authenticate()));
 
// const customFields = { // custom fields for passport 
//     usernameTest: "user",
//     passwordTest: "senha"
//  }


// //  manual autent, replace after with passport method
// const verifyCallback = (username, password, done) => {
    
//     User.findOne({username:username})
//         .then((user) => {
//             if(!user) {return done(null/*no issued found */, false/*no users found */)}             
//             const isValid = validPassword(password, user.hash, user.salt);

//             if (isValid) {
//                 return done(null, user)
//             } else {
//                 return done(null, false)
//             }
//         })
//         .catch((err) => {
//             done(err)
//         })

        
    
// }

// // creating ner strategy
// const strategy = new LocalStrategy.Strategy();

// passport.use(strategy);

export default passport;