//Bu controller webuserla ilgili işlemleri yapacak arkadaş

var CryptoJS = require('crypto-js')
const { webUserModel } = require("../models/webUser");
const { webUserLogModel } = require('../models/webUserLog');

const sha256 = require('crypto-js/sha256')
const hmacSHA512 = require('crypto-js/hmac-sha512')
const Base64 = require('crypto-js/enc-base64');
const { userLoginKey } = require("../env/shaKey");


const webUserController = {
    getById: (req, res) => {
        var id = req.params.id;
        webUserModel.findById(id, (err, doc) => {

            if (!err && doc != null) {
                res.json(doc)
            }
            else if (doc == null) {
                res.status(404).json(null)
            }
            else {
                res.status(500).json(err);
            }

        })

    }, //id ile gelmede hep null geliyor??
    getAll: (req, res) => {
        var query = {};
        var fields = req.query.fields;

        var fieldResult = '';

        if (fields != undefined) {
            var fieldArray = fields.split(',');
            fieldArray.forEach(item => {
                fieldResult = item + " " + fieldResult
            })
        }

        if (req.query.name !== undefined) {
            query.name = req.query.name;
        }
        if (req.query.surname !== undefined) {
            query.surname = req.query.surname;
        }
        if (req.query.address !== undefined) {
            query.address = req.query.address;
        }


        webUserModel.find(query, fieldResult, (err, docs) => {
            if (!err) {
                res.json(docs)
            }
            else {
                res.json(err)
            }
        })
    },
    add: (req, res) => {

        var encryptPassword = CryptoJS.AES.encrypt(req.body.password, userLoginKey).toString();

        var newWebUser = new webUserModel({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            password: encryptPassword,
            email: req.body.email
        })
    
        newWebUser.save((err, doc) => {
            if(!err){
                res.status(201).json(doc)
            }
            else{
                res.status(500).json(err);
            }
        })
    },
    delete: (req, res) => {
        var webUserId = req.params.id

        webUserModel.findByIdAndRemove(webUserId, (err, doc) => {

            console.log('Error', err);
            console.log('Document', doc);

            if (!err) {
                res.json(doc)
            }
            else {
                res.status(500).json(err)
            }

        })
    },
    update: (req, res) => {
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

        webUserModel.findById(id, (err, doc) => {
            if (!err) {
                doc.name = req.body.name;
                doc.surname = req.body.surname;
                doc.save()

                res.json(doc)
            }
            else {
                res.status(500).json(err)
            }
        })
    },
    loginControl: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        webUserModel.findOne({ email: email }, (err, doc) => {

            var bytes = CryptoJS.AES.decrypt(doc.password, userLoginKey);
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8); //Bu iki satırda encrypt yaptığımız password'u decrypte edip, girilen parolayla uyuşup uyuşmadığının kontrolünün yapılmasını sağladık.

            if (!err && doc != null) {
                
                if (password == decryptedData) {

                    res.send("Login success!!");

                    var newWebUserLog = new webUserLogModel({
                        loginType: 'Success',
                        ipAddress: req.socket.remoteAddress

                    })
                    newWebUserLog.save();

                }
                else{
                    doc.failLoginCount = doc.failLoginCount + 1;
                    doc.save()
                    var newWebUserLog = new webUserLogModel({
                        loginType: 'Fail',
                        ipAddress: req.socket.remoteAddress,
                        webUserId: doc._id

                    })
                    newWebUserLog.save();
                    res.status(404).send("Not found!")
                }
            }
            else {
                res.status(404).send("Not found!")
            }
        })
    }
}

module.exports = {
    webUserController
}