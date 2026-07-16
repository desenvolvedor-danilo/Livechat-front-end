import { Geist, Geist_Mono } from "next/font/google";
//import "bootstrap/dist/css/bootstrap.min.css"
import "./css/main.css"
import "./css/notification.css"
import "./css/globals.css";
import "./css/list-contacts.css"
import FirebaseServiceWorker from "./componentes/ui/workerRegistration";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Speakflow Chat",
  description: "Aqui a conversa flui",
  applicationName: "Speakflow Chat"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt"
      className={`${geistSans.variable} ${geistMono.variable}`}>

      <body>
        <FirebaseServiceWorker />
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JCRR8G5JS1"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-JCRR8G5JS1');
        `}
        </Script>
      </body>

    </html>
  );
}
