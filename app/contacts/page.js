"use client"
import NavBar from "../componentes/ui/navBar";
import Image from "next/image";

import { loadingContacts } from "../componentes/functions/loadingContacts";

export default function contacts() {

  const { users } = loadingContacts()
  console.log(users)
  return (
    <>
      <div className="flex-col justify-center gap-2" id="contacts">
        <header className="chat-header">
          <NavBar />
        </header>
        <main id="contactList" className="contact-list">
          {
            Array.isArray(users) &&
            users.map((user, index) => (
              user.email !== localStorage.getItem("email") &&

              <a key={index} href={`chat?user=${user.email}`} className=" flex flex-row w-full justify-start gap-4 contact-item online-contact break-words">

                <Image className="self-start w-14 h-14 rounded-full Object-cover Object-center shrink-0" width={100} height={100} src={user?.url || "/favicon.png"} alt="picture profile" />
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
