import { Pause, Play } from "lucide-react";
import { useState } from "react";

export function Tocar({ controls }) {
  return (
    <button onClick={controls}>{<Play style={{ marginBottom: "-4px" }} color="#ff7799" size={20} />}</button>
  )
}
export function Audio({ controls, src, play, pause, update, metadata }) {

  return (
    <audio src={src} ref={controls} onPlay={play} onPause={pause} onTimeUpdate={update} onLoadedMetadata={metadata} />
  )
}
export function ProgressBar({ time, timeCurrent, event }) {

  return (
    <input type="range" min="0" max={time ?? 0} value={timeCurrent ?? 0} onChange={event} />
  )
}
export function Pausar({ controls }) {
  return (
    <button onClick={controls}>{<Pause style={{ marginBottom: "-6px" }} color="#ff7799" size={20} />}</button>
  )
}
export function Duration({ time }) {
  return (
    <span className="durationAudio">{time}</span>
  )

}

