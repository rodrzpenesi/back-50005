import { Router } from "express";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword } from '../utils/bcrypt.js'
import passport from "passport";
import { generateToken } from "../config/jwt.config.js";


const sessionRoutes = Router();

// sessionRoutes.post('/register', async (req, res) => {
//     const { first_name, 
//             last_name, 
//             email, 
//             age, 
//             password } = req.body;
//     try {
//         const user = await userModel.create({
//             first_name, 
//             last_name, 
//             age, email, 
//             password : createHash(password)
//         });
//         req.session.user = user;
//         res.redirect('/index');
//     } catch (error) {
//         console.error(error);
//         res.status(400).send({error});
//     }
// });
sessionRoutes.post('/register', async (req, res) => {
    const { first_name, 
            last_name, 
            email, 
            age, 
            password } = req.body;
    const user = await userModel.findOne({email})
    if(user){
        return res.status(400).send({message:'user already exist'})
    }
    const newUser = {
        first_name, 
            last_name, 
            email, 
            age, 
            password: createHash(password)
    }
    await userModel.create(newUser)          
    const accessToken = generateToken(newUser);
    res.status(201).send({accessToken, message : 'created'})

});

// sessionRoutes.post('/login', async(req, res) => {
//     const {email, password} = req.body;
//     try {
//         const user = await userModel.findOne({email});
//         if(!user){
//             return res.status(404).json({message: 'User not found'});
//         }        
//         if(user.password !== password){
//             return res.status(401).send({message: 'Invalid credentials'});
//         }
//         req.session.user = user;
//         res.redirect('/');
//     } catch (error) {
//         res.status(400).send({error});
//     }
// });
sessionRoutes.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
    if(!user || !isValidPassword(user, password)){
        return res.status(401).send({message:'not authorized'})
    }
    const accessToken = generateToken(user);
    res.send({status:'success', accessToken})
});


sessionRoutes.post('/logout', async(req, res) => {
    try {
        req.session.destroy((err) => {
            if(err){
                return res.status(500).json({message: 'Logout failed'});
            }
        });
        res.send({redirect: 'http://localhost:8080/login'});
    } catch (error) {
        res.status(400).send({error});
    }
});
sessionRoutes.post("/restore-password", async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({message: "unauthorized"})
        }
        user.password = createHash(password)
        await user.save();
        res.send({message: "password update"})
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }

})  
sessionRoutes.get("/github", passport.authenticate("github", {scope: ['user:email']}), (req, res)=>{

})
sessionRoutes.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    (req, res) => {}
  );
sessionRoutes.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), (req,res) =>{
    req.session.user = req.user;
    res.redirect('/');
})
export default sessionRoutes;
