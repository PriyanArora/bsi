import { enquirySchema } from '../../src/lib/enquirySchema.js'

const RESEND_API_URL = 'https://api.resend.com/emails'

export class EnquiryRequestError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'EnquiryRequestError'
    this.status = status
  }
}

const cleanString = (value, maxLength = 1000) => {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength)
}

const normalizeProductSelection = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => cleanString(item, 120)).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => cleanString(item, 120))
      .filter(Boolean)
  }

  return []
}

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const getEnvValue = (env, key) => {
  const value = env?.[key]

  if (typeof value !== 'string' || !value.trim()) {
    throw new EnquiryRequestError(500, `Missing required environment variable: ${key}`)
  }

  return value.trim()
}

export function normalizeEnquiryPayload(rawPayload = {}) {
  const payload = {
    firstName: cleanString(rawPayload.firstName, 80),
    lastName: cleanString(rawPayload.lastName, 80),
    companyName: cleanString(rawPayload.companyName, 160),
    phone: cleanString(rawPayload.phone, 32).replace(/\s+/g, ''),
    email: cleanString(rawPayload.email, 160).toLowerCase(),
    productOfInterest: normalizeProductSelection(rawPayload.productOfInterest),
    message: cleanString(rawPayload.message, 2000),
    dataProtectionAccepted: rawPayload.dataProtectionAccepted === true,
  }

  const parsedPayload = enquirySchema.safeParse(payload)

  if (!parsedPayload.success) {
    throw new EnquiryRequestError(400, parsedPayload.error.issues[0]?.message || 'Invalid enquiry payload')
  }

  const enquiry = parsedPayload.data
  const fullName = `${enquiry.firstName} ${enquiry.lastName}`.trim()
  const productSummary = enquiry.productOfInterest?.length
    ? enquiry.productOfInterest.join(', ')
    : 'Not specified'

  return {
    ...enquiry,
    fullName,
    productSummary,
  }
}

const buildEmailSubject = (enquiry) => {
  const productLabel =
    enquiry.productOfInterest?.length === 1 ? enquiry.productOfInterest[0] : 'BSI Solutionz website enquiry'

  return `New enquiry: ${productLabel}`
}

const buildTextBody = (enquiry) =>
  [
    'New website enquiry received.',
    '',
    `Name: ${enquiry.fullName}`,
    `Company: ${enquiry.companyName || 'Not provided'}`,
    `Phone: ${enquiry.phone}`,
    `Email: ${enquiry.email || 'Not provided'}`,
    `Product interest: ${enquiry.productSummary}`,
    '',
    'Message:',
    enquiry.message || 'No message provided.',
  ].join('\n')

const buildHtmlBody = (enquiry) => `
  <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
    <h2 style="margin: 0 0 16px; color: #0f2c4d;">New website enquiry received</h2>
    <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
      <tbody>
        <tr>
          <td style="padding: 8px 0; font-weight: 700; width: 180px;">Name</td>
          <td style="padding: 8px 0;">${escapeHtml(enquiry.fullName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700;">Company</td>
          <td style="padding: 8px 0;">${escapeHtml(enquiry.companyName || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700;">Phone</td>
          <td style="padding: 8px 0;">${escapeHtml(enquiry.phone)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700;">Email</td>
          <td style="padding: 8px 0;">${escapeHtml(enquiry.email || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 700;">Product interest</td>
          <td style="padding: 8px 0;">${escapeHtml(enquiry.productSummary)}</td>
        </tr>
      </tbody>
    </table>
    <h3 style="margin: 0 0 8px; color: #0f2c4d;">Message</h3>
    <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(enquiry.message || 'No message provided.')}</p>
  </div>
`

export async function sendEnquiryEmail(rawPayload, env = process.env, fetchImpl = fetch) {
  const enquiry = normalizeEnquiryPayload(rawPayload)
  const resendApiKey = getEnvValue(env, 'RESEND_API_KEY')
  const senderEmail = getEnvValue(env, 'ENQUIRY_FROM_EMAIL')
  const receiverEmail = getEnvValue(env, 'RECEIVER_EMAIL')

  const providerResponse = await fetchImpl(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: senderEmail,
      to: [receiverEmail],
      subject: buildEmailSubject(enquiry),
      reply_to: enquiry.email || undefined,
      text: buildTextBody(enquiry),
      html: buildHtmlBody(enquiry),
    }),
  })

  let responsePayload = {}

  try {
    responsePayload = await providerResponse.json()
  } catch {
    responsePayload = {}
  }

  if (!providerResponse.ok) {
    throw new EnquiryRequestError(
      502,
      responsePayload.message || responsePayload.error || 'Unable to deliver enquiry email'
    )
  }

  return {
    enquiry,
    providerId: responsePayload.id || null,
  }
}
