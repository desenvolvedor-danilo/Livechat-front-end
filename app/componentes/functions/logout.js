import { useRouter } from "next/navigation"

export function logout() {
  const router = useRouter()
  fetch("/users/logout").then((res) => {
    if (res.ok) {
      router.push("/")
    }
  })
}
