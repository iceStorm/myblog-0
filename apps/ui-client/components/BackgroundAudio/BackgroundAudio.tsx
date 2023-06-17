'use client'

import { useRef, useEffect } from 'react'

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // if (audioRef.current) {
    //   audioRef.current.muted = false
    //   audioRef.current.loop = true
    // }
    // audioRef.current?.play()
  }, [])

  return (
    <audio
      ref={audioRef}
      id="audio_background"
      src="/Shallow_Instrumental_Guitar.mp3"
      autoPlay
      playsInline
      onPlay={() => {
        console.log('audio playing...')
      }}
    />
  )
}
