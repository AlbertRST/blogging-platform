import express from 'express'
import { getUsers, getUser, updateUserProfile, removeUser } from '../controllers/userController.js'
import { verifyToken, isAdmin, isUserOwner } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', verifyToken, isAdmin, getUsers)
router.get('/:id', verifyToken, getUser)
router.put('/:id', verifyToken, isUserOwner, updateUserProfile)
router.delete('/:id', verifyToken, isUserOwner, removeUser)

export default router
