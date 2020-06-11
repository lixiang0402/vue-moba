const mongoose = require('../plugins/db')

const schema = new mongoose.Schema({
    name: { type: String, unique: true },
    icon: { type: String },
    property1: { type: String },
    property2: { type: String },
})
module.exports = mongoose.model("Rune", schema)