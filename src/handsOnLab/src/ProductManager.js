import { promises as fs } from "fs";


class ProductManager{
    constructor(){
        this.path = "./src/handsOnLab/src/products.json"}

    static id = 0

    readProducts = async () =>{
        let products = await fs.readFile(this.path, "utf-8")
        console.log(products)
        return JSON.parse(products)
    
}
    exist = async (id) => {
        let products = await this.readProducts()
        return  products.find(prod => prod.id == id)
}
    writeProducts = async (product) => {
        await fs.writeFile(this.path,JSON.stringify(product));
    }

    addProducts = async (product) =>{
        ProductManager.id++
        let productsOld = await this.readProducts()
        product.id = ProductManager.id;
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Productos Agregado"
    }
    getProduct = async () => {
        return await this.readProducts()
    }

    getProductById = async (id) => {
        let productById = await this.exist(id)
        if (!productById) return "Producto no encontrado"
        return productById
    }

    updateProducts = async (id, product) => {
        let productById = await this.exist(id)
        if (!productById) return "Producto no encontrado"
        await this.deletProducts(id);
        let productOld = await this.readProducts();
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products);
        return "Producto actualizado con exito"
    }
    deletProducts = async (id) => {
        let products = await this.readProducts();
        let existProduct = products.some(prod => prod.id == id)
        if (existProduct) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"}
        return "Producto a eliminar inexistente"    
    }

}

export default ProductManager
    const productManager = new ProductManager();
    productManager.readProducts();
// productManager.addProducts({
//     title: 'Crema 350g',
//     description: 'Doble crema',
//     price: 970,
//     thumbnail: 'https://www.tregar.com.ar/wp-content/uploads/2021/08/crema-dolecrema-350cc-Tregar.jpg',
//     code: '126',
//     stock: 12 
// })