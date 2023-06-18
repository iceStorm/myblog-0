'use client'

import { useEffect } from 'react'

interface HeaderScrollDetectorProps {
  threshold: number
}

export function HeaderScrollDetector(props: HeaderScrollDetectorProps) {
  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (window.scrollY >= props.threshold) {
        document.getElementById('app-header')?.classList.add('attached')
      } else {
        document.getElementById('app-header')?.classList.remove('attached')
      }
    })
  }, [])

  return <></>
}
