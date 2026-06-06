import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client = null;
export function getClient() {
  if (client) return client

  const socket = new SockJS("https://dry-dsl-forwarding-proof.trycloudflare.com/buildrun-livechat-websocket?user=" + localStorage.getItem("email"));
  client = new Client({
    webSocketFactory: () => socket, reconnectDelay: 5000, debug: (str) => console.log(str)
  })
  client.activate()
  return client
}
