"use client"
import { useNotifications } from "../componentes/custom-hooks/useNotifications";
import NavBar from "../componentes/ui/navBar";
export default function Notifications() {

  const lastByUser = {}
  let participante = []
  const { notifications, user } = useNotifications()
  if (Array.isArray(notifications)) {
    notifications.forEach(notification => {

      participante = notification.participantes.filter(part => part !== localStorage.getItem("email"))
      lastByUser[notification.id] = notification
    })
  }

  return (
    <>
      <div className="contacts-container" id="contacts">
        <header className="chat-header">
          <NavBar />

          {/* <div className="container-fluid"> */}
          {/*   <Link className="navbar-brand text-white" id="name" href="#" /> */}
          {/*   <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" */}
          {/*     data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" */}
          {/*     aria-label="Toggle navigation"> */}
          {/*     <span className="navbar-toggler-icon text-white"></span> */}
          {/*   </button> */}
          {/*   <div className="collapse navbar-collapse text-white" id="navbarNavAltMarkup"> */}
          {/**/}
          {/*   </div> */}
          {/* </div> */}
        </header>
        <div id="notifications" className="contact-list">
          {

            Object.values(lastByUser).map((msg, index) => (
              <a key={index} href={"/chat?user=" + msg.participantes.filter(part => part !== localStorage.getItem("email"))} className="contact-item online-contact">
                <img className="contact-avatar" src={user[msg.recipient]?.url || "/favicon.png"} width="50" height="25" style={{ objectFit: "cover" }} />
                <div className="contact-info">
                  <div className="">{msg.recipient}</div>
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
