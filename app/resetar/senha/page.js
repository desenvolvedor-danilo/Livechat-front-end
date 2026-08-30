"use client"

import { useVisibility } from "@/app/componentes/custom-hooks/useVisibility"
import ErrorUI from "@/app/componentes/ui/ErrorUI"
import SuccessfullyUI from "@/app/componentes/ui/SuccessfullyUI"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [passwordVerify, setPasswordVerify] = useState("")
  const [error, setError] = useState(false)
  const { visibility, handleVisibility } = useVisibility()
  const [successfully, setSuccessfully] = useState(false)
  const router = useRouter()
  const handlePassword = () => {
    setPassword("")
    setPasswordVerify("")
    const email = localStorage.getItem("email")
    if (password !== passwordVerify) {
      throw new Error("Campo verificar senha precisa ter a senha igual ao campo anterior")
    }
    fetch("/users/redifine-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    }).then((res) => {
      if (res.ok) {
        setSuccessfully(true)
        localStorage.clear();
        setTimeout(() => {
          router.push("/")
        }, 5000)

      } else {
        setPasswordVerify(false)
      }
      console.log(res.status)
    })
  }
  return (
    <>

      <div id="main-container" className="card-form container mx-auto px-4">
        {
          successfully && <SuccessfullyUI message={"A senha foi alterada com sucesso, você será automaticamente redirecionada para tela de login"} />
        }
        <form>

          <h2 className="text-[1.3em]">Digite a nova senha</h2>
          <div className="form-group relative w-full">



            <input type={visibility ? "text" : "password"} id="senha" placeholder="Digite sua senha" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={handleVisibility}>{visibility ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />
            }</button>
          </div>

          <div className="form-group relative w-full">
            <input type={visibility ? "text" : "password"} id="senha" placeholder="Digite sua senha" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10" name="password" value={passwordVerify} onChange={(e) => {
              setPasswordVerify(e.target.value)
              if (password !== e.target.value) {
                setError(true)
              } else {
                setError(false)
              }
            }
            } />


            <button type="button" className="absolute top-1/2 -translate-y-1/2 right-3" onClick={handleVisibility}>{visibility ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />
            }</button>

          </div>

          {
            error &&
            <ErrorUI message={"Você precisa digitar a mesma senha do passo anterior"} />
          }

          <button type="button" className="btn btn-connect text-[#ffffff] border-1 rounded-xl bg-[#4a4ee0] p-3" onClick={handlePassword}>Verificar</button>
        </form>
      </div>
    </>
  )
}
