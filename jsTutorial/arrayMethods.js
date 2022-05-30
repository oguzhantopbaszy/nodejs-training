var cities = ['İstanbul', 'Ankara', 'İzmir', 'Adana', 'Diyarbakır', 'Trabzon', 'Edirne']
var cities2 = ['Edirne', 'Tekirdağ']
//spread operator
var newCities = ['Uşak', ...cities, 'Afyon', 'Denizli', ...cities2 ]

console.log(newCities);



// dizinin ilk elemanı
// console.log('İlk eleman', cities[0]);

// delete cities[1] //delete komutu dizideki arkadaşı siler ama diziden uçurmaz.onun yerine undefined yazar.
// console.log(cities.length);

// splice metodu ile bir başlangıç indexi belirtiyorm. Daha sonra o indexten sonra kaç adet arkadaşı sileceğimi söylüyorum.

// cities.splice(1,2)
// console.log(cities)

// var newCities = cities.slice(0,4)

// console.log(cities);
// console.log(newCities);

// Diziye yeni bir eleman ekleme
// cities.push('Muğla')
// cities.push('Çanakkale', 'Aydın', 'Manisa')
// console.log(cities);



