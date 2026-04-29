import { EnquiryRequestError, sendEnquiryEmail } from './_shared/enquiry-handler.js'

const parseRequestBody = async (request) => {
  const rawBody = await request.text()

  if (!rawBody) {
    return {}
  }

  try {
    return JSON.parse(rawBody)
  } catch {
    throw new EnquiryRequestError(400, 'Invalid JSON payload')
  }
}

const methodNotAllowed = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      Allow: 'POST',
      'Content-Type': 'application/json',
    },
  })

export const GET = methodNotAllowed

export const POST = async ({ request }) => {
  try {
    const requestBody = await parseRequestBody(request)
    const { providerId } = await sendEnquiryEmail(requestBody, process.env)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enquiry submitted successfully',
        emailId: providerId,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    const status = error instanceof EnquiryRequestError ? error.status : 500
    const message =
      error instanceof EnquiryRequestError ? error.message : 'Unable to submit enquiry right now'

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
