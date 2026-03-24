import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar({ onHelpClick }) {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-100 flex w-[90%] max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/70 px-8 py-3 backdrop-blur-xl shadow-none">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold tracking-tighter text-bsi-primary font-headline">
        BSI Solutionz
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={
              pathname === to
                ? 'font-bold text-sm tracking-tight text-bsi-primary border-b-2 border-bsi-accent pb-1'
                : 'inline-block text-sm font-semibold tracking-tight text-slate-600 transition-all duration-200 hover:scale-105 hover:font-bold hover:text-bsi-primary'
            }
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Navbar CTA */}
      <button
        onClick={() => onHelpClick?.()}
        className="inline-flex rounded-full bg-bsi-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-bsi-primary-container"
      >
        Help me choose
      </button>
    </nav>
  )
}
