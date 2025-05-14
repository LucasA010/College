import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
})

// hash and salt passwords
userSchema.plugin(passportLocalMongoose);

// DB object
const User = mongoose.model("User", userSchema);

const blogPostSchema = new Schema({
    author: String,
    title: String,
    Content: String,
    datetime: Date
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export {User, BlogPost};