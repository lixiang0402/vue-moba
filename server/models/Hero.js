const mongoose = require('../plugins/db')
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        diffclut: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survival: { type: Number },
    },
    skin: { type: Number },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        cooling: { type: String },
        consume: { type: String },
        tips: { type: String }
    }],
    item1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    item2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    runes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Rune" }],
    useTip: { type: String },
    battleTip: { type: String },
    teamFight: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String }
    }],
    naturalEnemys: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String }
    }],
    restrainOneselfs: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        description: { type: String }
    }],
})

module.exports = mongoose.model("Hero", schema, "heroes")