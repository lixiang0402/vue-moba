const express = require("express")

const app = express()
// 接收post请求参数
app.use(express.json())
// 跨域
app.use(require('cors')())
require("./routes/admin/index")(app)
app.listen(3000, () => {
    console.log("http://localhost:3000");

})