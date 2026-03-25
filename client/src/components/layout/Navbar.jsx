import { Link, useLocation } from 'react-router-dom'
import logoImg from '../../../logo-whitebg.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar({ onHelpClick }) {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 z-100 w-full border-b-4 border-[#FFD100] bg-[#EFEFEF] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
        <Link to="/" className="shrink-0">
          <img src={logoImg} alt="BSI Solutionz logo" className="h-14 w-auto" loading="eager" />
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

        <div className="flex items-center">
          <button
            onClick={() => onHelpClick?.()}
            className="inline-flex rounded bg-[#FFD100] px-3 py-2 font-headline text-xs font-bold text-[#0D1F3C] transition-colors duration-200 ease-in-out hover:bg-[#E6B800] sm:px-4 sm:text-sm"
          >
            Help me choose
          </button>
        </div>
      </div>
    </nav>
  )
}
