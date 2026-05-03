import assert from 'node:assert/strict'
import { POST } from '../src/pages/api/enquiry.js'
import { resetEnquiryRateLimitForTests } from '../src/pages/api/_shared/enquiry-handler.js'

const validPayload = {
  firstName: 'Atul',
  lastName: 'Sharma',
  companyName: 'Vardhman',
  phone: '9876543210',
  email: 'atul@example.com',
  productOfInterest: ['Electric Chain Hoists'],
  message: 'Need a hoist recommendation for a production bay.',
  dataProtectionAccepted: true,
}

const envBackup = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ENQUIRY_FROM_EMAIL: process.env.ENQUIRY_FROM_EMAIL,
  RECEIVER_EMAIL: process.env.RECEIVER_EMAIL,
  ENQUIRY_RATE_LIMIT_MAX: process.env.ENQUIRY_RATE_LIMIT_MAX,
  ENQUIRY_RATE_LIMIT_WINDOW_MS: process.env.ENQUIRY_RATE_LIMIT_WINDOW_MS,
}

const configureTestEnv = () => {
  process.env.RESEND_API_KEY = 're_test_key'
  process.env.ENQUIRY_FROM_EMAIL = 'BSI Solutionz <enquiry@example.com>'
  process.env.RECEIVER_EMAIL = 'owner@example.com'
  process.env.ENQUIRY_RATE_LIMIT_MAX = '2'
  process.env.ENQUIRY_RATE_LIMIT_WINDOW_MS = '60000'
}

const restoreEnv = () => {
  for (const [key, value] of Object.entries(envBackup)) {
    if (value === undefined) {
      delete process.env[key]
      continue
    }

    process.env[key] = value
  }
}

const makeRequest = (payload, ip = '203.0.113.10') =>
  new Request('https://bsisolutionz.test/api/enquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(payload),
  })

const readJson = async (response) => response.json()

const originalFetch = globalThis.fetch
const sentEmails = []

globalThis.fetch = async (_url, options) => {
  sentEmails.push(JSON.parse(options.body))

  return new Response(JSON.stringify({ id: 'email_test_123' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

try {
  configureTestEnv()
  resetEnquiryRateLimitForTests()

  const validResponse = await POST({ request: makeRequest(validPayload) })
  const validJson = await readJson(validResponse)

  assert.equal(validResponse.status, 200)
  assert.equal(validJson.success, true)
  assert.equal(validJson.emailId, 'email_test_123')
  assert.equal(sentEmails.length, 1)
  assert.equal(sentEmails[0].reply_to, validPayload.email)
  assert.deepEqual(sentEmails[0].to, ['owner@example.com'])
  assert.match(sentEmails[0].subject, /Electric Chain Hoists/)

  resetEnquiryRateLimitForTests()
  const invalidResponse = await POST({
    request: makeRequest({
      ...validPayload,
      firstName: '',
      phone: '123',
      dataProtectionAccepted: false,
    }, '203.0.113.11'),
  })
  const invalidJson = await readJson(invalidResponse)

  assert.equal(invalidResponse.status, 400)
  assert.equal(typeof invalidJson.error, 'string')

  resetEnquiryRateLimitForTests()
  await POST({ request: makeRequest(validPayload, '203.0.113.12') })
  await POST({ request: makeRequest(validPayload, '203.0.113.12') })

  const limitedResponse = await POST({ request: makeRequest(validPayload, '203.0.113.12') })
  const limitedJson = await readJson(limitedResponse)

  assert.equal(limitedResponse.status, 429)
  assert.equal(limitedJson.error, 'Too many enquiry attempts. Please try again later.')

  console.log('Enquiry endpoint verification passed')
} finally {
  resetEnquiryRateLimitForTests()
  globalThis.fetch = originalFetch
  restoreEnv()
}
