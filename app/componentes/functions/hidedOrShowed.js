"use client"
import { useRef, useState } from "react";
export function hidedOrShowed() {
  const [show, setShow] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const buttonRef = useRef()
  const scrollRef = useRef(null)
  function scrolling() {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
    setShow(true)
  }
  function showUp() {
    const el = buttonRef.current
    if (!el) return

    const clicledAtBottom = scrollRef.current.scrollHeight - scrollRef.current.scrollTop <= scrollRef.current.clientHeight + 1
    setIsAtBottom(clicledAtBottom)
    if (clicledAtBottom) {
      setShow(false)
    }
  }
  return { buttonRef, show, setShow, isAtBottom, showUp, scrolling, scrollRef }
}
