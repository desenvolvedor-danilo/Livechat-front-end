
"use client"
import { useLoadMessages } from "../custom-hooks/useLoadMessages";
import { useMessage } from "../custom-hooks/useMessage";
import { useWebsocket } from "../custom-hooks/useWebsocket";
import NavBar from "./navBar.js";
import { hidedOrShowed } from "@/app/componentes/functions/hidedOrShowed";
import { useEffect, useRef, useState } from "react";
import { ChooseElementType } from "../utils/ChooseElementType";
import { TrashIcon } from "lucide-react";
export default function ChatContent() {
  const { messageServer, setMessageServer } = useWebsocket()
  const { editMessage, sendMessage, clientMessage, uploadFiles, startRecorder, stopRecorder, voiceEndRecording, isSelectedFile, clicked, timeFormated, recording } = useMessage();
  const open = useRef()
  const { messages, setMessages } = useLoadMessages()
  const { showUp, scrollRef } = hidedOrShowed()
  const messagesEndRef = useRef(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "auto",
      block: "end"
    })
  }, [messages, messageServer])
  const deleteMessage = (id) => {
    messages.map((msg) => {
      if (msg.id === id) {
        fetch("/private-messages/delete?id=" + id, {
          "method": "DELETE",
        }).then((res) => console.log(res.text()))
      }
    })

    messageServer.map((msg) => {
      if (msg.id === id) {
        fetch("/private-messages/delete?id=" + id, {
          "method": "DELETE",
        }).then((res) => console.log(res.text()))
      }
    })
    const newListMessages = messages.filter((msg) => msg.id !== id);
    setMessages(newListMessages)
    const newListMessagesServer = messageServer.filter(msg => msg.id !== id)
    setMessageServer(newListMessagesServer)
  }
  return (
    <main>
      <div className="w-full chat-container">

        <header className="chat-header">
          <NavBar />
        </header >
        <div id="chat" ref={scrollRef} onScroll={showUp} className=" flex flex-col break-words message-container">

          {
            Array.isArray(messages) &&
            messages.map((msg, index) => (
              (msg.from === localStorage.getItem("email") || msg.to === localStorage.getItem("email")) &&
              < div key={index} className={msg.from == localStorage.getItem("email") ? "msg-sent" : "msg-received"} > <div className={msg.from == localStorage.getItem("email") ? "username-sent" : "username-received"}>

                <button onClick={() => setOpenMenuId(openMenuId === msg.id ? null : msg.id)} className="flex flex-col items-center gap-0.5 items-end w-full h-full rounded-full hover:bg-white-100 transition-colors">
                  <span className={msg.from === localStorage.getItem("email") ? "w-0.5 h-0.5 bg-white rounded-full" : "w-0.5 h-0.5 bg-black rounded-full"}></span>
                  <span className={msg.from === localStorage.getItem("email") ? "w-0.5 h-0.5 bg-white rounded-full" : "w-0.5 h-0.5 bg-black rounded-full"}></span>
                  <span className={msg.from === localStorage.getItem("email") ? "w-0.5 h-0.5 bg-white rounded-full" : "w-0.5 h-0.5 bg-black rounded-full"}></span>
                </button>
                {openMenuId === msg.id && (
                  <div className="relative w-full">
                    <div className="absolute opacity-75  text-black bg-white  rounded-lg  overflow-hidden">
                      <button
                        onClick={() => {
                          deleteMessage(msg.id)
                          setOpenMenuId(null)
                        }}
                        className="px-1 py-1 text-sm hover:bg-gray-100 text-right"
                      >
                        <TrashIcon size={22} />
                      </button>
                    </div>
                  </div>
                )}

                {"~ " + msg.user}</div>{msg.message ? msg.message : ChooseElementType(msg.url)} < div className={msg.from == localStorage.getItem("email") ? "timestamp-sent" : "timestamp-received"} > {msg.time}</div></div>
            ))
          }
          {
            messageServer.map((msg, index) => (
              <div key={index} className={msg.from == localStorage.getItem("email") ? "msg-sent" : "msg-received"}><div className={msg.from == localStorage.getItem("email") ? "username-sent" : "username-received"}>

                {openMenuId === msg.id && (
                  <div className="relative w-full">
                    <div className="absolute opacity-75 text-black bg-white  rounded-lg  overflow-hidden">
                      <button
                        onClick={() => {
                          deleteMessage(msg.id)
                          setOpenMenuId(null)
                        }}
                        className="px-1 py-1 text-sm hover:bg-gray-100 text-right"
                      >
                        <TrashIcon size={22} />
                      </button>
                    </div>
                  </div>
                )}
                <button onClick={() => setOpenMenuId(openMenuId === msg.id ? null : msg.id)} className="flex flex-col items-center gap-0.5 items-end w-full h-full rounded-full hover:bg-white-100 transition-colors">
                  <span className={msg.from === localStorage.getItem("email") ? "w-0.5 h-0.5 bg-white rounded-full" : "w-0.5 h-0.5 bg-black rounded-full"}></span>
                  <span className={msg.from === localStorage.getItem("email") ? "w-0.5 h-0.5 bg-white rounded-full" : "w-0.5 h-0.5 bg-black rounded-full"}></span>
                  <span className={msg.from === localStorage.getItem("email") ? "w-0.5 h-0.5 bg-white rounded-full" : "w-0.5 h-0.5 bg-black rounded-full"}></span>
                </button>



                {"~ " + msg.user}</div>{!msg.message
                  ? ChooseElementType(msg.urlFile) : msg.message}<div className={msg.from == localStorage.getItem("email") ? "timestamp-sent" : "timestamp-received"}>{msg.createdAt} </div></div>
            ))
          }
          <div ref={messagesEndRef}></div>

        </div >
        <div className="flex flex-row justify-center items-center chat-input">
          {
            recording ? <span className="p-2 rounded-4"><div className="recording w-5">
              <span className="dot"></span>
              Gravando
            </div> {timeFormated}</span>
              :
              <>

                <textarea id="msgPrivate" placeholder="Digite sua mensagem..." name="message" value={clientMessage} onChange={editMessage}
                ></textarea>
                <div className="relative w-1 h-1 rounded-lg p-0">
                  <div role="button" className="absolute 
                bottom-[-20px] right-2 
                md:top-1 md:left-2 md:bottom-auto md:right-auto 
                bg-[#4b4ee8] text-white px-2 py-0 rounded-full" id="hiddenInput" onClick={() =>
                      open.current.click()
                    }>+</div>
                </div>
                <input ref={open} type="file" id="sendFiles" onChange={uploadFiles} />

              </>
          }
          {
            (clientMessage || voiceEndRecording || isSelectedFile) ?

              <button id="sendPrivate" onClick={sendMessage}>➤</button>
              :
              !recording ?
                <button id="gravacao" className={`flex justify-center items-center h-64 w-full ${clicked ? "scale-130" : "scale-100"}`}
                  onClick={startRecorder}
                >

                  <img id="botao-microfone" className="max-h-full max-w-full object-contain" src="/voice.png"
                    onContextMenu={(e) => e.preventDefault()} />
                </button>
                :

                <button id="gravacao" className={`h-64 ${clicked ? "scale-130" : "scale-100"}`}
                  onClick={stopRecorder}
                >

                  <img id="botao-microfone" className="object-contain max-w-full max-h-full mx-auto rounded-full object-center" src="/stop-button.svg"
                    onContextMenu={(e) => e.preventDefault()} />
                </button>


          }
        </div>

      </div >

      {/* <div className="fixed-bottom mb-5 ms-3 d-flex justify-content-end" style={{ pointerEvents: "none" }}> */}
      {/* <button ref={buttonRef} style={{ backgroundColor: "transparent", pointerEvents: "auto", display: isAtBottom || show ? "none" : "block" }} onClick={scrolling} type="button" className="mb-5 btn btn-info w-25 fw-light rounded-circle fw-bolder fs-1"><div className="rounded-circle border-white" style={{ width: "40px", height: "38px", backgroundColor: "#E5E5EA" }}>↓</div></button> */}
      {/* </div> */}
    </main >
  )
}
