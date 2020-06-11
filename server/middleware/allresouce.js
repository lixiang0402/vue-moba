module.exports = (function allresouce() {
    return (req, res, next) => {
        // inflection包 处理小写转大写 复数转单数
        req.modelName = require('inflection').classify(req.params.resouce)
        req.Model = require(`../models/${req.modelName}`)
        next()
    }
})()