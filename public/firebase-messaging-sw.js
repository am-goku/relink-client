/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "/" })
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error) {
      console.error("Service Worker registration failed:", error);
    });
}

firebase.initializeApp({
  apiKey: "AIzaSyCZaocx3wUNHEYz57sWwRgbC3a8OM86k4k",
  appId: "1:724672213776:web:72c96042da07927c5aeb95",
  projectId: "relink-app",
  messagingSenderId: "724672213776",
});

const initMessaging = firebase.messaging();

self.addEventListener("push", function (event) {
  const options = JSON.parse(event.data.text());

  const newNotify = JSON.parse(options?.data.newData);

  console.log(newNotify);

  event.waitUntil(
    self.registration.showNotification("Relink App", {
      body: newNotify?.message,
    })
  );


});

