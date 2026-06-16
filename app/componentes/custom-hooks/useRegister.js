'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useRegister() {
  const router = useRouter()
  const [user, setUser] = useState({
    nome: "",
    email: "",
    username: "",
    password: "",
  })
  const handleState = (ev) => {
    const { name, value } = ev.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = () => {
    fetch("/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080" },
      body: JSON.stringify(user)
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao efetuar cadastro verifique as informações cadastradas")
      }
      router.push("/")
    })
      .catch((error) => console.log(error.message))
  }
  return { user, handleState, handleSubmit }
}
