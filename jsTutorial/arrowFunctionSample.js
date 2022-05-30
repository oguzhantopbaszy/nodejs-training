

function hello() {
    
    console.log('Hello JS');
}

function calc(x, y){

    return x + y;
}

var hola = function()
{
    console.log('merhaba Türkiye!');
}

var userManager =
{
    name: 'Çağatay',
    surname: 'Yıldız',
    merhaba: function(){

        console.log('Merhaba JS');

    }
}

//ARROW FUNCTİON

var displayData = () => {

    console.log("display....");

} //bu bir arrow functiondır.

var addProduct = (name, price) => {

    console.log("add product function...");
}

//Oktan sonra scope sembolü koyarsan return anahtar kelimesini kullanmalısın FAKAT tek satırlık işlemin varsa scope kaldır otomatikman return eder.

var addCategory = (name, description) => {
    
    return name + " " + description
}

var addSupplier = () => "supplier func return..."
//var result = addSupplier();
//console.log(result);



