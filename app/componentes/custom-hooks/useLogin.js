"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })
  const handleState = (ev) => {
    const { name, value } = ev.target
    setLogin(prev => ({ ...prev, [name]: value }))
  }
  const fetchLogin = () => {
    fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    }).then(res => {
      if (!res.ok) {

        throw new Error("Erro de login verifique o usuario/senha e tente novamente")
      }
      localStorage.setItem("email", login.email)
      document.cookie = `email = ${localStorage.getItem("email")}`

      console.log(document.cookie)
      router.push("/notifications")

      console.log(res.text())
    })
      .catch(err => console.log(err.message))

  }
  return { login, handleState, fetchLogin }
}
