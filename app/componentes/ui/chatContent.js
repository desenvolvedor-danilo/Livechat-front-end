
"use client"
import { useLoadMessages } from "../custom-hooks/useLoadMessages";
import { useMessage } from "../custom-hooks/useMessage";
import { useWebsocket } from "../custom-hooks/useWebsocket";
import NavBar from "./navBar.js";
import { hidedOrShowed } from "@/app/componentes/functions/hidedOrShowed";
import { useRef } from "react";
import { ChooseElementType } from "../utils/ChooseElementType";
import { Player } from "../functions/player";
import { GetToken, requestPermissionNotification } from "../functions/getToken";

export default function ChatContent() {
  const { messageServer } = useWebsocket()
  const { editMessage, sendMessage, clientMessage, uploadFiles, startRecorder, stopRecorder, voiceEndRecording, isSelectedFile, clicked, timeFormated, recording } = useMessage();
  const open = useRef()
  const { messages } = useLoadMessages()
  const { buttonRef, show, showUp, isAtBottom, scrolling, scrollRef } = hidedOrShowed()
  const { requestPermissionNotification } = GetToken()
  // const requestPermission = async () => {
  //   const permission = await Notification.requestPermission()
  //   if (permission === "granted") {
  //     alert("Notificação permitida")
  //   }
  // }
  return (
    <main>
      <div className="chat-container">
        <header className="chat-header">
          <NavBar />
        </header >
        <div id="chat" ref={scrollRef} onScroll={showUp} className="message-container">

          {
            Array.isArray(messages) &&
            messages.map((msg, index) => (
              (msg.from === localStorage.getItem("email") || msg.to === localStorage.getItem("email")) &&
              < div key={index} className={msg.from == localStorage.getItem("email") ? "msg-sent" : "msg-received"} > <div className={msg.from == localStorage.getItem("email") ? "username-sent" : "username-received"}>{"~ " + msg.user}</div>{msg.message ? msg.message : ChooseElementType(msg.url)} < div className={msg.from == localStorage.getItem("email") ? "timestamp-sent" : "timestamp-received"} > {msg.time}</div></div>
            ))
          }
          {

            messageServer.map((msg, index) => (
              <div key={index} className={msg.from == localStorage.getItem("email") ? "msg-sent" : "msg-received"}><div className={msg.from == localStorage.getItem("email") ? "username-sent" : "username-received"}>{"~ " + msg.user}</div>{!msg.message
                ? ChooseElementType(msg.urlFile) : msg.message}<div className={msg.from == localStorage.getItem("email") ? "timestamp-sent" : "timestamp-received"}>{msg.createdAt} </div></div>
            ))
          }

        </div >
        <div className="chat-input">
          {
            recording ? <span className="p-2 rounded-4"><div className="recording w-5">
              <span className="dot"></span>
              Gravando
            </div> {timeFormated}</span>
              :
              <>
                <textarea id="msgPrivate" placeholder="Digite sua mensagem..." name="message" value={clientMessage} onChange={editMessage} onClick={requestPermissionNotification
                } ></textarea>
                <h1 role="button" className="custom-absolute" id="hiddenInput" onClick={() =>
                  open.current.click()
                }>+</h1>
                <input ref={open} type="file" id="sendFiles" onChange={uploadFiles} />
              </>
          }
          {
            (clientMessage || voiceEndRecording || isSelectedFile) ?

              <button id="sendPrivate" onClick={sendMessage}>➤</button>
              :

              <button id="gravacao" className={`flex justify-center items-center h-64 w-full ${clicked ? "scale-130" : "scale-100"}`}
                onPointerDown={startRecorder} onPointerUp={stopRecorder}
                onPointerLeave={stopRecorder}
              >

                <img id="botao-microfone" className="max-h-full max-w-full  object-contain" src="/voice.png"
                  onContextMenu={(e) => e.preventDefault()} />
              </button>

          }
        </div>
      </div >
      <div className="fixed-bottom mb-5 ms-3 d-flex justify-content-end" style={{ pointerEvents: "none" }}>
        <button ref={buttonRef} style={{ backgroundColor: "transparent", pointerEvents: "auto", display: isAtBottom || show ? "none" : "block" }} onClick={scrolling} type="button" className="mb-5 btn btn-info w-25 fw-light rounded-circle fw-bolder fs-1"><div className="rounded-circle border-white" style={{ width: "40px", height: "38px", backgroundColor: "#E5E5EA" }}>↓</div></button>
      </div>
    </main>
  )
}
