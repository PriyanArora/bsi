const connectDB = require("../config/db.js");
const Enquiry = require("../models/Enquiry.js");
const mongoose = require("mongoose");

const enquiries = [
  {
    fullName: "Arjun Mehta",
    phone: "9876543210",
    email: "arjun.mehta@mehtafab.com",
    companyName: "Mehta Fabrication Works",
    productOfInterest: "Electric Chain Hoist - 2 Ton",
    message: "Need pricing and delivery timeline for 2 units in Pune.",
  },
  {
    fullName: "Nisha Verma",
    phone: "9988776655",
    email: "nisha.verma@orbitlogistics.in",
    companyName: "Orbit Logistics",
    productOfInterest: "Wire Rope Hoist - 5 Ton",
    message: "Please share specs and maintenance schedule options.",
  },
  {
    fullName: "Rahul Iyer",
    phone: "9123456780",
    companyName: "Iyer Engineering",
    productOfInterest: "Jib Crane",
    message: "Looking for a compact setup for limited floor space.",
  },
  {
    fullName: "Sneha Kulkarni",
    phone: "9001122334",
    email: "sneha.kulkarni@novatech.in",
    companyName: "NovaTech Components",
    productOfInterest: "Manual Hoist",
  },
  {
    fullName: "Karthik Rao",
    phone: "9556677889",
    email: "karthik.rao@shreeinfra.com",
    message: "Need a callback for EOT crane options this week.",
  },
];

const seedingData = async () => {
  try {
    await connectDB();
    await Enquiry.deleteMany({});
    const inserted = await Enquiry.insertMany(enquiries);
    console.log(`${inserted.length} enquiries inserted successfully`);
  } 
  catch (error) {
    console.error("Seeding failed:", { cause: error });
  } 
  finally {
    await mongoose.disconnect();
  }
};

seedingData();
