export default function FloatingEnquireButton({ onClick }) {
  return (
    <div className="fixed right-5 bottom-5 z-[120] sm:right-6 sm:bottom-6 md:right-8 md:bottom-8">
      <div className="inline-block p-px">
        <button
          onClick={onClick}
          className="relative z-10 rounded-[4px] bg-[#FF2D1F] px-6 py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-[#E3261A] sm:px-7 sm:py-3.5 sm:text-lg"
        >
          Enquire Now
        </button>
      </div>
    </div>
  )
}
