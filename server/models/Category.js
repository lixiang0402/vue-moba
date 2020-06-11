const mongoose = require('../plugins/db')

const schema = new mongoose.Schema({
    name: { type: String, unique: true },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" }
})

module.exports = mongoose.model("Category", schema)