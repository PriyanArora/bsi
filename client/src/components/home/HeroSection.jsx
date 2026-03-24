import { motion as Motion } from 'framer-motion'
import heroImg from '../../assets/hero.png'

export default function HeroSection() {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center overflow-hidden px-6 pt-28 pb-16 md:px-8">
      <Motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 z-0 h-105 w-105 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(221,141,0,0.25)_0%,rgba(0,32,69,0)_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="z-20 lg:col-span-7">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-bsi-accent">
            Precision Engineering Excellence
          </p>
          <h1 className="font-headline text-bsi-primary mb-8 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            BSI Solutionz Cranes &amp; Hoists
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-bsi-secondary sm:text-lg">
            Authorized Bajaj Indef Dealer. Providing high-performance lifting solutions designed for maximum safety
            and operational efficiency.
          </p>
        </div>

        <div className="relative z-10 flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative w-full max-w-md rounded-3xl bg-bsi-surface-low p-4 shadow-[0_30px_70px_rgba(0,32,69,0.18)]">
            <div className="absolute -left-6 top-8 max-w-55 rounded-xl border border-white/20 bg-bsi-surface-lowest/80 p-4 backdrop-blur">
              <span className="material-symbols-outlined text-bsi-accent mb-2 block text-2xl">settings_accessibility</span>
              <h4 className="font-headline text-bsi-primary text-sm font-bold">Industrial Precision</h4>
              <p className="mt-1 text-xs leading-relaxed text-bsi-secondary">
                Certified Bajaj Indef components with 99.9% uptime reliability.
              </p>
            </div>
            <img
              src={heroImg}
              alt="Industrial crane system"
              loading="lazy"
              className="h-115 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-bsi-surface-low absolute top-0 right-0 -z-10 h-full w-1/3 rounded-l-[6rem]" />
    </section>
  )
}
