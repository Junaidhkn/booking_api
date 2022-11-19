import User from '../models/User.js'


// Update
export const updateUser = async ( req, res, next ) => {
   try {
      const updatedUser = await User.findByIdAndUpdate( req.params.id, { $set: req.body }, { new: true } )
      res.status( 200 ).json( updatedUser )
   } catch ( err ) {
      next( err )
   }
}


// Delete
export const deleteUser = async ( req, res, next ) => {
   try {
      await User.findByIdAndDelete( req.params.id )
      res.status( 200 ).json( 'User Info Deleted' )
   } catch ( err ) {
      next( err )
   }
}


// Get one
export const getUser = async ( req, res, next ) => {
   try {
      const user = await User.findByd( req.params.id )
      res.status( 200 ).json( user )
   } catch ( err ) {
      next( err )
   }
}



// Get All
export const getUsers = async ( req, res, next ) => {
   try {
      const Users = await User.find()
      res.status( 200 ).json( Users )
   } catch ( err ) {
      next( err )
   }
} 