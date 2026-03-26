export default function FloatingEnquireButton({ onClick }) {
  return (
    <div
      className="fixed right-4 z-50 sm:right-5 md:right-6 lg:right-8"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="inline-block p-px">
        <button
          onClick={onClick}
          className="relative z-10 rounded-lg bg-[#D62828] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#BC2020] sm:px-6 sm:py-3 sm:text-base md:px-7 md:text-lg"
        >
          Enquire Now
        </button>
      </div>
    </div>
  )
}
