import express from 'express'
import { getUsers, getUser, updateUserProfile, removeUser } from '../controllers/userController.js'
import { verifyToken, isAdmin, isUserOwner } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Error retrieving users
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */
router.get('/', verifyToken, isAdmin, getUsers)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', verifyToken, getUser)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rolId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, isUserOwner, updateUserProfile)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Error deleting user
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verifyToken, isUserOwner, removeUser)

export default router
