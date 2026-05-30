
export const SendFiles = async (input) => {
  try {
    let resp = await fetch("https://livechat-0380.onrender.com/files/save", {
      method: "POST",
      body: input,
      credentials: "include",
    })
    if (resp.status === 401) {
      await fetch("https://livechat-0380.onrender.com/refresh/token", {
        method: "POST",
        credentials: "include",
      })
        .then(async () => {

          resp = await fetch("https://livechat-0380.onrender.com/files/save", {
            method: "POST",
            body: input,
            credentials: "include",
          })
        })
    }
    const response = await resp.json()
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}
