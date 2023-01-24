// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBdevWXZNA757PNK1e4mJIb8bsKK6iy6s4",
  authDomain: "react-notifications-da547.firebaseapp.com",
  projectId: "react-notifications-da547",
  storageBucket: "react-notifications-da547.appspot.com",
  messagingSenderId: "908968482785",
  appId: "1:908968482785:web:c0a12b84dc39ab1d6664a0",
  measurementId: "G-HER5SWX4BG",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
