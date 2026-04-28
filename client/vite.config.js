import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { EnquiryRequestError, sendEnquiryEmail } from './api/_shared/enquiry-handler.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

const readJsonBody = async (request) => {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')

  if (!rawBody) {
    return {}
  }

  try {
    return JSON.parse(rawBody)
  } catch {
    throw new EnquiryRequestError(400, 'Invalid JSON payload')
  }
}

const sendJson = (response, statusCode, payload, headers = {}) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')

  for (const [headerName, headerValue] of Object.entries(headers)) {
    response.setHeader(headerName, headerValue)
  }

  if (statusCode === 204) {
    response.end()
    return
  }

  response.end(JSON.stringify(payload))
}

const enquiryApiPlugin = (mode) => {
  const serverEnv = loadEnv(mode, currentDir, '')

  return {
    name: 'enquiry-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestPath = request.url ? request.url.split('?')[0] : ''

        if (requestPath !== '/api/enquiry') {
          next()
          return
        }

        if (request.method === 'OPTIONS') {
          sendJson(response, 204, {})
          return
        }

        if (request.method !== 'POST') {
          sendJson(response, 405, { error: 'Method not allowed' }, { Allow: 'POST' })
          return
        }

        try {
          const requestBody = await readJsonBody(request)
          const { providerId } = await sendEnquiryEmail(requestBody, serverEnv)

          sendJson(response, 200, {
            success: true,
            message: 'Enquiry submitted successfully',
            emailId: providerId,
          })
        } catch (error) {
          const statusCode = error instanceof EnquiryRequestError ? error.status : 500
          const errorMessage =
            error instanceof EnquiryRequestError ? error.message : 'Unable to submit enquiry right now'

          sendJson(response, statusCode, { error: errorMessage })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), enquiryApiPlugin(mode)],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('framer-motion')) {
            return 'motion-vendor'
          }

          if (
            id.includes('react-hook-form') ||
            id.includes('zod') ||
            id.includes('@hookform/resolvers') ||
            id.includes('sonner')
          ) {
            return 'forms-vendor'
          }

          if (
            id.includes('react-dom') ||
            id.includes('react-router-dom') ||
            id.includes('/react/')
          ) {
            return 'react-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(currentDir, './src'),
    },
  },
}))
