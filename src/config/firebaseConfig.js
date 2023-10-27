import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";



const firebaseConfig = {
  apiKey: "AIzaSyCZaocx3wUNHEYz57sWwRgbC3a8OM86k4k",
  authDomain: "relink-app.firebaseapp.com",
  projectId: "relink-app",
  storageBucket: "relink-app.appspot.com",
  messagingSenderId: "724672213776",
  appId: "1:724672213776:web:5a3d985fb8c9c77e5aeb95",
  measurementId: "G-KBK69020Q5",
};


//initializing firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);


export async function setupPushNotifications() {
  try {
    const currentToken = await getToken(messaging, {vapidKey: "secretVapidKey"});
    if (currentToken) {
        console.log("notify token:" ,currentToken);
      // Token retrieved successfully. You can now send it to your server.
      // ...
    } else {
      // Show permission request UI
      const access = await Notification.requestPermission();
      // Token will be obtained automatically upon permission, so you don't need to call getToken again.
    }
  } catch (error) {
    console.error(
      "An error occurred while setting up push notifications:",
      error
    );
  }
}
