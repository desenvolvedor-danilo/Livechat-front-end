import { useState } from "react";

export function useVisibility() {
  const [visibility, setVisibility] = useState(false)
  const handleVisibility = (e) => {
    e.preventDefault()
    setVisibility(!visibility)
  }
  return { visibility, handleVisibility }
}
