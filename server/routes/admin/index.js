module.exports = app => {
    const express = require("express")
    const router = express.Router({
        mergeParams: true
    })
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
    app.use('/admin/api/rest/:resouce', require("../../middleware/allresouce"), router)
    // 处理上传图片接口
    // express处理 上传文件包  multer 
    const multer = require("multer")
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post("/admin/api/upload", upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}