import { Router } from "express";
import ProductManager from "../Dao/FileSystem/ProductManager.js"

const product = new ProductManager(('./src/Products.json'));

const router = Router();

router.get("/", async (req, res) => {
    const products = await product.getProducts();
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(products)
    let productsFilter = products.slice(0, limit);
    res.send(productsFilter)
})
router.get("/:id", async (req, res) => {
    const products = await product.getProducts();
    try{
        const {id} = req.params;
        const product = products.find(p => p.id == parseInt(id) )
        if(!product){
            res.send({error: 'product not found'});
        }res.send(product);
    
    }catch(error) {
        console.log(error);
    }

})
router.post("/", async (req, res) =>{
    let newProduct = req.body
    await product.addProduct(newProduct)
    res.send({message: 'product added'});
})
router.put("/:id" , async (req, res) => {
    let {id} = req.params;
    let updatedProducts = req.body;
    await product.updateProduct(id, updatedProducts)
    
    res.send({message: 'product update'});
})
router.delete("/:id" , async (req, res) => {
    let {id} = req.params;
    await product.deletProducts(id)
    res.send({message: 'product delet'});
})



export default router;