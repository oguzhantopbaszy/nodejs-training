var cities = ['İstanbul', 'Ankara', 'İzmir', 'Adana', 'Diyarbakır', 'Trabzon', 'Edirne']
var cities2 = ['Edirne', 'Tekirdağ']
//spread operator
var newCities = ['Uşak', ...cities, 'Afyon', 'Denizli', ...cities2 ]

//console.log(newCities);

var webUser = {
    name: 'Çağatay',
    surname: 'Yıldız',
    city: 'İstanbul'
}

//webUser.country = 'Türkiye'; //Böyle de country ekleyebilirdik objeye fakat mevcut diziyle oynamış olurduk. Spread ile olanı çekip, kullanıyoruz, müdahele etmiyoruz.

var newWebUser = {...webUser, country: 'Turkey'} //bir objenin içine de spread ile ekleme yapabilmiş olduk.
console.log('New Web User', newWebUser);