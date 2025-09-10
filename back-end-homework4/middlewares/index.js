module.exports = function(req, res, next) {
    req.body.id = Date.now();
    next();
}