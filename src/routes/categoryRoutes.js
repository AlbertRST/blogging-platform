import express from 'express'
import { getCategories, getCategory, createNewCategory, updateCategoryContent, removeCategory } from '../controllers/categoryController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', verifyToken, isAdmin, createNewCategory)
router.put('/:id', verifyToken, isAdmin, updateCategoryContent)
router.delete('/:id', verifyToken, isAdmin, removeCategory)

export default router
