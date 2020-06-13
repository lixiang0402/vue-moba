module.exports = (options) => {
    const jwt = require("jsonwebtoken")
    const AdminUser = require("../models/AdminUser")
    return async (req, res, next) => {
        const token = String(req.headers.authorization || " ").split(" ").pop()
        if (!token) return res.status(401).send({ message: "请先登录" })
        // 中间件用到了app  使用req.app  和外面的app一样
        const user_id = jwt.verify(token, req.app.get("secret"))
        if (!user_id) return res.status(401).send({ message: "请先登录" })
        const user = await AdminUser.findById(user_id._id)
        if (!user) return res.status(401).send({ message: "请先登录" })
        next()
    }
}