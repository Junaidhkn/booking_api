import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


const app = express();
dotenv.config()

const connect = async () => {
   try {
      await mongoose.connect( process.env.MONGODB_URI )
      console.log( 'Connection to Database: Successful' )
   } catch ( error ) {
      throw error;
   }
}



app.listen( 8000, () => {
   connect();
   console.log( 'Connection Established Successfully at Port 8000' );
} )