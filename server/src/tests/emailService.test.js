process.env.GMAIL_FROM = "sender@example.com";
process.env.GMAIL_CLIENT_ID = "mock-client-id";
process.env.GMAIL_CLIENT_SECRET = "mock-client-secret";
process.env.GMAIL_REFRESH_TOKEN = "mock-refresh-token";
process.env.NOTIFICATION_EMAIL = "notify@example.com";

const mockSendMail = jest.fn().mockResolvedValue({ messageId: "mock-message-id" });

jest.mock("nodemailer", () => ({
	createTransport: jest.fn(() => ({
		sendMail: mockSendMail
	}))
}));

jest.mock("https", () => ({
	request: jest.fn((options, callback) => {
		const res = {
			on: jest.fn((event, handler) => {
				if (event === "data") handler(JSON.stringify({ access_token: "mock-token" }));
				if (event === "end") handler();
			})
		};
		callback(res);
		return { on: jest.fn(), write: jest.fn(), end: jest.fn() };
	})
}));

const { sendEnquiryEmail } = require("../services/emailService.js");

describe("sendEnquiryEmail", () => {
	beforeEach(() => {
		mockSendMail.mockClear();
	});

	test("1. Calls sendMail with correct from, to, and subject", async () => {
		const enquiry = {
			fullName: "Priyan",
			phone: "9876543210",
			email: "priyan@example.com",
			companyName: "Acme",
			productOfInterest: "BSI Core",
			message: "Please share pricing"
		};

		await sendEnquiryEmail(enquiry);

		expect(mockSendMail).toHaveBeenCalledTimes(1);
		expect(mockSendMail).toHaveBeenCalledWith(
			expect.objectContaining({
				from: process.env.GMAIL_FROM,
				to: process.env.NOTIFICATION_EMAIL,
				subject: "New enquiry from Priyan"
			})
		);
	});

	test("2. Includes enquiry name, phone, and product in email body", async () => {
		const enquiry = {
			fullName: "Alex",
			phone: "9998887776",
			email: "alex@example.com",
			companyName: "Delta Ltd",
			productOfInterest: "BSI Premium",
			message: "Need implementation timeline"
		};

		await sendEnquiryEmail(enquiry);

		const payload = mockSendMail.mock.calls[0][0];

		expect(payload.text).toContain("Full name: Alex");
		expect(payload.text).toContain("Phone: 9998887776");
		expect(payload.text).toContain("Product of interest: BSI Premium");

		expect(payload.html).toContain("Alex");
		expect(payload.html).toContain("9998887776");
		expect(payload.html).toContain("BSI Premium");
	});
});
