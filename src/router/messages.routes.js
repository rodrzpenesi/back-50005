import {Router} from 'express'
import { messagesModel } from '../models/messages.model.js'

const messageRoutes = Router();

messageRoutes.get("/", async (req, res)=>{
    try{
        const messages = await messagesModel.find();
        res.send({messages})
        }catch{
        console.log(error)
    }
})

messageRoutes.post("/", async (req, res) =>{
    try {
        const newMessage = req.body;
        const added = await messagesModel.create(newMessage)
        res.status(201).json({message:'message Add'})
    } catch (error) {
        res.status(404)
    }
})
export default messageRoutes;