import { useEffect, useState } from 'react'
import craneImg from '../../../sgeot-2.png'

export default function HeroSection() {
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    let rafId = 0
    let ticking = false

    const updateParallax = () => {
      // Keep desktop motion unchanged and disable parallax below desktop widths.
      setParallaxOffset(window.innerWidth >= 1024 ? window.scrollY * 0.4 : 0)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = window.requestAnimationFrame(updateParallax)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="hero-mobile-shell section-pad relative flex min-h-screen w-full items-center overflow-hidden bg-[#F4F6F9] pt-20 md:pt-28">
      <div className="relative z-10 w-full">
        <div className="relative" style={{ transform: `translateY(${parallaxOffset}px)` }}>
          <img
            src={craneImg}
            alt="BSI crane installation"
            loading="lazy"
            className="hero-crane-image ml-auto max-w-none object-contain"
          />
        </div>

        <div className="hero-text-anchor absolute left-3 z-20 sm:left-8 md:left-12 lg:left-16">
          <div className="hero-text-container">
            <h1 className="hero-title font-headline font-extrabold tracking-tight text-[#0D1F3C]">
              BSI Solutionz
            </h1>
            <p className="hero-text-description mt-4 text-[1.1rem] leading-[1.7] font-normal text-[#3E4C62]">
              Authorized Bajaj Indef Dealer. Providing high-performance lifting solutions designed for maximum safety
              and operational efficiency
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
