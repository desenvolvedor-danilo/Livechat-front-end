import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {

  apiKey: "AIzaSyBcRyd7KPNzebG-KDkqOgW2XHub6OTndWo",
  authDomain: "livechat-ce9c4.firebaseapp.com",
  projectId: "livechat-ce9c4",
  storageBucket: "livechat-ce9c4.firebasestorage.app",
  messagingSenderId: "646790522951",
  appId: "1:646790522951:web:da157fffedde43d759e962"
}
export function GetToken() {
  const app = initializeApp(firebaseConfig)
  async function requestPermissionNotification() {
    if (typeof window === "undefined") {
      return null
    }
    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
      console.log("permissao negada")
      return null
    }
    if (permission === "granted") {
      const messaging = getMessaging(app)

      const token = await getToken(messaging, {
        vapidKey: "BA00hc2JI1NUNqmWsqctZp1H3n8lp2I9_4UqDna77-2E9iCWBqmBfhbqLf9YI7bDnvzaItCx69FDm9jfndJ3hxI"
      })
      fetch("/users/save-token", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: localStorage.getItem("email"), token: token })
      })
    }
  }
  return { requestPermissionNotification }
}
