import { cookies } from "next/headers";

export const getCookie = async (nameCookie) => {
  const cookie = await cookies()
  const email = cookie.get(nameCookie)
  return email;
}
