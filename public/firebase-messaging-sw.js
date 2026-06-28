
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");
// Mesmo config do app.js
firebase.initializeApp({

	apiKey: "AIzaSyBcRyd7KPNzebG-KDkqOgW2XHub6OTndWo",
	authDomain: "livechat-ce9c4.firebaseapp.com",
	projectId: "livechat-ce9c4",
	storageBucket: "livechat-ce9c4.firebasestorage.app",
	messagingSenderId: "646790522951",
	appId: "1:646790522951:web:da157fffedde43d759e962"
});

const messaging = firebase.messaging();
// Quando chegar push em segundo plano
// messaging.onBackgroundMessage(payload => {
// 	console.log("[SW] Push recebido:", payload);
// 	// console.log("link:", payload.data)
// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: "/chat-icon.png",
// 		image: payload.notification.body,
// 		webpush: {
// 			link: payload.fcm_options.link
// 		}
// 	}
// 	self.registration.showNotification(notificationTitle, notificationOptions);
// });
// self.addEventListener("notificationclick", event => {
//
// 	console.log("CLICK RECEBIDO");
//
// 	event.notification.close();
//
// 	const link = event.notification.fcm_options.link;
//
// 	console.log("LINK:", link);
//
// 	event.waitUntil(
// 		self.clients.openWindow("http://localhost:3000")
// 	);
//
// });
//
messaging.onBackgroundMessage((payload) => {
	console.log("[SW] Push recebido:", payload);

	const link =
		payload.fcm_options?.link ||
		"https://speakflowchat.vercel.app";

	self.registration.showNotification(payload.notification.title, {
		body: payload.notification.body,
		icon: "/chat-icon.png",
		data: {
			link: link,
		},
	});
});

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	const link = event.notification.data?.link || "https://speakflowchat.vercel.app";

	event.waitUntil(
		clients.matchAll({
			type: "window",
			includeUncontrolled: true,
		}).then((clientList) => {
			for (const client of clientList) {
				return client.focus().then(() => {
					return client.navigate(link);
				});
			}

			return clients.openWindow(link);
		})
	);
});
