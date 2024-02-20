import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging } from "firebase/messaging"
 
const firebaseConfig = {
    apiKey: "AIzaSyBgh4161ZFnyFkVnDBNptliEmfHJYS0QlY",
    authDomain: "latranca.firebaseapp.com",
    projectId: "latranca",
    storageBucket: "latranca.appspot.com",
    messagingSenderId: "458203392098",
    appId: "1:458203392098:web:9a6d6a8c044b5d22cfc93b",
    measurementId: "G-6XQYNM0CBB"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);