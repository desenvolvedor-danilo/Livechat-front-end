import { useRef } from "react"

export async function getUser(email) {
  const user = useRef({})
  fetch("/users/find-users?email=" + email, {
    method: "GET",
    credentials: "include",
  }).then(res => {
    if (!res.ok) {
      RefreshToken()
      setLoaded(r => r + 1)
    } else {
      return res.json()
    }
  }).then((data) => {
    user.current = data
  }
  )
    .catch((err) =>
      console.log(err.message)
    )
  return user.current;
}
