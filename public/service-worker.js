/* eslint-disable */

self.addEventListener("push", function (event) {
  const options = {
    body: event.data.text(),
    icon: "/path/to/icon.png", // Customize with your icon path
  };

  event.waitUntil(
    self.registration.showNotification("Notification Title", options)
  );
});
