import express from 'express'
import { getPosts, getPost, createNewPost, updatePostContent, removePost, getPostsByCategoryFilter, getPostsByTitleSearch } from '../controllers/postController.js'
import { verifyToken, isPostOwner } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management endpoints
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *       500:
 *         description: Error retrieving posts
 */
router.get('/', getPosts)

/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     summary: Search posts by title
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Post title
 *     responses:
 *       200:
 *         description: List of posts matching the title
 *       500:
 *         description: Error searching posts by title
 */
router.get('/search', getPostsByTitleSearch) // Ruta para buscar publicaciones por título

/**
 * @swagger
 * /api/posts/category/{categoryId}:
 *   get:
 *     summary: Get posts by category
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of posts in the category
 *       500:
 *         description: Error retrieving posts by category
 */
router.get('/category/:categoryId', getPostsByCategoryFilter) // Ruta para filtrar publicaciones por categoría

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post data
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error retrieving post
 */
router.get('/:id', getPost)

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - content
 *               - categories
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Post must have at least one category
 *       500:
 *         description: Error creating post
 *     security:
 *       - bearerAuth: []
 */
router.post('/', verifyToken, createNewPost)

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - categories
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Post must have at least one category
 *       500:
 *         description: Error updating post
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, isPostOwner, updatePostContent)

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post and associated comments deleted successfully
 *       500:
 *         description: Error deleting post
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verifyToken, isPostOwner, removePost)

export default router
