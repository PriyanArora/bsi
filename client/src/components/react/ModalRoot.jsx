import { Suspense, lazy, useEffect, useState } from 'react'
import { Toaster } from 'sonner'
const EnquiryModal = lazy(() => import('./EnquiryModal'))
const ChatbotModal = lazy(() => import('./ChatbotModal'))

const ENQUIRY_EVENT = 'bsi:open-enquiry'
const CHATBOT_EVENT = 'bsi:open-chatbot'

export default function ModalRoot() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')

  useEffect(() => {
    const openEnquiry = (productName = '') => {
      setSelectedProduct(productName || '')
      setIsChatbotOpen(false)
      setIsEnquiryOpen(true)
    }

    const openChatbot = () => {
      setIsChatbotOpen(true)
    }

    const enquiryListener = (event) => openEnquiry(event?.detail?.productName || '')
    const chatbotListener = () => openChatbot()

    window.__bsiOpenEnquiry = openEnquiry
    window.__bsiOpenChatbot = openChatbot
    window.__bsiModalRootReady = true
    window.addEventListener(ENQUIRY_EVENT, enquiryListener)
    window.addEventListener(CHATBOT_EVENT, chatbotListener)

    const pendingEnquiries = window.__bsiPendingEnquiries || []
    const pendingChatbotOpens = window.__bsiPendingChatbotOpens || []
    window.__bsiPendingEnquiries = []
    window.__bsiPendingChatbotOpens = []

    pendingEnquiries.forEach((productName) => openEnquiry(productName))
    if (pendingChatbotOpens.length > 0) {
      openChatbot()
    }

    return () => {
      window.removeEventListener(ENQUIRY_EVENT, enquiryListener)
      window.removeEventListener(CHATBOT_EVENT, chatbotListener)

      if (window.__bsiOpenEnquiry === openEnquiry) {
        delete window.__bsiOpenEnquiry
      }

      if (window.__bsiOpenChatbot === openChatbot) {
        delete window.__bsiOpenChatbot
      }

      delete window.__bsiModalRootReady
    }
  }, [])

  const handleEnquiryClose = () => {
    setIsEnquiryOpen(false)
  }

  const handleChatbotClose = () => {
    setIsChatbotOpen(false)
  }

  const handleProductSelected = (productName) => {
    setSelectedProduct(productName || '')
    setIsChatbotOpen(false)
    setIsEnquiryOpen(true)
  }

  return (
    <>
      <Suspense fallback={null}>
        {isEnquiryOpen ? (
          <EnquiryModal
            isOpen={isEnquiryOpen}
            onClose={handleEnquiryClose}
            defaultProduct={selectedProduct}
          />
        ) : null}
        {isChatbotOpen ? (
          <ChatbotModal
            isOpen={isChatbotOpen}
            onClose={handleChatbotClose}
            onProductSelected={handleProductSelected}
          />
        ) : null}
      </Suspense>
      <Toaster richColors position="top-right" />
    </>
  )
}
