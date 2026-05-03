import { Suspense, lazy, useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { onChatbotOpen, onEnquiryOpen } from '../../lib/shellEvents'

const EnquiryModal = lazy(() => import('./EnquiryModal'))
const ChatbotModal = lazy(() => import('./ChatbotModal'))

export default function ModalRoot() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')

  useEffect(() => {
    const unsubscribeEnquiry = onEnquiryOpen((productName) => {
      setSelectedProduct(productName || '')
      setIsChatbotOpen(false)
      setIsEnquiryOpen(true)
    })

    const unsubscribeChatbot = onChatbotOpen(() => {
      setIsChatbotOpen(true)
    })

    return () => {
      unsubscribeEnquiry()
      unsubscribeChatbot()
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
