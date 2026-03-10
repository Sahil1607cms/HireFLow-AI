import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        require: [true, "Token is required to add it in blacklist"]
    }
},{
    timestamps:true
})

const blacklistModel = mongoose.model("blacklist", blacklistSchema)
export default blacklistModel