import { Pause, Play } from "lucide-react";

export function Tocar({ controls }) {
  return (
    <button onClick={controls}>{<Play color="#4a4ee0" size={20} />}</button>
  )
}
export function Audio({ controls, src }) {
  return (
    <audio src={src} ref={controls} />
  )
}
export function ProgressBar({ time, timeCurrent, event }) {
  return (
    <input type="range" min="0" max={time ?? 0} value={timeCurrent ?? 0} onChange={event} />
  )
}
export function Pausar({ controls }) {
  return (
    <button onClick={controls}>{<Pause color="#4a4ee0" size={20} />}</button>
  )

}

