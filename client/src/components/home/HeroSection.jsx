import craneImg from '../../../sgeot-2.png'

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center overflow-hidden pt-28 pb-16"
      style={{
        background:
          'linear-gradient(90deg, rgba(118,190,255,0.26) 0%, rgba(118,190,255,0.14) 28%, rgba(118,190,255,0) 50%), linear-gradient(145deg, #FCFBF7 0%, #F5F2EA 55%, #EFEADF 100%)',
      }}
    >
      <div className="relative z-10 w-full">
        <img
          src={craneImg}
          alt="BSI crane installation"
          loading="lazy"
          className="ml-auto w-[135%] max-w-none object-contain sm:w-[122%] md:w-[114%] lg:w-[108%]"
        />

        <div className="absolute top-[12%] left-4 max-w-[16rem] sm:left-8 sm:max-w-[24rem] md:left-12 md:max-w-116 lg:left-16 lg:max-w-136">
          <h1 className="font-headline text-4xl leading-[0.95] font-extrabold tracking-tight text-[#10233b] sm:text-5xl md:text-6xl lg:text-7xl">
            BSI Solutionz
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#2a3f59] sm:mt-5 sm:text-base md:text-lg">
            Authorized Bajaj Indef Dealer. Providing high-performance lifting solutions designed for maximum safety
            and operational efficiency
          </p>
        </div>
      </div>
    </section>
  )
}
