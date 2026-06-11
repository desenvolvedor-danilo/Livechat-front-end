import { useRef, useState } from "react";
import { Audio, Duration, Pausar, ProgressBar, Tocar } from "../ui/playerUI";

export function Player({ src }) {
  const audio = useRef(null);
  const formatHour = (second) => {
    const min = second / 60;
    const fate = min.toString().split(".")
    return `${fate[0]}:${fate[1].substring(0, 2)}`
  }
  const [isPlaying, setIsPlaying] = useState(false)
  if (audio.current?.paused) {
    setIsPlaying(false)
  } else {
    setIsPlaying(true)
  }
  return (
    <>
      {

        isPlaying ?
          <Pausar controls={() => audio.current.pause()} />
          :
          <Tocar controls={() => audio.current.play()} />
      }
      <ProgressBar time={audio.current && audio.current.duration} timeCurrent={audio.current && audio.current.currentTime} event={(e) => { audio.current.currentTime = Number(e.target.value) }} />
      {
        (audio.current && audio.current.duration) &&
        <Duration time={formatHour(audio.current.duration)} />
      }
      <Audio controls={audio} src={src} />

    </>
  )
}
