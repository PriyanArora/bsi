const EVENT_ENQUIRY_OPEN = 'bsi:open-enquiry'
const EVENT_CHATBOT_OPEN = 'bsi:open-chatbot'
const PENDING_ENQUIRIES = '__bsiPendingEnquiries'
const PENDING_CHATBOT_OPENS = '__bsiPendingChatbotOpens'

const drainQueue = (queueName, handler) => {
  const queuedEvents = window[queueName] || []
  window[queueName] = []
  queuedEvents.forEach((value) => handler?.(value))
}

export const onEnquiryOpen = (handler) => {
  if (typeof window === 'undefined') return () => {}

  const listener = (event) => {
    handler?.(event?.detail?.productName || '')
  }

  window.addEventListener(EVENT_ENQUIRY_OPEN, listener)
  window.__bsiModalRootReady = true
  drainQueue(PENDING_ENQUIRIES, handler)
  return () => window.removeEventListener(EVENT_ENQUIRY_OPEN, listener)
}

export const onChatbotOpen = (handler) => {
  if (typeof window === 'undefined') return () => {}

  const listener = () => handler?.()
  window.addEventListener(EVENT_CHATBOT_OPEN, listener)
  window.__bsiModalRootReady = true
  drainQueue(PENDING_CHATBOT_OPENS, handler)
  return () => window.removeEventListener(EVENT_CHATBOT_OPEN, listener)
}
