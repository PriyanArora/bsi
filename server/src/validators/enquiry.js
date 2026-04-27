const { z } = require("zod");

const EnquirySchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/).optional(),
  email: z.string().email().optional(),
  companyName: z.string().optional(),
  productOfInterest: z.string().optional(),
  message: z.string().optional(),
})
.refine((data) => data.phone || data.email, {
  message: "Either phone or email is required",
});


module.exports = { EnquirySchema };
