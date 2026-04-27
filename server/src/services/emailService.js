const nodemailer = require("nodemailer");
const https = require("https");
const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = [
	"GMAIL_FROM",
	"GMAIL_CLIENT_ID",
	"GMAIL_CLIENT_SECRET",
	"GMAIL_REFRESH_TOKEN",
	"NOTIFICATION_EMAIL"
];

const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
	throw new Error(
		`Missing required email environment variables: ${missingEnvVars.join(", ")}`
	);
}

function getAccessToken() {
	return new Promise((resolve, reject) => {
		const params = new URLSearchParams({
			client_id: process.env.GMAIL_CLIENT_ID,
			client_secret: process.env.GMAIL_CLIENT_SECRET,
			refresh_token: process.env.GMAIL_REFRESH_TOKEN,
			grant_type: "refresh_token"
		});
		const req = https.request({
			hostname: "oauth2.googleapis.com",
			path: "/token",
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" }
		}, res => {
			let d = "";
			res.on("data", c => d += c);
			res.on("end", () => {
				const body = JSON.parse(d);
				if (body.access_token) resolve(body.access_token);
				else reject(new Error("Failed to get access token: " + d));
			});
		});
		req.on("error", reject);
		req.write(params.toString());
		req.end();
	});
}

function buildEmailContent(enquiry) {
	const safeEnquiry = enquiry || {};

	const fullName = safeEnquiry.fullName || "N/A";
	const phone = safeEnquiry.phone || "N/A";
	const email = safeEnquiry.email || "N/A";
	const companyName = safeEnquiry.companyName || "N/A";
	const productOfInterest = safeEnquiry.productOfInterest || "N/A";
	const message = safeEnquiry.message || "N/A";
	const submittedAt = new Date().toISOString();

	const subject = `New enquiry from ${fullName}`;

	const text = [
		"New enquiry received",
		"",
		`Full name: ${fullName}`,
		`Phone: ${phone}`,
		`Email: ${email}`,
		`Company name: ${companyName}`,
		`Product of interest: ${productOfInterest}`,
		`Submitted at: ${submittedAt}`,
		"",
		"Message:",
		message
	].join("\n");

	const html = `
		<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
			<h2 style="margin: 0 0 12px;">New enquiry received</h2>
			<table cellpadding="6" cellspacing="0" border="0">
				<tr><td><strong>Full name:</strong></td><td>${fullName}</td></tr>
				<tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
				<tr><td><strong>Email:</strong></td><td>${email}</td></tr>
				<tr><td><strong>Company name:</strong></td><td>${companyName}</td></tr>
				<tr><td><strong>Product of interest:</strong></td><td>${productOfInterest}</td></tr>
				<tr><td><strong>Submitted at:</strong></td><td>${submittedAt}</td></tr>
			</table>
			<p style="margin: 12px 0 4px;"><strong>Message:</strong></p>
			<p style="margin: 0; white-space: pre-wrap;">${message}</p>
		</div>
	`;

	return { subject, text, html };
}

async function sendEnquiryEmail(enquiry) {
	const { subject, text, html } = buildEmailContent(enquiry);
	const accessToken = await getAccessToken();

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAuth2",
			user: process.env.GMAIL_FROM,
			clientId: process.env.GMAIL_CLIENT_ID,
			clientSecret: process.env.GMAIL_CLIENT_SECRET,
			refreshToken: process.env.GMAIL_REFRESH_TOKEN,
			accessToken
		}
	});

	return transporter.sendMail({
		from: process.env.GMAIL_FROM,
		to: process.env.NOTIFICATION_EMAIL,
		subject,
		text,
		html
	});
}

module.exports = { sendEnquiryEmail };
