import express from 'express';
import ProductManager from './ProductManager.js';
import router from './router/product.routes.js';

const productManager = new ProductManager('./src/handsOnLab/src/Products.json');
const app = express();


const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use("/api/products", router)

// app.get("/products", async (req, res) => {
//     const products = await productManager.getProducts();
//     let limit = parseInt(req.query.limit);
//     if (!limit) return res.send(products)
//     let productsFilter = products.slice(0, limit);
//     res.send(productsFilter)
// })
app.get("/products/:id", async (req, res) =>{
    const products = await productManager.getProducts();
    try{
        const {id} = req.params;
        const product = products.find(p => p.id === parseInt(id) )
        if(!product){
            res.send({error: 'product not found'});
        }res.send(product);
    
    }catch(error) {
        console.log(error);
    }

})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});