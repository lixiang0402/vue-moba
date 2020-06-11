const mongoose = require('../plugins/db')
const schema = new mongoose.Schema({
    title: { type: String, unique: true },
    body: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model("Article", schema)