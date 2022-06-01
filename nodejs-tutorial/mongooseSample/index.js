//mongoose paketi ile nodejs üzerinden mongodb'ye ulaşacağım.

//const mongoose = require('mongoose')
//const { Schema } = mongoose

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const { webUserController } = require('./controllers/webUserController');
const { connectionHelper } = require('./dbconnect/connectionHelper');

//const { webUserSchema } = require('./models/webUser')

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())



//VS Code üzerinden collection oluşturacağım.
// const webUserSchema = new Schema({
//     name : { type: String, required: true},
//     surname : String,
//     address : String,
//     email : String,
//     city : [],
//     detail : {},
//     addDate : {type: Date, default: Date.now},
//     isActive : { type:Boolean, default: true },

// })

//const webUserModel = mongoose.model('WebUser',webUserSchema); //node.js ile mongo'da bir collection oluşturan kod bloğumuz kısaca budur. Hemen şemayı compass'da göremeyiz.

app.get('/api/webusers', (req, res) => {

    webUserController.getAll(req, res)

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
    //     webUserModel.findById(id, (err, doc) => {

    //         if (!err && doc != null) {
    //             res.json(doc)
    //         }
    //         else if(doc == null){
    //             res.status(404).json(null)
    //         }
    //         else {
    //             res.status(500).json(err);
    //         }
    //     })
    webUserController.getById(req, res)

})

app.post('/api/webusers', (req, res) => {

    webUserController.add(req, res)

})

app.delete('/api/webusers/:id', (req, res) => {
    
    webUserController.delete(req, res)

})

app.put('/api/webusers', (req, res) => {
    
    webUserController.update(req, res)

})

app.listen(8080, () => {
    console.log("Sunucum çalışıyor...");
})

connectionHelper.connect();




//Kullanıcı route => params => controller => route => kullanıcı