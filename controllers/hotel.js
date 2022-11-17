import Hotel from '../models/Hotel.js'


// Create
export const createHotel = async ( req, res, next ) => {
   const hotel = new Hotel( req.body )
   try {
      const savedHotel = await hotel.save()
      res.status( 200 ).json( savedHotel )
   } catch ( err ) {
      next( err )
   }
}

// Update
export const updateHotel = async ( req, res, next ) => {
   try {
      const updatedHotel = await Hotel.findByIdAndUpdate( req.params.id, { $set: req.body }, { new: true } )
      res.status( 200 ).json( updatedHotel )
   } catch ( err ) {
      next( err )
   }
}


// Delete
export const deleteHotel = async ( req, res, next ) => {
   try {
      await Hotel.findByIdAndDelete( req.params.id )
      res.status( 200 ).json( 'Hotel Info Deleted' )
   } catch ( err ) {
      next( err )
   }
}


// Get one
export const getHotel = async ( req, res, next ) => {
   try {
      const hotel = await Hotel.findByd( req.params.id )
      res.status( 200 ).json( hotel )
   } catch ( err ) {
      next( err )
   }
}



// Get All
export const getHotels = async ( req, res, next ) => {
   try {
      const hotels = await Hotel.find()
      res.status( 200 ).json( hotels )
   } catch ( err ) {
      next( err )
   }
} 