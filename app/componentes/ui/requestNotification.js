import { initializeApp } from "firebase/app"
import { getMessaging, getToken } from "firebase/messaging"
import { useState } from "react"

export default function RequestNotifications() {

  const [show, setShow] = useState(true)
  const firebaseConfig = {
    apiKey: "AIzaSyBcRyd7KPNzebG-KDkqOgW2XHub6OTndWo",
    authDomain: "livechat-ce9c4.firebaseapp.com",
    projectId: "livechat-ce9c4",
    storageBucket: "livechat-ce9c4.firebasestorage.app",
    messagingSenderId: "646790522951",
    appId: "1:646790522951:web:da157fffedde43d759e962"
  }

  const app = initializeApp(firebaseConfig)
  const requestPermission = async () => {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
    if (typeof window === "undefined") {
      return null
    }
    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
      console.log("permissao negada")
      return null
    }
    if (permission === "granted") {

      setShow(false)
      const messaging = getMessaging(app)

      const token = await getToken(messaging, {
        vapidKey: "BA00hc2JI1NUNqmWsqctZp1H3n8lp2I9_4UqDna77-2E9iCWBqmBfhbqLf9YI7bDnvzaItCx69FDm9jfndJ3hxI",
        serviceWorkerRegistration: registration
      })
      fetch("/users/save-token", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: localStorage.getItem("email"), token: token })
      })

    }
  }
  return (



    <>
      {
        show &&
        < div className="notification-card">
          <div className="notification-icon">🔔</div>

          <div className="notification-text">
            <strong>Ativar notificações?</strong>
            <span>Receba avisos quando chegarem novas mensagens.</span>
          </div>

          <button onClick={requestPermission}>
            Ativar
          </button>
        </div >
      }
    </>
  )


}
// "use client";
//
// import { initializeApp, getApps, getApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken,
//   onMessage
// } from "firebase/messaging";
// import { useEffect, useState } from "react";
//
// const firebaseConfig = {
//   apiKey: "AIzaSyBcRyd7KPNzebG-KDkqOgW2XHub6OTndWo",
//   authDomain: "livechat-ce9c4.firebaseapp.com",
//   projectId: "livechat-ce9c4",
//   storageBucket: "livechat-ce9c4.firebasestorage.app",
//   messagingSenderId: "646790522951",
//   appId: "1:646790522951:web:da157fffedde43d759e962"
// };
//
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
//
// export default function RequestNotifications() {
//   const [show, setShow] = useState(true);
//
//   useEffect(() => {
//     if (!("serviceWorker" in navigator)) return;
//
//     const messaging = getMessaging(app);
//
//     const unsubscribe = onMessage(messaging, async (payload) => {
//       console.log("[APP] FCM recebido:", payload);
//       console.log(
//         "[APP] Visibilidade:",
//         document.visibilityState
//       );
//
//       /*
//        * O PWA continua carregado, mas não está visível.
//        * Nesse caso, mostramos a notificação manualmente.
//        */
//       if (document.visibilityState !== "visible") {
//         const registration =
//           await navigator.serviceWorker.ready;
//
//         await registration.showNotification(
//           payload.notification?.title ||
//           payload.data?.title ||
//           "SpeakFlow",
//           {
//             body:
//               payload.notification?.body ||
//               payload.data?.body ||
//               "Nova mensagem",
//
//             icon: "/speakflow.png",
//
//             data: {
//               link:
//                 payload.fcmOptions?.link ||
//                 payload.data?.link ||
//                 "https://speakflowchat.vercel.app"
//             }
//           }
//         );
//       }
//     });
//
//     return unsubscribe;
//   }, []);
//
//   const requestPermission = async () => {
//     if (typeof window === "undefined") return;
//
//     const registration =
//       await navigator.serviceWorker.register(
//         "/firebase-messaging-sw.js"
//       );
//
//     const permission =
//       await Notification.requestPermission();
//
//     if (permission !== "granted") {
//       console.log("Permissão negada");
//       return;
//     }
//
//     setShow(false);
//
//     const messaging = getMessaging(app);
//
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BA00hc2JI1NUNqmWsqctZp1H3n8lp2I9_4UqDna77-2E9iCWBqmBfhbqLf9YI7bDnvzaItCx69FDm9jfndJ3hxI",
//
//       serviceWorkerRegistration: registration
//     });
//
//     await fetch("/users/save-token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         email: localStorage.getItem("email"),
//         token
//       })
//     });
//   };
//
//   return (
//     <>
//       {show && (
//         <div className="notification-card">
//           <div className="notification-icon">🔔</div>
//
//           <div className="notification-text">
//             <strong>Ativar notificações?</strong>
//             <span>
//               Receba avisos quando chegarem novas mensagens.
//             </span>
//           </div>
//
//           <button onClick={requestPermission}>
//             Ativar
//           </button>
//         </div>
//       )}
//     </>
//   );
// }
