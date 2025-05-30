import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String
})

userSchema.plugin(passportLocalMongoose) //hash and salt

const User = mongoose.model("User", userSchema)

export {User};