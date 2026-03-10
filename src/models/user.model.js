import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique: [true, "Username already taken"],
        require: true
    },
    email : {
        type : String,
        unique: [true, "Email already taken"],
        require: true
    },
    username : {
        type : String,
        require: true
    }
})

const userModel = mongoose.model("users",userSchema)

export default userModel