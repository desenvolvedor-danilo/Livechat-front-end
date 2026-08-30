"use client"
import { useState } from "react"
import ErrorUI from "../componentes/ui/ErrorUI"
import { useRouter } from "next/navigation"

export default function OTP() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [code, setCode] = useState("")
  const handleCode = () => {
    fetch("/users/verify-code?code=" + code, {
      method: "POST"
    }).then(async (res) => {
      if (!res.ok) {

        const resp = await res.json();
        if (resp.message === "Hash code not found") {
          setError("Código digitado inválido");
        }

      } else {

        router.push("/resetar/senha")
      }

    })
  }
  return (
    <>


      <main className="flex h-[90vh] flex-col justify-center items-center gap-15 text-center" >

        {
          error &&
          <section>
            <ErrorUI message={error} />
          </section>
        }
        <p className="font-bold text-xl text-[#4a4ee0]">Digite o codigo de verificação abaixo para mudar a sua senha</p>


        <div className="bg-[#fefefe] h-11 rounded-full">
          <input className="h-9 text-center border-none outline-none" type="text" placeholder="Código de verificação" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>

        <button className="btn btn-connect text-[#ffffff] border-1 rounded-xl bg-[#4a4ee0] p-3" onClick={handleCode}>Verificar</button>
      </main>
    </>
  )
}
