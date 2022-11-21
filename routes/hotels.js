import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

// CREATE
router.post( '/', verifyAdmin, createHotel )


// UPDATE
router.put( '/:id', verifyAdmin, updateHotel )

// DELETE
router.delete( '/:id', verifyAdmin, deleteHotel )

// GET

router.get( 'find/:id', getHotel )
// GET ALL

router.get( '/', getHotels )

// Count By City Name
router.get( '/', countByCity )

// Count By Type
router.get( '/', countByType )



export default router;