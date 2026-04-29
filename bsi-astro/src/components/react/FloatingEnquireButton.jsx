import { openEnquiry } from '../../lib/shellEvents'

export default function FloatingEnquireButton() {
  return (
    <div
      className="fixed right-4 z-50 sm:right-5 md:right-6 lg:right-8"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="inline-block p-px">
        <button
          type="button"
          onClick={() => openEnquiry('')}
          className="floating-enquire-gradient relative z-10 rounded-none px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 sm:px-6 sm:py-3 sm:text-base md:px-7 md:text-lg"
        >
          Enquire Now
        </button>
      </div>
    </div>
  )
}
