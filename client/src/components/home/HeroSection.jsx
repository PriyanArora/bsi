import { useEffect, useRef } from 'react'
import craneImg from '../../../sgeot-2.png'

export default function HeroSection() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    let rafId = 0
    let ticking = false
    const parallaxElement = parallaxRef.current

    if (!parallaxElement) {
      return undefined
    }

    const updateParallax = () => {
      // Keep desktop motion unchanged and disable parallax below desktop widths.
      const offset = window.innerWidth >= 1024 ? window.scrollY * 0.4 : 0
      parallaxElement.style.transform = `translate3d(0, ${offset}px, 0)`
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = window.requestAnimationFrame(updateParallax)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="hero-mobile-shell hero-gradient-wash section-pad relative flex min-h-screen w-full items-center overflow-x-clip overflow-y-hidden pt-(--bsi-navbar-height)">
      <div className="hero-layout relative z-10 w-full">
        <div ref={parallaxRef} className="hero-crane-wrap relative will-change-transform">
          <img
            src={craneImg}
            alt="BSI crane installation"
            loading="lazy"
            className="hero-crane-image ml-auto max-w-none object-contain"
          />
        </div>

        <div className="hero-text-anchor absolute left-3 z-20 sm:left-6 md:left-10 lg:left-16">
          <div className="hero-text-container">
            <h1 className="hero-title font-headline font-extrabold tracking-tight text-[#0D1F3C]">
              BSI Solutionz
            </h1>
            <p className="hero-text-description mt-4 text-base leading-[1.6] font-normal text-[#3E4C62] sm:text-[1.05rem]">
              Authorized Bajaj Indef Dealer. Providing high-performance lifting solutions designed for maximum safety
              and operational efficiency
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
