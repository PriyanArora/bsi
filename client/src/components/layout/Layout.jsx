import Navbar from './Navbar'
import Footer from './Footer'
import FloatingEnquireButton from './FloatingEnquireButton'

export default function Layout({ children, onEnquireClick, onHelpClick }) {
  return (
    <div className="bg-bsi-surface min-h-screen font-body text-bsi-primary">
      <Navbar onHelpClick={onHelpClick} />
      <main>{children}</main>
      <FloatingEnquireButton onClick={() => onEnquireClick?.()} />
      <Footer />
    </div>
  )
}
