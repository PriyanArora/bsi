import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, onEnquireClick, onHelpClick }) {
  return (
    <div className="bg-bsi-surface min-h-screen font-body text-bsi-primary">
      <Navbar onHelpClick={onHelpClick} onEnquireClick={onEnquireClick} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
