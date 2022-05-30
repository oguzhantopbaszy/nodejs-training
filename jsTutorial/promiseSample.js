// function myImageUpload(myResolve, reject){

//     var success = true;

//     if(success){
//         myResolve('cagatay.jpeg')
//     }
//     else{
//         reject('ERROR!!!')
//     }
// }

// myImageUpload(resolve, reject);

// function resolve(image) {
//     console.log('Oley çalıştı.' + image)
// }

// function reject(errorMessage) {
//     console.log(errorMessage)
// } //callback function için güzel bir örnek.

var myPromise = new Promise(function(myResolve, myReject){
    var success = false;

    if(success){
        myResolve ('cagatay.jpeg')
    }
    else{
        myReject ('ERROR!!!!')
    }
}) //Her zaman iki callback çalışır: Başarılı veya Başarısız. Promisede de aynı mantık.


//console.log(myPromise);


myPromise
.then((data) =>{
    console.log(data); //burdaki data myResolve'un datası
})
.catch((err) => {
    console.log(err); //burdaki data myReject'in datası
}) //Promise'de asenkron çalışır.
