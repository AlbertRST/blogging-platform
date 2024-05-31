import express from 'express'
import { getComments, getComment, createNewComment, updateCommentContent, removeComment } from '../controllers/commentController.js'
import { verifyToken, isCommentOwner } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *       500:
 *         description: Error retrieving comments
 */
router.get('/', getComments)

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment data
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error retrieving comment
 */
router.get('/:id', getComment)

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - content
 *             properties:
 *               post_id:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Error creating comment
 *     security:
 *       - bearerAuth: []
 */
router.post('/', verifyToken, createNewComment)

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       500:
 *         description: Error updating comment
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, isCommentOwner, updateCommentContent)

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       500:
 *         description: Error deleting comment
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verifyToken, isCommentOwner, removeComment)

export default router
