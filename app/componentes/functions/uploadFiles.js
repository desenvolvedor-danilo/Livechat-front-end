import { useRef, useState } from "react";

export function useUploadFiles() {
  const imageRef = useRef(null)
  const [isSelected, setIsSelected] = useState(false)
  const [url, setUrl] = useState("")
  const upload = (e) => {
    imageRef.current = e.target.files[0]
    setUrl(URL.createObjectURL(e.target.files[0]))
    setIsSelected(true)
  }
  const sendPhoto = () => {
    const formdata = new FormData()
    formdata.append("file", imageRef.current)
    // const link = URL.createObjectURL(formdata)
    //console.log(link)
    fetch("/users/photo-profile?email=" + localStorage.getItem("email"), {
      method: "POST",
      body: formdata,
      credentials: "include"
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => imageRef.current = null)
      .then(() => setIsSelected(false))
  }
  return { upload, sendPhoto, imageRef, isSelected, url }
}
