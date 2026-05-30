"use client"

import { RefreshToken } from "@/app/componentes/functions/refreshToken"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useLoadMessages = () => {
  const [messages, setMessages] = useState([])
  const [reload, setReload] = useState(0)
  const param = useSearchParams()
  useEffect(() => {
    const to = param.get("user")
    fetch(`https://livechat-0380.onrender.com/private-messages/find?to=${to}&from=${localStorage.getItem("email")}`, {
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


  }, [reload])
  return { messages }
} 
