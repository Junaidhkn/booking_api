import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { errorHandler } from "../utils/error.js";


export const createRoom = async ( req, res, next ) => {
   const hotelId = req.params.hotelId;
   const newRoom = new Room( req.body )

   try {
      const savedRoom = await newRoom.save()
      await Hotel.findByIdAndUpdate( hotelId, { $push: { rooms: savedRoom._id } } )

      res.status( 200 ).json( savedRoom )
   } catch ( error ) {
      next( error )
   }
}

// Update
export const updateRoom = async ( req, res, next ) => {
   try {
      const updatedRoom = await Room.findByIdAndUpdate( req.params.id, { $set: req.body }, { new: true } )
      res.status( 200 ).json( updatedRoom )
   } catch ( err ) {
      next( err )
   }
}


// Delete
export const deleteRoom = async ( req, res, next ) => {
   try {
      await Room.findByIdAndDelete( req.params.id )
      res.status( 200 ).json( 'Room Info Deleted' )
   } catch ( err ) {
      next( err )
   }
}


// Get one
export const getRoom = async ( req, res, next ) => {
   try {
      const room = await Room.findByd( req.params.id )
      res.status( 200 ).json( room )
   } catch ( err ) {
      next( err )
   }
}



// Get All
export const getRooms = async ( req, res, next ) => {
   try {
      const rooms = await Room.find()
      res.status( 200 ).json( rooms )
   } catch ( err ) {
      next( err )
   }
}

