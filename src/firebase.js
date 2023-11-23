import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging"
import { GoogleAuthProvider, getAuth } from "firebase/auth";

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


export const subscribeTopic = (token) => {
  const topic = "notify"
   fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
     method: "POST",
     headers: new Headers({
       Authorization: `key=${token}`,
     }),
   })
     .then((response) => {
       
     })
     .catch((error) => {
       console.error(error.result);
     });
   return true;
}


export const provider = new GoogleAuthProvider();
export const auth = getAuth();