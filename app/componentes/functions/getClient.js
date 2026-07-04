import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client = null;
export function getClient() {
  const PRODUCTION_WS_URL = "https://speakflow.ddns.net/buildrun-livechat-websocket?user="
  const LOCAL_WS_URL = "http://localhost:8080/buildrun-livechat-websocket?user="
  if (client) return client

  const socket = new SockJS(PRODUCTION_WS_URL + localStorage.getItem("email"));

  // const socket = new SockJS(LOCAL_WS_URL + localStorage.getItem("email"));

  client = new Client({
    webSocketFactory: () => socket, reconnectDelay: 5000,
    debug: (str) => console.log(str)
  })
  client.activate()
  return client
}
