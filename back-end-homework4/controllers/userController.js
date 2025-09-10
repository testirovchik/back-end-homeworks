class UserController {
    foo(req, res) {
        res.send({message: "hello from foo"})
    }

    bar(req, res) {
        res.send({message: "hello from bar"})
    }

    qux(req, res) {
        res.send({message: "hello from qux"})
    }

    find(req, res) {
        res.send({message: "hello from find"})
    }
}

module.exports = new UserController();