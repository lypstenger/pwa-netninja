// navigator is object that represents the browser and info about it
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js') // this is a promise
    .then((reg) => console.log(reg, 'service worker registered'))
    .catch((err) => console.log(err, 'service worker not registered'))
}