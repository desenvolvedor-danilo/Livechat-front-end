"use client"
import { useEffect, useState } from "react";
import { useNotifications } from "../componentes/custom-hooks/useNotifications";
import NavBar from "../componentes/ui/navBar";
import RequestNotifications from "../componentes/ui/requestNotification";
export default function Notifications() {
  const lastByUser = {}
  const [names, setNames] = useState({})
  const [show, setShow] = useState(false)
  let participante = []
  const { notifications, user } = useNotifications()

  if (Array.isArray(notifications)) {
    notifications.forEach(notification => {
      participante = notification.participantes.filter(part => part !== localStorage.getItem("email"))
      lastByUser[notification.id] = notification
    })
  }
  useEffect(() => {

    if (typeof window !== "undefined" && Notification.permission === "default") {
      setShow(true)

    } else {
      setShow(false)

    }
  }, [])

  useEffect(() => {
    if (!Array.isArray(notifications)) return
    notifications.forEach(async (notification) => {
      const email = notification.participantes.find(part => part !== localStorage.getItem("email"))
      const response = await fetch("/users/find-users?email=" + email, {
        credentials: "include"
      })
      const data = await response.json()
      if (!email || names[email]) return
      setNames(prev => ({
        ...prev,
        [email]: data.nome
      }))
    })

  }, [notifications])

  return (
    <>
      <div className="contacts-container" id="contacts">
        <header className="chat-header">
          <NavBar />
        </header>
        <div id="notifications" className="contact-list">
          {

            show &&
            <RequestNotifications />
          }
          {
            Object.values(lastByUser).map((msg, index) => (

              <a key={index} href={"/chat?user=" + msg.participantes.filter(part => part !== localStorage.getItem("email"))}
                className="contact-item online-contact">

                <img className="contact-avatar" src={user[msg.recipient]?.url || "/favicon.png"} width="50" height="25" style={{ objectFit: "cover" }} />
                <div className="contact-info">
                  <div className="">{names[msg.participantes.find(part => part !== localStorage.getItem("email"))]}</div>
                  <span className="contact-name">{msg.message}</span>
                  <span className="timeStamp">{msg.updatedAt}</span>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </>
  )
}
