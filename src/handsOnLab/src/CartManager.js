import { promises as fs } from "fs";
import ProductManager from './ProductManager.js'

const productAll= new ProductManager(('./src/handsOnLab/src/Products.json'));

class CartManager{
    constructor(path){
        this.path = path;
    }
    readCarts = async () =>{
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
}
    writeCarts = async (cart) => {
        await fs.writeFile(this.path,JSON.stringify(cart));
}   
addCarts = async () => {
        let cartsOld = await this.readCarts();
        let  id = nanoid(3);
        let cartsConcat = [{id : id, products : []}, ... cartsOld]
        await this.writeCarts(cartsConcat);
        return "Producto agregado al carrovich"
}
exist = async (id) => {
    let carts = await this.readCarts()
    return  carts.find(cart => cart.id == id)
}
getCartById = async (id) => {
    let cartById = await this.exist(id)
    if (!cartById) return "cart no encontrado"
    return cartById
}
addProductInCart = async (cartId, productId) =>{
    let cartById = await this.exist(cartId)
    if (!cartById) return "cart no encontrado"
    let productById = await productAll.exist(productId)
    if (!cartById) return "Producto no encontrado"
    let cartsAll = await this.readCarts()
    let cartFilter = cartsAll.filter((cart) => cart.id != cartId);
    if(cartById.products.some((prod) => prod.id === productId)){
        let moreProductInCart = cartById.products.find((prod) => prod.id === productId);
        moreProductInCart.cantidad++
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return 'Producto sumado al carrovich'
    }
    cartById.products.push({id:productById.id, cantidad: 1})
    let cartsConcat = [cartById, ...cartFilter]
    await this.writeCarts(cartsConcat)
        return 'Producto agregado al carrovich'
}
}
export default CartManager;
