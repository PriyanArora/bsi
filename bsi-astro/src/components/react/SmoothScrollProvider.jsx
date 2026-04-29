import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrollProvider() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.classList.add('lenis', 'lenis-smooth')
    body.classList.add('lenis', 'lenis-smooth')

    const lenis = new Lenis({
      duration: 1.26,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: true,
    })

    window.__lenis = lenis

    let rafId = 0
    const raf = (time) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__lenis
      root.classList.remove('lenis', 'lenis-smooth')
      body.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  return null
}
