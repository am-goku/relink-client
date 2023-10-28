
import {initializeApp} from "firebase/app"
import {deleteToken, getMessaging, getToken, onMessage} from "firebase/messaging"


const config = {
  apiKey: "AIzaSyCZaocx3wUNHEYz57sWwRgbC3a8OM86k4k",
  authDomain: "relink-app.firebaseapp.com",
  projectId: "relink-app",
  storageBucket: "relink-app.appspot.com",
  messagingSenderId: "724672213776",
  appId: "1:724672213776:web:5a3d985fb8c9c77e5aeb95",
  measurementId: "G-KBK69020Q5",
};


const app = initializeApp(config);
const messaging = getMessaging(app);

export const requestPermission = () => {
    console.log("requesting permission....");
    Notification.requestPermission((permission)=> {
        if(permission === "granted"){
            console.log("Notification permission granted");

            return getToken(messaging, {
              vapidKey:
                "BEL96S6zRFAXOrc9JPou48JTw-ZeGpqmWGPJFBEY7ucAw10i2u2RHZ9-R2MAB-920WtvOGrd_qmbyKAgOgLjoJc",
            }).then((token)=> {
                if(token){
                    console.log("currentToken:", token);
                } else {
                    console.log("failed to generate token:");
                }
            }).catch((error)=>{
                console.log("An error occured when requesting to generate the token:", error);
            })
        } else {
            console.log("Notification permission denied");
        }
    })
};

export const unsubscribe = () => {
        deleteToken(messaging).then((res) => {
          console.log("token removed", res);
        });
}


// requestPermission();


export const onMessageListener = ()=> {
    return new Promise((resolve, reject)=> {
        try {
            onMessage(messaging, (payload) => {
              resolve(payload);
            });
        } catch (error) {
            reject(error);
        }
    })
}