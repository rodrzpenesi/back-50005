import { Router } from 'express';
import ProductManager from '../Dao/FileSystem/ProductManager.js'
import { ProductMongoManager } from '../Dao/DB/ProductsMongoManager.js';
import { CartMongoManager } from '../Dao/DB/CartMongoManager.js';
import {checkAuth, checkExistingUser} from '../middlewares/auth.js'
import { authorization } from '../utils/authorization.js';

const productManager = new ProductManager('./src/Products.json');
const productMongoManager = new ProductMongoManager();
const viewsRoutes = Router();

// viewsRoutes.get('/', async (req, res) => {
//     let allProducts = await productManager.getProducts();
//     res.render("home", {
//         title: "home",
//         products: allProducts
//     })
// });
viewsRoutes.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productManager.getProducts();
    res.render("realTimeProducts", {
        title: "realTimeProducts",
        products: allProducts
    })
});
viewsRoutes.get('/chat', async (req, res) => {
    res.render("chat", {
        title: "chat",
    })
});
viewsRoutes.get('/api/products', async (req, res) => {
        const {page} = req.query;
        const products = await productMongoManager.getProducts1(10, page);
        console.log({products});
        res.render('products', products);
});
viewsRoutes.get('/api/carts', async (req, res) => {
    
    const carts = new CartMongoManager()
        const productsInCart = await carts.getCarts();
        const {products} = productsInCart
        console.log(productsInCart)
        res.render('carts', {productsInCart});

});
;
viewsRoutes.get('/api/carts/:id', async (req, res) => {
    
        const carts = new CartMongoManager()
        const {id} = req.params
        const Cart = await carts.getProductsCartById(id);
        console.log(Cart)
        res.render('carts', {Cart});

});
// viewsRoutes.get('/index', checkAuth, (req, res) => {
//     const {user} = req.session;
//     res.render('index', user);
// });

// viewsRoutes.get('/login', checkExistingUser, (req, res) => {
//     res.render('login');
// });

// viewsRoutes.get('/register', checkExistingUser, (req, res) => {
//     res.render('register');
// })
viewsRoutes.get('/restore-password', checkExistingUser, (req, res) => {
    res.render('restore.password');
})
viewsRoutes.get('/', checkAuth, (req, res) => {
    const {user} = req.session;
    res.render('index', user);
});

viewsRoutes.get('/login', checkExistingUser, (req, res) => {
    res.render('login');
});

viewsRoutes.get('/register', checkExistingUser, (req, res) => {
    res.render('register');
})
viewsRoutes.get('/current', (req, res) => {
    res.json({ user: req.session.user });
});

export default viewsRoutes;