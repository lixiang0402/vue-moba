const mongoose = require('../plugins/db')

const schema = new mongoose.Schema({
    name: { type: String, unique: true },
    images: [{
        url: { type: String },
        img: { type: String }
    }]
})

module.exports = mongoose.model("Ad", schema)