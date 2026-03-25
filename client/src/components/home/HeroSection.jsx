import { useEffect, useState } from 'react'
import craneImg from '../../../sgeot-2.png'

export default function HeroSection() {
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    let rafId = 0
    let ticking = false

    const updateParallax = () => {
      // Positive offset counters natural upward scroll to create slower visual motion.
      setParallaxOffset(window.scrollY * 0.4)
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
    <section className="section-pad relative flex min-h-screen w-full items-center overflow-hidden bg-[#F4F6F9] pt-28">
      <div className="relative z-10 w-full">
        <div className="relative" style={{ transform: `translateY(${parallaxOffset}px)` }}>
          <img
            src={craneImg}
            alt="BSI crane installation"
            loading="lazy"
            className="ml-auto w-[135%] max-w-none object-contain sm:w-[122%] md:w-[114%] lg:w-[108%]"
          />
        </div>

        <div className="absolute top-[12%] left-4 z-20 max-w-[16rem] sm:left-8 sm:max-w-[24rem] md:left-12 md:max-w-105 lg:left-16">
          <h1 className="font-headline text-[2.4rem] leading-[1.02] font-extrabold tracking-tight text-[#0D1F3C] md:text-[2.75rem] lg:text-[3rem]">
            BSI Solutionz
          </h1>
          <p className="mt-4 max-w-105 text-[1.1rem] leading-[1.7] font-normal text-[#4A5568]">
            Authorized Bajaj Indef Dealer. Providing high-performance lifting solutions designed for maximum safety
            and operational efficiency
          </p>

        </div>
      </div>
    </section>
  )
}
