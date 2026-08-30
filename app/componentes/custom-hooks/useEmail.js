import { useState } from "react"
import { fetchDataForParam } from "../functions/fetchData"

export function useEmail() {
  const [email, setEmail] = useState("")
  const response = fetchDataForParam("http://localhost:8080/users/get-code", "email", email)
  return { setEmail, email, response }
}
