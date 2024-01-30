import { Router } from "express";
import CartManager from "../Dao/FileSystem/CartManager.js"


const carts = new CartManager(('./src/Carts.json'));;
const CartRouter = Router()

CartRouter.post("/", async (req, res) =>{
    res.send(await carts.addCarts())
})

CartRouter.get('/', async (req, res) =>{
    res.send(await carts.readCarts())
})

CartRouter.get('/:id', async (req, res) =>{
    res.send(await carts.getCartById(req.params.id))
})
CartRouter.post('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(cartId, productId))
})
export default CartRouter