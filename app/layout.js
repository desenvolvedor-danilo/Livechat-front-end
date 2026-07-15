import { Geist, Geist_Mono } from "next/font/google";
//import "bootstrap/dist/css/bootstrap.min.css"
import "./css/main.css"
import "./css/notification.css"
import "./css/globals.css";
import "./css/list-contacts.css"
import FirebaseServiceWorker from "./componentes/ui/workerRegistration";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Speakflow chat",
  description: "Aqui a conversa flui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt"
      className={`${geistSans.variable} ${geistMono.variable}`}>

      <body>
        <FirebaseServiceWorker />
        {children}
      </body>
    </html>
  );
}
