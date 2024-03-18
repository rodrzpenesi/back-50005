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
import { messagesModel } from './models/messages.model.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import FileStore from 'session-file-store';
import sessionRoutes from './router/session.routes.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';



// const productManager = new ProductManager('./src/Products.json');
const PORT = 8080;
const fileStore = FileStore(session);
const app = express();


app.use(session({
    secret: 'C0d3rh0us3',
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://rodrzpenesi:faustoisidro@cluster0.pcy5jzv.mongodb.net/ecommerce',
    }),
    resave: true,
    saveUninitialized: true
}));
mongoose.connect("mongodb+srv://rodrzpenesi:faustoisidro@cluster0.pcy5jzv.mongodb.net/ecommerce")

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }});

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));
app.engine('handlebars',hbs.engine) 
app.set('views', 'src/views')
app.set('view engine', 'handlebars');;
app.use("/api/session", sessionRoutes)
app.use('/', viewsRoutes);
app.use("/api/carts", CartRouter)
app.use("/api/chat", messagesRoutes)
app.use("/api/products", productRoutes)
app.use(cookieParser("C0d3rh0us3"))



// app.get("/login", (req, res)=>{
//     const {userEmail, password} = req.query;
//     if(userEmail!=="gogopenesi"){
//         return res.status(401).send({messages:"user incorrect"})
//     }
//     req.session.user = userEmail;
//     req.session.password = password;
//     req.session.admin = true;
//     res.send({messages:"Logeao"})
// })
app.get("/logout", (req, res) =>{
    req.session.destroy(err=>{
        if(!err) res.send({messages:"logout"})
        else res.status(400).send({err});
    })
})

app.get("/setCookie" , (req, res)=>{
    res.cookie("coderCokie", "esto es una cokie" , {maxAge: 5000}).send({messages:"cokie seteadisima"})
})

app.engine(

    'handlebars',
    
    handlebars.engine({ runtimeOptions: { allowProtoPropertiesByDefault: true } })
    
    );
    
app.set('views', 'src/views');
    
app.set('view engine', 'handlebars');




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
        console.log(messages)
        const added = messagesModel.create(messages)
    })
});

