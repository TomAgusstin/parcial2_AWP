if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('sw.js').then((message)=> {
        console.log('Anda ok');
    });
}else
{
    console.log('No anda');
}