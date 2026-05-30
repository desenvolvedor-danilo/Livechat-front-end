
export const RefreshToken = async () => {
  try {
    const res = await fetch("https://livechat-0380.onrender.com/refresh/token", {
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
