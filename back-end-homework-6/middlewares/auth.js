import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.js";
dotenv.config()

export const authMiddleWare = async(req, res, next) => {
    const authHeader = req.headers["authorization"]; 
    if(!authHeader) {
        return res.status(401).send({message: "please provide a token"})
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err,data) => {
        if(err) {
            res.status(403).send({message: "invalid token!"})
        }
        const user = await User.findOne({where: {id: data.id}})
        const {name, surname } =  user.dataValues;
        req.user = {name, surname};
        next();
    })
}