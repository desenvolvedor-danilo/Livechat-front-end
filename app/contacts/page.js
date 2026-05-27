"use client"
import NavBar from "../componentes/ui/navBar";
import Image from "next/image";

import { loadingContacts } from "../componentes/functions/loadingContacts";

export default function contacts() {

  const { users } = loadingContacts()
  console.log(users)
  return (
    <>
      <div className="contacts-container" id="contacts">
        <header className="chat-header">
          <NavBar />
        </header>
        <main id="contactList" className="contact-list">
          {
            Array.isArray(users) &&
            users.map((user, index) => (
              user.email !== localStorage.getItem("email") &&

              <a key={index} href={`chat?user=${user.email}`} className="contact-item online-contact">
                <Image style={{ objectFit: "cover" }} className="contact-avatar" src={user.url !== null ? user.url : "http://localhost:8080/icons/avatar.png"} alt="picture profile" height={100} width={100} />
                <div className="contact-info">
                  <span className="contact-name">{user.nome}</span>
                </div>
              </a>
            ))
          }
        </main>
      </div>
    </>
  )
}
