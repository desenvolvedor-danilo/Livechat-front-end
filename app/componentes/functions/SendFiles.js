
export const SendFiles = async (input) => {
  try {
    let resp = await fetch("/files/save", {
      method: "POST",
      body: input,
      credentials: "include",
    })
    if (resp.status === 401) {
      await fetch("/refresh/token", {
        method: "POST",
        credentials: "include",
      })
        .then(async () => {

          resp = await fetch("/files/save", {
            method: "POST",
            body: input,
            credentials: "include",
          })
        })
    }
    console.log(resp)
    const response = await resp.json()
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}
