//mongoose paketi ile nodejs üzerinden mongodb'ye ulaşacağım.

const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect("mongodb+srv://@cluster0.fqply.mongodb.net/techcareermusicdb")
.catch(err => {
    //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor.
    console.log("Connection Error", err);
})

//VS Code üzerinden collection oluşturacağım.

const webUserSchema = new Schema({
    name : String,
    surname : String,
    email : String,
    city : [],
    detail : {}
})

const webUserModel = mongoose.model('WebUser',webUserSchema); //node.js ile mongo'da bir collection oluşturan kod bloğumuz kısaca budur. Hemen şemayı compass'da göremeyiz.

var newWebUser = new webUserModel({
    name : 'Oğuzhan',
    surname : 'TOPBAŞ',
    email : 'oguzhan@gmail.com',
    //address : 'Maltepe' //Bunun gibi olmayan bir kolonu yazdırmaya çalışırsak, database'e yazmaz. Bununla ilgili bir kontrol yaptırıp hata da verdirtemeyiz.
    city : ['İzmir', 'İstanbul', 'Adana'],
    detail : { language : 'English', color : 'yellow '}
     
})

newWebUser.save()




//mongodb'nin avantajları
//dağınık dizayn yani her satırın kendine ait kolonlarının olabilmesi
//satırlar içerisinde dağınık yapıların saklanabilmesi
//Hız

//DB First - Code First
//DB First = Önce veritabanı üzerinden tablolar oluşturulur.
//Code First = Veritabanı tabloları (collectionlar kod üzerinde oluşturulup veritabanına bildirilir.) (mongoose kullanıyorsak koddan devam etmek daha çok tercih edilir.)

// try {
//     await mongoose.connect('mongodb+srv://topbasoguzhan:Daghan.3723@cluster0.fqply.mongodb.net/test')
// } catch (error) {
//     handleError(error);
// } Yukardaki bağlantı kontrolüyle aynı şeye çıkıyor


// setTimeout(() => {
//     console.log(mongoose.connection.readyState)
// }, 2000); //Aynı şekilde kontrol ettik. (1-connected, 2-connecting)

//console.log(mongoose.connection.readyState) //bağlantıyı kontrol etmek için kullandık.