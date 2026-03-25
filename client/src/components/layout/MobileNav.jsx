import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function MobileNav({ isOpen, onClose, onHelpClick, pathname }) {
  const panelRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    previousActiveElementRef.current = document.activeElement

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )

        if (!focusableElements.length) {
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    const closeButton = panelRef.current?.querySelector('[aria-label="Close menu"]')
    closeButton?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
      previousActiveElementRef.current?.focus?.()
    }
  }, [isOpen, onClose])

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => onClose?.()}
        className={`fixed inset-0 z-130 bg-[#0D1F3C]/35 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-140 flex h-full w-[82%] max-w-xs flex-col border-l border-[#D8DEE8] bg-[#F4F6F9] p-6 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-headline text-lg font-bold text-[#0D1F3C]">Menu</h2>
          <button
            onClick={() => onClose?.()}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-[#C7D0DD] bg-white text-[#0D1F3C]"
            aria-label="Close menu"
          >
            X
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => onClose?.()}
              className={`rounded px-3 py-2 font-headline text-sm font-semibold ${
                pathname === to ? 'bg-[#FFD100] text-[#0D1F3C]' : 'text-[#0D1F3C] hover:bg-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => {
            onClose?.()
            onHelpClick?.()
          }}
          className="mt-6 inline-flex w-full justify-center rounded bg-[#FFD100] px-4 py-2.5 font-headline text-sm font-bold text-[#0D1F3C] transition-colors duration-200 hover:bg-[#E6B800]"
        >
          Help me choose
        </button>
      </aside>
    </>
  )
}
