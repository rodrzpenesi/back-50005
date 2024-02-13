import {Router} from 'express'
import { productModel } from '../models/products.model.js'

const productRoutes = Router();

productRoutes.get("/", async (req, res)=>{
    try{
        const {limit = 10, page = 1, query = '', sort = ''} = req.query
        const [code, value] = query.split(':');
        const products = await productModel.paginate({[code]: value},{
            limit,
            page,
            sort : sort ? {precio:sort} : {},
        });
        res.send(products)
        }catch(error){
        console.log(error)
    }
})

productRoutes.post("/", async (req, res) =>{
    try {
        const newProduct = req.body;
        const added = await productModel.create(newProduct)
        res.status(201).json({message:'Product Add'})
    } catch (error) {
        res.status(404)
    }
})
productRoutes.get("/:id", async (req, res)=>{
    const {id} = req.params;
    try {
        const product = await productModel.findOne({_id:id})
        res.send(product)
    } catch (error) {
        console.log(error)
    }
})
productRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userDeleted = await productModel.deleteOne({_id: id});
        if(userDeleted.deletedCount > 0){
            return res.send({message: 'User deleted'});}
    } catch (error) {
        console.log(error)
    }
})
productRoutes.put("/:id", async (req, res) =>{
    const {id} = req.params;
    const productToUpdate = req.body
    try {
        const update = await productModel.updateOne({_id: id}, productToUpdate);
        if(update.modifiedCount > 0){
            return res.send({message: 'Product updated'});
        }
        res.status(404).json({message: 'Product not found'});}
    catch(error){
        console.log(error)
    }
})

export default productRoutes;