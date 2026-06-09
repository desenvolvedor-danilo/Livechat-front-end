import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client = null;
export function getClient() {
  if (client) return client

  const socket = new SockJS("https://speakflow.ddns.net/buildrun-livechat-websocket?user=");

  //  const socket = new SockJS("https://speakflow.ddns.net/buildrun-livechat-websocket")
  client = new Client({
    webSocketFactory: () => socket, reconnectDelay: 5000,
    connectHeaders: { user: localStorage.getItem("email") },
    debug: (str) => console.log(str)
  })
  client.activate()
  return client
}
