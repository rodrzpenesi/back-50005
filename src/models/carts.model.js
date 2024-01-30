import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsShema = mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    cuantity:{
        type: Number
    },
    img:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true,
    }
})

export const cartsModel = mongoose.model(cartsCollection, cartsShema)