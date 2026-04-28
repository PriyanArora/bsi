import { EnquiryRequestError, sendEnquiryEmail } from './_shared/enquiry-handler.js'

const parseRequestBody = (body) => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      throw new EnquiryRequestError(400, 'Invalid JSON payload')
    }
  }

  if (body && typeof body === 'object') {
    return body
  }

  return {}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const requestBody = parseRequestBody(req.body)
    const { providerId } = await sendEnquiryEmail(requestBody, process.env)

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully',
      emailId: providerId,
    })
  } catch (error) {
    const status = error instanceof EnquiryRequestError ? error.status : 500
    const message =
      error instanceof EnquiryRequestError ? error.message : 'Unable to submit enquiry right now'

    return res.status(status).json({ error: message })
  }
}
