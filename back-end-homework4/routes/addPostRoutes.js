const express = require("express");
const middlewares = require("../middlewares");
const router = express.Router();
const model = require("../models/product.js")

router.get("",(req, res) => {
    res.render("add");
})

router.post("", middlewares, async (req, res) => {
    await model.addPost(req.body);
    const allPosts = await(model.allPosts())
    res.render("home",{ allPosts })
})

module.exports = router;