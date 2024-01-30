import mongoose, { mongo } from "mongoose";

const userCollection = "users"

const userShema = mongoose.Schema({
    title:{
        type: String,
        require:true
    }
})

export const userModel = mongoose.model(userCollection, userShema)