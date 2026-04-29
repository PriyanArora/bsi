import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import EnquiryModal from './EnquiryModal'
import ChatbotModal from './ChatbotModal'
import { onChatbotOpen, onEnquiryOpen } from '../../lib/shellEvents'

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
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={handleEnquiryClose}
        defaultProduct={selectedProduct}
      />
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={handleChatbotClose}
        onProductSelected={handleProductSelected}
      />
      <Toaster richColors position="top-right" />
    </>
  )
}
