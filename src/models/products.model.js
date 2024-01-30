import mongoose from "mongoose";

const productsCollection = "products"

const productShema = mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true,
    },
    thumbnail:{
        type: String
    },
    code:{
        type: String,
        require:true,
    },
    stock:{
        type:Number,
        require:true,
    }
})

export const productModel = mongoose.model(productsCollection, productShema)