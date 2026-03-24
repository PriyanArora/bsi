export default function ProductsCTA() {
  return (
    <section className="bg-bsi-surface-low py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="bg-bsi-primary-container relative overflow-hidden rounded-2xl p-10 md:p-12">
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-headline mb-3 text-3xl font-bold text-white md:text-4xl">Need a Specialized Configuration?</h2>
              <p className="text-bsi-on-primary-container text-lg">
                Our engineering team designs bespoke lifting solutions for unique architectural constraints.
              </p>
            </div>

            <button
              type="button"
              className="text-bsi-primary bg-white rounded-lg px-8 py-4 font-headline text-base font-extrabold tracking-tight transition hover:bg-bsi-accent hover:text-white"
            >
              Download Product Catalog
            </button>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent" />
        </div>
      </div>
    </section>
  )
}
