/// <reference types="astro/client" />

import type Lenis from 'lenis'

declare global {
  interface Window {
    __bsiModalRootReady?: boolean
    __bsiOpenChatbot?: () => void
    __bsiOpenEnquiry?: (productName?: string) => void
    __bsiPendingChatbotOpens?: boolean[]
    __bsiPendingEnquiries?: string[]
    __lenis?: Lenis
  }
}

export {}
