import { useState } from "react";

export function useError() {
  const [error, setError] = useState("")
  return { setError, error }
}
