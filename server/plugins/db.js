const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/node-vue-moba", {
    useNewUrlParser: true
})
// require("require-all")(__dirname + "/../models")

module.exports = mongoose