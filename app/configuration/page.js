"use client"
import NavBar from "../componentes/ui/navBar";
import { useConfiguration } from "../componentes/custom-hooks/useConfiguration";
export default function Configuration() {
  const { photoProfile } = useConfiguration()


  return (
    <>

      <div className="chat-container">
        <header className="chat-header">
          <NavBar />
        </header>
        <div id="profile" className="d-flex flex-column gap-3 shadow-lg">
          <a href="#" className="text-decoration-none text-primary fw-bolder fs-2 mt-2 align-self-center">Perfil</a>
          <input type="file" accept="image/*" className="d-none" id="inputPreview" />
          <img src={photoProfile ? photoProfile.url : "/favicon.png"} className="align-self-center rounded-circle object-fit-cover" id="imagePreview" width="100" height="100" alt="photoProfile" />
          <h3 className="text-center">{photoProfile.nome}</h3>
        </div>
      </div>
    </>
  )
}
