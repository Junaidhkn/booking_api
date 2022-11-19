import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/User.js";

const router = express.Router()

// CREATE
router.post( '/', createUser )


// UPDATE
router.put( '/:id', updateUser )

// DELETE
router.delete( '/:id', deleteUser )

// GET

router.get( '/:id', getUser )
// GET ALL

router.get( '/', getUsers )



export default router;