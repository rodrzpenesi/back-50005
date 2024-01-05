import { Router } from 'express';
import ProductManager from '../ProductManager.js'

const productManager = new ProductManager('./src/handsOnLab/src/Products.json');
const viewsRoutes = Router();

viewsRoutes.get('/', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render("home", {
        title: "home",
        products: allProducts
    })
});


export default viewsRoutes;