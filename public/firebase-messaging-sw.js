
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
// messaging.onBackgroundMessage((payload) => {
// 	console.log("[SW] Push recebido:", payload);
//
// 	const link =
// 		payload.fcmOptions?.link ||
// 		"https://speakflowchat.vercel.app";
// 	console.log("[SW] LINK EXTRAÍDO:", link);
// 	self.registration.showNotification(payload.notification.title, {
// 		body: payload.notification.body,
// 		icon: "/speakflow.png",
// 		data: {
// 			link: link,
// 		},
// 	});
// });
messaging.onBackgroundMessage((payload) => {
	console.log("[SW] Push recebido:", payload);

	const title = payload.data?.title || "SpeakFlow";
	const body = payload.data?.body || "Nova mensagem";

	const link =
		payload.data?.link ||
		"https://speakflowchat.vercel.app";

	const options = {
		body,
		icon: "/speakflow.png",
		data: {
			link,
		},
	}
	if (payload.data?.image) {
		options.image = payload.data.image
	}
	return self.registration.showNotification(title, options);
})
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
