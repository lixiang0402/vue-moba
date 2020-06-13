const express = require("express")

const app = express()
// jsonwebtoken包 加密/解析用到的字符串 
app.set("secret", "13hilsdj082u35jklasd124")
// app.use('/uploads', express.static(__dirname + '/uploads'))
app.use("/uploads", express.static(__dirname + "/uploads"))
// 跨域
app.use(require('cors')())
// 接收post参数
app.use(express.json())
require('./routes/admin/index')(app)
app.listen(3000, () => {
    console.log("http://localhost:3000");
})