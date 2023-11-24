class ProductManager {
    
    constructor(){
        this.productos = [];
    }
    static id = 0
    
    getProducts(){
        return this.productos;
    }
    addProduct (title,descripcion,price,thumbnail,stock){
        ProductManager.id++
        const newProduct = {
            code: ProductManager.id,
            title,
            descripcion,
            price,
            thumbnail,
            stock,
        }
        this.productos.push(newProduct);
    }
    getProductById(idProduct){
        const productosObtenidos= productManager.getProducts();
        const IdProduct = productosObtenidos.find(productos=> productos.code == idProduct)
        if (!IdProduct){
            console.log("Not Found")
        }else {
            console.log("Producto encontrado con exito")
        }}
}
const productManager = new ProductManager();

productManager.addProduct("crema 200g", "doble crema", 469, "www.tregar.com/crema", 180)
productManager.addProduct("crema 300g", "doble crema", 810, "www.tregar.com/crema", 20)
productManager.getProductById(2);
const products = productManager.getProducts();
console.log(products)
