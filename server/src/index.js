const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

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