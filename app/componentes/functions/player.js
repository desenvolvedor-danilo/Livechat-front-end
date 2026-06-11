import { useRef } from "react";
import { Audio, Pausar, ProgressBar, Tocar } from "../ui/playerUI";

export function Player({ src }) {
  const audio = useRef(null);

  return (
    <>
      {
        (audio.current && audio.current.paused) ?
          <Tocar controls={() => audio.current.play()} />
          :
          <Pausar controls={() => audio.current.pause()} />
      }
      <ProgressBar time={audio.current && audio.current.duration} timeCurrent={audio.current && audio.current.currentTime} event={(e) => { audio.current.currentTime = Number(e.target.value) }} />
      <Audio controls={audio} src={src} />

    </>
  )
}
