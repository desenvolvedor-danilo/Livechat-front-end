'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useError } from "./useError";

export function useRegister() {
  const { error, setError } = useError()
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
    }).then(async (res) => {
      if (!res.ok) {

        const errorData = await res.json()
        if (errorData.message === "The email is already registered")
          setError("O e-mail já está cadastrado")
        throw new Error("O e-mail já está cadastrado")
      }

      router.push("/")
    })
      .catch((error) => console.log(error.message))
  }
  return { user, handleState, handleSubmit, error }
}
