// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getMessaging} from "firebase/messaging"
import { getMessaging } from "firebase/messaging/sw"
// import {onBackgroundMessage} from "firebase/messaging/sw"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export default messaging;



export const backgroundNotify = () => {
  // onBackgroundMessage(messaging, (payload) => {
  //   console.log(
  //     "[firebase-messaging-sw.js] Received background message ",
  //     payload
  //   );
  //   // Customize notification here
  //   const notificationTitle = "Background Message Title";
  //   const notificationOptions = {
  //     body: "Background Message body.",
  //     // icon: "/firebase-logo.png",
  //   };

  //   // eslint-disable-next-line no-restricted-globals
  //   window.self.registration.showNotification(notificationTitle, notificationOptions);
  // });
};
