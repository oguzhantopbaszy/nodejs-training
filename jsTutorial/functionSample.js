function hello(){

    alert('Hello JS!');
    //function body burası
}

function calcPrice(price){

    var newPrice = price * 1.18;

    return newPrice; //burda return etmezsek bize kızmaz ama yapmamız lazım

}

var result = calcPrice(100)