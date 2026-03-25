import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Sitemap', to: '#' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms of Service', to: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-bsi-surface w-full border-t border-slate-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-4 lg:gap-12 lg:py-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-lg font-bold text-bsi-primary font-headline mb-6">BSI Solutionz</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Authorized Bajaj Indef Dealer and your partner in premium industrial material handling systems.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-bsi-primary mb-6">Quick Links</h5>
          <ul className="flex flex-col gap-4">
            {QUICK_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-slate-500 hover:text-bsi-primary transition-colors text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 className="font-bold text-bsi-primary mb-6">Legal</h5>
          <ul className="flex flex-col gap-4">
            {LEGAL_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-slate-500 hover:text-bsi-primary transition-colors text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-bold text-bsi-primary mb-6">Contact Us</h5>
          {/* TODO: Replace with real address and email from client */}
          <p className="text-slate-500 text-sm mb-4">123 Engineering Hub, Industrial Area, Phase II, Pune - 411001</p>
          <p className="text-slate-500 text-sm mb-4">info@bsisolutionz.com</p>
          <div className="flex gap-4 mt-6">
            <span className="material-symbols-outlined text-bsi-primary cursor-pointer hover:opacity-80 transition-opacity">share</span>
            <span className="material-symbols-outlined text-bsi-primary cursor-pointer hover:opacity-80 transition-opacity">public</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-100 px-6 py-6 sm:px-8 md:flex-row md:py-8">
        <p className="text-slate-500 text-xs">© 2024 BSI Solutionz. Authorized Bajaj Indef Dealer.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-bsi-primary font-medium text-xs flex items-center gap-2 hover:underline"
        >
          Back to Top
          <span className="material-symbols-outlined text-sm">arrow_upward</span>
        </button>
      </div>
    </footer>
  )
}
