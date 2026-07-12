import { Player } from "../functions/player"
import { ExtractExtension } from "./ExtractExtension"

export function ChooseElementType(msg) {
  if (!msg) return null
  if (msg) {
    if (ExtractExtension(msg) === "jpg" || ExtractExtension(msg) === "png") {
      return (
        <img src={msg} style={{ maxWidth: "100%", height: "auto" }} />
      )
    }
    if (ExtractExtension(msg) === "mp4") {
      return (
        <video controls width={"99%"}>
          <source src={msg} type="video/mp4" />
        </video>
      )
    }
    if (ExtractExtension(msg) === "PDF" || ExtractExtension(msg) === "pdf") {
      return (<iframe name="arquivo-pdf" src={msg} width="100%" height="200px">
        <p>Seu navegador não suporta visualização de PDFs.
          <a href={msg}>Clique aqui para baixar.</a></p>
      </iframe>
      )
    }
    if (ExtractExtension(msg) === "webm") {
      return (
        //  <audio controls style={{ width: "99%" }}>
        // <source src={msg} type="audio/webm" />
        // </audio>
        <Player src={msg} />
      )
    }
  }
}
