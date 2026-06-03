"use client"
import { useEffect, useState } from "react";
import { RefreshToken } from "@/app/componentes/functions/refreshToken";

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loaded, setLoaded] = useState(0)
  const [user, setUser] = useState({})
  useEffect(() => {
    fetch("/conversas/private?from=" + localStorage.getItem("email"), {
      credentials: "include"
    }).then((res) => {
      if (res.status === 401) {
        RefreshToken()
        setLoaded(r => r + 1)
      } else {
        return res.json()
      }
    }).then(async (data) => {
      const dado = data.map((msg) => msg.participantes.filter(p => p !== localStorage.getItem("email"))).flat()
      setNotifications(data)


      const response = await Promise.all(
        dado.map(data =>
          fetch("/users/find-users?email=" + data, {
            credentials: "include"
          }).then(res => res.json())

        )
      )
      const usersMap = {}
      response.forEach(user => {
        usersMap[user.nome] = user;
      })
      setUser(usersMap)
    })
      .catch(err => console.log(err.message))
  }, [loaded])
  return { notifications, user }
}
