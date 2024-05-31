import express from 'express'
import { getRoles } from '../controllers/roleController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', verifyToken, isAdmin, getRoles)

export default router
