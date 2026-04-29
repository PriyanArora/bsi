const EVENT_ENQUIRY_OPEN = 'bsi:open-enquiry'
const EVENT_CHATBOT_OPEN = 'bsi:open-chatbot'

export const openEnquiry = (productName = '') => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(EVENT_ENQUIRY_OPEN, {
      detail: { productName },
    })
  )
}

export const openChatbot = () => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT_CHATBOT_OPEN))
}

export const onEnquiryOpen = (handler) => {
  if (typeof window === 'undefined') return () => {}

  const listener = (event) => {
    handler?.(event?.detail?.productName || '')
  }

  window.addEventListener(EVENT_ENQUIRY_OPEN, listener)
  return () => window.removeEventListener(EVENT_ENQUIRY_OPEN, listener)
}

export const onChatbotOpen = (handler) => {
  if (typeof window === 'undefined') return () => {}

  const listener = () => handler?.()
  window.addEventListener(EVENT_CHATBOT_OPEN, listener)
  return () => window.removeEventListener(EVENT_CHATBOT_OPEN, listener)
}
