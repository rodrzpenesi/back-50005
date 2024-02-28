import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products"

const productShema = mongoose.Schema({
    title:{
        type: String,
        require:true
    },
    status:{
        type: Boolean,
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
productShema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productsCollection, productShema)