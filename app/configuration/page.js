"use client"
import NavBar from "../componentes/ui/navBar";
import { useConfiguration } from "../componentes/custom-hooks/useConfiguration";
import { useRef } from "react";
import { useUploadFiles } from "../componentes/functions/uploadFiles";
export default function Configuration() {
  const { photoProfile } = useConfiguration()
  const uploadProfileRef = useRef()
  const { sendPhoto, upload, imageRef, isSelected, url } = useUploadFiles()
  console.log(photoProfile)

  return (
    <>

      <div className="chat-container">
        <header className="chat-header">
          <NavBar />
        </header>
        <div id="profile" className="d-flex flex-column gap-3 shadow-lg">
          <a href="#" className="text-decoration-none fw-bolder fs-2 mt-2 align-self-center" style={{ color: "#4a4ee0" }}>Perfil</a>
          <input type="file" accept="image/*" className="d-none" id="inputPreview" />
          <img onClick={() => uploadProfileRef.current.click()} src={url ? url : photoProfile && photoProfile.url} className="align-self-center rounded-circle object-fill" id="imagePreview" width="100" height="100" alt="photoProfile" />
          <input type="file" ref={uploadProfileRef} style={{ display: "none" }} onChange={(e) => upload(e)} />
          {
            isSelected &&
            <button style={{ backgroundColor: "#4a4ee0", color: "white", width: "100px", margin: "auto", padding: "2px", borderRadius: "10px", fontFamily: "ui-rounded" }} onClick={sendPhoto}>Salvar</button>
          }
          <h3 className="text-center" style={{ color: "#4a4ee0" }}>{photoProfile.nome}</h3>
        </div>
      </div>
    </>
  )
}
