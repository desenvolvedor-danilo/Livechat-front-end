"use client"

import { RefreshToken } from "../functions/refreshToken"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useWebsocket } from "./useWebsocket"

export const useLoadMessages = () => {
  const { messageServer, setMessageServer, messageDeleted } = useWebsocket()
  const [messages, setMessages] = useState([])
  const [reload, setReload] = useState(0)
  const param = useSearchParams()

  const messagesEndRef = useRef(null)

  const to = param.get("user")

  const deleteMessage = (
    id
  ) => {
    fetch("/private-messages/delete?id=" + id, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setMessageServer(prev => prev.filter(msg => msg.id !== id))
      }
    })
  }
  const deleteMessageDatabase = (
    id
  ) => {
    fetch("/private-messages/delete?id=" + id, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id))

    })
  }

  useEffect(() => {

    console.log("useEffect rodou. reload:", reload)
    if (!to) return
    fetch(`/private-messages/find?to=${to}&from=${localStorage.getItem("email")}`, {
      credentials: "include"
    }).then(res => {
      if (res.status === 401) {
        RefreshToken()
        setReload(r => r + 1)
      } else {
        return res.json()

      }
    }).then(data => setMessages(data))
      .catch(error => {
        console.log(error.message)
      })


  }, [to, reload])

  useEffect(() => {
    if (!messageDeleted) return

    setMessages(prev =>
      prev.filter(
        msg => String(msg.id) !== String(messageDeleted)
      )
    )
  }, [messageDeleted])


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end"
    })
  }, [messages, messageServer])


  return { messages, messageServer, deleteMessage, deleteMessageDatabase, messagesEndRef }
} 
