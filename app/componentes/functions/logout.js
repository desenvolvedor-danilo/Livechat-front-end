import { useRouter } from "next/navigation"

export function logout() {
  const router = useRouter()
  fetch("/users/logout", {
    method: "POST"
  }).then((res) => {
    if (res.ok) {
      router.push("/")
    }
  })
}
