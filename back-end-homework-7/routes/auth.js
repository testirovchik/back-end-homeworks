const express = require("express");
const authRouter = express.Router();
const { User } = require("../models");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authMiddleWare } = require("../middlewears/auth");

dotenv.config();

authRouter.post("/signup", async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "please fill the body" });
    }

    const { name, surname, login, password } = req.body;
    if (!name || !surname || !login || !password) {
        return res.status(400).send({ message: "please fill name, surname, login, password" });
    }

    const userName = await User.findOne({ where: { login } });
    if (userName) {
        return res.status(400).send({ message: "Choose another login, login is busy!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, surname, login, password: hashedPassword });
    return res.status(201).send({ message: "signed up successfully" });
});

authRouter.post("/login", async (req, res) => {
    if(!req.body) {
        return res.status(400).send({ message: "please fill the body" });
    }

    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).send({ message: "please fill your login and password" });
    }

    const isFound = await User.findOne({ where: { login } });
    if (!isFound) {
        return res.status(400).send({ message: "There is no such login" });
    }

    const isCorrectPassword = await bcrypt.compare(password, isFound.password);
    if (!isCorrectPassword) {
        return res.status(400).send({ message: "The password is not correct" });
    }

    const token = jwt.sign({ id: isFound.id }, process.env.JWT_SECRET, { expiresIn: "7h" });
    return res.status(200).send({ message: "Login successful", token });
});


authRouter.get("/user", authMiddleWare, async(req, res) => {
    return res.status(200).send({user: req.user})
})

module.exports = authRouter;
