class ProductManager {
    
    constructor(){
        this.productos = [];
    }
    static id = 0
    
    getProducts(){
        return this.productos;
    }
    addProduct (title ,descripcion ,price ,thumbnail ,code ,stock){
        ProductManager.id++
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].code == code) {
                console.error(`${code} es un código existente`);
                break;}
        }
        const newProduct = {
            id: ProductManager.id,
            title,
            descripcion,
            price,
            thumbnail,
            code,
            stock,
        }
        this.productos.push(newProduct);
    }
    getProductById(idProduct){
        const productosObtenidos= productManager.getProducts();
        const IdProduct = productosObtenidos.find(productos=> productos.id == idProduct)
        if (!IdProduct){
            console.log("Not Found 404")
        }else {
            console.log("Producto encontrado con exito")
        }}
}
const productManager = new ProductManager();

productManager.addProduct("crema 200g", "doble crema", 469, "www.tregar.com/crema", 132, 24)
productManager.addProduct("crema 350g", "doble crema", 810, "www.tregar.com/crema", 122, 24)
productManager.getProductById(4);
const products = productManager.getProducts();
console.log(products)
