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
      <div className="flex-col break-all justify-center gap-2" id="contacts">
        <header className="chat-header">
          <NavBar />
        </header>
        <div id="notifications" className="break-words contact-list">
          {

            show &&
            <RequestNotifications />
          }
          {
            Object.values(lastByUser).map((msg, index) => (

              <a key={index} href={"/chat?user=" + msg.participantes.filter(part => part !== localStorage.getItem("email"))}
                className="flex flex-row break-words justify-start gap-2 contact-item online-contact">

                <img className="self-start w-14 h-14 rounded-full Object-cover Object-center shrink-0" src={user[msg.participantes.find(part => part !== localStorage.getItem("email"))]?.url || "/favicon.png"} />
                <div className="contact-info">
                  <div className="">{names[msg.participantes.find(part => part !== localStorage.getItem("email"))]}</div>
                  <span className=" contact-name">{msg.message}</span>
                  <span className="self-end">{msg.updatedAt}</span>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </>
  )
}
