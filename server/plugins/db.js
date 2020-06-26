const mongoose = require("mongoose")
mongoose.connect("mongodb://test1db:27017/node-vue-moba", {
    useNewUrlParser: true
})
// require("require-all")(__dirname + "/../models")

module.exports = mongoose