import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '../../../logo-whitebg.png'
import MobileNav from './MobileNav'

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
    <nav className="fixed top-0 z-100 w-full border-b-4 border-[#FFD100] bg-[#EFEFEF] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-2.5 py-2 sm:px-6 sm:py-3 md:px-8">
        <Link to="/" className="shrink-0">
          <img src={logoImg} alt="BSI Solutionz logo" className="h-8 w-auto sm:h-11 md:h-14" loading="eager" />
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
          <button
            onClick={() => onHelpClick?.()}
            className="inline-flex whitespace-nowrap rounded bg-[#FFD100] px-2 py-1.5 font-headline text-[0.62rem] font-bold text-[#0D1F3C] transition-colors duration-200 ease-in-out hover:bg-[#E6B800] sm:px-4 sm:py-2 sm:text-sm"
          >
            Help me choose
          </button>

          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#C7D0DD] bg-white text-[#0D1F3C] sm:h-8 sm:w-8 md:hidden"
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
