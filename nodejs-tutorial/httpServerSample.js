const http = require('http') //require kelimesini neden kullanıyoruz import yerine araştır?
const fs = require('fs')

const port = 8080
const server = http.createServer(function(req,res){

    //throw 'aman da aman'; //bunu yazdığımızda, response dönmediği için hata alıyor. Node.js'de response dönmek zorundayız genelde. 

    //res.writeHead(200,  {'Content-Type': 'text/html'}); //content-type ile dönen veririnin tipini de değiştirebildik.
    //res.end('Hello Node.js!')

    if(req.url == '/'){

        fs.readFile('./index.html',function(err,data){
            
            if(err == null){
                res.writeHead(200,  {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }//burada hata olup olmadığını kontrol ediyoruz.
            else{
                res.writeHead(500);
                res.end('Sunucu tarafında bir hata meydana geldi')
            }
        })

    }
    else if(req.url == '/about'){
        
        fs.readFile('./about.html', function(err,data){

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data) //write olmadan da end'in parantezinin içine datayı koyarak yazdırabiliyoruz.
        })
        

    }
    else{
        
        fs.readFile('./404.html', function(err,data){

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end(data)
        })

    }
})

server.listen(port, function(){
    console.log("Sunucum çalışıyor...!");
});