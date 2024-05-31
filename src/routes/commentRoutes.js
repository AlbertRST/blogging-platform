import express from 'express'
import { getComments, getComment, createNewComment, updateCommentContent, removeComment } from '../controllers/commentController.js'
import { verifyToken, isCommentOwner } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getComments)
router.get('/:id', getComment)
router.post('/', verifyToken, createNewComment)
router.put('/:id', verifyToken, isCommentOwner, updateCommentContent)
router.delete('/:id', verifyToken, isCommentOwner, removeComment)

export default router
