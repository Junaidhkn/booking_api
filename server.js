import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'
import userRoute from './routes/users.js'


const app = express();
dotenv.config()



app.use( '/api/auth', authRoute )
app.use( '/api/users', userRoute )
app.use( '/api/hotels', hotelRoute )
app.use( '/api/rooms', roomRoute )




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