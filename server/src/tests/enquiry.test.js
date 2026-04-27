const request = require("supertest");
const express = require("express");
const enquiryRouter = require("../routes/enquiry.js");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use("/api/enquiry", enquiryRouter)

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe("POST /api/enquiry", () => {
 
  test("1. Valid submission with phone -> 201", async () => {
      const res = await request(app).post("/api/enquiry").send({
        fullName: "Priyan",
        phone: "9876543210",
        message: "Need product details",
      });
      expect(res.status).toBe(201);
  });

  test("2. Valid submission with email only -> 201", async () => {
    const res = await request(app).post("/api/enquiry").send({
      fullName: "Priyan",
      email: "priyan@example.com",
      message: "Please contact me",
    });
    expect(res.status).toBe(201);
  });

  test("3. Missing fullName -> 400", async () => {
    const res = await request(app).post("/api/enquiry").send({
      phone: "9876543210",
      message: "Missing full name",
    });

    expect(res.status).toBe(400);
  });

  test("4. Neither phone nor email -> 400", async () => {
    const res = await request(app).post("/api/enquiry").send({
      fullName: "Priyan",
      message: "No contact fields",
    });

    expect(res.status).toBe(400);
  });

  test("5. Invalid phone format -> 400", async () => {
    const res = await request(app).post("/api/enquiry").send({
      fullName: "Priyan",
      phone: "98AB543210", // not 10 digits
      message: "Invalid phone test",
    });

    expect(res.status).toBe(400);
  });

  test("6. Rate limit exceeded -> 429", async () => {
    let hitRateLimit = false;

    for (let i = 0; i < 30; i++) {
      const res = await request(app).post("/api/enquiry").send({
        fullName: "Priyan",
        phone: `9876543${String(i).padStart(3, "0")}`.slice(0, 10),
        message: "Rate limit test",
      });

      if (res.status === 429) {
        hitRateLimit = true;
        break;
      }
    }

    expect(hitRateLimit).toBe(true);
  });
});
