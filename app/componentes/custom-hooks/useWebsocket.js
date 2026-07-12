"use client"

import { useEffect, useRef, useState } from "react"
import { getClient } from "../functions/getClient"

export function useWebsocket() {
  const clientSocket = useRef(null)
  const [messageServer, setMessageServer] = useState([])
  const [lastSender, setLastSender] = useState("")
  const [messageDeleted, setMessageDeleted] = useState(null)
  useEffect(() => {
    let subscription = null
    let isConnect = false
    clientSocket.current = getClient()
    clientSocket.current.onConnect = () => {
      console.log("conectado")
      subscription = clientSocket.current.subscribe("/user/queue/message", (message) => {
        if (JSON.parse(message.body).type === "MESSAGE_DELETE") {
          setMessageDeleted(JSON.parse(message.body).id)

          setMessageServer(prev => prev.filter(msg => msg.id !== JSON.parse(message.body).id))
        } else {
          setMessageServer((prev) => [...prev, { ...JSON.parse(message.body) }])

          editLastSender(JSON.parse(message.body))

        }
      })

    }
    if (subscription) {
      clientSocket.current.unsubscribe()
    }
    //client.activate()
    //    clientSocket.current = client
    if (clientSocket.current && isConnect) {
      clientSocket.current.deactivate()
    }
  }, [])

  const editLastSender = (msg) => {
    setLastSender(msg.from);
  }
  return { lastSender, messageServer, setMessageServer, messageDeleted }
}
