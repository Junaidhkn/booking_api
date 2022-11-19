import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'


export const register = async ( req, res, next ) => {
   try {
      const salt = bcrypt.genSaltSync( 10 )
      const hashedPassword = bcrypt.hashSync( req.body.password, salt )
      const newUser = new User( {
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword
      } )
      await newUser.save()
      res.status( 201 ).send( 'User Has Been Created' )
   } catch ( err ) {
      next( err )
   }
}
export const login = async ( req, res, next ) => {
   try {
      const user = await User.findOne( { username: req.body.username } )
      if ( !user ) return next( errorHandler( 404, "User Not Found!" ) )
      const isPasswordCorrect = await bcrypt.compareSync( req.body.password, user.password )
      if ( !isPasswordCorrect ) return next( errorHandler( 400, "Wrong Password or Username!" ) )

      const token = jwt.sign( { id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_KEY )

      const { password, isAdmin, ...otherData } = user._doc
      res.cookie( "access_token", token, {
         httpOnly: true
      } ).status( 200 ).json( otherData )
   } catch ( err ) {
      next( err )
   }
} 