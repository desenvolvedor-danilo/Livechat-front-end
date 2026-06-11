import { useRef, useState } from "react";
import { Audio, Duration, Pausar, ProgressBar, Tocar } from "../ui/playerUI";

export function Player({ src }) {
  const audio = useRef(null);
  const formatHour = (second) => {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`

  }
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  return (
    <>

      <Audio controls={audio} src={src} play={() => setIsPlaying(true)} pause={() => setIsPlaying(false)} update={() => {
        console.log("Time current: ", audio.current.currentTime)
        setCurrentTime(audio.current.currentTime)
      }} metadata={() => {
        console.log("Duration: ", audio.current.duration)
        setDuration(audio.current.duration)
      }} />
      {

        isPlaying ?
          <Pausar controls={() => audio.current.pause()} />
          :
          <Tocar controls={() => audio.current.play()} />
      }
      <ProgressBar time={duration} timeCurrent={currentTime} event={(e) => { audio.current.currentTime = Number(e.target.value) }} />
      {
        (audio.current && audio.current.duration) &&
        <Duration time={formatHour(duration)} />
      }


    </>
  )
}
