import mongoose from 'mongoose';

const userCollection = 'users';

const userShema = mongoose.Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    age:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

export const userModel = mongoose.model(userCollection, userShema);