import express from 'express';
import handlebars from 'express-handlebars'
import viewsRoutes from './router/views.routes.js';
import ProductManager from './Dao/FileSystem/ProductManager.js';
import router from './router/product.routes.js';
import CartRouter from './router/carts.routes.js';
import { Server } from "socket.io";
import mongoose from 'mongoose';
import productRoutes from './router/products.routes.js';
import messagesRoutes from './router/messages.routes.js';

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
mongoose.connect("mongodb+srv://rodrzpenesi:faustoisidro@cluster0.pcy5jzv.mongodb.net/ecommerce")
// app.use("/api/products", router)
// app.use("/api/carts", CartRouter)
// app.get("/products", async (req, res) => {
//     const products = await productManager.getProducts();
//     let limit = parseInt(req.query.limit);
//     if (!limit) return res.send(products)
//     let productsFilter = products.slice(0, limit);
//     res.send(productsFilter)
// })
// app.get("/products/:id", async (req, res) =>{
//     const products = await productManager.getProducts();
//     try{
//         const {id} = req.params;
//         const product = products.find(p => p.id === parseInt(id) )
//         if(!product){
//             res.send({error: 'product not found'});
//         }res.send(product);
    
//     }catch(error) {
//         console.log(error);
//     }

// })
app.use("/api/chat", messagesRoutes)
app.use("/api/products", productRoutes)





const httpServer = app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});
const io = new Server(httpServer);

const messages = [];

io.on('connection', socket => {
    console.log('Nuevo client conectado')
    socket.on('message', data =>{
        messages.push(data);
        io.emit('messageLogs', messages)
    })
});