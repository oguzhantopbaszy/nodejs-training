
//2 saniye sonra buradaki kod bloğu çalışır.
setTimeout(() => {
    
    console.log('time out function çalıştı!!!');

}, 2000);


//Her 2 saniyede bir çalışır.
setInterval(() => {
    console.log('Bu her 2 saniyede bir çalışır.')
}, 2000);