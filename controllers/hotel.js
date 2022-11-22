import Hotel from '../models/Hotel.js'
import { errorHandler } from '../utils/error.js'


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
   const { min, max, ...others } = req.query;
   try {
      const hotels = await Hotel.find( { ...others, cheapestPrice: { $gt: min || 5, $lt: max || 500 } } ).limit( req.query.limit )
      res.status( 200 ).json( hotels )
   } catch ( err ) {
      next( err )
   }
}

// Get All By city name
export const countByCity = async ( req, res, next ) => {
   const cities = req.query.cities.split( ',' )
   try {
      const list = await Promise.all( cities.map( city => {
         return Hotel.countDocuments( { city: city } )
      } ) )
      res.status( 200 ).json( list )
   } catch ( err ) {
      next( err )
   }
}


// Get All by Type
export const countByType = async ( req, res, next ) => {
   try {
      const hotelCount = await Hotel.countDocuments( { type: 'Hotel' } )
      const apartmentCount = await Hotel.countDocuments( { type: 'Apartment' } )
      const resortCount = await Hotel.countDocuments( { type: 'Resort' } )
      const villaCount = await Hotel.countDocuments( { type: 'Villa' } )
      const cabinCount = await Hotel.countDocuments( { type: 'Cabin' } )
      res.status( 200 ).json( [
         { type: 'Hotel', count: hotelCount },
         { type: 'Apartment', count: apartmentCount },
         { type: 'Resort', count: resortCount },
         { type: 'Villa', count: villaCount },
         { type: 'Cabin', count: cabinCount }
      ] )
   } catch ( err ) {
      next( err )
   }
} 