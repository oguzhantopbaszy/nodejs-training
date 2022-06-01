//mongoose paketi ile nodejs üzerinden mongodb'ye ulaşacağım.

const mongoose = require('mongoose')
const { Schema } = mongoose

const express = require('express');
const app = express();
var bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://@cluster0.fqply.mongodb.net/techcareermusicdb")
.catch(err => {
    //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor.
    console.log("Connection Error", err);
})

//VS Code üzerinden collection oluşturacağım.

const webUserSchema = new Schema({
    name : { type: String, required: true},
    surname : String,
    address : String,
    email : String,
    city : [],
    detail : {},
    addDate : {type: Date, default: Date.now},
    isActive : { type:Boolean, default: true },

})

const webUserModel = mongoose.model('WebUser',webUserSchema); //node.js ile mongo'da bir collection oluşturan kod bloğumuz kısaca budur. Hemen şemayı compass'da göremeyiz.

app.get('/api/webusers', (req, res) => {

    var query = {};
    var fields = req.query.fields;
    
    var fieldArray = fields.split(',');
    var fieldResult = '';

    fieldArray.forEach(item => {
        fieldResult = item + " " + fieldResult
    })


    if(req.query.name !== undefined) {
        query.name = req.query.name;
    }
    if(req.query.surname !== undefined){
        query.surname = req.query.surname;
    }
    if(req.query.address !== undefined){
        query.address = req.query.address;
    }
    

    webUserModel.find( query, fieldResult , (err, docs) => {
        if(!err) {
            res.json(docs)
        }
        else {
            res.json(err)
        }
    })
})

app.get('/api/webusers', (req,res) => {
    webUserModel.find((err, docs) => {
        if(!err){
            res.json(docs)
        }
        else{
            res.json(err)
        }
    })
})

app.get('/api/webusers/:id', (req,res) => {
    
    var id = req.params.id;
    webUserModel.findById(id, (err, doc) => {

        if(!err){
            res.json(doc)
        }
        else{
            res.status(500).json(err);
        }

    })
})

app.post('/api/webusers', (req, res) => {

    var newWebUser = new webUserModel({
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address
    })

    newWebUser.save((err, doc) => {
        if(!err){
            res.status(201).json(doc)
        }
        else{
            res.status(500).json(err);
        }
    })

})

app.delete('/api/webusers/:id', (req, res) => {
    var webUserId = req.params.id

    webUserModel.findByIdAndRemove(webUserId, (err, doc) => {

        console.log('Error', err);
        console.log('Document', doc);

        if(!err){
            res.json(doc)
        }
        else{
            res.status(500).json(err)
        }

    })
})

app.put('/api/webusers', (req, res) => {
    //Öncelikle mongoda güncellenecek WebUser bulunur
    var id = req.body.id
    // let webUser = webUserModel.findByIdAndUpdate(id, {name: req.body.name, surname: req.body.surname}, {new: true}, (err, doc) => {
    //     if(!err){
    //         res.json(doc)
    //     }
    //     else{
    //         res.status(500).json(err);
    //     }
    // })//findByIdAndUpdate güncellediği dökümanın eski halini bize geri dönüyor. {new: true} ile yeni halini dönmesini sağlayabiliyoruz.

    webUserModel.findById(id, (err,doc) => {
        if(!err){
            doc.name = req.body.name;
            doc.surname = req.body.surname;
            doc.save()

            res.json(doc)
        }
        else{
            res.status(500).json(err)
        }
    })




})

app.listen(8080, () => {
    console.log("Sunucum çalışıyor...");
})






//Yeni bir web user ekleme işlemi
// var newWebUser = new webUserModel({
//     name : 'Oğuzhan',
//     surname : 'TOPBAŞ',
//     email : 'oguzhan@gmail.com',
//     //address : 'Maltepe' //Bunun gibi olmayan bir kolonu yazdırmaya çalışırsak, database'e yazmaz. Bununla ilgili bir kontrol yaptırıp hata da verdirtemeyiz.
//     city : ['İzmir', 'İstanbul', 'Adana'],
//     detail : { language : 'English', color : 'yellow '}
     
// })

// newWebUser.save((err,doc)=>{
//     if(!err){
//         //Hata yoksa if bloğuna girer
//         console.log('Eklenen döküman', doc);
//     }
//     else{
//         //Hata varsa else
//         console.log('Hata',err);
//     }
//     //console.log(err); //parantez içine err yazınca hatayı, doc yazınca eklediğimiz document'ı bize geri dönüyor.
// }) 




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