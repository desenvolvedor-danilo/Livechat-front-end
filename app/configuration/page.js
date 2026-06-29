"use client"
import NavBar from "../componentes/ui/navBar";
import { useConfiguration } from "../componentes/custom-hooks/useConfiguration";
import { useRef } from "react";
import { useUploadFiles } from "../componentes/functions/uploadFiles";
export default function Configuration() {
  const { photoProfile } = useConfiguration()
  const uploadProfileRef = useRef()
  const { sendPhoto, upload, isSelected, url } = useUploadFiles()
  console.log(photoProfile)

  return (
    <>

      <div className="container mx-auto px-1">
        <header className="chat-header">
          <NavBar />
        </header>
        <div id="profile" className="container mx-auto px-1 text-center">
          <a href="#" className="text-[1.6em]  text-decoration-none fw-bolder fs-2 mt-2 align-self-center" style={{ color: "#4a4ee0" }}>Perfil</a>
          <input type="file" className="hidden" ref={uploadProfileRef} onChange={(e) => upload(e)} accept="image/*" id="inputPreview" />
          <img onClick={() => uploadProfileRef.current.click()} src={url ? url : photoProfile && photoProfile.url} className="mx-auto rounded-[100%]" id="imagePreview" width="150" height="150" alt="photoProfile" />
          {/* <input type="file" ref={uploadProfileRef} className="hidden" onChange={(e) => upload(e)} /> */}
          {
            isSelected &&
            <button style={{ backgroundColor: "#4a4ee0", color: "white", width: "100px", margin: "auto", padding: "2px", borderRadius: "10px", fontFamily: "ui-rounded" }} onClick={sendPhoto}>Salvar</button>
          }
          <h3 className="text-center text-[1.6em]" style={{ color: "#4a4ee0" }}>{photoProfile.nome}</h3>
        </div>
      </div>
    </>
  )
}
