const ProductModel = require("../models/product")

class ProductController {
    model = new ProductModel();
    foo(req, res) {
        const found = this.model.getOne()
        res.send({product: found})
    }

    bar(req, res) {
        res.send({message: "hello from product's bar"})
    }

    qux(req, res) {
        res.send({message: "hello from product's qux"})
    }

    find(req, res) {
        res.send({message: "hello from product's find"})
    }
}

module.exports = new ProductController();