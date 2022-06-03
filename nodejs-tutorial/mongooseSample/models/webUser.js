const mongoose = require('mongoose')
const { Schema } = mongoose

const webUserSchema = new Schema({
    name : { type: String, required: true},
    surname : String,
    address : String,
    password: String,
    email : String,
    city : [],
    detail : {},
    failLoginCount: { type: Number, default: 0 },
    addDate : {type: Date, default: Date.now},
    isActive : { type:Boolean, default: true },

})

const webUserModel = mongoose.model('WebUser',webUserSchema); //node.js ile mongo'da bir collection oluşturan kod bloğumuz kısaca budur. Hemen şemayı compass'da göremeyiz.


module.exports = {
    webUserModel
}