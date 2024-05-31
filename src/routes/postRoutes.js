import express from 'express'
import { getPosts, getPost, createNewPost, updatePostContent, removePost, getPostsByCategoryFilter, getPostsByTitleSearch } from '../controllers/postController.js'
import { verifyToken, isPostOwner } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getPostsByTitleSearch) // Ruta para buscar publicaciones por título
router.get('/category/:categoryId', getPostsByCategoryFilter) // Ruta para filtrar publicaciones por categoría
router.get('/:id', getPost)
router.post('/', verifyToken, createNewPost)
router.put('/:id', verifyToken, isPostOwner, updatePostContent)
router.delete('/:id', verifyToken, isPostOwner, removePost)

export default router
