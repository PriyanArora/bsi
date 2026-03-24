const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB connected successfully: ${mongoose.connection.host}`);
	}
  catch (error) {
		console.error("MongoDB connection failed:", error.message);
		throw new Error("Database connection failed", { cause: error });
	}
};

module.exports = connectDB;
