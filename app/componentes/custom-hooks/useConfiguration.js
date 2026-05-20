import { RefreshToken } from "@/app/server-side-functions/refreshToken"
import { useEffect, useState } from "react"

export function useConfiguration() {

  const [photoProfile, setPhotoProfile] = useState({})
  const [loaded, setLoaded] = useState(0)
  useEffect(() => {
    fetch("/users/find-users?email=" + localStorage.getItem("email"), {
      method: "GET",
      credentials: "include",
    }).then(res => {
      if (!res.ok) {
        RefreshToken()
        setLoaded(r => r + 1)
      } else {
        return res.json()
      }
    }).then((data) => setPhotoProfile(data))
      .catch((err) =>
        console.log(err.message)
      )
  }, [loaded])
  return { photoProfile }
}
