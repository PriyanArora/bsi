const TRUST_POINTS = [
  {
    icon: 'verified',
    title: 'Authorized Bajaj Indef Dealer',
    description: 'Genuine parts and certified engineering directly from the industry leader.'
  },
  {
    icon: 'engineering',
    title: 'Custom Engineering',
    description: "We don't just sell products; we design solutions for your unique spatial challenges."
  },
  {
    icon: 'support_agent',
    title: '24/7 Service Support',
    description: 'Minimal downtime with our rapid-response technical maintenance teams.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:gap-14 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="h-fit lg:sticky lg:top-32">
          <h2 className="font-headline text-bsi-primary text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
            Why <span className="text-bsi-accent">BSI Solutionz</span> ? 
          </h2>

          <div className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10">
            {TRUST_POINTS.map((point) => (
              <article key={point.title} className="flex gap-5">
                <div className="bg-bsi-primary-container flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white">
                  <span className="material-symbols-outlined">{point.icon}</span>
                </div>
                <div>
                  <h4 className="text-bsi-primary text-lg font-bold">{point.title}</h4>
                  <p className="text-bsi-secondary mt-2 leading-relaxed">{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex pt-4 lg:self-stretch lg:pt-0">
          <div className="bg-white text-bsi-secondary flex h-64 w-full items-center justify-center rounded-none border border-slate-200 text-sm font-medium uppercase tracking-[0.08em] sm:h-80 lg:h-full">
            placeholder image
          </div>
        </div>
      </div>
    </section>
  )
}
