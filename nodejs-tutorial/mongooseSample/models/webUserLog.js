const mongoose = require('mongoose')
const { Schema } = mongoose

const webUserLogSchema = new Schema({
    webUserId: String,
    addDate : {type: Date, default: Date.now},
    loginType: String,
    ipAddress: String,

})

const webUserLogModel = mongoose.model('WebUserLog',webUserLogSchema); //node.js ile mongo'da bir collection oluşturan kod bloğumuz kısaca budur. Hemen şemayı compass'da göremeyiz.


module.exports = {
    webUserLogModel
}