import { promises } from "fs";
import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getLength() {
    const products = await this.getProducts()
    return products.length
}
  async addProduct(product) {
    ProductManager.id++
    const products = await this.getProducts();
    const { title, description, price, thumbnail, code, stock,} = product;
    const newProduct = {
      id: await this.getLength() + 1,
      status: true,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
  }

    const producto = products.find(p => p.title === title);
    if(producto){
        return console.log('Producto Ya Cargado');
    }
    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
        return console.log('Producto incompleto');
    }
    products.push(newProduct);
    // console.log(products);
    await promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
  }

  async getProducts() {
    try {
      const datos = await promises.readFile(this.path, "utf-8");
      const products = JSON.parse(datos);
      return products;
    } catch (error) {
      console.log("No hay datos");
      return [];
    }
  }
  async exist(id) {
    let products = await this.getProducts()
    return  products.find(prod => prod.id == id)
  }
  async getProductById(id) {
    let productById = await this.exist(id)
    if (!productById) console.log ("Producto no encontrado")
    console.log(productById)
    return productById
  }
  async updateProduct(id, productToUpdate){
    const products = await this.getProducts()
    const updatedProducts = products.map(product => {
        if(product.id === +id){
          console.log("Producto Actualizado")
            return {
                ...product,
                ...productToUpdate,
                id
            }
        }
        return product
      }) 
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts), 'utf-8')
    }
  async deletProducts(id) {
    let products = await this.getProducts();
    let existProduct = products.some(prod => prod.id == id)
    if (existProduct) {
        let filterProducts = products.filter(prod => prod.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(filterProducts), 'utf-8')
        console.log("Producto eliminado")
        return "Producto eliminado"}
    return "Producto a eliminar inexistente"    
    }
}
const test = async () => {
    const productManager = new ProductManager('./src/handsOnLab/src/Products.json');
    let data = await productManager.getProducts();

    const product1 = {
        title: 'Yogur con Frutas de Anana',
        description: 'Yogur muy cremoso y suave',
        price: 310,
        thumbnail: 'www.tregar.com/#',
        code: 140,
        stock: 24,
    }
    const product2 = {
        title: 'Crema 350g',
        description: 'Doble crema',
        price: 770,
        thumbnail: 'www.tregar.com/#',
        code: 122,
        stock: 48,
    }
    const product3 = {
        title: 'Bebible Frutilla 900ml',
        description: 'Yogurt Bebible',
        price: 610,
        thumbnail: 'www.tregar.com/#',
        code: 145,
        stock: 28,
    }
    const product4 = {
        title: 'Bebible Vainilla 900ml',
        description: 'Yogurt Bebible',
        price: 610,
        thumbnail: 'www.tregar.com/#',
        code: 144,
        stock: 28,
    }
    const product5 = {
        title: 'Bebible Vainilla 900ml',
        description: 'Yogurt Bebible',
        thumbnail: 'www.tregar.com/#',
        code: 144,
        stock: 28,
    }

    // await productManager.addProduct(product1);
    // await productManager.addProduct(product2);
    // await productManager.addProduct(product3);
    // await productManager.addProduct(product4);
    // await productManager.addProduct(product5);
    // await productManager.getProductById(3)
    // await productManager.deletProducts(4)
    // await productManager.updateProduct(4, {title:"Yogurt Bebible Banana UPDATE"})

  
  }

// test();

export default ProductManager;