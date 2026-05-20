
export const RefreshToken = async () => {
  try {
    const res = await fetch("/refresh/token", {
      method: "POST",
      credentials: "include"
    }
    )
    const json = await res.json()
    return json;
  } catch (error) {
    console.log(error.message)
  }
}
