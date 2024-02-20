importScripts(
  "https://www.gstatic.com/firebasejs/9.8.4/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.8.4/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBgh4161ZFnyFkVnDBNptliEmfHJYS0QlY",
  authDomain: "latranca.firebaseapp.com",
  projectId: "latranca",
  storageBucket: "latranca.appspot.com",
  messagingSenderId: "458203392098",
  appId: "1:458203392098:web:9a6d6a8c044b5d22cfc93b",
  measurementId: "G-6XQYNM0CBB",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log("Recibiste mensaje mientras estabas ausente");
  // previo a mostrar notificación
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
