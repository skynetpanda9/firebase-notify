import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./utils/firebase";

interface notificationData {
  title: string;
  body: string;
}

const Notification = () => {
  const [notification, setNotification] = useState<notificationData>({
    title: "",
    body: "",
  });

  const notify = () =>
    toast(<ToastDisplay />, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 6000,
    });

  const notifyLocal = () =>
    toast(<ToastDisplayLocal />, {
      icon: "🤠",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      duration: 6000,
    });

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p
          style={{
            textAlign: "justify",
          }}
        >
          {notification?.body}
        </p>
      </div>
    );
  }

  function ToastDisplayLocal() {
    return (
      <div>
        <p>
          <b>Hi this is a Local Notification</b>
        </p>
        <p
          style={{
            textAlign: "justify",
          }}
        >
          When message will be published from Firebase, it'll appear similarly.
          <br />
          <br />
          Have patience, firebase takes time...
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div>
      <button
        style={{
          borderRadius: "7px",
          boxSizing: "border-box",
          borderWidth: "2px",
          borderColor: "#333",
        }}
        onClick={notifyLocal}
      >
        Let's test
      </button>
      <Toaster />
    </div>
  );
};

export default Notification;
