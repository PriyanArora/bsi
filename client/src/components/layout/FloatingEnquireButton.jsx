export default function FloatingEnquireButton({ onClick }) {
  return (
    <div className="fixed right-0.5 top-1/2 z-110 -translate-y-1/2">
      <div className="inline-block rounded-l-md p-px">
        <button
          onClick={onClick}
          className="relative z-10 rounded-l-md bg-bsi-accent px-1.5 py-4 text-[0.65rem] font-bold text-bsi-primary uppercase transition-colors hover:bg-[#f3a80f] sm:px-2 sm:py-5 sm:text-[0.72rem] md:px-2.5 md:py-6 md:text-xs"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          ENQUIRE NOW
        </button>
      </div>
    </div>
  )
}
