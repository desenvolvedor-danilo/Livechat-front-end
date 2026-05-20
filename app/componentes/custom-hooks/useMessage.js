"use client"
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { getClient } from "../functions/getClient";
import { SendFiles } from "../functions/SendFiles";

export const useMessage = () => {

  const mediaRecorder = useRef();
  const audioChunks = useRef([])
  const [voiceEndRecording, setEndRecording] = useState(false)
  const [isSelectedFile, setIsSelectedFile] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)


  const clientSocket = useRef()
  const param = useSearchParams()
  const formadataRef = useRef(null)

  const [clientMessage, setClientMessage] = useState("");
  const editMessage = (ev) => {
    setClientMessage(ev.target.value)
  }
  const uploadFiles = (e) => {
    formadataRef.current = e.target.files[0]
    setIsSelectedFile(true)

  }

  const startRecorder = async () => {


    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    mediaRecorder.current = new MediaRecorder(stream)
    mediaRecorder.current.ondataavailable = event => {
      audioChunks.current.push(event.data);
    }
    mediaRecorder.current.onstop = () => {
      const audio = new Blob(audioChunks.current, {
        type: "audio/webm"
      })
      setAudioBlob(audio)
      stream.getTracks().forEach(track => track.stop());
      setEndRecording(true)
    }
    mediaRecorder.current.start()
  }



  const stopRecorder = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()

    }


  }
  const sendMessage = async () => {

    let response = null
    if (formadataRef.current) {
      console.log("Entrou na condicao: ", formadataRef.current)
      const formdata = new FormData()
      formdata.append("file", formadataRef.current)
      response = await SendFiles(formdata)
    }
    if (audioBlob) {
      const audioFormData = new FormData()
      audioFormData.append("file", audioBlob, `audio-${Date.now()}.webm`)
      response = await SendFiles(audioFormData)
      setAudioBlob(null)
    }


    console.log("Aqui está a resposta: ", response)
    clientSocket.current = getClient()
    const target = param.get("user")
    clientSocket.current.publish({
      destination: "/app/chat/private/",
      body: JSON.stringify({
        to: target !== localStorage.getItem("email") && target, from: localStorage.getItem("email"), message: response ? null : clientMessage, urlFile: response?.url || null
      })
    })
    setClientMessage("")
    setEndRecording(false)
    setIsSelectedFile(false)
    //    response = null
    audioChunks.current = []
  }
  return { editMessage, sendMessage, clientMessage, uploadFiles, startRecorder, stopRecorder, voiceEndRecording, audioBlob, isSelectedFile }
}
