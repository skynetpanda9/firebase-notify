import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const config = {
  apiKey: "AIzaSyBdevWXZNA757PNK1e4mJIb8bsKK6iy6s4",
  authDomain: "react-notifications-da547.firebaseapp.com",
  projectId: "react-notifications-da547",
  storageBucket: "react-notifications-da547.appspot.com",
  messagingSenderId: "908968482785",
  appId: "1:908968482785:web:c0a12b84dc39ab1d6664a0",
  measurementId: "G-HER5SWX4BG",
};

// Initialize Firebase
initializeApp(config);
const messaging = getMessaging();

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: `BPhr9DifEwAOgz-T4akdXHlygnZbrni-9sn8qT_kGZi_UjUGvIV-POTM0oZE35tV-WDeAln5_wsBFwsisLWOG6k`,
    });
    if (currentToken) {
      console.log("current token for client: ", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
