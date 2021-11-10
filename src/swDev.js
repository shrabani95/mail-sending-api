export default function swDev() {
    let swUrl = './sw.js'
    navigator.serviceWorker.register(swUrl).then(function (response) {
       // console.warn('Service worker successfully registered on scope', response);
    }).catch(function (error) {
       // console.warn('Service worker failed to register');
    });
}