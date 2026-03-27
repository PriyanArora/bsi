import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileNav from './MobileNav'
import { Button } from '../ui/button'

const logoImg = '/shared/brand-logo.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar({ onHelpClick }) {
  const { pathname } = useLocation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-100 w-full px-3 pt-3 sm:px-6 sm:pt-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-[2rem] border border-white/70 bg-white/68 px-3 py-2.5 shadow-[0_10px_32px_rgba(0,32,69,0.13)] backdrop-blur-xl supports-backdrop-filter:bg-white/58 sm:px-5 sm:py-3 md:px-6">
        <Link to="/" className="shrink-0">
          <img src={logoImg} alt="BSI Solutionz logo" className="h-9 w-auto sm:h-10 md:h-12" loading="eager" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={
              pathname === to
                ? 'relative inline-block pb-1 font-headline text-sm font-semibold tracking-tight text-[#0D1F3C] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:scale-x-100 after:bg-[#FFD100] after:transition-transform after:duration-200 after:ease-in-out'
                : 'relative inline-block pb-1 font-headline text-sm font-semibold tracking-tight text-[#0D1F3C] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[#FFD100] after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100'
            }
          >
            {label}
          </Link>
        ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onHelpClick?.()}
            variant="secondary"
            size="lg"
            className="min-h-10 whitespace-nowrap rounded-full border border-[#D2DAE6] bg-[#0D2E5A] px-4 py-2 font-headline text-xs font-bold text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-[#12386B] sm:text-sm"
          >
            Help me choose
          </Button>

          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-[#C7D0DD] bg-white text-[#0D1F3C] sm:h-9 sm:w-9 md:hidden"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onHelpClick={onHelpClick}
        pathname={pathname}
      />
    </nav>
  )
}
