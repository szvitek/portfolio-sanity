"use client"

import * as React from "react"
import type { BackgroundMusicData } from "@/lib/sanity"

interface MusicPlayerContextValue {
  playing: boolean
  toggle: () => void
  next: () => void
  previous: () => void
  trackCount: number
  musicUrl?: string
  title?: string
}

const MusicPlayerContext = React.createContext<MusicPlayerContextValue | null>(null)

export function useMusicPlayer() {
  const ctx = React.useContext(MusicPlayerContext)
  if (!ctx) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider")
  }
  return ctx
}

export function MusicPlayerProvider({
  tracks,
  children,
}: {
  tracks: BackgroundMusicData[]
  children: React.ReactNode
}) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [index, setIndex] = React.useState(0)
  const indexRef = React.useRef(0)
  const [playing, setPlaying] = React.useState(false)
  const playingRef = React.useRef(false)
  const playRequestedRef = React.useRef(false)
  const track = tracks[index]

  const playAudio = React.useCallback(() => {
    if (!audioRef.current) return
    const playPromise = audioRef.current.play()
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch((error: unknown) => {
        console.error("Failed to start background music:", error)
      })
    }
  }, [])

  const toggle = React.useCallback(() => {
    if (!audioRef.current) return
    const next = !playingRef.current
    playingRef.current = next
    setPlaying(next)
    if (next) {
      playAudio()
    } else {
      audioRef.current.pause()
    }
  }, [playAudio])

  const goTo = React.useCallback(
    (delta: 1 | -1) => {
      const count = tracks.length
      if (count < 2) return
      const nextIndex = (indexRef.current + delta + count) % count
      indexRef.current = nextIndex
      playingRef.current = true
      setPlaying(true)
      playRequestedRef.current = true
      setIndex(nextIndex)
    },
    [tracks]
  )

  const next = React.useCallback(() => goTo(1), [goTo])
  const previous = React.useCallback(() => goTo(-1), [goTo])

  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playRequestedRef.current) {
      playRequestedRef.current = false
      playAudio()
    }

    const handleEnded = () => goTo(1)
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [track, goTo, playAudio])

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const value = React.useMemo(
    () => ({
      playing,
      toggle,
      next,
      previous,
      trackCount: tracks.length,
      musicUrl: track?.audioUrl,
      title: track?.title,
    }),
    [playing, toggle, next, previous, tracks, track]
  )

  return (
    <MusicPlayerContext.Provider value={value}>
      {tracks.length > 0 && track ? (
        <audio
          key={track._id}
          ref={audioRef}
          src={track.audioUrl}
          loop={tracks.length === 1}
          preload="auto"
        />
      ) : null}
      {children}
    </MusicPlayerContext.Provider>
  )
}
