import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { authMiddleWare } from "../middlewares/auth.js";
const router = express.Router();
dotenv.config()

router.post("/signup", async (req, res) => {
    const {name ,surname, login, password} = req.body;
    if(!name || !surname || !login || !password) {
        return res.status(400).send({message: "fill your credentials!"})
    }
    //searching user
    const userName = await User.findOne({where: {login}});
    if(userName) {
        return res.status(400).send({message: "Login is busy!"});
    }

    if(password.length < 8) {
        return res.status(401).send({message: "Password is too short!"})
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,surname,login,password:hashedPassword
    })
    return res.status(201).send({message: "Successfully signed up!"})
});

router.post("/login", async(req, res) => {
    const {login, password} = req.body;
    if(!login || !password) {
        return res.status(400).send({message: "fill your credentials"})
    }
    //searching user
    const user = await User.findOne({where: {login}})
    if(!user) {
        return res.status(404).send({message: "wrong credentials!"});
    }
    //decypting password
    const isCorrect = await bcrypt.compare(password,user.dataValues.password);
    if(!isCorrect) {
        return res.status(404).send({message: "wrong credentials!"})
    }
    const token = jwt.sign({id: user.dataValues.id}, process.env.JWT_SECRET, {expiresIn: '2h'})
    res.status(200).send({token})
})

router.get("/user",authMiddleWare, async(req, res) => {
    return res.status(200).send({user: req.user})
})

export default router;
