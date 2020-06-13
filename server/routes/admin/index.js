module.exports = app => {
    const express = require("express")
    const router = express.Router({
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    // 添加列表项
    router.post('/', async (req, res) => {
        try {
            await req.Model.create(req.body)
        } catch (error) {
            console.log(error);
            return res.send({ success: false })
        }
        res.send({ success: true })
    })
    // 获取列表
    router.get("/", async (req, res) => {
        let option = {}
        // 只给category接口 提供查询parent
        if (req.modelName === "Category") {
            option.populate = "parent"
        }
        let list = await req.Model.find().setOptions(option)
        res.send(list)
    })
    // 获取列表某项
    router.get("/:id", async (req, res) => {
        let model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 修改列表某项
    router.put('/:id', async (req, res) => {
        try {
            await req.Model.findByIdAndUpdate(req.params.id, req.body)
        } catch (error) {
            res.send({ success: false })
        }
        res.send({ success: true })
    })
    // 删除列表某一项
    router.delete("/:id", async (req, res) => {
        await req.Model.findByIdAndRemove(req.params.id)
        res.send({ success: true })
    })
    // require("../../middleware/allresouce")  :处理通用接口的中间件
    const auth = require("../../middleware/auth")
    const resouce = require("../../middleware/resouce")
    app.use('/admin/api/rest/:resouce', auth(), resouce(), router)
    // 处理上传图片接口
    // express处理 上传文件包  multer 
    const multer = require("multer")
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post("/admin/api/upload", auth(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body
        let user = await AdminUser.findOne({ username }).select("+password")
        // 检查用户是否存在
        if (!user) return res.status(422).send({ message: "用户不存在" })
        // 判断密码正确
        const bcrypt = require("bcryptjs")
        let valid = bcrypt.compareSync(password, user.password)
        if (!valid) return res.status(422).send({ message: "密码错误" })
        // 如果密码正确返回token
        // 引入 jasonwebtoken包
        const token = jwt.sign({ _id: user._id }, app.get('secret'))
        res.send(token)
    })
}