import jwt  from "jsonwebtoken";

const PRIBATE_KEY = 'C0d3rh0us3'

export const generateToken = (user) =>{
    const token = jwt.sign({user}, PRIBATE_KEY, {expiresIn : '24h'})
    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).send({message:'not authenticated'})}
    const token = authHeader.split(' ')[1];
    jwt.verify(token,PRIBATE_KEY,(error,credential)=>{
        if(error){
            res.status(401).send({message:'now authenticated'})
        }
        req.user = credentials;
        next();
    })
}