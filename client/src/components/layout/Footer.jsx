import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '#' },
]

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#223554] bg-[#0F1E35]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-4 lg:gap-12 lg:py-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="font-headline mb-6 text-lg font-bold text-slate-100">BSI Solutionz</div>
          <p className="text-sm leading-relaxed text-slate-300">
            Authorized Bajaj Indef Dealer and your partner in premium industrial material handling systems and AMC care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="mb-6 font-bold text-slate-100">Quick Links</h5>
          <ul className="flex flex-col gap-4">
            {QUICK_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-slate-300 transition-colors hover:text-[#FFD100]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 className="mb-6 font-bold text-slate-100">Legal</h5>
          <ul className="flex flex-col gap-4">
            {LEGAL_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-slate-300 transition-colors hover:text-[#FFD100]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="mb-6 font-bold text-slate-100">Contact Us</h5>
          <p className="mb-4 text-sm text-slate-300">515, Vishal Chamber, Sector-18, Noida, Gautam Buddha Nagar, U.P-201301</p>
          <p className="mb-3 text-sm text-slate-300">bsisolutionz@gmail.com</p>
          <p className="text-sm text-slate-300">+91 9717897960</p>
          <div className="flex gap-4 mt-6">
            <span className="material-symbols-outlined cursor-pointer text-slate-200 transition-colors hover:text-[#FFD100]">share</span>
            <span className="material-symbols-outlined cursor-pointer text-slate-200 transition-colors hover:text-[#FFD100]">public</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#223554] px-6 py-6 sm:px-8 md:flex-row md:py-8">
        <p className="text-xs text-slate-300">© 2026 BSI Solutionz- All rights reserved</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-xs font-medium text-slate-100 hover:text-[#FFD100]"
        >
          Back to Top
          <span className="material-symbols-outlined text-sm">arrow_upward</span>
        </button>
      </div>
    </footer>
  )
}
