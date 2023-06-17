'use client'

import { useEffect } from 'react'

export function HeaderScrollDetector() {
  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (window.scrollY >= 300) {
        document.getElementById('app-header')?.classList.add('attached')
      } else {
        document.getElementById('app-header')?.classList.remove('attached')
      }
    })
  }, [])

  return <></>
}
