const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());

app.use("/api/health", require("./routes/health.js"));
app.use("/api/enquiry", require("./routes/enquiry.js"));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});


const startServer = async() =>{
  try{
    await connectDB();
    app.listen(process.env.PORT, ()=>{
      console.info({port: process.env.PORT}, " : Server started");
    });
  }
  catch(err){
    console.error("Failed to start server :", {cause: err});
    process.exit(1);
  }
}

startServer();

//for jest testing
module.exports = app;