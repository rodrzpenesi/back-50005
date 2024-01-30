import {Router} from 'express'
import { userModel } from '../models/users.model.js'

const userRoutes = Router();

userRoutes.get("/", async (req, res)=>{
    try{
        const users = await userModel.find();
        res.send({users})
        }catch{
        console.log(error404)
    }
})

userRoutes.post("/", async (req, res) =>{
    try {
        const newProduct = req.body;
        const added = await userModel.create(newProduct)
        res.status(201).json({message:'Product Add'})
    } catch (error) {
        res.status(404)
    }
})
userRoutes.get("/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        const product = await userModel.findOne({_id:id})
        res.send(product)
    } catch (error) {
        console.log(error)
    }
})
userRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userDeleted = await userModel.deleteOne({_id: id});
        if(userDeleted.deletedCount > 0){
            return res.send({message: 'User deleted'});}
    } catch (error) {
        console.log(error)
    }
})
userRoutes.put("/:id", async (req, res) =>{
    const {id} = req.params;
    const productToUpdate = req.body
    try {
        const update = await userModel.updateOne({_id: id}, productToUpdate);
        if(update.modifiedCount > 0){
            return res.send({message: 'Product updated'});
        }
        res.status(404).json({message: 'Product not found'});}
    catch(error){
        console.log(error)
    }
})

export default userRoutes;