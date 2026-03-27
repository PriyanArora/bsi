import { Suspense, lazy, useLayoutEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/layout/Layout'
import PrivacyPolicy from './pages/PrivacyPolicy'

const EnquiryModal = lazy(() => import('./components/EnquiryModal'))
const ChatbotModal = lazy(() => import('./components/ChatbotModal'))
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductCategory = lazy(() => import('./pages/ProductCategory'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [enquirySource, setEnquirySource] = useState('website')

  const handleEnquireClick = (productName) => {
    setSelectedProduct(productName || '')
    setEnquirySource('website')
    setIsEnquiryOpen(true)
  }

  const handleChatbotOpen = () => {
    setIsChatbotOpen(true)
  }

  const handleProductSelectedFromChatbot = (productName) => {
    setSelectedProduct(productName || '')
    setEnquirySource('chatbot')
    setIsChatbotOpen(false)
    setIsEnquiryOpen(true)
  }

  useLayoutEffect(() => {
    const resetToTop = () => {
      const lenis = window.__lenis

      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(0, { immediate: true, force: true })
        return
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    resetToTop()
    const rafId = window.requestAnimationFrame(resetToTop)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [location.pathname])

  return (
    <>
      <Layout
        onEnquireClick={handleEnquireClick}
        onHelpClick={handleChatbotOpen}
      >
        <Suspense fallback={<div className="min-h-[40vh]" />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onEnquireClick={handleEnquireClick} />} />
              <Route path="/products" element={<Products onEnquireClick={handleEnquireClick} />} />
              <Route path="/products/:categorySlug" element={<ProductCategory onEnquireClick={handleEnquireClick} />} />
              <Route path="/about" element={<About onEnquireClick={handleEnquireClick} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>

      <Suspense fallback={null}>
        {isEnquiryOpen ? (
          <EnquiryModal
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
            defaultProduct={selectedProduct}
            source={enquirySource}
          />
        ) : null}
      </Suspense>

      <Suspense fallback={null}>
        {isChatbotOpen ? (
          <ChatbotModal
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
            onProductSelected={handleProductSelectedFromChatbot}
          />
        ) : null}
      </Suspense>

      <Toaster richColors position="top-right" />
    </>
  )
}
