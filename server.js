import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/rooms.js'
import userRoute from './routes/users.js'
import { errorHandler } from "./utils/error.js";


const app = express();
dotenv.config()

app.use( express.json() )


app.use( '/api/auth', authRoute )
app.use( '/api/users', userRoute )
app.use( '/api/hotels', hotelRoute )
app.use( '/api/rooms', roomRoute )


app.use( errorHandler );

// app.use( ( err, req, res, next ) => {
//    const errorStatus = err.status || 500;
//    const errorMessage = err.message || 'Something went Wrong!'
//    return res.status( errorStatus ).json( {
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack
//    } )
// } )



const connect = async () => {
   try {
      await mongoose.connect( process.env.MONGODB_URI )
      console.log( 'Connection to Database: Successfull' )
   } catch ( error ) {
      throw error;
   }
}



app.listen( 8000, () => {
   connect();
   console.log( 'Connection Established Successfully at Port 8000' );
} )