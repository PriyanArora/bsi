const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  productOfInterest: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Enquiry", enquirySchema);
