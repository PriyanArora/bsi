export default function FloatingEnquireButton({ onClick }) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[110]">
      <div className="inline-block p-[2px] rounded-l-lg moving-border">
        <button
          onClick={onClick}
          className="relative z-10 bg-bsi-primary-container text-white px-3 py-8 rounded-l-lg font-bold text-sm hover:bg-bsi-primary transition-colors uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          ENQUIRE NOW
        </button>
      </div>
    </div>
  )
}
