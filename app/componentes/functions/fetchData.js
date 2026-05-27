"use client"
import { RefreshToken } from "@/app/componentes/functions/refreshToken"
export function fetchData(url, hasBody, method = "GET", headers = null, body = null, state, iterator) {
  fetch(url, hasBody ? {
    method: method,
    headers: headers,
    credentials: "include",
    body: body
  } : {
    method: method,
    credentials: "include"
  }).then((res) => {
    if (res.status === 403) {
      RefreshToken()
      iterator(r => r + 1)
    } else {
      return res.json()
    }
  }).then(data => state(data))
    .catch(err => {
      console.log(err)
    })
}
