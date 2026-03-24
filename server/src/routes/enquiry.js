const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry.js");

router.post("/", async (req, res) => {
  try {
    const { fullName, phone, email, companyName, productOfInterest, message, source } = req.body;

    if (!fullName || !phone ) {
      return res.status(400).json({
        error: "fullName and phone are required",
      });
    }
    
    const enquiry = new Enquiry({ fullName, phone, email, companyName, productOfInterest, message, source });
    await enquiry.save();  

    return res.status(201).json({message: "Enquiry received"});
  } 
  catch (err) {
    return res.status(500).json({
      error: "Failed to process enquiry",
    });
  }
});

module.exports = router;