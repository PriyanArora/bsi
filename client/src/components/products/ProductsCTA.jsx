import { Link } from 'react-router-dom'

export default function ProductsCTA({ onEnquireClick }) {
  return (
    <section className="bg-bsi-surface-low py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="bg-bsi-primary-container relative overflow-hidden rounded-2xl p-8 sm:p-10 md:p-12">
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="font-headline mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Need AMC care?</h2>
              <p className="text-bsi-on-primary-container text-base sm:text-lg">
                Our Team got you!
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                className="bg-white text-bsi-primary rounded-lg px-8 py-4 text-center font-headline text-base font-extrabold tracking-tight transition hover:bg-bsi-accent"
              >
                Contact us
              </Link>

              <button
                type="button"
                onClick={() => onEnquireClick?.('AMC Care')}
                className="bg-white text-bsi-primary rounded-lg px-8 py-4 font-headline text-base font-extrabold tracking-tight transition hover:bg-bsi-accent"
              >
                Enquire now
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-white/5 to-transparent" />
        </div>
      </div>
    </section>
  )
}
