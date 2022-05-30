//callback fonksiyonları kullanmamızın 2 nedeni var. Birincisi birden fazla değer döndürebilir ve ikincisi asenkron işlemlerde işimize yarar. Çok önemli bir yapıdır.

var cities = ['İzmir', 'İstanbul', 'Ankara', 'Trabzon', 'Diyarbakır']

//şehirleri tek tek konsola yaz

for (i = 0; i < cities.length; i++) {
    
    //console.log(cities[i]);

}

cities.forEach(getCity)

function getCity(item, index, data){

    //console.log("şehir: " + item + " " + index);

} //getCity fonksiyonu aslında forEach içerisinde kullanılmak üzere bir kereliğe mahsus yazılmış bir fonksiyon. Tabiki de başka yerde de kullanılabilir ama mantıklı olmaz. ikisini bir bütün olarak düşünmek gerek.

cities.forEach(function(item,index){

    //console.log("şehir: " + item + " " + index);

}) //yukarda yaptığımız şeyi aynı şekilde böyle içine yazarak da elde ederiz. Fakat bunun da callback fonksiyon olduğunu bilmemiz gerekiyor. Genellikle böyle içine yazılır.

cities.map(function(item, index){
    console.log("şehir: " + item + " " + index);
})





function calcData(x, y, callBack) {
    var result = (x * y) + 20.5;
    callBack(result);
}

calcData(20, 2, myCallBackFunc)

function myCallBackFunc(data) {

    //console.log("result: ", data);
}