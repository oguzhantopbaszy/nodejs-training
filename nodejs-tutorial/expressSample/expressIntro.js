const express = require('express') //express bir web fraworktür. http server'ın kompleks operasyonlarını bizim için daha simple hale getirerek daha rahat kod yazmamızı sağlıyor.
const app = express();


//Her bir uca ENDPOINT diyorum.
app.get('/', (req, res) => {
    res.send('Welcome home page!!')
})

app.get('/about', (req, res) => {
    res.send('Welcome about page!!')
})

app.get('/category', (req, res) => {
    res.json({ name: 'Electronic', description: 'Electronic products...'})
})

app.listen(3000, function(){
    console.log('Sunucu aslanlar gibi ayakta...')
})