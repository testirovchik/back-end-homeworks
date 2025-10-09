const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {User} = require("../models")

dotenv.config();

const authMiddleWare = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).send({ message: "Please provide a token" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
        res.status(400).send({ message: "invalid token" });
        }
        const user = await User.findOne({ where: { id: data.id } });
        req.user = { id:data.id, name: user.name, surname: user.surname };
        next()
    });
};

module.exports = {authMiddleWare};
