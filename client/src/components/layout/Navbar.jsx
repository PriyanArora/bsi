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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-full border border-white/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,32,69,0.05)] flex justify-between items-center px-8 py-3 z-100">
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
                : 'font-semibold text-sm tracking-tight text-slate-600 hover:text-bsi-primary transition-colors'
            }
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Navbar CTA */}
      <button
        onClick={() => onHelpClick?.()}
        className="bg-bsi-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-bsi-primary-container transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">smart_toy</span>
        Help me choose
      </button>
    </nav>
  )
}
