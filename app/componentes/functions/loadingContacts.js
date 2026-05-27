"use client"
import { useEffect, useState } from "react"
import { RefreshToken } from "./refreshToken"


export const loadingContacts = () => {

  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(0)

  useEffect(() => {
    fetch("/users/findall", {
      method: "GET",
      credentials: "include"
    }).then((resp) => {
      if (!resp.ok) {
        RefreshToken();
        setReload(r => r + 1)
        throw new Error(resp.status)
      } else {
        return resp.json()
      }
    }).then((data) => setUsers(data))
      .catch(() => {

      })
  }, [reload])
  return { users }
}
