"use client";

import { useEffect } from "react";

export default function FirebaseServiceWorker() {

  useEffect(() => {

    if ("serviceWorker" in navigator) {

      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(registration => {
          console.log("SW registrado", registration);
        })
        .catch(err => {
          console.log("Erro SW", err);
        });

    }

  }, []);

  return null;
}
