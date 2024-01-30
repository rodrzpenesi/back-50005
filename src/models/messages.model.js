import mongoose from "mongoose";

const messagesCollection = "messages"

const messagesShema = mongoose.Schema({
    email:{
        type: String,
        require:true
    },
    messages:{
        type: String,
        require: true
    }
})

export const messagesModel = mongoose.model(messagesCollection, messagesShema)