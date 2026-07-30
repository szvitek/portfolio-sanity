"use client"

import { useState, useEffect } from "react"
import { BootSequence } from "@/components/thegridcn/boot-sequence"

interface BootOverlayProps {
  onComplete?: () => void
}

const BOOT_STEPS = [
  { label: "Initializing system", duration: 150 },
  { label: "Loading modules", duration: 150 },
  { label: "Compiling assets", duration: 150 },
  { label: "Establishing connection", duration: 150 },
  { label: "Ready", duration: 100 },
]

export function BootOverlay({ onComplete }: BootOverlayProps) {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  function handleComplete() {
    setFading(true)
    setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ""
      onComplete?.()
    }, 400)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="w-full max-w-md px-4">
        <BootSequence
          steps={BOOT_STEPS}
          title="SYSTEM BOOT"
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
