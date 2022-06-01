const mongoose = require('mongoose')

const connectionHelper = {
    connect: () => {
        mongoose.connect("mongodb+srv://@cluster0.fqply.mongodb.net/techcareermusicdb")
            .catch(err => {
                //Bağlantı sırasında bir hata meydana gelirse buraya düşüyor.
                console.log("Connection Error", err);

            })
    }
}

module.exports = {
    connectionHelper
}