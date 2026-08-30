'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmail() {
  const [email, setEmail] = useState("")

  const router = useRouter()
  const handleEmail = () => {

    fetch("/users/get-code?email=" + email).then(res => {
      if (res.ok) {
        localStorage.setItem("email", email)
        router.push("/otp")
      }
    }).then(() => setEmail(""))
  }
  return (
    <>
      <main className="flex flex-col gap-10 justify-center items-center h-[90vh]">

        <h3 className="font-bold text-[#4a4ee0] text-xl">Digite seu email abaixo</h3>
        <div className="flex flex-row gap-2 justify-center items-center">
          <input className="h-[35px] border-none rounded-xl outline-none text-center" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />
        </div>


        <button className="btn btn-connect" onClick={handleEmail}>Enviar</button>

      </main>

    </>
  )
}
