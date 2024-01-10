import express from 'express';
import handlebars from 'express-handlebars'
import viewsRoutes from './router/views.routes.js';
import ProductManager from './ProductManager.js';
import router from './router/product.routes.js';
import CartRouter from './router/carts.routes.js';
import { Server } from "socket.io";

const productManager = new ProductManager('./src/Products.json');
const app = express();
const PORT = 8080;


app.use(express.static("public"));
app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views')
app.set('view engine', 'handlebars');;
app.use('/', viewsRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use("/api/products", router)
app.use("/api/carts", CartRouter)

app.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(products)
    let productsFilter = products.slice(0, limit);
    res.send(productsFilter)
})
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

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});
const socketServer = new Server(httpServer);


socketServer.on('connection', (socket) => {
    console.log('Nuevo client conectado')});