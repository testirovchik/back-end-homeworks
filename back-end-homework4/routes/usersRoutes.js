const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.get("/find/:id", controller.find);

router.get("/foo", controller.foo);

router.get("/bar", controller.bar);

router.get("/qux", controller.qux);


module.exports = router;