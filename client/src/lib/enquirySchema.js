import { z } from 'zod'

export const enquirySchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  companyName: z.string().optional(),
  productOfInterest: z.string().optional(),
  message: z.string().optional(),
  source: z.string().default('website'),
})
