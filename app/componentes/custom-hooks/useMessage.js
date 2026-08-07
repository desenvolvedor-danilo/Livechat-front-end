"use client"
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { getClient } from "../functions/getClient";
import { SendFiles } from "../functions/SendFiles";
import fixWebmDuration from "fix-webm-duration";

export const useMessage = () => {

  const mediaRecorder = useRef();
  const audioChunks = useRef([])
  const [voiceEndRecording, setEndRecording] = useState(false)
  const [isSelectedFile, setIsSelectedFile] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)

  const [clicked, setClicked] = useState(false)
  const clientSocket = useRef()
  const param = useSearchParams()
  const formadataRef = useRef(null)
  const timerRef = useRef()
  const [recording, setRecording] = useState(false)
  const [timeFormated, setTimeFormated] = useState(null)

  const [clientMessage, setClientMessage] = useState("");
  const editMessage = (ev) => {
    setClientMessage(ev.target.value)
  }
  const uploadFiles = (e) => {
    formadataRef.current = e.target.files[0]
    setIsSelectedFile(true)

  }

  const startRecorder = async (e) => {

    setRecording(true)
    const init = Date.now()
    setTimeFormated("0:00")

    e.preventDefault()
    setClicked(true)

    audioChunks.current = []
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
    mediaRecorder.current = new MediaRecorder(stream)
    mediaRecorder.current.ondataavailable = event => {
      audioChunks.current.push(event.data);
    }
    mediaRecorder.current.onstop = async () => {
      const audio = new Blob(audioChunks.current, {
        type: "audio/webm"
      })

      const duration = Date.now() - init
      const fixedBlob = await fixWebmDuration(audio, duration)
      setAudioBlob(fixedBlob)
      stream.getTracks().forEach(track => track.stop());
      setClicked(false)
      setRecording(false)
      setEndRecording(true)
    }
    mediaRecorder.current.start()
    timerRef.current = setInterval(() => {
      const time = Math.floor((Date.now() - init) / 1000)
      let hour = formatHour(time)
      setTimeFormated(hour)
    }, 1000)
  }

  const formatHour = (sec) => {
    const min = Math.floor(sec / 60)
    const second = sec % 60
    return `${min}:${second.toString().padStart(2, "0")}`
  }

  const stopRecorder = () => {
    setTimeFormated(null)
    clearInterval(timerRef.current)
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()

    }
  }

  const sendMessage = async () => {

    let response = null
    if (formadataRef.current) {
      const formdata = new FormData()
      formdata.append("file", formadataRef.current)
      response = await SendFiles(formdata)
      formadataRef.current = null
    }
    if (audioBlob) {
      const audioFormData = new FormData()
      audioFormData.append("file", audioBlob, `audio-${Date.now()}.webm`)
      response = await SendFiles(audioFormData)
      setAudioBlob(null)
    }

    console.log(response)
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
    formadataRef.current = null
    setIsSelectedFile(false)
    response = null
    audioChunks.current = []
  }
  return { editMessage, sendMessage, clientMessage, uploadFiles, startRecorder, stopRecorder, voiceEndRecording, audioBlob, isSelectedFile, clicked, recording, timeFormated }
}
