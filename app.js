"serviceWorker" in navigator && window.addEventListener("load", function () {
  navigator.serviceWorker.register("/ServiceWorker.js").then(function (e) {
    console.log("ServiceWorker registration successful with scope")
  }, function (e) {
    console.log("ServiceWorker registration failed: ", e)
  })
});