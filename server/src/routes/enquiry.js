const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry.js");
const rateLimit = require("express-rate-limit");   
const {sendEnquiryEmail} = require("../services/emailService.js");                                                                                                                                                                                                          

const { EnquirySchema } = require("../validators/enquiry.js");

const enquiryLimiter = rateLimit({                                                                                                      windowMs: 15 * 60 * 1000, // 15 minutes                                                                                           
    max: 5,
    message: { error: "Too many requests, please try again later" }
});

router.post("/", enquiryLimiter, async (req, res) => {
  try {
    const { fullName, phone, email, companyName, productOfInterest, message } = req.body;
    const result = EnquirySchema.safeParse(req.body);  
                                                                                  
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }
    
    const enquiry = new Enquiry({ fullName, phone, email, companyName, productOfInterest, message });
    await enquiry.save();  

    try{
      await sendEnquiryEmail(enquiry);
    }
    catch(err){
      console.error("Failure to send email");
    }
    return res.status(201).json({message: "Enquiry received"});
  } 
  catch (err) {                                                                                                                       
    return res.status(500).json({ error: "Failed to process enquiry" });                                                              
  }
});

module.exports = router;
