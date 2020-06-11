const mongoose = require('../plugins/db')

const schema = new mongoose.Schema({
    name: { type: String, unique: true },
    icon: { type: String }
})

module.exports = mongoose.model("Item", schema)