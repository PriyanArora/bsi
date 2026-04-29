import { z } from 'zod'

export const enquirySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  companyName: z.string().optional(),
  productOfInterest: z.array(z.string()).optional(),
  message: z.string().optional(),
  dataProtectionAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the data protection notice.' }),
  }),
})
